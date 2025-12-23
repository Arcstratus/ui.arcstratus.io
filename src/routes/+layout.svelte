<script lang="ts">
	import { Header } from '$lib/components/header';
	import './layout.css';

	const { children } = $props();
</script>

<Header classes={{ container: 'bg-red-500' }}>this is header</Header>

{@render children()}
