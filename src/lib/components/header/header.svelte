<script lang="ts" module>
	import type { Snippet } from 'svelte';

	interface HeaderProps {
		children: Snippet;
	}
</script>

<script lang="ts">
	const { children }: HeaderProps = $props();
</script>

<header class="fixed inset-x-0 top-0 z-50">
	<div class="container mx-auto h-16 overflow-hidden">
		{@render children()}
	</div>
</header>

<div class="h-16"></div>
