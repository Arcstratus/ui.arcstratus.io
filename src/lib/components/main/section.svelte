<script lang="ts" module>
	import type { Snippet } from 'svelte';

	interface SectionClasses {
		section?: string;
		container?: string;
	}

	interface SectionProps {
		children: Snippet;
		classes?: SectionClasses;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	const { children, classes }: SectionProps = $props();
</script>

<section class={cn('relative w-full', classes?.section)}>
	<div class={cn('container mx-auto px-4', classes?.container)}>
		{@render children()}
	</div>
</section>
