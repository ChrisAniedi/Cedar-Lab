import { petHealthStatus, type PetHealthStatus } from '@/core/health';
import { useToday } from '@/hooks/useToday';
import { useReminders } from '@/stores/reminders';
import { useVaccinations } from '@/stores/vaccinations';

/** petId → coarse health status, derived from vaccinations and reminders. */
export function usePetHealth(): (petId: string) => PetHealthStatus {
  const vaccinations = useVaccinations((s) => s.items);
  const reminders = useReminders((s) => s.items);
  const { date } = useToday();
  return (petId: string) =>
    petHealthStatus({
      vaccinations: vaccinations.filter((v) => v.petId === petId),
      reminders: reminders.filter((r) => r.petId === petId),
      today: date,
    });
}
