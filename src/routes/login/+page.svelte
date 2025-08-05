<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
    import { enhance } from "$app/forms";

    let { data } = $props();

    let email: string = $state("");
    let password: string = $state("");
    let fadeController: boolean = $state(false)
    $inspect(email).with(console.trace);
    $inspect(password).with(console.trace)
    onMount(() => {
        fadeController = true;
    })
</script>
<style lang="postcss">
    @import url('https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');    
    @reference "tailwindcss";
    @theme {
        --font-script: 'Schibsted Grotesk', serif;
    }
    :global(html) {
        overflow: hidden;
    }
    :global(body) {
        margin: 0;
    }
</style>

<div class='w-screen h-screen flex items-center justify-center bg-[#cfcece]'>
    <div class="rounded-2xl p-8 flex flex-col items-center text-center w-80 border-2 max-w-md bg-white shadow-lg">
        {#if fadeController}<h1 class="text-7xl text-center m-0 p-0 font-bold italic font-[Schibsted_Grotesk] opacity-85 " transition:fade>Login</h1> {/if}
        <form method="POST" class="flex flex-col items-center text-center justify-center" use:enhance>
        <input type="text" class="bg-gray-300 border-2 inline-block rounded-md w-60 mt-6 items-center text-center justify-center" id="email" bind:value={email} name="email" placeholder="email" required>
        <input type="password" class="bg-gray-300 border-2 inline-block rounded-md w-60 mt-2 items-center text-center justify-center" id="password" bind:value={password} name="password" placeholder="password" required>
        <input type="submit" class="bg-blue-500 border-2 inline-block rounded-full w-40 mt-5 font-[Schibsted_Grotesk]" value="Enter">
        </form>
        <a href="/signup" class="bg-amber-500 text-amber-50 border-2 border-black inline-block rounded-full w-30 mt-3 font-[Schibsted_Grotesk]">Sign Up</a>
    </div>
</div>

<footer class="flex w-full fixed bottom-1 text-center justify-center items-center ">
    <h6 class="italic font-[Montserrat]">Copyright Joaquin Schere, 2025</h6>
</footer>