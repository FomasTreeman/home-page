<script>
  import { onMount } from 'svelte';
  import emojis from './emojis';

  export let dropdown;
  export let githubSearchForm;
  let repos = [];
  let filteredRepos = [];
  let repoSearch = '';
  let showList = false;
  let githubRetryShow = false;

  function randomEmoji() {
    const randomIndex = Math.trunc(Math.random() * (emojis.length - 1));
    return emojis[randomIndex];
  }

  function search(e) {
    filteredRepos = [
      ...repos.filter((repo) => repo.name.toLowerCase().includes(repoSearch)),
    ];
  }

  async function fetchRepos(isRetry = false) {
    if (isRetry) githubRetryShow = false;
    try {
      fetch(`https://api.github.com/users/FomasTreeman/repos?per_page=100`, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: import.meta.env.TOKEN,
        },
      })
        .then((resp) => resp.json())
        .then(
          (json) =>
            (repos = [
              ...json.map((repo) => ({
                name: repo.name,
                url: repo.html_url,
              })),
            ])
        );
    } catch (e) {
      githubRetryShow = true;
    }
  }

  onMount(() => {
    fetchRepos();
  });

  $: {
    filteredRepos = [...repos];
  }
</script>

<section>
  <div class="nav">
    <input
      tabindex="0"
      type="search"
      bind:this={githubSearchForm}
      bind:value={repoSearch}
      on:input={search}
      placeholder="Github 👩‍💻"
    /><button bind:this={dropdown} on:click={() => (showList = !showList)}>
      ↓
    </button>
    {#if githubRetryShow}
      <button on:click={() => fetchRepos(true)}>failed fetch</button>
    {/if}
  </div>
  {#if repos.length === 0}
    <video loop>
      <source src="/loading.mp4" type="video/mp4" />
      <track kind="captions" />
    </video>
  {/if}
  {#if showList}
    <div class="list">
      {#each filteredRepos as repo}
        <div>
          <button>📌</button>
          <!-- pin button -->
          <button>🫥</button>
          <!-- hide button -->
          <a href={repo.url}>
            {repo.name}
            {randomEmoji()}
          </a>
        </div>
      {/each}
    </div>
  {/if}
</section>

<style>
  section {
    position: fixed;
    left: 0px;
    top: 0px;
  }
  div.list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: scroll;
    max-height: 75vh;
  }

  div.nav {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  a {
    /* border: 1px solid black; */
    padding-left: 0.5em;
    text-align: start;
    overflow-wrap: break-word;
  }

  input {
    margin: 2em;
  }

  button {
    padding: 0px;
  }

  video {
    width: 20px;
    aspect-ratio: 1;
    border-radius: 50%;
    filter: invert(1);
  }
</style>
