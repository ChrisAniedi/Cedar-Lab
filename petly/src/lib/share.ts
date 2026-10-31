import { File, Paths } from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

/** Native sharing: write to a file, then open the system share sheet. */
export async function shareJsonFile(filename: string, json: string) {
  const file = new File(Paths.cache, filename);
  if (file.exists) file.delete();
  file.create();
  await file.write(json);
  await Sharing.shareAsync(file.uri, { mimeType: 'application/json', dialogTitle: filename, UTI: 'public.json' });
}

export async function sharePdf(html: string, title: string) {
  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: title, UTI: 'com.adobe.pdf' });
}
