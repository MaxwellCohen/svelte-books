<script lang="ts">
	import Icon from './Icon.svelte';

	let { class: className }: { class?: string } = $props();
</script>

<Icon class={className}>
	<path d="M4 9h16" />
	<path d="M4 15h16" />
	<path d="M10 3 8 21" />
	<path d="M16 3l-2 18" />
</Icon>
