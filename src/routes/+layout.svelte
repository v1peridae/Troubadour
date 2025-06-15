<script lang="ts">
	import { render } from "svelte/server";
    let { children } = $props();
    import "../app.css";
</script>

{@render children()}