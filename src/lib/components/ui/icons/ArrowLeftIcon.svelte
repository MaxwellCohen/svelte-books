<script lang="ts">
	import Icon from './Icon.svelte';

	let { class: className }: { class?: string } = $props();
</script>

<Icon class={className}>
	<path d="m12 19-7-7 7-7" />
	<path d="M19 12H5" />
</Icon>
