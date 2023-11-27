<script>
  import { createEventDispatcher } from 'svelte';

  export let showSettings;

  const dispatch = createEventDispatcher();

  function resetPos() {
    dispatch('resetPos');
  }
</script>

<main>
  <button class="return" on:click={() => (showSettings = false)}> 🔙 </button>
  <button on:click={resetPos}>🔄 pull notes to 0,0 </button>
</main>

<style>
  main {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: grey;
    padding: 1rem;
    opacity: 0.95;
    border-radius: 1rem;
    gap: 1rem;
    min-width: 10rem;
    min-height: 10rem;
  }

  button.return {
    width: fit-content;
    background-color: blanchedalmond;
  }
</style>
