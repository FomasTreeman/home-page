<script>
  import Crypto from './lib/Crypto.svelte';
  import Github from './lib/Github.svelte';
  import { onMount } from 'svelte';
  import hotkeys from 'hotkeys-js';
  import Bookmarks from './lib/Bookmarks.svelte';
  import Search from './lib/Search.svelte';
  import MainSearch from './lib/MainSearch.svelte';
  import Draggable from './lib/Draggable.svelte';
  import Note from './lib/Note.svelte';
  import Clock from './lib/Clock.svelte';
  import Age from './lib/Age.svelte';
  import Settings from './lib/Settings.svelte';

  let innerWidth;
  let innerHeight;

  let searchForm;
  let githubSearchForm;
  let bookmarksSearchForm;
  let notes = {};
  let showSettings = false;
  let loaded = false;
  // let focusedSearch = '';

  // function setFocus() {
  //   isGithubSearch = !isGithubSearch;
  //   dropdown.click();
  //   isGithubSearch ? githubSearchForm.focus() : searchForm.focus();
  // }

  const handleDoubleClick = (e) => {
    console.log('yay');
    const newId = crypto.randomUUID();
    notes = {
      ...notes,
      [newId]: {
        left: (e.clientX - 100) / (innerWidth / 100),
        top: e.clientY / (innerHeight / 100),
        text: '',
        colour: '#ffff00',
        size: 'medium',
      },
    };
  };

  function resetPos() {
    console.log('reset ...');
    for (const key of Object.keys(notes)) {
      console.log(key);
      notes[key].left = 0;
      notes[key].top = 0;
    }
    notes = { ...notes };
  }

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

  function updateNoteColour(e) {
    const { id, colour } = e.detail;
    notes = { ...notes, [id]: { ...notes[id], colour } };
  }

  function updateNoteSize(e) {
    const { id, size } = e.detail;
    notes = { ...notes, [id]: { ...notes[id], size } };
  }

  $: if (loaded)
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
    window.addEventListener('dblclick', handleDoubleClick);

    getRandomImage().then(
      (bg) => (document.body.style.backgroundImage = `url(${bg})`)
    );

    const local = await chrome.storage.local.get(['notes']);
    if (Object.keys(local).length !== 0) {
      const localNotes = JSON.parse(local.notes);
      notes = { ...localNotes };
    }
    console.log('loaded');
    loaded = true;

    hotkeys('command+s', function (event, handler) {
      event.preventDefault();
      event.stopPropagation();
      switch (handler.key) {
        case 'command+s':
          searchForm.focus();
          break;
        default:
      }
      return false;
    });
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
        {id}
        left={note.left}
        top={note.top}
        colour={note.colour}
        size={note.size}
        text={note.text}
        on:remove={removeNote}
        on:update={updateNote}
        on:posChange={updateNoteMovement}
        on:updateColour={updateNoteColour}
        on:updateSize={updateNoteSize}
      />
    {/each}
  {/if}
  <MainSearch bind:searchForm />
  {#if showSettings}
    <Settings on:resetPos={resetPos} bind:showSettings />
  {/if}
  <button class="settings" on:click={() => (showSettings = !showSettings)}
    >⚙️</button
  >
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

  button.settings {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
</style>
