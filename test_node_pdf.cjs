const fs = require('fs');
const PdfPrinter = require('pdfmake');

// Since we cannot easily import the schema in CJS without compilation, we will just use a hardcoded docDefinition that matches the pdfGenerator structure
const fonts = {
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  }
};

const printer = new PdfPrinter(fonts);

const docDefinition = {
  content: [
    { text: 'TEST GENERATED PDF FROM NODE', style: 'header' },
    { text: 'This proves the PDFMake library is functional and generates a file.', margin: [0, 20, 0, 0] }
  ],
  styles: {
    header: { fontSize: 18, bold: true, alignment: 'center' }
  },
  defaultStyle: { font: 'Times' }
};

const pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('Test_Output.pdf'));
pdfDoc.end();

console.log('Test_Output.pdf created successfully in legaldocgen folder.');
