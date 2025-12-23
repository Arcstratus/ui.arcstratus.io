<script lang="ts" module>
	interface HeaderHamburgerClasses {
		drawer?: string;
		svg?: string;
	}

	interface HeaderHamburgerLink {
		label: string;
		href: string;
		children?: HeaderHamburgerLink[];
	}

	interface HeaderHamburgerProps {
		links: HeaderHamburgerLink[];
		classes?: HeaderHamburgerClasses;
	}
</script>

<script lang="ts">
	import IconMenu from '$lib/components/animated/icon-menu.svelte';
	import { cn } from '$lib/utils';

	const { links, classes }: HeaderHamburgerProps = $props();

	let checked = $state(false);
	const onclose = () => (checked = false);
</script>

{#snippet submenu(link: HeaderHamburgerLink)}
	<li>
		<a href={link.href} onclick={onclose}>{link.label}</a>
		{#if link.children}
			<ul class="before:bg-primary before:opacity-100">
				{#each link.children as child}
					{@render submenu(child)}
				{/each}
			</ul>
		{/if}
	</li>
{/snippet}

<div class={cn('drawer z-10', classes?.drawer)}>
	<input id="header-hamburger" type="checkbox" class="drawer-toggle" bind:checked />
	<div class="drawer-content">
		<!-- Page content here -->
		<label for="header-hamburger" class="drawer-button">
			<IconMenu {checked} classes={{ svg: classes?.svg }} />
		</label>
	</div>
	<div class="drawer-side -z-10">
		<label for="header-hamburger" aria-label="close sidebar" class="drawer-overlay"></label>

		<ul class="menu min-h-full w-full menu-lg bg-base-200 p-4 pt-16 text-base-content">
			<!-- Sidebar content here -->
			{#each links as link}
				{@render submenu(link)}
			{/each}
		</ul>
	</div>
</div>
