<script lang="ts">
    import { supabase } from "$lib/server/supabaseClient";
    import { blur } from "svelte/transition";
    
    let data = $props();

</script>
<style lang="postcss">
    @reference "tailwindcss";
</style>

<header>
    <h3 id="title"></h3>
</header>