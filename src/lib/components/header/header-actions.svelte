<script lang="ts" module>
	import { type Snippet } from 'svelte';

	interface HeaderActionsClasses {
		container?: string;
	}

	interface HeaderActionsProps {
		children: Snippet;
		classes?: HeaderActionsClasses;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	const { children, classes }: HeaderActionsProps = $props();
</script>

<div class={cn('flex h-full items-center gap-2', classes?.container)}>
	{@render children()}
</div>
