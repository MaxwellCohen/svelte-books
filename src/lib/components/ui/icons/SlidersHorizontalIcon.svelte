<script lang="ts">
	import Icon from './Icon.svelte';

	let { class: className }: { class?: string } = $props();
</script>

<Icon class={className}>
	<path d="M10 5H3" />
	<path d="M12 19H3" />
	<path d="M14 3v4" />
	<path d="M16 17v4" />
	<path d="M21 12H3" />
	<path d="M21 5h-7" />
	<path d="M21 19h-5" />
	<path d="M8 10v4" />
</Icon>
