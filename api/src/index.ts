import { Context, Hono } from "hono";
import { nostrAuth, type NostrEvent } from "hono-nostr-auth";
import { cors } from "hono/cors";
import { NostrFetcher } from "nostr-fetch";

type Variables = {
  nostrAuthEvent: NostrEvent;
};

const app = new Hono();

app.use("*", cors());
app.use("*", nostrAuth());

const relays = ["wss://directory.yabu.me", "wss://relay.nostr.band"];
app.get("/", async (c: Context<{ Variables: Variables }>) => {
  const { pubkey } = c.get("nostrAuthEvent");

  const fetcher = NostrFetcher.init();
  const profileEv = await fetcher.fetchLastEvent(relays, {
    authors: [pubkey],
    kinds: [0],
  });
  fetcher.shutdown();

  if (profileEv === undefined) {
    return c.json({ pubkey });
  }
  const profile = JSON.parse(profileEv.content);
  return c.json({ pubkey, profile });
});

export default app;
