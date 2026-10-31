import { toDateKey } from '@/core/dates';
import { buildSampleData } from '@/core/sample';

import { useCare } from './care';
import { useDocuments } from './documents';
import { SELF_ID, useHousehold } from './household';
import { useMedications } from './medications';
import { usePets, type NewPet } from './pets';
import { useReminders } from './reminders';
import { useSettings } from './settings';
import { useVaccinations } from './vaccinations';
import { useVisits } from './visits';
import { useWeights } from './weights';
import { useWellness } from './wellness';

/** Cross-slice operations. Each slice stays independent; this file coordinates them. */

const petScoped = [useVaccinations, useVisits, useDocuments, useWeights, useWellness, useReminders];

export function loadSampleData() {
  const s = buildSampleData(toDateKey(new Date()), SELF_ID, new Date().toISOString());
  usePets.getState().merge(s.pets);
  useHousehold.getState().merge(s.members);
  useCare.getState().merge(s.tasks, s.careLog);
  useMedications.getState().merge(s.medications, s.doses);
  useVaccinations.getState().merge(s.vaccinations);
  useVisits.getState().merge(s.visits);
  useWeights.getState().merge(s.weights);
  useWellness.getState().merge(s.wellness);
  useReminders.getState().merge(s.reminders);
  useDocuments.getState().merge(s.documents);
  useSettings.getState().set({ usingSampleData: true });
}

export function removeSampleData() {
  usePets.getState().removeSample();
  useHousehold.getState().removeSample();
  useCare.getState().removeSample();
  useMedications.getState().removeSample();
  for (const store of petScoped) store.getState().removeSample();
  useSettings.getState().set({ usingSampleData: false });
}

/** Deleting a pet removes every record that belongs to it. */
export function deletePetEverywhere(petId: string) {
  useCare.getState().removeForPet(petId);
  useMedications.getState().removeForPet(petId);
  for (const store of petScoped) store.getState().removeForPet(petId);
  usePets.getState().removePet(petId);
}

export function eraseAllData() {
  for (const store of [usePets, useCare, useMedications, useHousehold, useSettings, ...petScoped]) {
    store.persist.clearStorage();
  }
  usePets.setState({ pets: [], selectedPetId: null });
  useCare.setState({ tasks: [], log: [] });
  useMedications.setState({ medications: [], doses: [] });
  useVaccinations.setState({ items: [] });
  useVisits.setState({ items: [] });
  useDocuments.setState({ items: [] });
  useWeights.setState({ items: [] });
  useWellness.setState({ items: [] });
  useReminders.setState({ items: [] });
  useHousehold.setState({ members: [{ id: SELF_ID, name: '', role: 'owner', isSelf: true, isSample: false }] });
  useSettings.getState().reset();
}

/** Plain JSON export of everything the user owns. */
export function exportAllData() {
  return {
    exportedAt: new Date().toISOString(),
    settings: (({ set, setNotifications, reset, ...rest }) => rest)(useSettings.getState()),
    household: useHousehold.getState().members,
    pets: usePets.getState().pets,
    care: { tasks: useCare.getState().tasks, log: useCare.getState().log },
    medications: { medications: useMedications.getState().medications, doses: useMedications.getState().doses },
    vaccinations: useVaccinations.getState().items,
    visits: useVisits.getState().items,
    weights: useWeights.getState().items,
    wellness: useWellness.getState().items,
    reminders: useReminders.getState().items,
    documents: useDocuments.getState().items,
  };
}

/** Add a pet; a weight given at creation becomes the first point on its weight chart. */
export function createPet(input: NewPet) {
  const pet = usePets.getState().addPet(input);
  if (pet.weightKg) useWeights.getState().add({ petId: pet.id, date: toDateKey(new Date()), kg: pet.weightKg, note: '' });
  return pet;
}
