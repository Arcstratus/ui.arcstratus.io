<script lang="ts" module>
	interface HeaderNavigationItem {
		label: string;
		href: string;
	}

	interface HeaderNavigationClasses {
		container?: string;
		list?: string;
		link?: string;
	}

	interface HeaderNavigationProps {
		navigation: HeaderNavigationItem[];
		classes?: HeaderNavigationClasses;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	const { navigation, classes }: HeaderNavigationProps = $props();
</script>

<div class={cn('min-w-fit', classes?.container)}>TBD</div>
