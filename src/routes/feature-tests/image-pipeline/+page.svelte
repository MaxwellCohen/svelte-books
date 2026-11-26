<!-- 1st-party: @sveltejs/enhanced-img generates AVIF/WebP variants, srcset widths and width/height at build time. -->
<div class="p-6">
	<h1>image-pipeline</h1>
	<enhanced:img
		id="ft-hero"
		src="./photo.jpg"
		sizes="(min-width: 1024px) 800px, 100vw"
		alt="Hero"
		fetchpriority="high"
	/>
	<div style="height: 3000px" aria-hidden="true"></div>
	<enhanced:img
		id="ft-offscreen"
		src="./photo.jpg"
		sizes="(min-width: 1024px) 800px, 100vw"
		alt="Offscreen"
		loading="lazy"
	/>
</div>
