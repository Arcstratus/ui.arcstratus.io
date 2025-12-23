<script lang="ts" module>
	import type { Snippet } from 'svelte';

	interface HeaderBrandClasses {
		link?: string;
		title?: string;
		container?: string;
		logo?: string;
	}

	interface HeaderBrandProps {
		icon?: Snippet;
		title: string;
		href?: string;
		classes?: HeaderBrandClasses;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	const { icon, title, href = '/', classes }: HeaderBrandProps = $props();
</script>

<div class={cn('flex items-center gap-2', classes?.container)}>
	{#if icon}
		{@render icon()}
	{/if}

	{#if href}
		<a {href} class={cn('', classes?.link)}>
			<h1 class={cn('text-2xl font-bold', classes?.title)}>{title}</h1>
		</a>
	{:else}
		<h1 class={cn('text-2xl font-bold', classes?.title)}>{title}</h1>
	{/if}
</div>
