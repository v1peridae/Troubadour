<script lang="ts">
	import { onMount } from "svelte";
    import { blur } from "svelte/transition";

    let data = $props();
    // on mount, fetch data from hook database request
    onMount(() => {
        console.log("Mounted");
    })
</script>
<style lang="postcss">
    @reference "tailwindcss";
</style>

<header>
    <h3 id="title" transition:blur>Troubadour</h3>
</header>

{#if data.user}
<h1>YOU LOGGED IN {data.user.email}</h1>
{:else}
<h1>Not logged in.</h1>
{/if}