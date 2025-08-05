<script lang="ts">
	import { onMount } from "svelte";
    import { enhance } from '$app/forms';
    import { blur, fade, fly } from "svelte/transition";

    let data = $props();
    let username = $derived(data.data.username.data[0].username);
    let title = $state("The song's title here");
    let artist = $state("The artist that made the song!");
    let album = $state("The album the song's from (if you know)");

    let fadeController: boolean = $state(false);
    onMount(() => {
        fadeController = true;
    })
</script>

<style lang="postcss">
    
</style>

<header class="fixed top-2 left-0 w-full z-10">
    <h3 id="title" class="text-3xl self-center text-gray-800 font-bold text-center mt-2 text-shadow-cyan-900/50 font-[Crimson_Pro]" transition:blur>Troubadour</h3>
    <h4 id="username" class="text-2xl fixed right-1/7 top-5.5 text-cyan-950 ">{username}</h4>
    <form action="?/signout" method="POST" use:enhance>
        <input id="signout" type="submit" class="fixed text-xl right-5 top-3 text-cyan-800 border-2 border-rose-700 rounded-2xl p-3" value="Sign-out">
    </form>
</header>

<!--    test code

{#if userEmail}
<h1>YOU LOGGED IN {userEmail}: {username}</h1>
{:else}
<h1>Not logged in.</h1>
{/if}

-->
<div id="main-container" class="border-black border-2 rounded-xl h-110 w-full max-w-screen-lg mx-auto self-center mt-20 ml-auto mr-auto gap-4 justify-center items-center bg-cyan-50">
    {#if fadeController} <h1 class="m-auto relative top-3 text-center text-2xl font-bold font-[Schibsted_Grotesk] text-shadow-2xs" transition:fade={{delay: 500, duration: 800}}>Let's get to work:</h1> {/if}
    <form action="?/createLyric" method="POST" class="flex flex-col items-center text-center justify-center relative top-6" use:enhance>
        <input type="text" bind:value={title} id="title" class="border-2 bg-gray-50 inline-block rounded-md w-10/12 text-shadow-2xs">
    </form>
</div>

