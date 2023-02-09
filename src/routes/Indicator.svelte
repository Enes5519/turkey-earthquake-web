<span class="indicator">
	<span class="animate-ball" />
	<span class="stay-ball" />
</span>

<style>
	@keyframes ping {
		75%,
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	.indicator {
		display: flex;
		flex-shrink: 0;
		height: 1rem;
		width: 1rem;
		position: relative;
	}

	.animate-ball {
		background: #b71c1c;
		position: absolute;
		height: 100%;
		width: 100%;
		border-radius: 50%;
		opacity: 0.75;
		animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	.stay-ball {
		background: #b71c1c;
		height: 100%;
		width: 100%;
		border-radius: 50%;
	}
</style>
