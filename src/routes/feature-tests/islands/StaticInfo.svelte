<script lang="ts">
	// Static (server-only) component. Its code must never reach the browser.
	const marker = 'FT_STATIC_ONLY_MARKER_9f3b2c';
	const facts = ['Rendered on the server', 'Ships zero JavaScript'];
</script>

<section id="ft-static" data-marker={marker}>
	<h2>Static component</h2>
	<ul>
		{#each facts as fact (fact)}
			<li>{fact} ({marker.length})</li>
		{/each}
	</ul>
</section>
