<script lang="ts" module>
	import type { Snippet } from 'svelte';

	interface FooterBrandClasses {
		container?: string;
		link?: string;
		title?: string;
	}

	interface FooterBrandProps {
		title: string;
		icon?: Snippet;
		href?: string;
		classes?: FooterBrandClasses;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	const { icon, title, href = '/', classes }: FooterBrandProps = $props();
</script>

<div class={cn('flex items-center gap-2', classes?.container)}>
	{#if icon}
		{@render icon()}
	{/if}

	{#if href}
		<a {href} class={cn('hover:underline', classes?.link)}>
			<h1 class={cn('text-xl font-bold', classes?.title)}>{title}</h1>
		</a>
	{:else}
		<h1 class={cn('text-xl font-bold', classes?.title)}>{title}</h1>
	{/if}
</div>
