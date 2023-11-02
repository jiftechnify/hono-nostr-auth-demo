<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData
</script>

<h1>My Page</h1>
<p>Hello, {data.profile?.["display_name"] ?? "Nostrich"}!</p>
<p>Your Public Key: {data.pubkey}</p>

