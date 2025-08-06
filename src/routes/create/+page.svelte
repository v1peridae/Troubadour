<script lang="ts">
	import { onMount } from "svelte";
    import { enhance } from '$app/forms';
    import { blur, fade, fly } from "svelte/transition";

    let data = $props();
    let username = $derived(data.data.username.data[0].username);
    let title = $state("");
    let artist = $state("");
    let album = $state("");
    let body = $state("");

    // File upload preview, courtesy of https://svelte.dev/playground/b5333059a2f548809a3ac3f60a17a8a6?version=5.37.3#H4sIAAAAAAAACn1UXWvbMBT9K3cqgxTiONkYDMUJlDWDQQejW_dS9UGxrmNtimSk66Qh-L8P-SPJ2rEno6N7z7kfRz4yK7fIOPuylRuEbx53GvfgLHzWBuGhMk4qNmaFNhgYfzwyOlQxPgJsPGTfVNUk7NBQxNYy4L_w3FlCS4Fxlr1JEvheYa6lASql_R2AHNzmTiEUzgOVOgDV5LyWhkNJVAWepgdXUz1ZY_pzZeyPjyu3Wn2FJFkKK2wWcq8rWgoLYJBA26qm-XCK4lJb9CdEx45Pp8rIHEtnVBshKGKhdPtuLgsopAkxOsYXtc1JOwvOfiql3eDoGo7xAqJMIIjDgUVXwaQd3eP0qaUV1MXpAkbxok1sYbpUI18PYmdWj1KhhwVY3LfruW-B0fV8iOsiJlKp1Q4t3elAaNGPBItrFGx8Lv1ccltO1J0EpBsir9c14Uiw4POY0pN6DLWhs1bzSjZ-bsKtJPlwf9d1N_RMw9cj1d72mQ108Os5QwxohM3S01KFzcrZ8n82zdJythQ2a8cemdfaKh6dtDi2WBNBZ3neLm1xHNbXRLXo64VofS2YsGlkUnoHFyQnDzWxHjpe6eLskabrJdPbzWVOO9kGgs8XggkG0tBCsL4BwSDtqDiacKIIlbSXHBfebP6eQJbG2I4i1UU7MaV3_Xugg8H2LvbRb3uvFZUc3k-n1XO_hq22SYl6UxKH2QW-dl6h5_CueobgjFZwpZQakqTfaJuQqzjMPpxylA6VkQcOhcEBk0ZvbKIJt4FDjpb6Rwjwqw6ki0PS_xle3BbOUrLvC1s7M0jnzjjP4SrP83nvk-jgzYsWZ9Pp2_nZR_0w2JgRPhPj8Yk1T2NGUpu9torx1nrNH6zoc38SBQAA
    let input: HTMLInputElement;
    let container: HTMLElement;
    let image: HTMLElement;
    let placeholder: HTMLElement;
    let showImage: boolean = false;

    function onChange() {
        if (input.files) {
            const file: File = input.files[0];
            if (file) {
                showImage = true;
                
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    reader.result ? image.setAttribute('src', reader.result) : ;
                })
            }
        }

        if (file) {
            showImage = true;

            const reader = new FileReader();
            reader.addEventListener('load', () => {
                image.setAttribute('src', reader.result);
            })
        }
    }

    let fadeController: boolean = $state(false);
    onMount(() => {
        fadeController = true;
    })
</script>

<style lang="postcss">
    #main-container {
        scrollbar-width: none;
    }
</style>

<header class="fixed top-2 left-0 w-full z-10">
    <h3 id="title" class="text-3xl self-center text-gray-600 text-shadow-cyan-900/50 font-bold text-center mt-2 font-[Crimson_Pro]" transition:blur>Troubadour</h3>
    <h4 id="username" class="text-2xl fixed right-1/7 top-5.5 text-cyan-950 font-[Schibsted_Grotesk] font-extrabold italic text-shadow-white text-shadow-lg/70 text-shadow">{username}</h4>
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
<div id="main-container" class="border-black border-2 rounded-xl h-110 w-full max-w-screen-lg mx-auto self-center mt-20 ml-auto mr-auto gap-4 justify-center items-center bg-cyan-50 overflow-y-scroll">
    {#if fadeController} <h1 class="m-auto relative top-3 text-center text-2xl font-bold font-[Schibsted_Grotesk] text-shadow-2xs" transition:fade={{delay: 500, duration: 800}}>Let's get to work:</h1> {/if}
    <form action="?/createLyric" method="POST" class="flex flex-col items-center text-center justify-center relative top-6" use:enhance>
        <h4 class="italic text-lg">Song title?</h4>
        <input type="text" name="title" bind:value={title} placeholder="Helpless Child" id="title" class="mt-1 items-center text-center border-2 bg-gray-50 inline-block rounded-md w-9/12 text-shadow-2xs" required>
        <h4 class="italic text-lg mt-1">Okay, who's it by?</h4>
        <input type="text" name="artist" bind:value={artist} placeholder="Swans" id="artist" class="mt-1 items-center text-center border-2 bg-gray-50 inline-block rounded-md w-9/12 text-shadow-2xs" required>
        <h4 class="italic text-lg mt-1">Awesome, what album is it on?</h4>
        <input type="text" name="album" bind:value={album} placeholder="The Great Annihilator" id="album" class="mt-1 items-center text-center border-2 bg-gray-50 inline-block rounded-md w-9/12 text-shadow-2xs" required>
        <h4 class="italic text-lg mt-1">Cool, now paste the lyrics here (hint: you're one Google search away):</h4>
        <textarea bind:value={body} name="lyrics" placeholder="Now, you be the mother, and..." id="body" class="mt-1 border-1 bg-gray-100 inline-block rounded-md w-9/12 text-shadow-2xs h-40 mb-4" required></textarea>
        <h4 class="italic text-lg mt-1">Awesome! Now, upload the album art if you have it, and hit submit.</h4>
        <input 
        type="file" 
        name="album_image" 
        id="album_image"
        on:change={onChange}
        bind:this={input}
        >
    </form>
</div>