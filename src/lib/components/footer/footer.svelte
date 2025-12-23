<script lang="ts" module>
	import type { Snippet } from 'svelte';

	interface FooterClasses {
		footer?: string;
		container?: string;
	}

	interface FooterProps {
		classes?: FooterClasses;
		children: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	const { children, classes }: FooterProps = $props();
</script>

<footer class={cn('relative w-full', classes?.footer)}>
	<div
		class={cn(
			'container mx-auto px-4',
			'flex min-h-16 items-center justify-between gap-4',
			classes?.container
		)}
	>
		{@render children()}
	</div>
</footer>
