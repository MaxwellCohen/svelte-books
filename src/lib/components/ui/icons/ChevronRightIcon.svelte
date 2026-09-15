<script lang="ts">
	import Icon from './Icon.svelte';

	let { class: className }: { class?: string } = $props();
</script>

<Icon class={className}>
	<path d="m9 18 6-6-6-6" />
</Icon>
