<script lang="ts">
  import { entries, type Entry, upsertEntry } from './lib/stores';
  import { workoutOptions } from './lib/workouts';
  export let back: () => void;

  let form: Entry = {
    date: '',
    weight: 0,
    waist: 0,
    workouts: [],
    notes: ''
  };

  function addEntry() {
    upsertEntry({ ...form, workouts: [...form.workouts] });
    form = {
      date: '',
      weight: 0,
      waist: 0,
      workouts: [],
      notes: ''
    };
  }
</script>

<div class="container">
  <button class="back" on:click={back}>Back</button>
  <form on:submit|preventDefault={addEntry} class="form">
    <label>
      <span>Date</span>
      <input type="date" bind:value={form.date} required />
    </label>
    <label>
      <span>Weight (kg)</span>
      <input type="number" step="0.1" bind:value={form.weight} required />
    </label>
    <label>
      <span>Waist (cm)</span>
      <input type="number" step="0.1" bind:value={form.waist} />
    </label>
    <label>
      <span>Workouts</span>
      <select multiple bind:value={form.workouts}>
        {#each workoutOptions as w}
          <option value={w.workout}>{w.workout}</option>
        {/each}
      </select>
    </label>
    <label>
      <span>Notes</span>
      <textarea rows="3" bind:value={form.notes}></textarea>
    </label>
    <button type="submit">Save</button>
  </form>

  <section class="entries">
    {#each $entries as e}
      <div class="entry">
        <div class="date">{e.date}</div>
        <div class="stats">{e.weight} kg · {e.waist} cm</div>
        {#if e.workouts.length}
          <div class="workouts">{e.workouts.join(', ')}</div>
        {/if}
        {#if e.notes}
          <div class="notes">{e.notes}</div>
        {/if}
      </div>
    {/each}
  </section>
</div>

<style>
  .container {
    max-width: 480px;
    margin: 0 auto;
    padding: 1rem;
  }
  .form label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 0.75rem;
  }
  input,
  textarea,
  select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.375rem;
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  .back {
    margin-bottom: 1rem;
  }
  .entries .entry {
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e5e5;
  }
  .entries .entry:last-child {
    border-bottom: none;
  }
  @media (max-width: 640px) {
    .container {
      padding: 0.5rem;
    }
  }
</style>
