<script lang="ts">
	import { Section } from '$lib/components/main';
</script>

<Section>
	<h1>Welcome to your library project</h1>
	<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>
</Section>

<Section classes={{ container: 'space-y-8' }}>
	{#each Array(10) as _, index}
		<div class="flex h-96 items-end justify-end bg-base-100">
			{index}
		</div>
	{/each}
</Section>
