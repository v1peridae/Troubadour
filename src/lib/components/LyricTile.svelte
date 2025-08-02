<script lang="ts">
    // TODO: add placeholder image
    let { title, artist, album_url = "missing_album_src", album_name="Unknown album" } : {title: string, artist: string, album_url?: string, album_name?: string} = $props();
    document.getElementById("")
</script>

<style lang="postcss">
    #main {
        min-width: 20%;
        min-height: 20%;
    }
</style>

<div id="main">
    <img src={album_url} alt="The album cover for {album_name}">
    <h4 id="title">{title}</h4>
    <p id="artist">{artist}</p>
</div>