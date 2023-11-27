<script>
  import Crypto from "./lib/Crypto.svelte";
  import Github from "./lib/Github.svelte";
  import { onMount } from "svelte";
  import hotkeys from "hotkeys-js";
  import Bookmarks from "./lib/Bookmarks.svelte";
  import Search from "./lib/Search.svelte";
  import MainSearch from "./lib/MainSearch.svelte";
  import Draggable from "./lib/Draggable.svelte";
  import Note from "./lib/Note.svelte";
  import Clock from "./lib/Clock.svelte";
  import Age from "./lib/Age.svelte";

  let innerWidth;
  let innerHeight;

  let searchForm;
  let githubSearchForm;
  let bookmarksSearchForm;
  let notes = {};
  let loaded = false;
  let imageUrl;
  // let focusedSearch = '';

  // function setFocus() {
  //   isGithubSearch = !isGithubSearch;
  //   dropdown.click();
  //   isGithubSearch ? githubSearchForm.focus() : searchForm.focus();
  // }

  const handleDoubleClick = (e) => {
    console.log("yay");
    const newId = crypto.randomUUID();
    notes = {
      ...notes,
      [newId]: {
        left: e.clientX - 50,
        top: e.clientY,
        text: "",
        colour: "#ffff00",
        size: "medium",
      },
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
      console.log("update ...");
    });

  $: chrome.storage.local
    .get("imageUrl")
    .then((store) => (imageUrl = store.imageUrl));

  $: document.body.style.backgroundImage = `url(${imageUrl})`;

  onMount(async () => {
    window.addEventListener("dblclick", handleDoubleClick);

    const local = await chrome.storage.local.get(["notes"]);
    if (Object.keys(local).length !== 0) {
      const localNotes = JSON.parse(local.notes);
      notes = { ...localNotes };
    }
    console.log("loaded");
    loaded = true;

    // hotkeys("command+s", function (event, handler) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   switch (handler.key) {
    //     case "command+s":
    //       searchForm.focus();
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
      placeholder={"Github 👩‍💻"}
      comp={Github}
    />
    <Search
      bind:searchField={bookmarksSearchForm}
      placeholder={"Bookmarks 📌"}
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
        colour={note.colour}
        size={note.size}
        {id}
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
