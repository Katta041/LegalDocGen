import fs from 'fs'
import PdfPrinter from 'pdfmake/src/printer.js'
import { generatePDFDocument } from './src/lib/pdfGenerator.js'
import { sampleData } from './src/lib/sampleData.js'

// Setup fonts for node.js pdfmake
const fonts = {
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  }
}

const printer = new PdfPrinter(fonts)
const docDefinition = generatePDFDocument(sampleData)

// pdfmake node API uses a printer object
const pdfDoc = printer.createPdfKitDocument(docDefinition)
pdfDoc.pipe(fs.createWriteStream('Generated_IA_Test.pdf'))
pdfDoc.end()

console.log('PDF generated at Generated_IA_Test.pdf')
