<script lang="ts" module>
	import { type Snippet } from 'svelte';

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
	import { onMount } from 'svelte';

	const { children, classes }: HeaderProps = $props();

	let isHidden = $state(false);
	let currentY = 0;
	let scrollTimeout: ReturnType<typeof setTimeout>;

	const limit = { threshold: 10, delay: 10 };

	const handleScroll = () => {
		clearTimeout(scrollTimeout);
		scrollTimeout = setTimeout(() => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

			// Hiding the header automatically when a user starts scrolling down the page
			// and bringing the header back when a user might need it.
			isHidden = scrollTop > currentY && scrollTop > limit.threshold;

			currentY = scrollTop;
		}, limit.delay);
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(scrollTimeout);
		};
	});
</script>

<header
	class={cn(
		'fixed inset-x-0 top-0 z-90 transition-transform duration-300 ease-in-out',
		isHidden && '-translate-y-full ',
		classes?.header
	)}
>
	<div
		class={cn(
			'container mx-auto px-4',
			'flex h-16 items-center justify-between gap-4',
			classes?.container
		)}
	>
		{@render children()}
	</div>
</header>

<div class="mb-16"></div>
