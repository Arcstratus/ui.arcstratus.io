<script lang="ts" module>
	import type { Snippet } from 'svelte';

	interface HeaderClasses {
		header?: string;
		container?: string;
	}

	interface HeaderProps {
		children: Snippet;
		classes?: HeaderClasses;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	const { children, classes }: HeaderProps = $props();
</script>

<header class={cn('fixed inset-x-0 top-0 z-50', classes?.header)}>
	<div class={cn('container mx-auto h-16 overflow-hidden', classes?.container)}>
		{@render children()}
	</div>
</header>

<div class="h-16"></div>
