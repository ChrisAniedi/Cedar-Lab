import { recentActivity } from '@/core/activity';
import { useToday } from '@/hooks/useToday';
import { useCare } from '@/stores/care';
import { useMedications } from '@/stores/medications';
import { useVaccinations } from '@/stores/vaccinations';
import { useVisits } from '@/stores/visits';
import { useWeights } from '@/stores/weights';

export function useActivity(petId: string | null, limit = 8) {
  const { date } = useToday();
  const careLog = useCare((s) => s.log);
  const tasks = useCare((s) => s.tasks);
  const doses = useMedications((s) => s.doses);
  const medications = useMedications((s) => s.medications);
  const weights = useWeights((s) => s.items);
  const visits = useVisits((s) => s.items);
  const vaccinations = useVaccinations((s) => s.items);
  return recentActivity({ careLog, tasks, doses, medications, weights, visits, vaccinations }, { petId, limit, today: date });
}
