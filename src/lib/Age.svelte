<script>
  import { onMount } from 'svelte';

  const birthday = new Date('2001-04-13'); // Replace 'YYYY-MM-DD' with your actual birthday
  const EPOCH = new Date(0);

  let age = [];

  function setNewTimesDiff() {
    const diff = new Date(Date.now() - birthday.getTime());

    const years = Math.abs(diff.getUTCFullYear() - EPOCH.getUTCFullYear());
    const months = Math.abs(diff.getUTCMonth() - EPOCH.getUTCMonth());
    const days = Math.abs(diff.getUTCDate() - EPOCH.getUTCDate());
    const hours = Math.abs(diff.getUTCHours() - EPOCH.getUTCHours());
    const min = Math.abs(diff.getUTCMinutes() - EPOCH.getUTCMinutes());
    age = [years, months, days, hours, min];
  }

  onMount(() => {
    setNewTimesDiff();
    setInterval(() => {
      setNewTimesDiff();
    }, 60000);
  });
</script>

<h1>
  {age[0]} years, {age[1]} months, {age[2]} days, {age[3]} hours, {age[4]}
  min
</h1>

<style>
  h1 {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translate(-50%, -50%);
    mix-blend-mode: difference;
    font-size: large;
  }
</style>
