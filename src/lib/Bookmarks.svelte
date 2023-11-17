<script>
  import { onMount } from "svelte";

  export let list = [];
  export let filteredList = [];
  export let showList;

  onMount(async () => {
    const response = await chrome.bookmarks.getTree();
    const chromeBookmarks = response[0].children[0].children.map(
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
    align-items: flex-start;
    overflow-y: scroll;
    max-height: 75vh;
    gap: 0.5rem;
    background-color: #2d3135d9;
    border-radius: 1em;
    padding: 0.5em;
    margin: 1em;
    overflow-x: hidden;
    padding-block: 0.6rem;
  }

  a {
    padding-inline: 0.5em;
    white-space: nowrap;
    color: white;
    line-height: normal;
  }
  a:hover {
    text-decoration: underline;
  }
</style>
