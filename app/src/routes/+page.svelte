<script lang="ts">
	import { waitNostr } from 'nip07-awaiter';
</script>

<h1 class="title"><a href="https://github.com/nostr-protocol/nips/blob/master/98.md">Nostr HTTP Auth</a> Demo</h1>
<p class="poweredBy">Powered by <a href="https://github.com/jiftechnify/hono-nostr-auth">hono-nostr-auth</a> middleware</p>

{#await waitNostr(3000)}
	<p>...</p>
{:then nostrExt}
	{#if nostrExt !== undefined}
		<a class="login" data-sveltekit-preload-data="tap" href="/mypage">Login With Nostr Extension (NIP-07)</a>
	{:else}
		<p>Nostr Extension Not Found</p>
	{/if}
{/await}

<style>
  h1.title {
    margin: 0;
  }

  .poweredBy {
    font-size: 0.9em;
    margin: 0;
    margin-top: 0.5em;
  }

  a.login {
    margin-top: 2em;
    padding: 0.75em;
    border-radius: 0.5em;
    line-height: 1.5;
    background-color: #eee;
    text-decoration: none;
    color: #000;
  }
</style>
