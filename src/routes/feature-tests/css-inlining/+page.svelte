<!-- 1st-party: `inlineStyleThreshold: Infinity` in vite.config.ts inlines this route's CSS. -->
<div class="ft-css-inline-marker">
	<h1>css-inlining</h1>
	<p>This box is styled by component CSS that SvelteKit inlines into the HTML.</p>
</div>

<style>
	.ft-css-inline-marker {
		margin: 1.5rem;
		padding: 1rem;
		border: 3px dashed rgb(1, 2, 3);
	}
</style>
