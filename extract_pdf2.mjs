import fs from 'fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const data = new Uint8Array(fs.readFileSync('/Users/aierarohit/Desktop/Formatter Web App - Law/IA....pdf'));
const doc = await getDocument({data}).promise;
let allText = '';
for (let i = 1; i <= doc.numPages; i++) {
  const page = await doc.getPage(i);
  const content = await page.getTextContent();
  const pageText = content.items.map(item => item.str).join(' ');
  allText += '--- PAGE ' + i + ' ---\n' + pageText + '\n\n';
}
fs.writeFileSync('pdf_text_output.txt', allText);
console.log('Pages:', doc.numPages);
console.log('Done');
