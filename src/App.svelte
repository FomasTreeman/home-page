<script>
  import redirect from './lib/redirect';
  import log from './lib/log';
  import Crypto from './lib/Crypto.svelte';
  import Github from './lib/Github.svelte';

  function enterHandler(e) {
    if (e.key !== 'Enter') return;
    const phindURL = `https://www.phind.com/search?q=${encodeURIComponent(
      e.target.value
    )}&source=searchbox`;
    log(phindURL);
    redirect(phindURL);
  }
</script>

<main>
  <Crypto />
  <Github />
  <input
    type="search"
    on:keyup={enterHandler}
    placeholder="Search phind.com for  ..."
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
