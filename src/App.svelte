<script>
  import Crypto from './lib/Crypto.svelte';
  import Github from './lib/Github.svelte';
  import { onMount } from 'svelte';
  // import hotkeys from 'hotkeys-js';
  import Bookmarks from './lib/Bookmarks.svelte';
  // @ts-ignore
  import Search from './lib/Search.svelte';
  import MainSearch from './lib/MainSearch.svelte';
  import Draggable from './lib/Draggable.svelte';
  import Note from './lib/Note.svelte';
  import Clock from './lib/Clock.svelte';
  import Age from './lib/Age.svelte';

  let innerWidth;
  let innerHeight;

  let searchForm;
  let githubSearchForm;
  let bookmarksSearchForm;
  let notes = {};
  let loadedLocal = false;
  // let focusedSearch = '';

  // function setFocus() {
  //   isGithubSearch = !isGithubSearch;
  //   dropdown.click();
  //   isGithubSearch ? githubSearchForm.focus() : searchForm.focus();
  // }

  const handleDoubleClick = (e) => {
    const newId = crypto.randomUUID();
    notes = {
      ...notes,
      [newId]: { left: e.clientX - 50, top: e.clientY, text: '' },
    };
  };

  function removeNote(e) {
    const { id } = e.detail;
    delete notes[id];
    notes = { ...notes };
  }

  function updateNote(e) {
    const { id, text } = e.detail;
    notes = { ...notes, [id]: { ...notes[id], text } };
  }

  function updateNoteMovement(e) {
    const { id, left, top } = e.detail;
    notes = { ...notes, [id]: { ...notes[id], left, top } };
  }

  $: if (loadedLocal)
    chrome.storage.local.set({ notes: JSON.stringify(notes) }).then(() => {
      console.log('update ...');
    });

  async function getRandomImage() {
    const response = await fetch(
      'https://api.unsplash.com/photos/random?query=nature',
      {
        headers: {
          'Accept-Version': 'v1',
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_TOKEN}`,
        },
      }
    );
    const json = await response.json();
    return json.urls.full;
  }

  onMount(async () => {
    getRandomImage().then(
      (bg) => (document.body.style.backgroundImage = `url(${bg})`)
    );

    const local = await chrome.storage.local.get(['notes']);
    const localNotes = JSON.parse(local.notes);
    notes = { ...localNotes };
    loadedLocal = true;

    window.addEventListener('dblclick', handleDoubleClick);

    // hotkeys('ctrl+g', function (event, handler) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   switch (handler.key) {
    //     case 'ctrl+g':
    //       setFocus();
    //       break;
    //     default:
    //   }
    //   return false;
    // });
  });
</script>

<main>
  <Age />
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
  <Clock />
  <Draggable top={innerHeight - 200} left={innerWidth - 200}>
    <Crypto />
  </Draggable>
  {#if notes}
    {#each Object.entries(notes) as [id, note] (id)}
      <Note
        left={note.left}
        top={note.top}
        {id}
        text={note.text}
        on:remove={removeNote}
        on:update={updateNote}
        on:posChange={updateNoteMovement}
      />
    {/each}
  {/if}
  <MainSearch />
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
