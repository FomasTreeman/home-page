<script>
  import redirect from '../lib/redirect';

  export let searchForm;
  let searchValue = '';

  function enterHandler(e) {
    e.preventDefault();
    if (e.key !== 'Enter') return;
    const url = `https://www.phind.com/search?q=${encodeURIComponent(
      searchValue
    )}&source=searchbox`;
    redirect(url);
  }
</script>

<input
  style={searchValue[0] == '/' && 'border: 5px solid green;'}
  bind:this={searchForm}
  bind:value={searchValue}
  type="search"
  on:keyup={enterHandler}
  placeholder="Search phind.com for  ..."
/>

<style>
  input[type='search'] {
    padding: 1em;
    border-radius: 1em;
    border: none;
    width: 30vw;
    box-sizing: content-box;
  }
</style>
