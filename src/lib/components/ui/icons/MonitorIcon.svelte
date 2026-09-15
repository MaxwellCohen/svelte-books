<script lang="ts">
	import Icon from './Icon.svelte';

	let { class: className }: { class?: string } = $props();
</script>

<Icon class={className}>
	<rect width="20" height="14" x="2" y="3" rx="2" />
	<path d="M8 21h8" />
	<path d="M12 17v4" />
</Icon>
