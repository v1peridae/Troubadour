<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import "../app.css";
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');  
	@reference "tailwindcss";
</style>

<svelte:head>
	<title>Troubadour</title>
</svelte:head>

<div class="container" style="padding: 0">
	<slot />
</div>