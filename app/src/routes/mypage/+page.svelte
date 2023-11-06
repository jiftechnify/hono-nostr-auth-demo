<script lang="ts">
	import { nip19 } from 'nostr-tools';
	import type { PageData } from './$types';

	export let data: PageData;
	$: npub = nip19.npubEncode(data.pubkey);
</script>

{#if typeof data.profile?.['picture'] === 'string'}
	<img class="picture" src={data.profile['picture']} alt="user avatar" />
{/if}

<h2 class="hello">
  Hello, <span class="name"
    >{data.profile?.['display_name'] ?? data.profile?.['name'] ?? 'Nostrich'}</span
  >!
</h2>
<p class="npub">({npub})</p>

<a class="back" href="/">Back</a>


<style>
	.picture {
		width: 200px;
		height: 200px;
		border-radius: 50%;
    margin-top: 1em;
	}

  h2.hello {
    font-weight: normal;
    margin: 0;
    margin-top: 1em;
  }
	.name {
		font-weight: bold;
	}

	.npub {
    margin-top: 0.5em;
		color: #999;
    font-size: 0.5em;
	}

  .back {
    margin-top: 1em;
  }
</style>
