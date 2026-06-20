import { sampleDataList } from './src/lib/sampleData';
import { generatePDFDocument } from './src/lib/pdfGenerator';
import { generateDocxDocument } from './src/lib/docxGenerator';
import { buildAffidavitParagraphs, generateFactsString } from './src/lib/affidavitParagraphs';

async function runTests() {
  console.log("Running Code-Side Tests...");
  let passed = 0;
  let failed = 0;

  for (const sample of sampleDataList) {
    console.log(`\nTesting Sample: ${sample.petitionType}`);
    
    // Test 1: Facts Generation
    try {
      const facts = generateFactsString(sample);
      if (typeof facts !== 'string') throw new Error("generateFactsString did not return a string");
      console.log("✅ Facts String Generation: Passed");
      passed++;
    } catch (e: any) {
      console.error("❌ Facts String Generation: Failed", e.message);
      failed++;
    }

    // Test 2: PDF Document Generation
    try {
      const pdfDef = generatePDFDocument(sample);
      if (!pdfDef || !pdfDef.content) throw new Error("generatePDFDocument returned invalid definition");
      console.log("✅ PDF Generation Logic: Passed");
      passed++;
    } catch (e: any) {
      console.error("❌ PDF Generation Logic: Failed", e.message);
      failed++;
    }

    // Test 3: DOCX Document Generation
    try {
      const docxDef = generateDocxDocument(sample);
      if (!docxDef || !docxDef.sections) throw new Error("generateDocxDocument returned invalid definition");
      console.log("✅ DOCX Generation Logic: Passed");
      passed++;
    } catch (e: any) {
      console.error("❌ DOCX Generation Logic: Failed", e.message);
      failed++;
    }
  }

  console.log(`\nTest Results: ${passed} Passed, ${failed} Failed`);
  if (failed > 0) process.exit(1);
}

runTests();
