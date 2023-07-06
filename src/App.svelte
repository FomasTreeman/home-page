<script>
  import redirect from './lib/redirect';
  import log from './lib/log';
  import Crypto from './lib/Crypto.svelte';
  import Github from './lib/Github.svelte';
  import { onMount } from 'svelte';
  import hotkeys from 'hotkeys-js';

  let searchForm;
  let searchValue = '';
  let dropdown;
  let githubSearchForm;
  let isGithubSearch = false;

  function toggleGithubSearch() {
    isGithubSearch = !isGithubSearch;
    dropdown.click();
    isGithubSearch ? githubSearchForm.focus() : searchForm.focus();
  }

  function enterHandler(e) {
    e.preventDefault();
    if (e.key !== 'Enter') return;
    let url;
    log(searchValue[0]);
    switch (searchValue[0]) {
      case '/':
        {
          url = `https://www.phind.com/search?q=${encodeURIComponent(
            searchValue.slice(1)
          )}&source=searchbox`;
        }
        break;
      default: {
        url = `https://www.google.com/search?q=${encodeURIComponent(
          searchValue
        )}&sourceid=chrome&ie=UTF-8`;
      }
    }
    log(url);
    redirect(url);
  }

  onMount(() => {
    searchForm.focus();
    hotkeys('ctrl+g', function (event, handler) {
      event.preventDefault();
      event.stopPropagation();
      switch (handler.key) {
        case 'ctrl+g':
          console.log('ctrl+g');
          toggleGithubSearch();
          break;
        default:
      }
      return false;
    });
  });
</script>

<main>
  <Crypto />
  <Github bind:dropdown bind:githubSearchForm />
  <input
    style={searchValue[0] == '/' && 'border: 5px solid green;'}
    bind:this={searchForm}
    bind:value={searchValue}
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
    box-sizing: content-box;
  }
</style>
