<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="grid-rows-20 grid grid-cols-1" style="width: 100vw; height: 100vh;">
	<div class="col-span-full text-center">Header thing here</div>

	<div class="row-span-19 grid grid-cols-8">
		<div>
			<nav class="grid text-center text-white gap-2">
				<a class="nav-link bg-blue-500 rounded-md" href="/">Home</a>
				<a class="nav-link bg-blue-500 rounded-md" href="/sliding-window">Sliding Window</a>
			</nav>
		</div>

		<main class="col-span-5 col-start-3">
			{@render children()}
		</main>
	</div>
</div>
