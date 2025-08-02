<script lang="ts">
	import { onMount } from "svelte";
    import { blur } from "svelte/transition";
    import { LyricTile } from "$lib";

    let data = $props();
    let userEmail = $derived(data.data.user?.email);
    let lyrics = $derived(data.data.lyrics);

    $effect(() => {
        if (userEmail) {
            console.log("User loaded: ", userEmail);
        }
    })
    // on mount, fetch data from hook database request
    onMount(() => {
        console.log("Mounted");
        console.log(userEmail);
    })
    $inspect(data);
</script>
<style lang="postcss">
    @reference "tailwindcss";
</style>

<header class="fixed top-2 left-0 w-full z-10">
    <h3 id="title" class="text-3xl self-center text-gray-800 font-bold text-center mt-0 text-shadow-cyan-900/50" transition:blur>Troubadour</h3>
</header>

{#if userEmail}
<h1>YOU LOGGED IN {userEmail}</h1>
{:else}
<h1>Not logged in.</h1>
{/if}

<div id="main-container" class="border-black border-4 rounded-xl ">
    {#each lyrics as song}
        <LyricTile {song.} />
    {/each}
</div>