<script>
  import { onMount } from 'svelte';

  let time;

  onMount(() => {
    const dateOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric',
    };

    time = new Date().toLocaleDateString('en-US', dateOptions);
    setInterval(() => {
      // @ts-ignore
      time = new Date().toLocaleDateString('en-US', dateOptions);
    }, 1000);
  });
</script>

<h1>{time?.split(' ').splice(4).join(' ') || ''}</h1>
<h2>{time?.split(' ').splice(0, 3).join(' ') || ''}</h2>

<style>
  h1,
  h2 {
    mix-blend-mode: difference;
  }

  h1 {
    font-size: 3rem;
    margin: 1.5rem;
  }

  h2 {
    font-size: large;
    margin-top: 0px;
  }
</style>
