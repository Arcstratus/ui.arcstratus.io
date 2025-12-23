<script lang="ts" module>
	interface HeaderHamburgerClasses {
		container?: string;
	}

	interface HeaderHamburgerLink {
		label: string;
		href: string;
	}

	interface HeaderHamburgerProps {
		links: HeaderHamburgerLink[];
		classes?: HeaderHamburgerClasses;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	const { links, classes }: HeaderHamburgerProps = $props();

	let open = $state(false);
</script>

<div class={cn('', classes?.container)}>TBD</div>
