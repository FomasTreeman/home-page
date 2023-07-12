<script>
  import redirect from '../lib/redirect';
  import log from '../lib/log';

  export let searchForm;
  let searchValue = '';

  function enterHandler(e) {
    e.preventDefault();
    if (e.key !== 'Enter') return;
    const url = `https://www.phind.com/search?q=${encodeURIComponent(
      searchValue.slice(1)
    )}&source=searchbox`;
    // switch (searchValue[0]) {
    //   case '/':
    //     {
    //       url = `https://www.phind.com/search?q=${encodeURIComponent(
    //         searchValue.slice(1)
    //       )}&source=searchbox`;
    //     }
    //     break;
    //   default: {
    //     url = `https://www.google.com/search?q=${encodeURIComponent(
    //       searchValue
    //     )}&sourceid=chrome&ie=UTF-8`;
    //   }
    // }
    redirect(url);
  }
</script>

<input
  style={searchValue[0] == '/' && 'border: 5px solid green;'}
  bind:this={searchForm}
  bind:value={searchValue}
  type="search"
  on:keyup={enterHandler}
  placeholder="Search google or phind.com for  ..."
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
