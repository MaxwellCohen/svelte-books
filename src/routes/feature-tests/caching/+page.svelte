<script lang="ts">
	let { data } = $props();
</script>

<div class="p-6">
	<h1>caching</h1>
	<p>Page rendered at <span id="rendered-at">{data.renderedAt}</span> (ISR on Vercel).</p>
	<p>
		<code>/feature-tests/caching/data</code> returns a timestamp with
		<code>cache-control: public, max-age=5, s-maxage=60</code> set via SvelteKit's
		<code>setHeaders</code>.
	</p>
</div>
