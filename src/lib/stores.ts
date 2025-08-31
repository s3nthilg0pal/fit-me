import { writable } from 'svelte/store';

export interface Entry {
  date: string;
  weight: number;
  waist: number;
  workouts: string[];
  notes: string;
}

const stored = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('entries') || '[]') : [];

export const entries = writable<Entry[]>(stored);

entries.subscribe((val) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('entries', JSON.stringify(val));
  }
});

export function upsertEntry(entry: Entry) {
  entries.update((current) => {
    const index = current.findIndex((e) => e.date === entry.date);
    if (index !== -1) {
      const updated = [...current];
      updated[index] = entry;
      return updated;
    }
    return [...current, entry];
  });
}
