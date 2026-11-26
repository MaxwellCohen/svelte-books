<script lang="ts">
	let { start = 0 }: { start?: number } = $props();
	let count = $state((() => start)());
</script>

<button id="ft-island-button" class="rounded border px-3 py-1" onclick={() => (count += 1)}>
	Island clicks: <span id="ft-island-count">{count}</span>
</button>
