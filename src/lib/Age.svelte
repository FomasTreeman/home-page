<script>
  import { onMount } from 'svelte';

  const birthday = new Date('2001-04-13').getTime(); // Replace 'YYYY-MM-DD' with your actual birthday

  let times = [];

  function setNewTimesDiff() {
    const newTimes = [];
    const currentDate = new Date().getTime();
    const timeDifference = currentDate - birthday;
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
    newTimes.push(years);
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30)) % 12;
    newTimes.push(months);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) % 30;
    newTimes.push(days);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    newTimes.push(hours);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    newTimes.push(minutes);
    times = [...newTimes];
  }

  onMount(() => {
    setNewTimesDiff();
    setInterval(() => {
      setNewTimesDiff();
    }, 60000);
  });
</script>

<h1>
  {times[0]} years, {times[1]} months, {times[2]} days, {times[3]} hours, {times[4]}
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
