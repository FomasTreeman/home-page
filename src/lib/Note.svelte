<script>
  import { createEventDispatcher } from 'svelte';
  import Draggable from './Draggable.svelte';

  export let left,
    top,
    id,
    text,
    colour = '#ffff00',
    size = 'medium';
  let isShowOptions = false;

  const dispatch = createEventDispatcher();

  function removeSelf() {
    dispatch('remove', {
      id,
    });
  }

  function updateText() {
    dispatch('update', {
      id,
      text,
    });
  }

  $: dispatch('updateColour', {
    id,
    colour,
  });

  $: dispatch('updateSize', {
    id,
    size,
  });
</script>

<Draggable {left} {top} noteId={id} on:posChange>
  <textarea
    style="background-color: {colour}"
    class={size}
    on:change={updateText}
    bind:value={text}
  />
  <button class="remove" on:click={removeSelf}> ❌ </button>
  <button class="options" on:click={() => (isShowOptions = !isShowOptions)}>
    ⚙️
  </button>
  {#if isShowOptions}
    <div class="options">
      <input type="color" bind:value={colour} />
      <label for="large"> L </label>
      <input
        id="large"
        type="radio"
        name="size"
        bind:group={size}
        value="large"
      />
      <label for="medium"> M </label>
      <input
        id="medium"
        type="radio"
        name="size"
        bind:group={size}
        value="medium"
      />
      <label for="small"> S </label>
      <input
        id="small"
        type="radio"
        name="size"
        bind:group={size}
        value="small"
      />
    </div>
  {/if}
</Draggable>

<style>
  textarea {
    border-radius: 4px;
    width: 10rem;
    height: 10rem;
    color: black;
    padding: 1em;
    padding-top: 1.7em;
    border: none;
    box-shadow: 9px 11px 11px 0px rgba(0, 0, 0, 0.1),
      0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    resize: none;
  }

  .large {
    width: 15rem;
    height: 10rem;
  }

  .medium {
    width: 10rem;
    height: 10rem;
  }
  .small {
    width: 7.5rem;
    height: 7.5rem;
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

  button.options {
    top: 0px;
    right: 16px;
  }

  div.options {
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: absolute;
    right: -3rem;
    bottom: 5px;
    background-color: black;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  input[type='color'] {
    background-color: #00000085;
    width: 25px;
    height: 25px;
    border: none;
  }
</style>
