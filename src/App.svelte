<script lang="ts">
  import EntryForm from './EntryForm.svelte';
  import Progress from './Progress.svelte';

  let view: 'home' | 'add' | 'progress' = 'home';
</script>

{#if view === 'home'}
  <main class="landing">
    <button on:click={() => (view = 'add')}>Add Entry</button>
    <button on:click={() => (view = 'progress')}>View Progress</button>
  </main>
{:else if view === 'add'}
  <EntryForm back={() => (view = 'home')} />
{:else}
  <Progress back={() => (view = 'home')} />
{/if}

<style>
  .landing {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 480px;
    margin: 0 auto;
    padding: 1rem;
  }
  button {
    padding: 0.75rem 1rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  @media (max-width: 640px) {
    .landing {
      padding: 0.5rem;
    }
  }
</style>
