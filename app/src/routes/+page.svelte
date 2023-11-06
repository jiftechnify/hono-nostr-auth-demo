<script lang="ts">
	import { waitNostr } from 'nip07-awaiter';
</script>

<h1>Nostr HTTP Auth (NIP-98) Demo</h1>
{#await waitNostr(3000)}
	<p>...</p>
{:then nostrExt}
	{#if nostrExt !== undefined}
		<a data-sveltekit-preload-data="tap" href="/mypage">Login With Nostr Extension (NIP-07)</a>
	{:else}
		<p>Nostr Extension Not Found</p>
	{/if}
{/await}
