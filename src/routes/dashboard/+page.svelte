<script lang="ts">
	import { onMount } from "svelte";
    import AlbumTile from "$lib/components/AlbumTile.svelte";
    import TopBar from "$lib/components/TopBar.svelte";
    import "../../avara/font.css";
    import "../../manifont/font.css";
    
    let data = $props();
    let username = $derived(data.data.username.data[0].username);
    let userEmail = $derived(data.data.user?.email);
    let songs = $derived(data.data.songs ?? []);

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
   @reference "tailwindcss";

    :global(html) {
        background-color: #BDBDBD;
        overflow-x: hidden;
    }
    :global(body) {
        margin: 0;
        overflow-x: hidden;
    }
</style>

<TopBar username={username}/>

<div class="min-h-screen w-full bg-[#BDBDBD] pt-12">
    <div class="mt-8 bg-[#BDBDBD] border-t-2 border-x-2 border-b-2 border-[#023E8A] min-h-[calc(100vh-120px)] p-4">
        <div class="w-full flex items-center justify-center mb-6">
            <input type="text" class="text-[#0277B6] underline font-manifont-book text-2xl flex items-center gap-2 outline-none " placeholder="name your song!"/>
                <span class="border-2 border-[#0277B6] text-[#0277B6] leading-none px-0.5 text-2xl">↗</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {#each songs as song}
                <AlbumTile 
                    title={song.title}
                    artist={song.artist}
                    album_url={song.album_url}
                    album_name={song.album_name}
                    id={song.id}
                />
            {/each}
        </div>
    </div>
</div>

<footer class="flex w-full fixed bottom-1 text-center justify-center items-center">
    <h6 class="italic font-manifont-book text-[#023E8A]">© joaquin schere, 2025</h6>
</footer>