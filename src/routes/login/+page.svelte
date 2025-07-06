<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

    let username: string = $state("");
    let password: string = $state("");
    let fadeController: boolean = $state(false)
    $inspect(username).with(console.trace);
    $inspect(password).with(console.trace)
    onMount(() => {
        fadeController = true;
    })

    function onclick() {
        // Submit query to database using username and password here!
    }
</script>
<style lang="postcss">
    @import url('https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&display=swap');
    @reference "tailwindcss";
    @theme {
        --font-script: 'Schibsted Grotesk', serif;
    }

    :global(html) {
        background-color: #cfcece;
    }
</style>

<div class="rounded-2xl mt-50 p-0 flex flex-col items-center text-center justify-center mx-auto w-md max-w-md">
    {#if fadeController}<h1 class="text-7xl text-center m-0 p-0 font-bold italic font-[Schibsted_Grotesk] opacity-85" transition:fade>Login</h1> {/if}
    <input type="text" class="bg-gray-300 border-2 inline-block rounded-md w-60 mt-6 items-center text-center justify-center" id="user" bind:value={username} placeholder="username">
    <input type="password" class="bg-gray-300 border-2 inline-block rounded-md w-60 mt-2 items-center text-center justify-center" id="password" bind:value={password} placeholder="password">
    <input type="button" class="bg-blue-500 border-2 inline-block rounded-full w-40 mt-5 font-[Schibsted_Grotesk]" value="Enter" {onclick}>
</div>

<footer></footer>