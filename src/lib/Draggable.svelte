<script>
  import { createEventDispatcher } from "svelte";

  export let left;
  export let top;
  export let noteId = 0;

  let moving = false;

  const dispatch = createEventDispatcher();

  function updateNotesPosition() {
    dispatch("posChange", {
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
      left += e.movementX;
      top += e.movementY;
    }
  }

  function onMouseUp() {
    moving == true && noteId != 0 ? updateNotesPosition() : "";
    moving = false;
  }
</script>

<section
  on:mousedown={onMouseDown}
  style="left: {left}px; top: {top}px;"
  class="draggable"
>
  <slot />
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
  .draggable {
    user-select: none;
    cursor: move;
    position: absolute;
  }
</style>
