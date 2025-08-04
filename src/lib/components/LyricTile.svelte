<script lang="ts">
    // TODO: add placeholder image
    let { title, artist, album_url = "missing_album_src", album_name="Unknown album" } : {title: string, artist: string, album_url?: string, album_name?: string} = $props();
</script>

<style lang="postcss">
</style>

<div id="main" class="">
    <img src={album_url} alt="The album cover for {album_name}">
    <h4 id="title">{title}</h4>
    <p id="artist">{artist}</p>
</div>