<script>
  import redirect from './lib/redirect';
  import log from './lib/log';
  import Crypto from './lib/Crypto.svelte';
  import Github from './lib/Github.svelte';
  import { onMount } from 'svelte';
  let searchForm;

  function enterHandler(e) {
    if (e.key !== 'Enter') return;
    const input = encodeURIComponent(e.target.value);
    let url;
    switch (input[0]) {
      case '/': {
        url = `https://www.phind.com/search?q=${input}&source=searchbox`;
      }
      default: {
        url = `https://www.google.com/search?q=${input}&sourceid=chrome&ie=UTF-8`;
      }
    }
    log(url);
    redirect(url);
  }

  onMount(() => {
    searchForm.focus();
    // listen for hotkeys and do fun things
  });
</script>

<main>
  <Crypto />
  <Github />
  <input
    bind:this={searchForm}
    type="search"
    on:keyup={enterHandler}
    placeholder="Search google or phind.com for  ..."
  />
</main>

<style>
  input[type='search'] {
    padding: 1em;
    border-radius: 1em;
    border: none;
    width: 30vw;
  }
</style>
