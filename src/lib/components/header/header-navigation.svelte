<script lang="ts" module>
	interface HeaderNavigationLink {
		label: string;
		href: string;
	}

	interface HeaderNavigationClasses {
		container?: string;
		menu?: string;
		link?: string;
	}

	interface HeaderNavigationProps {
		links: HeaderNavigationLink[];
		classes?: HeaderNavigationClasses;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	const { links, classes }: HeaderNavigationProps = $props();
</script>

<div class={cn('min-w-fit', classes?.container)}>
	<ul class={cn('menu menu-horizontal menu-lg rounded-box bg-base-200', classes?.menu)}>
		{#each links as link}
			<li>
				<a href={link.href} class={cn('hover:underline', classes?.link)}>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
</div>
