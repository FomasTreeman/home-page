<script>
  import { onMount } from 'svelte';

  export let list = [];
  export let filteredList = [];
  export let showList;

  onMount(async () => {
    const response = await chrome.bookmarks.getTree();
    const chromeBookmarks = response[0].children[0].children[0].children.map(
      (bookmark) => ({
        title: bookmark.title,
        url: bookmark.url,
      })
    );
    list = [...chromeBookmarks];
  });

  $: filteredList = [...list];
</script>

{#if showList}
  <div class="list">
    {#each filteredList as bookmark (bookmark.title)}
      <a href={bookmark.url}> {bookmark.title} </a>
    {/each}
  </div>
{/if}

<style>
  div.list {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    overflow-y: scroll;
    max-height: 75vh;
    background-color: rgba(45, 49, 53, 0.5);
    border-radius: 1em;
    padding: 0.5em;
    margin: 1em;
    overflow-x: hidden;
  }

  a {
    /* border: 1px solid black; */
    padding-inline: 0.5em;
    white-space: nowrap;
    color: rgb(115, 143, 175);
  }

  a:hover {
    text-decoration: underline;
  }
</style>
