<script lang="ts">
	// 1st-party runes: the component script runs once; `$state` updates only the bound text node.
	const w = globalThis as typeof globalThis & { __ftRenderCount?: number };
	w.__ftRenderCount = (w.__ftRenderCount ?? 0) + 1;
	const renderCount = w.__ftRenderCount;

	let count = $state(0);
</script>

<p>Count: <span id="ft-count">{count}</span></p>
<p>Component script runs: <span id="ft-renders">{renderCount}</span></p>
<button id="ft-increment" class="rounded border px-3 py-1" onclick={() => (count += 1)}>
	Increment
</button>
