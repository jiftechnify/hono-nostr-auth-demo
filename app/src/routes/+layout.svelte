<main>
	<h1 class="title">
		<a href="https://github.com/nostr-protocol/nips/blob/master/98.md">Nostr HTTP Auth</a> Demo
	</h1>
	<slot />
</main>

<footer>
	©<a class="linkToMySite" href="https://c-stellar.net">jiftechnify</a>
</footer>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		padding: 2em;
	}

	h1.title {
		margin: 0;
	}

	footer {
		position: fixed;
		bottom: 0;
		padding-bottom: 1em;
		display: flex;
		width: 100vw;
		justify-content: center;
		font-size: 0.9em;
		color: #666;
	}

	a.linkToMySite {
		color: #666;
		text-decoration: none;
	}
</style>
