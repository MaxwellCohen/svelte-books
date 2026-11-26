<svelte:head>
	<!-- Stand-in third-party script (static/fake-third-party.js), run in Partytown's web worker. -->
	<script type="text/partytown" src="/fake-third-party.js"></script>
</svelte:head>

<div class="p-6">
	<h1>third-party-scripts</h1>
	<p>The stand-in vendor script runs off the main thread via Partytown.</p>
</div>
