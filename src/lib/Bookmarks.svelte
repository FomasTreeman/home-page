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
    {#each filteredList as bookmark}
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
  }

  a {
    /* border: 1px solid black; */
    padding-inline: 0.5em;
    overflow-wrap: break-word;
    max-width: 200px;
  }
</style>
