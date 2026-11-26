<script lang="ts">
	let { data } = $props();
</script>

<div class="p-6">
	<h1>render-modes: csr</h1>
	<p>Rendered at <span id="rendered-at">{data.renderedAt}</span></p>
</div>
