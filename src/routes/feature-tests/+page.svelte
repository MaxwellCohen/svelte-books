<script lang="ts">
	const features = [
		'css-inlining',
		'font-optimization',
		'image-pipeline',
		'caching',
		'route-prefetching',
		'islands',
		'render-modes',
		'reactivity',
		'bundle-analysis',
		'third-party-scripts',
		'multi-host-deployment'
	];
</script>

<div class="p-6">
	<h1>Feature tests</h1>
	<ul class="mt-4 list-disc pl-6">
		{#each features as id (id)}
			<li><a class="text-accent underline" href="/feature-tests/{id}">{id}</a></li>
		{/each}
	</ul>
</div>
