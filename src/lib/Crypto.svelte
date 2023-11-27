<script>
  import { onMount } from "svelte";

  let prices = { eth: { gbp: 0, usd: 0 }, btc: { gbp: 0, usd: 0 } };

  onMount(() =>
    ["BTC-USD", "BTC-GBP", "ETH-USD", "ETH-GBP"].forEach((conversion) => {
      fetch(`https://api.coinbase.com/v2/prices/${conversion}/buy`)
        .then((res) => res.json())
        .then((json) => {
          const keys = conversion.toLowerCase().split("-");
          prices[keys[0]][keys[1]] = json.data.amount;
          prices = { ...prices };
        });
    })
  );
</script>

<article>
  <div class="crypto">
    <small class="btc">BTC</small>
    <div class="prices">
      <bold> ${prices.btc.usd}</bold>
      <bold> £{prices.btc.gbp}</bold>
    </div>
  </div>
  <div class="crypto">
    <small class="eth">ETH</small>
    <div class="prices">
      <bold> ${prices.eth.usd}</bold>
      <bold> £{prices.eth.gbp}</bold>
    </div>
  </div>
</article>

<style>
  article {
    padding: 1em;
    border-radius: 1em;
    background-color: rgb(48 45 45 / 50%);
    box-shadow: 9px 11px 11px 0px rgba(0, 0, 0, 0.2),
      0px 10px 15px -3px rgba(0, 0, 0, 0.2);
  }
  article > * {
    margin: 0.75em;
  }

  .btc {
    color: #00d100;
  }

  .eth {
    color: yellow;
  }

  .prices {
    display: flex;
    flex-direction: column;
  }

  .crypto {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>
