<script lang="ts" module>
	import type { Snippet } from 'svelte';

	interface MainClasses {
		main?: string;
		container?: string;
	}

	interface MainProps {
		children: Snippet;
		classes?: MainClasses;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	const { children, classes }: MainProps = $props();
</script>

<main class={cn('relative w-full', classes?.main)}>
	<div class={cn('space-y-12', classes?.container)}>
		{@render children()}
	</div>
</main>
