<script lang="ts" module>
	interface FooterCopyrightClasses {
		copyright?: string;
		title?: string;
	}

	interface FooterCopyrightProps {
		title: string;
		year: string;
		classes?: FooterCopyrightClasses;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	const { title, year, classes }: FooterCopyrightProps = $props();
</script>

<div class="">
	<h6 class={cn('text-sm text-base-content/60', classes?.copyright)}>
		© {year}
		<span class={cn('', classes?.title)}>{title}</span> All rights reserved.
	</h6>
</div>
