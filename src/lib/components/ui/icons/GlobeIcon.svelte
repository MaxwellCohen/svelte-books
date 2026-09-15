<script lang="ts">
	import Icon from './Icon.svelte';

	let { class: className }: { class?: string } = $props();
</script>

<Icon class={className}>
	<circle cx="12" cy="12" r="10" />
	<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
	<path d="M2 12h20" />
</Icon>
