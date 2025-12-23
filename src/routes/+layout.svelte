<script lang="ts">
	import { Footer, FooterBrand, FooterCopyright } from '$lib/components/footer';
	import {
		Header,
		HeaderActions,
		HeaderBrand,
		HeaderHamburger,
		HeaderNavigation
	} from '$lib/components/header';
	import { Main } from '$lib/components/main';
	import {
		IconBookmarkOff,
		IconHome,
		IconLayoutCollage,
		IconSettingsOff
	} from '@tabler/icons-svelte';
	import './layout.css';

	const { children } = $props();

	const links = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Contact', href: '/contact' }
	];

	const dockLinks = [
		{ label: 'home', href: '/', icon: IconHome },
		{ label: 'bookmark', href: '/bookmark', icon: IconBookmarkOff },
		{ label: 'setting', href: '/setting', icon: IconSettingsOff }
	];
</script>

<div class="grid h-dvh w-full grid-rows-[auto_1fr_auto]">
	<Header classes={{ header: 'bg-base-200 text-base-content' }}>
		<HeaderBrand title="Arcstratus" href="/">
			{#snippet icon()}
				<IconLayoutCollage size={36} />
			{/snippet}
		</HeaderBrand>

		<HeaderNavigation classes={{ container: 'hidden lg:block flex-grow' }} {links} />

		<HeaderActions>
			<HeaderHamburger classes={{ drawer: 'drawer-end block lg:hidden' }} {links} />
		</HeaderActions>
	</Header>

	<Main classes={{ main: 'bg-base-200 text-base-content' }}>
		{@render children()}
	</Main>

	<Footer classes={{ footer: 'bg-base-300 text-base-content' }}>
		<FooterBrand title="Arcstratus" href="/" />
		<FooterCopyright
			title="Arcstratus Co., Ltd."
			year="2025"
			classes={{ title: 'underline underline-offset-4' }}
		/>
	</Footer>
</div>
