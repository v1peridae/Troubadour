<script lang="ts">
	import { onMount } from "svelte";
    import { enhance } from '$app/forms';
    import { goto } from "$app/navigation";
    import { blur } from "svelte/transition";
    import LyricTile from "$lib/components/LyricTile.svelte";
	import Button from "$lib/components/Button.svelte";

    let data = $props();
    let username = $derived(data.data.username.data[0].username);
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
    $inspect(username);
</script>

<style lang="postcss">
    #main-container {
        scrollbar-width: none;
    }
</style>

<header class="fixed top-2 left-0 w-full z-10">
    <h3 id="title" class="text-3xl self-center text-gray-600 text-shadow-cyan-900/50 font-bold text-center mt-2 font-[Crimson_Pro]" transition:blur>Troubadour</h3>
    <h4 id="username" class="text-2xl fixed right-1/6 top-5.5 text-cyan-950 font-[Schibsted_Grotesk] font-extrabold italic text-shadow-white text-shadow-lg/70 text-shadow">{username}</h4>
    <form action="?/signout" method="POST" use:enhance>
        <input id="signout" type="submit" class="fixed text-xl right-5 top-3 text-cyan-800 border-2 border-rose-700 rounded-2xl p-3 italic font-medium bg-white" value="Sign-out">
    </form>
</header>

<!--    test code

{#if userEmail}
<h1>YOU LOGGED IN {userEmail}: {username}</h1>
{:else}
<h1>Not logged in.</h1>
{/if}

-->
<div id="main-container" class="border-black border-4 rounded-xl h-110 w-full max-w-screen-lg mx-auto self-center mt-20 ml-auto mr-auto flex flex-row flex-wrap gap-4 bg-rose-50 overflow-y-scroll">
    {#each lyrics as song}
        <LyricTile title={song.title} artist={song.artist} album_url={song.album_url ? song.album_url : "/missing_album_src.png"} album_name={song.album_name} id={song.id}/>
    {/each}
</div>

<div id="button-container" class="w-fit h-fit relative top-4 mx-auto">
    <Button text="Create" color="#606060" callBackFunction={() => {
        console.log("This button works when pressed.");
        goto('create');
    }}/>
</div>