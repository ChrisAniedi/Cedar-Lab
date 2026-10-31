import * as Print from 'expo-print';

/** Web: download JSON via a blob link; PDFs go through the browser's print-to-PDF dialog. */
export async function shareJsonFile(filename: string, json: string) {
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function sharePdf(html: string, _title: string) {
  await Print.printAsync({ html });
}
