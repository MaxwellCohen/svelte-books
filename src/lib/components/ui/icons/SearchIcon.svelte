<script lang="ts">
	import Icon from './Icon.svelte';

	let { class: className }: { class?: string } = $props();
</script>

<Icon class={className}>
	<circle cx="11" cy="11" r="8" />
	<path d="m21 21-4.3-4.3" />
</Icon>
