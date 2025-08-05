<script lang="ts">
    let {text, callBackFunction, color = "#cfcece"}: {text: string, callBackFunction?: any, color?: string} = $props();
</script>

<button type="button" class="bg-[{color}] rounded-4xl border-2 border-black p-3" onclick={callBackFunction}>
    {text}
</button>