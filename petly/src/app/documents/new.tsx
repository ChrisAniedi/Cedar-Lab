import * as DocumentPicker from 'expo-document-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PetPicker } from '@/components/pets/PetPicker';
import { Button } from '@/components/ui/Button';
import { DateField } from '@/components/ui/DateField';
import { FieldLabel } from '@/components/ui/FieldLabel';
import { OptionChips } from '@/components/ui/OptionChips';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { Txt } from '@/components/ui/Txt';
import { formatBytes } from '@/core/format';
import { createId } from '@/core/id';
import { DOCUMENT_CATEGORIES, type DocumentCategory } from '@/core/types';
import { collect, hasErrors, required } from '@/core/validation';
import { persistFile } from '@/lib/files';
import { useDefaultPetId } from '@/hooks/useDefaultPetId';
import { useToday } from '@/hooks/useToday';
import { useDocuments } from '@/stores/documents';
import { toast } from '@/stores/toast';
import { useVaccinations } from '@/stores/vaccinations';

export default function UploadDocument() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ petId?: string; category?: string; title?: string; vaccinationId?: string }>();
  const { date } = useToday();
  const add = useDocuments((s) => s.add);
  const defaultPet = useDefaultPetId(params.petId);
  const [petId, setPetId] = useState(defaultPet);
  const [title, setTitle] = useState(params.title ?? '');
  const [category, setCategory] = useState<DocumentCategory>(DOCUMENT_CATEGORIES.includes(params.category as DocumentCategory) ? (params.category as DocumentCategory) : 'other');
  const [docDate, setDocDate] = useState(date);
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ title?: 'required'; file?: 'required' }>({});

  const pick = async () => {
    const res = await DocumentPicker.getDocumentAsync({ type: ['application/pdf', 'image/*'], copyToCacheDirectory: true });
    if (res.canceled || !res.assets[0]) return;
    setFile(res.assets[0]);
    if (!title) setTitle(res.assets[0].name.replace(/\.[^.]+$/, ''));
  };

  const save = async () => {
    const e = collect({ title: required(title), file: file ? null : 'required' }) as typeof errors;
    setErrors(e);
    if (hasErrors(e) || !petId || !file) return;
    setSaving(true);
    try {
      const uri = await persistFile(file.uri, file.name, createId());
      const doc = add({ petId, title: title.trim(), category, date: docDate, uri, mimeType: file.mimeType ?? null, sizeBytes: file.size ?? null });
      if (params.vaccinationId) useVaccinations.getState().update(params.vaccinationId, { certificateDocId: doc.id });
      toast(t('documents.saved'));
      router.back();
    } catch {
      toast(t('errors.generic'), 'danger');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen width="form" edges={[]} footer={<Button label={t('common.save')} onPress={save} loading={saving} full />}>
      <PetPicker value={petId} onChange={setPetId} />
      <Button label={t('documents.pickFile')} icon="cloud-upload-outline" variant="secondary" onPress={pick} />
      {file ? (
        <Txt variant="caption" tone="textSecondary">
          {t('documents.fileChosen', { name: file.name, size: file.size ? formatBytes(file.size) : '' })}
        </Txt>
      ) : errors.file ? (
        <Txt variant="caption" tone="dangerInk">
          {t('errors.required')}
        </Txt>
      ) : null}
      <TextField label={t('documents.fields.title')} value={title} onChangeText={setTitle} error={errors.title} />
      <FieldLabel label={t('documents.fields.category')}>
        <OptionChips options={DOCUMENT_CATEGORIES.map((c) => ({ value: c, label: t(`documents.categories.${c}`) }))} value={category} onChange={setCategory} />
      </FieldLabel>
      <DateField label={t('documents.fields.date')} value={docDate} onChange={(d) => d && setDocDate(d)} />
    </Screen>
  );
}
