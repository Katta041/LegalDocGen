const fs = require('fs');
const path = require('path');

async function main() {
  const pdfParse = (await import('pdf-parse')).default;
  const dataBuffer = fs.readFileSync('/Users/aierarohit/Desktop/Formatter Web App - Law/IA....pdf');
  const data = await pdfParse(dataBuffer);
  fs.writeFileSync('pdf_text_output.txt', data.text);
  console.log('Pages:', data.numpages);
  console.log('Text length:', data.text.length);
  console.log('Done');
}
main().catch(console.error);
