import { Directory, File, Paths } from 'expo-file-system';
import { Platform } from 'react-native';

/**
 * Copy a picked file into the app's document directory so it survives cache
 * clears. Web keeps the picker's object URL (session only).
 */
export async function persistFile(uri: string, name: string, id: string): Promise<string> {
  if (Platform.OS === 'web') return uri;
  const dir = new Directory(Paths.document, 'documents');
  if (!dir.exists) dir.create({ intermediates: true, idempotent: true });
  const safe = name.replace(/[^\w.-]+/g, '_').slice(-80);
  const dest = new File(dir, `${id}-${safe}`);
  await new File(uri).copy(dest);
  return dest.uri;
}
