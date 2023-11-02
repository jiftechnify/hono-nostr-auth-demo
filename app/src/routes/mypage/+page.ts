import type { Nip07 } from "nostr-typedef";
import type { PageLoad } from "./$types";

interface Window {
  nostr: Nip07.Nostr
}
declare const window: Window;

// TODO: replace by actual URL
const nostrAuthApiEndpoint = "https://example.com"

type ApiResp = {
  pubkey: string;
  profile?: Record<string, unknown>;
};

export const load: PageLoad = async () => {
  const authEv = await window.nostr.signEvent({
    kind: 27235,
    content: "",
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ["u", nostrAuthApiEndpoint],
      ["method", "GET"],
    ]
  });
  const resp = await fetch(nostrAuthApiEndpoint, { headers: { Authorization: `Nostr ${atob(JSON.stringify(authEv))}` } });
  const respObj = await resp.json() as ApiResp;

  return respObj;
};
