<script lang="ts">
	// `?worker&url` makes Vite bundle the entry (plus Svelte runtime) as a standalone ES module.
	import islandUrl from './island-entry.ts?worker&url';
	import IslandCounter from './IslandCounter.svelte';
	import StaticInfo from './StaticInfo.svelte';

	const props = { start: 0 };
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static, build-time asset URL -->
	{@html `<script type="module" src="${islandUrl}"></script>`}
</svelte:head>

<div class="p-6">
	<h1>islands</h1>
	<StaticInfo />
	<div data-island="counter" data-props={JSON.stringify(props)}>
		<IslandCounter {...props} />
	</div>
</div>
