<script lang="ts">
    import { fade, fly, blur } from "svelte/transition";
    import { enhance } from "$app/forms";
    import { onMount } from "svelte";
    import Markdown from "@magidoc/plugin-svelte-marked";

    let { lyrics, annotations, user, username } = $props();
    let mounted = $state(false);

    onMount(() => {
        mounted = true;
    })
</script>

<style lang="postcss">
    #lyric-container {
        scrollbar-width: none;
    }
</style>

<header class="fixed top-2 left-0 w-full z-10">
    {#if mounted}<a href="/dashboard"><h4 id="return" class="text-xl fixed left-1/10 top-1/26 italic text-cyan-950" transition:blur={{duration: 5000}}>back to dashboard</h4></a>{/if}
    <h3 id="title" class="text-3xl self-center text-gray-600 text-shadow-cyan-900/50 font-bold text-center mt-2 font-[Crimson_Pro]" transition:blur>Troubadour</h3>
    <h4 id="username" class="text-2xl fixed right-1/7 top-5.5 text-cyan-950 font-[Schibsted_Grotesk] font-extrabold italic text-shadow-white text-shadow-lg/70 text-shadow">{username}</h4>
    <form action="?/signout" method="POST" use:enhance>
        <input id="signout" type="submit" class="fixed text-xl right-5 top-3 text-cyan-800 border-2 border-rose-700 rounded-2xl p-3 italic font-medium bg-white" value="Sign-out">
    </form>
</header>

<div id="lyric-container" class="ml-0.5 w-9/12 min-h-10/12 border-black border-2 rounded-xl mt-20 bg-amber-50 overflow-y-scroll">
    {lyrics[0].data}
</div>