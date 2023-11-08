<script lang="ts">
	import format from 'date-fns/format';
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

<h3 class="loginBonusHeader">Login Bonus</h3>
<div class="loginBonusContainer">
	<p class="loginBonusStatus">
		{#if data.bonus.isTodaysFirst}
			Got today's login bonus!
		{:else}
			You have already logged in today.
		{/if}
	</p>

	<div class="loginBonusCount">
		<div class="countLabel">Total</div>
		<div class="countColon">:</div>
		<div class="countNumber">
			{data.bonus.count.total}
		</div>
		<div class="countLabel">Consecutive</div>
		<div class="countColon">:</div>
		<div class="countNumber">
			{data.bonus.count.consecutive}
		</div>
	</div>

	<p>
		You can get next bonus after: <span class="nextBonusTime"
			>{format(new Date(data.bonus.nextTime * 1000), 'yyyy-MM-dd H:mm')}</span
		> (local time)
	</p>
</div>

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

	h3.loginBonusHeader {
		margin: 0;
		margin-top: 1em;
	}

	.loginBonusContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.loginBonusStatus {
		font-weight: bold;
	}

	.loginBonusCount {
		display: grid;
		grid-template-columns: 1fr 8px 1fr;
		column-gap: 8px;
	}

	.countLabel {
		grid-column: 1;
		text-align: right;
	}
	.countColon {
		grid-column: 2;
	}
	.countNumber {
		grid-column: 3;
		text-align: right;
		font-weight: bold;
	}

	.nextBonusTime {
		font-weight: bold;
	}

	.back {
		margin-top: 1em;
	}
</style>
