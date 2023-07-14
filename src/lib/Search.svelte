<script>
  import Loading from './Loading.svelte';

  export let comp, searchField, placeholder;
  let list = [];
  let filteredList = [];
  let searchValue = '';
  let showList = false;
</script>

<section
  on:mouseleave={() => (showList = false)}
  on:mouseenter={() => (showList = false)}
>
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
      on:keyup={(e) => {
        if (e.key == 'Enter') window.location.assign(filteredList[0].url);
      }}
      on:focusin={() => (showList = true)}
      on:click={() => (showList = true)}
      {placeholder}
    /><button on:click={() => (showList = !showList)}> ↓ </button>
  </div>

  {#if list.length === 0}
    <Loading />
  {/if}

  <!-- probably bad practice should use event dispatch and normal slot component -->
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
    max-width: 260px;
  }

  div.nav {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: rgba(45, 49, 53, 0.5);
    border-radius: 1em;
    padding: 0.5em;
    margin: 1em;
    width: 215px;
  }

  input {
    margin: 1em;
  }

  button {
    padding: 0.5em;
    border-radius: 0.5em;
    height: 25px;
    line-height: 0;
  }
</style>
