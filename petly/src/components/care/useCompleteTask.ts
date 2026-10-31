import { useTranslation } from 'react-i18next';

import type { TaskOccurrence } from '@/core/tasks';
import { haptic } from '@/lib/haptics';
import { useCare } from '@/stores/care';
import { useHousehold } from '@/stores/household';
import { usePets } from '@/stores/pets';
import { toast } from '@/stores/toast';

/** One-tap completion with haptic + toast confirmation and an undo. */
export function useCompleteTask() {
  const { t } = useTranslation();
  const complete = useCare((s) => s.complete);
  const undo = useCare((s) => s.undo);
  const me = useHousehold((s) => s.currentMemberId);
  const pets = usePets((s) => s.pets);

  return (occ: TaskOccurrence) => {
    const pet = pets.find((p) => p.id === occ.task.petId)?.name ?? '';
    if (occ.status === 'done') {
      const res = undo(occ.task.id, occ.date, me);
      if (res.ok) toast(t('care.undoneToast'), 'info');
      return;
    }
    const res = complete(occ.task.id, occ.date, me);
    if (!res.ok) {
      haptic.warning();
      toast(t('care.alreadyDone'), 'info');
      return;
    }
    haptic.success();
    toast(t('care.completedToast', { title: occ.task.title, pet }), 'success', {
      label: t('common.undo'),
      onPress: () => undo(occ.task.id, occ.date, me),
    });
  };
}
