<script lang="ts">
  import { entries } from './lib/stores';
  export let back: () => void;

  $: sorted = [...$entries].sort((a, b) => a.date.localeCompare(b.date));
  const width = 600;
  const height = 300;
  const padding = 40;

  function buildPath(field: 'weight' | 'waist') {
    if (!sorted.length) return '';
    const xStep = (width - padding * 2) / Math.max(sorted.length - 1, 1);
    const allVals = sorted.flatMap((e) => [e.weight, e.waist]);
    const min = Math.min(...allVals);
    const max = Math.max(...allVals);
    const span = max - min || 1;
    const points = sorted.map((e, i) => {
      const x = padding + i * xStep;
      const y =
        height -
        padding -
        ((e[field] - min) / span) * (height - padding * 2);
      return `${x},${y}`;
    });
    return 'M ' + points.join(' L ');
  }

  $: weightPath = buildPath('weight');
  $: waistPath = buildPath('waist');
  $: labels = sorted.map((e) => e.date);
  $: xStep = (width - padding * 2) / Math.max(sorted.length - 1, 1);
</script>

<div class="container">
  <button class="back" on:click={back}>Back</button>
  {#if sorted.length}
    <svg {width} {height} class="chart">
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#ccc" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#ccc" />
      <path d={weightPath} fill="none" stroke="#2563eb" stroke-width="2" />
      <path d={waistPath} fill="none" stroke="#16a34a" stroke-width="2" />
      {#each labels as label, i}
        <text x={padding + i * xStep} y={height - padding + 15} text-anchor="middle" font-size="10">
          {label}
        </text>
      {/each}
    </svg>
    <div class="legend">
      <span class="weight">Weight</span>
      <span class="waist">Waist</span>
    </div>
  {:else}
    <p>No entries yet.</p>
  {/if}
</div>

<style>
  .container {
    max-width: 640px;
    margin: 0 auto;
    padding: 1rem;
    text-align: center;
  }
  .chart {
    width: 100%;
    height: auto;
  }
  .legend {
    margin-top: 0.5rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  .legend .weight {
    color: #2563eb;
  }
  .legend .waist {
    color: #16a34a;
  }
  .back {
    margin-bottom: 1rem;
  }
  @media (max-width: 640px) {
    .container {
      padding: 0.5rem;
    }
  }
</style>
