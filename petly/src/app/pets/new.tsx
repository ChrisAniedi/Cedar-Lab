import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { PetForm } from '@/components/pets/PetForm';
import { createPet } from '@/stores/lifecycle';
import { emptyPet } from '@/stores/pets';
import { toast } from '@/stores/toast';

export default function NewPet() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <PetForm
      id="new"
      initial={emptyPet()}
      onSubmit={(p) => {
        const pet = createPet(p);
        toast(t('pets.added', { name: pet.name }));
        router.replace({ pathname: '/pets/[id]', params: { id: pet.id } });
      }}
    />
  );
}
