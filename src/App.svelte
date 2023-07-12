<script>
  import Crypto from './lib/Crypto.svelte';
  import Github from './lib/Github.svelte';
  import { onMount } from 'svelte';
  import hotkeys from 'hotkeys-js';
  import Bookmarks from './lib/Bookmarks.svelte';
  // @ts-ignore
  import Search from './lib/Search.svelte';
  import MainSearch from './lib/MainSearch.svelte';
  import Draggable from './lib/Draggable.svelte';
  import Note from './lib/Note.svelte';

  let innerWidth;
  let innerHeight;

  let searchForm;
  let githubSearchForm;
  let bookmarksSearchForm;
  let notes = [];
  // let focusedSearch = '';

  // function setFocus() {
  //   isGithubSearch = !isGithubSearch;
  //   dropdown.click();
  //   isGithubSearch ? githubSearchForm.focus() : searchForm.focus();
  // }

  const handleDoubleClick = (e) => {
    const newId = notes.length;
    notes = [...notes, { id: newId, left: e.clientX - 50, top: e.clientY }];
  };

  onMount(() => {
    searchForm.focus();

    window.addEventListener('dblclick', handleDoubleClick);

    // hotkeys('ctrl+g', function (event, handler) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   switch (handler.key) {
    //     case 'ctrl+g':
    //       console.log('ctrl+g');
    //       setFocus();
    //       break;
    //     default:
    //   }
    //   return false;
    // });
  });
</script>

<main>
  <div class="container">
    <Search
      bind:searchField={githubSearchForm}
      placeholder={'Github 👩‍💻'}
      comp={Github}
    />
    <Search
      bind:searchField={bookmarksSearchForm}
      placeholder={'Bookmarks 📌'}
      comp={Bookmarks}
    />
  </div>
  <Draggable top={innerHeight - 200} left={innerWidth - 200}>
    <Crypto />
  </Draggable>
  {#if notes.length}
    {#each notes as note}
      <Note left={note.left} top={note.top} id={note.id} bind:notes />
    {/each}
  {/if}
  <MainSearch bind:searchForm />
</main>

<svelte:window bind:innerWidth bind:innerHeight />

<style>
  div.container {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    display: flex;
    gap: 3rem;
    justify-content: space-between;
  }
</style>
