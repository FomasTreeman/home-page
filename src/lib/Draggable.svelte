<script>
  import { createEventDispatcher } from 'svelte';

  export let left;
  export let top;
  let innerWidth = 0;
  let innerHeight = 0;
  export let noteId = 0;

  let moving = false;

  const dispatch = createEventDispatcher();

  function updateNotesPosition() {
    dispatch('posChange', {
      id: noteId,
      left,
      top,
    });
  }

  function onMouseDown() {
    moving = true;
  }

  function onMouseMove(e) {
    if (moving) {
      left += e.movementX / (innerWidth / 100);
      top += e.movementY / (innerHeight / 100);
    }
  }

  function onMouseUp() {
    moving == true && noteId != 0 ? updateNotesPosition() : '';
    moving = false;
  }
</script>

<section
  style="left: {left}%; top: {top}%;"
  on:mousedown={onMouseDown}
  class="draggable"
>
  <slot />
</section>

<svelte:window
  on:mouseup={onMouseUp}
  on:mousemove={onMouseMove}
  bind:innerHeight
  bind:innerWidth
/>

<style>
  .draggable {
    user-select: none;
    cursor: move;
    position: absolute;
  }
</style>
