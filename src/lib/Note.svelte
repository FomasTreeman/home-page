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

<Draggable {left} {top} noteId={id} on:posChange>
  <textarea spellcheck on:input={updateText} bind:value={text} />
  <button on:click={removeSelf}> ❌ </button>
</Draggable>

<style>
  textarea {
    border-radius: 4px;
    background-color: yellow;
    width: 150px;
    height: 150px;
    color: black;
    padding: 1em;
    border: none;
    box-shadow: 9px 11px 11px 0px rgba(0, 0, 0, 0.1),
      0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    resize: none;
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
