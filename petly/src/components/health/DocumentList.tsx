import * as Sharing from 'expo-sharing';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Platform, View } from 'react-native';

import { DOCUMENT_CATEGORIES, type DocumentCategory, type PetDocument } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';
import { useDocuments } from '@/stores/documents';
import { toast } from '@/stores/toast';

import { Button } from '../ui/Button';
import { ConfirmSheet } from '../ui/ConfirmSheet';
import { EmptyState } from '../ui/EmptyState';
import { OptionChips } from '../ui/OptionChips';
import { Sheet } from '../ui/Sheet';
import { TextField } from '../ui/TextField';
import { Txt } from '../ui/Txt';
import { DocumentCard } from './DocumentCard';

/** Searchable, filterable library with preview, share/download and delete. */
export function DocumentList({ petId }: { petId: string | null }) {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const all = useDocuments((s) => s.items);
  const remove = useDocuments((s) => s.remove);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<DocumentCategory | 'all'>('all');
  const [open, setOpen] = useState<PetDocument | null>(null);
  const [confirm, setConfirm] = useState(false);

  const docs = all
    .filter((d) => !petId || d.petId === petId)
    .filter((d) => category === 'all' || d.category === category)
    .filter((d) => !query.trim() || d.title.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => b.date.localeCompare(a.date));

  const share = async (doc: PetDocument) => {
    if (!doc.uri) return;
    try {
      if (Platform.OS === 'web') await Linking.openURL(doc.uri);
      else if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(doc.uri, { mimeType: doc.mimeType ?? undefined, dialogTitle: doc.title });
      else toast(t('documents.cannotOpen'), 'danger');
    } catch {
      toast(t('documents.cannotOpen'), 'danger');
    }
  };

  return (
    <View className="gap-4">
      <View className="flex-row items-end gap-2">
        <View className="flex-1">
          <TextField label={t('common.search')} placeholder={t('documents.searchPlaceholder')} value={query} onChangeText={setQuery} />
        </View>
        <Button label={t('documents.upload')} icon="cloud-upload-outline" onPress={() => router.push({ pathname: '/documents/new', params: petId ? { petId } : {} })} />
      </View>
      <OptionChips
        scroll
        options={[{ value: 'all' as const, label: t('common.all') }, ...DOCUMENT_CATEGORIES.map((c) => ({ value: c, label: t(`documents.categories.${c}`) }))]}
        value={category}
        onChange={setCategory}
      />
      {docs.length === 0 ? (
        <EmptyState icon="document-text-outline" title={t('documents.emptyTitle')} body={t('documents.emptyBody')} actionLabel={t('documents.upload')} onAction={() => router.push({ pathname: '/documents/new', params: petId ? { petId } : {} })} />
      ) : (
        <View className="gap-2">
          {docs.map((d) => (
            <DocumentCard key={d.id} doc={d} onPress={() => setOpen(d)} />
          ))}
        </View>
      )}
      <Sheet open={!!open} onClose={() => setOpen(null)} title={open?.title}>
        {open ? (
          <View className="gap-4">
            <Txt variant="caption" tone="textSecondary">
              {[t(`documents.categories.${open.category}`), f.date(open.date)].join(' · ')}
            </Txt>
            {open.uri && open.mimeType?.startsWith('image/') ? (
              <Image source={{ uri: open.uri }} style={{ width: '100%', height: 280, borderRadius: 12 }} contentFit="contain" />
            ) : null}
            {open.uri ? (
              <Button label={t('common.share')} icon="share-outline" onPress={() => share(open)} full />
            ) : (
              <Txt tone="textSecondary">{t('documents.noFile')}</Txt>
            )}
            <Button label={t('common.delete')} variant="secondary" icon="trash-outline" onPress={() => setConfirm(true)} full />
          </View>
        ) : null}
      </Sheet>
      <ConfirmSheet
        open={confirm}
        title={t('documents.deleteTitle')}
        body={open?.title ?? ''}
        confirmLabel={t('common.delete')}
        destructive
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          if (open) remove(open.id);
          setOpen(null);
        }}
      />
    </View>
  );
}
