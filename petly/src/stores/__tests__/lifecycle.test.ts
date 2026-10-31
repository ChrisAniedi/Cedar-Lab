import { useCare } from '../care';
import { createPet, deletePetEverywhere, loadSampleData, removeSampleData } from '../lifecycle';
import { emptyPet, usePets } from '../pets';
import { useReminders } from '../reminders';
import { useWeights } from '../weights';

describe('cross-slice lifecycle', () => {
  it('loads and fully removes sample data without touching real records', () => {
    const mine = createPet({ ...emptyPet(), name: 'Pepper', weightKg: 4 });
    loadSampleData();
    expect(usePets.getState().pets.map((p) => p.name)).toEqual(expect.arrayContaining(['Pepper', 'Max', 'Luna', 'Bella']));
    removeSampleData();
    expect(usePets.getState().pets.map((p) => p.id)).toEqual([mine.id]);
    expect(useCare.getState().tasks).toEqual([]);
    expect(useReminders.getState().items).toEqual([]);
    expect(useWeights.getState().items.map((w) => w.petId)).toEqual([mine.id]);
  });

  it('records the starting weight and cascades deletes', () => {
    const pet = createPet({ ...emptyPet(), name: 'Biscuit', weightKg: 10 });
    expect(useWeights.getState().items.some((w) => w.petId === pet.id && w.kg === 10)).toBe(true);
    useCare.getState().addTask({ petId: pet.id, title: 'Walk', category: 'walking', time: '08:00', recurrence: { kind: 'daily' }, assigneeId: null });
    deletePetEverywhere(pet.id);
    expect(usePets.getState().pets.some((p) => p.id === pet.id)).toBe(false);
    expect(useCare.getState().tasks.some((t) => t.petId === pet.id)).toBe(false);
    expect(useWeights.getState().items.some((w) => w.petId === pet.id)).toBe(false);
  });
});
