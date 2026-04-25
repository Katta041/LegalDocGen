import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

const dataBuffer = fs.readFileSync('/Users/aierarohit/Desktop/Formatter Web App - Law/IA....pdf');
const data = await pdf(dataBuffer);
fs.writeFileSync('pdf_text_output.txt', data.text);
console.log('Pages:', data.numpages);
console.log('Text length:', data.text.length);
console.log('Done');
