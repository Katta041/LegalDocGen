import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const docDef = {
  content: ['Hello'],
  defaultStyle: { font: 'Times' }
};
console.log('Testing pdfmake font keys:', Object.keys(pdfMake.fonts || {}));
