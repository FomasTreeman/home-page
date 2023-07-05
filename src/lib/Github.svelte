<script>
  let repos = [];
  let filteredRepos = [];
  let repoSearch = '';

  function search(e) {
    filteredRepos = [...repos.filter((repo) => repo.name.includes(repoSearch))];
  }

  const resp = fetch(
    `https://api.github.com/users/FomasTreeman/repos?per_page=100`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: import.meta.env.TOKEN,
      },
    }
  )
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

  $: filteredRepos = [...repos];
</script>

<section>
  <p>👩‍💻 GITHUB 👩‍💻</p>
  <input type="search" bind:value={repoSearch} on:input={search} />
  <div>
    {#each filteredRepos as repo}
      <a href={repo.url}> {repo.name} </a>
      <!-- pin button -->
      <!-- hide button -->
    {/each}
  </div>
</section>

<style>
  section {
    position: fixed;
    right: 0px;
    top: 0px;
    min-width: 200px;
  }
  div {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 75vh;
  }

  p {
    color: green;
  }

  input {
    margin-bottom: 2.5em;
  }
</style>
