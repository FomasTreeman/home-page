<script>
  import Loading from './Loading.svelte';

  export let comp, searchField, placeholder;
  let list = [];
  let filteredList = [];
  let searchValue = '';
  let showList = false;

  $: console.log(list, '🔥', filteredList);
</script>

<section>
  <div class="nav">
    <input
      tabindex="0"
      type="search"
      bind:this={searchField}
      bind:value={searchValue}
      on:input={() =>
        (filteredList = [
          ...list.filter((item) =>
            item.title.toLowerCase().includes(searchValue)
          ),
        ])}
      on:focusin={() => (showList = true)}
      on:focusout={() => (showList = false)}
      {placeholder}
    /><button on:click={() => (showList = !showList)}> ↓ </button>
  </div>

  {#if list.length === 0}
    <Loading />
  {/if}

  <svelte:component
    this={comp}
    bind:searchValue
    bind:list
    bind:filteredList
    bind:showList
  />
</section>

<style>
  section {
    max-width: 250px;
  }

  div.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input {
    margin: 2em;
  }

  button {
    padding: 0.5em;
    border-radius: 0.5em;
    height: 25px;
    margin-right: 1.5em;
    line-height: 1;
  }
</style>
