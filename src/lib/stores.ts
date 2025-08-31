import { writable } from 'svelte/store';

export interface Entry {
  date: string;
  weight: number;
  waist: number;
  calories: number;
  protein: number;
  workouts: string;
  notes: string;
}

const stored = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('entries') || '[]') : [];

export const entries = writable<Entry[]>(stored);

entries.subscribe((val) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('entries', JSON.stringify(val));
  }
});
