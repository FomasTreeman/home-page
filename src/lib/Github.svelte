<script>
  import { onMount } from 'svelte';
  import emojis from './emojis';

  export let list = [];
  export let filteredList = [];
  export let showList;

  function randomEmoji() {
    const randomIndex = Math.trunc(Math.random() * (emojis.length - 1));
    return emojis[randomIndex];
  }

  async function fetchRepos(isRetry = false) {
    // if (isRetry) githubRetryShow = false;
    try {
      fetch(`https://api.github.com/users/FomasTreeman/repos?per_page=100`, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: import.meta.env.VITE_GITHUB_TOKEN,
        },
      })
        .then((resp) => resp.json())
        .then(
          (json) =>
            (list = [
              ...json.map((repo) => ({
                title: repo.name,
                url: repo.html_url,
              })),
            ])
        );
    } catch (e) {
      console.error(e);
      // githubRetryShow = true;
    }
  }

  onMount(async () => {
    await fetchRepos();
  });

  $: {
    filteredList = [...list];
  }
</script>

{#if showList}
  <div class="list">
    {#each filteredList as repo (repo.title)}
      <a href={repo.url}>
        {repo.title}
        {randomEmoji()}
      </a>
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
