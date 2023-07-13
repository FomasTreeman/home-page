<script>
  import { createEventDispatcher } from 'svelte';
  import Draggable from './Draggable.svelte';
  export let left, top, id, text;

  const dispatch = createEventDispatcher();

  function removeSelf() {
    dispatch('remove', {
      id: id,
    });
  }

  function updateText() {
    dispatch('update', {
      id: id,
      text: text,
    });
  }
</script>

<Draggable {left} {top}>
  <textarea on:input={updateText} bind:value={text} />
  <button on:click={removeSelf}> ❌ </button>
</Draggable>

<style>
  textarea {
    border-radius: 5px;
    background-color: yellow;
    width: 100px;
    height: 100px;
    color: black;
    padding: 1em;
  }

  button {
    width: 1rem;
    height: 1rem;
    font-size: x-small;
    padding: 0px;
    margin: 5px;
    border-radius: 0px;
    background-color: transparent;
    position: absolute;
    right: 0px;
  }
</style>
