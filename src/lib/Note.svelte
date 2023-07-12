<script>
  import Draggable from './Draggable.svelte';
  export let left, top, id, notes;

  function removeSelf(id) {
    const notesWithoutId = notes.filter((note) => note.id != id);
    notes = [...notesWithoutId];
  }
</script>

<Draggable {left} {top}>
  <textarea />
  <button on:click={() => removeSelf(id)}> ❌ </button>
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
