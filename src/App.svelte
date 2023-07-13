<script>
  import Crypto from './lib/Crypto.svelte';
  import Github from './lib/Github.svelte';
  import { onMount, createEventDispatcher } from 'svelte';
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
  let loadedLocal = false;
  // let focusedSearch = '';

  // function setFocus() {
  //   isGithubSearch = !isGithubSearch;
  //   dropdown.click();
  //   isGithubSearch ? githubSearchForm.focus() : searchForm.focus();
  // }

  const handleDoubleClick = (e) => {
    const newId = notes.length;
    notes = [
      ...notes,
      { id: newId, left: e.clientX - 50, top: e.clientY, text: '' },
    ];
    // chrome.storage.local.set({ notes: JSON.stringify(notes) }).then(() => {
    //   console.log('update ...');
    // });
  };

  function removeNote(e) {
    console.log('remove');
    const notesWithoutId = notes.filter((note) => note.id != e.detail.id);
    notes = [...notesWithoutId];
  }

  function updateNote(e) {
    const noteIndex = notes.findIndex((note) => note.id == e.detail.id);
    notes[noteIndex].text = e.detail.text;
    notes = [...notes];
  }

  // update notes on movement with dispatch in draggable
  // ! problem being would break things in crypto draggable
  // function moveNote(e) {
  // }

  $: if (loadedLocal)
    chrome.storage.local.set({ notes: JSON.stringify(notes) }).then(() => {
      console.log('update ...');
    });

  onMount(async () => {
    console.log('App mounted');

    searchForm.focus();

    const local = await chrome.storage.local.get(['notes']);
    const localNotes = JSON.parse(local.notes);
    notes = [...localNotes];
    console.log('reloaded');
    loadedLocal = true;

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
    {#each notes as note (note.id)}
      <Note
        left={note.left}
        top={note.top}
        id={note.id}
        text={note.text}
        on:remove={removeNote}
        on:update={updateNote}
      />
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
