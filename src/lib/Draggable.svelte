<script>
  export let left;
  export let top;

  let moving = false;

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
    border: solid 1px grey;
    border-radius: 1rem;
    padding: 0.5rem;
    position: absolute;
  }
</style>
