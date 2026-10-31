import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PetForm } from '@/components/pets/PetForm';
import { Button } from '@/components/ui/Button';
import { ConfirmSheet } from '@/components/ui/ConfirmSheet';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { deletePetEverywhere } from '@/stores/lifecycle';
import { usePets } from '@/stores/pets';
import { toast } from '@/stores/toast';

export default function EditPet() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const pet = usePets((s) => s.pets.find((p) => p.id === id));
  const update = usePets((s) => s.updatePet);
  const [confirm, setConfirm] = useState(false);
  if (!pet) {
    return (
      <Screen edges={[]}>
        <EmptyState icon="paw-outline" title={t('pets.title')} body={t('common.notFound')} />
      </Screen>
    );
  }
  const { id: _id, createdAt: _c, isSample: _s, ...initial } = pet;
  return (
    <>
      <PetForm
        id={pet.id}
        initial={initial}
        onSubmit={(p) => {
          update(pet.id, p);
          toast(t('pets.saved'));
          router.back();
        }}
        footerExtra={<Button label={t('pets.deletePet')} variant="ghost" icon="trash-outline" onPress={() => setConfirm(true)} />}
      />
      <ConfirmSheet
        open={confirm}
        title={t('pets.deleteTitle', { name: pet.name })}
        body={t('pets.deleteBody', { name: pet.name })}
        confirmLabel={t('common.delete')}
        destructive
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          const name = pet.name;
          router.dismissTo('/pets');
          deletePetEverywhere(pet.id);
          toast(t('pets.deleted', { name }));
        }}
      />
    </>
  );
}
