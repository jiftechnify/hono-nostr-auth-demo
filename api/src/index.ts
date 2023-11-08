import { Context, Hono } from "hono";
import { nostrAuth, type NostrEvent } from "hono-nostr-auth";
import { cors } from "hono/cors";
import { NostrFetcher } from "nostr-fetch";

type Variables = {
  nostrAuthEvent: NostrEvent;
};
type Bindings = {
  login_data: KVNamespace;
};

const app = new Hono();

app.use("*", cors());
app.use("*", nostrAuth());

const relays = ["wss://directory.yabu.me", "wss://relay.nostr.band"];
const getProfile = async (pubkey: string): Promise<Record<string, unknown> | undefined> => {
  const fetcher = NostrFetcher.init();
  const profileEv = await fetcher.fetchLastEvent(relays, {
    authors: [pubkey],
    kinds: [0],
  });
  fetcher.shutdown();

  return profileEv === undefined ? undefined : JSON.parse(profileEv.content);
};

type LoginBonusCount = {
  total: number;
  consecutive: number;
};

type LoginBonusData = {
  lastLoginDay: number;
  count: LoginBonusCount;
};

type LoginResponse = {
  pubkey: string;
  profile?: Record<string, unknown>;
  bonus: {
    count: LoginBonusCount;
    nextTime: number;
  };
};

const dateToUnixDay = (date: Date): number => Math.floor(date.getTime() / 1000 / 86400);
const unixDayToUnixtimeSec = (d: number) => d * 86400;

const updateLoginCount = (prevBonus: LoginBonusData | undefined, currDay: number): LoginBonusCount | undefined => {
  if (prevBonus === undefined) {
    return {
      total: 1,
      consecutive: 1,
    };
  }

  const { total: prevTotal, consecutive: prevConsec } = prevBonus.count;

  if (prevBonus.lastLoginDay === currDay) {
    // already logged in today
    return undefined;
  }
  if (prevBonus.lastLoginDay === currDay - 1) {
    // a consecutive login
    return {
      total: prevTotal + 1,
      consecutive: prevConsec + 1,
    };
  }
  // not a consecutive login
  return {
    total: prevTotal + 1,
    consecutive: 1,
  };
};

app.get("/", async (c: Context<{ Variables: Variables; Bindings: Bindings }>) => {
  const currDay = dateToUnixDay(new Date());
  const { pubkey } = c.get("nostrAuthEvent");

  // get profiles
  const profile = await getProfile(pubkey);

  // update login bonus data
  const prevBonusRaw = await c.env.login_data.get(`bonus_${pubkey}`);
  const prevBonus = prevBonusRaw === null ? undefined : (JSON.parse(prevBonusRaw) as LoginBonusData);

  const updatedCount = updateLoginCount(prevBonus, currDay);

  const nextTime = unixDayToUnixtimeSec(currDay + 1);

  if (updatedCount === undefined) {
    // already logged in today -> no update
    const resp: LoginResponse = {
      pubkey,
      profile,
      bonus: {
        count: prevBonus!.count,
        nextTime,
      },
    };
    return c.json(resp);
  }

  // update bonus data
  const updatedBonus: LoginBonusData = {
    count: updatedCount,
    lastLoginDay: currDay,
  };
  await c.env.login_data.put(`bonus_${pubkey}`, JSON.stringify(updatedBonus));

  // update login history
  const history = JSON.parse((await c.env.login_data.get(`history_${pubkey}`)) ?? "[]") as number[];
  if (history.at(-1) !== currDay) {
    history.push(currDay);
    await c.env.login_data.put(`history_${pubkey}`, JSON.stringify(history));
  }

  const resp: LoginResponse = {
    pubkey,
    profile,
    bonus: {
      count: updatedCount,
      nextTime,
    },
  };
  return c.json(resp);
});

export default app;
