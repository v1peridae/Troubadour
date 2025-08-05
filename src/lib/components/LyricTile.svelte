<script lang="ts">

    let { title, artist, album_url = "/missing_album_src", album_name="Unknown album" } : {title: string, artist: string, album_url?: string, album_name?: string} = $props();
    let maxLength = 30;
    if (title.length > maxLength) { title = title.substring(0, title.indexOf(" ", maxLength)) + "..."}

</script>

<style lang="postcss">
    @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Libertinus+Sans:ital,wght@0,400;0,700;1,400&display=swap');
</style>

<div id="main" class="h-40 w-40 border-1 rounded-xl p-1 m-8 text-center justify-center shadow-lg">
    <img src={album_url} alt="The album cover for {album_name}">
    
    <h4 id="title" class="italic text-md text-gray-500 font-[Libertinus_Sans] mt-0.5 text-shadow-2xs">{title}</h4>

    <p id="artist" class="justify-center text-xs items-center mx-auto font-[Crimson_Pro]">{artist}</p>
</div>