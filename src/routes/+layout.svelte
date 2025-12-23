<script lang="ts">
	import { Header } from '$lib/components/header';
	import './layout.css';

	const { children } = $props();
</script>

<Header>this is header</Header>

{@render children()}
