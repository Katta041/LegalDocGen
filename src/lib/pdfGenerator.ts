import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
import type { FormValues } from "./schema"
import type { TDocumentDefinitions, Content, StyleDictionary } from "pdfmake/interfaces"
import { formatAddress, formatPetitionerAddress } from "./utils"
import { buildAffidavitParagraphs } from "./affidavitParagraphs"

// Initialize VFS
if (typeof (pdfFonts as any)?.pdfMake?.vfs !== 'undefined') {
  (pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs
} else {
  (pdfMake as any).vfs = pdfFonts
}

function fmt(dateStr: string | undefined): string {
  if (!dateStr) return '___'
  try {
    const d = new Date(dateStr)
    return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`
  } catch { return dateStr }
}

const styles: StyleDictionary = {
  courtName: { fontSize: 14, bold: true, alignment: 'center', lineHeight: 1.5 },
  heading: { fontSize: 12, bold: true, alignment: 'center', lineHeight: 1.5 },
  headingUnderline: { fontSize: 12, bold: true, decoration: 'underline', alignment: 'center', lineHeight: 1.5 },
  bodyText: { fontSize: 12, alignment: 'justify', lineHeight: 1.5 },
  rightAlign: { fontSize: 12, alignment: 'right', lineHeight: 1.5 },
  boldUnderlineLeft: { fontSize: 12, bold: true, decoration: 'underline', alignment: 'left', lineHeight: 1.5 },
}

function buildCauseTitleShort(data: Partial<FormValues>): Content[] {
  return [
    { text: data.courtName || '', style: 'courtName', margin: [0,0,0,10] },
    { text: `I.A. No. ${data.iaNumber||'___'} OF ${data.iaYear||'___'}`, style: 'heading' },
    { text: 'IN', style: 'heading' },
    { text: `O.S. No. ${data.osNumber||'        '} OF ${data.osYear||'___'}`, style: 'heading', margin: [0,0,0,10] },
    { text: 'IN THE MATTER OF:', style: 'boldUnderlineLeft', margin: [0,0,0,10] },
    { text: `${data.petitionerSalutation||''} ${data.petitionerName||'___'}`, style: 'bodyText' },
    { text: '-- Petitioner/Plaintiff', style: 'rightAlign', margin: [0,0,0,5] },
    { text: '- Versus -', style: 'heading', margin: [0,5,0,5] },
    { text: `${(data.respondents||[])[0]?.name||'___'} & Ors.,`, style: 'bodyText' },
    { text: '-- Respondents/Defendants', style: 'rightAlign', margin: [0,0,0,20] },
  ]
}

function buildCauseTitleFull(data: Partial<FormValues>): Content[] {
  const petLine = `${data.petitionerSalutation||''} ${data.petitionerName||'___'}, ${data.petitionerRelationPrefix||''} ${data.petitionerRelationName||''}, aged: ${data.petitionerAge||'___'} years, Occ: ${data.petitionerOccupation||'___'}, residing at ${formatPetitionerAddress(data)}.`
  const resps: Content[] = (data.respondents||[]).map((r, i) => ({
    text: `${i+1}. ${r.salutation||''} ${r.name||''}, ${r.relationPrefix||''} ${r.relationName||''}, Aged about: ${r.age||'___'} years, Occ: ${r.occupation||''}, R/o. ${formatAddress(r)}`,
    style: 'bodyText', margin: [0,0,0,4] as [number,number,number,number],
  }))
  return [
    { text: data.courtName || '', style: 'courtName', margin: [0,0,0,10] },
    { text: `I.A. No. ${data.iaNumber||'___'} OF ${data.iaYear||'___'}`, style: 'heading' },
    { text: 'IN', style: 'heading' },
    { text: `O.S. No. ${data.osNumber||'        '} OF ${data.osYear||'___'}`, style: 'heading', margin: [0,0,0,10] },
    { text: 'IN THE MATTER OF:', style: 'boldUnderlineLeft', margin: [0,0,0,10] },
    { text: petLine, style: 'bodyText' },
    { text: '-- Petitioner/Plaintiff', style: 'rightAlign', margin: [0,0,0,5] },
    { text: '- Vs -', style: 'heading', margin: [0,5,0,5] },
    ...resps,
    { text: '-- Respondents/Defendants', style: 'rightAlign', margin: [0,0,0,20] },
  ]
}

export function generatePDFDocument(data: Partial<FormValues>): TDocumentDefinitions {
  const isIA = data.petitionType?.toLowerCase().includes("interlocutory") || data.petitionType?.toLowerCase().includes("ia") || data.petitionType?.toLowerCase().includes("injunction") && !data.petitionType?.toLowerCase().includes("plaint")

  if (isIA) {
    const preamble = `I, ${data.petitionerSalutation||''} ${data.petitionerName||'___'}, ${data.petitionerRelationPrefix||''} ${data.petitionerRelationName||''}, aged: ${data.petitionerAge||'___'} years, residing at ${formatPetitionerAddress(data)} do hereby, solemnly affirm and state on oath as follows.`

    // AFFIDAVIT (Pages 1-6)
    const affidavit: Content[] = [
      ...buildCauseTitleShort(data),
      { text: 'AFFIDAVIT OF THE PETITIONER/PLAINTIFF', style: 'headingUnderline', margin: [0,0,0,15] },
      { text: preamble, style: 'bodyText', margin: [0,0,0,10] },
      { text: data.factsOfTheCase || (!buildAffidavitParagraphs(data).length ? '1. I am the petitioner/plaintiff herein and as such I am well acquainted with the facts of the case...\n\n2. I filed the suit for declaration of my rights...' : ''), style: 'bodyText', margin: [0,0,0,10] },
      ...buildAffidavitParagraphs(data),
      { text: 'DEPONENT', style: 'rightAlign', margin: [0,30,0,20], bold: true },
      { text: `Solemnly affirmed and signed before me on this the ${fmt(data.executionDate)} at ${data.executionPlace||'Kurnool'}.`, style: 'bodyText', margin: [0,0,0,20] },
      { text: `ADVOCATE, ${(data.executionPlace||'KURNOOL').toUpperCase()}`, style: 'rightAlign', bold: true },
    ]

    // PETITION (Pages 7-8)
    const petition: Content[] = [
      { text: '', pageBreak: 'before' },
      ...buildCauseTitleFull(data),
      { text: data.petitionType?.toUpperCase() || 'PETITION FILED ON BEHALF OF THE PETITIONER/PLAINTIFF – UNDER ORDER XXXIX RULE 1&2 R/W SECTION 151 OF CPC', style: 'headingUnderline', margin: [0,0,0,15] },
      { text: `For the reasons stated in the accompanying affidavit, it is most respectfully prayed that this Hon'ble Court may be pleased to grant a temporary injunction restraining the Respondents/Defendants, their men, agents, servants, or any persons claiming under or through them from in any manner interfering with the Petitioner's/Plaintiff's peaceful possession and enjoyment of the Plaint Schedule Property, pending disposal of the suit, in the interest of justice; and pass such other and further orders as this Hon'ble Court may deem fit and proper in the circumstances of the case.`, style: 'bodyText', margin: [0,0,0,30] },
      { text: 'COUNSEL FOR PETITIONER/PLAINTIFF', style: 'rightAlign', bold: true, margin: [0,0,0,20] },
      { text: 'SCHEDULE', style: 'headingUnderline', margin: [0,0,0,15] },
      { text: `An ${data.propertyType||'Agricultural'} Land situated in Survey No. ${data.surveyNumber||'___'}, of ${data.village||'___'} Village, ${data.mandal||'___'} Mandal, ${data.district||'___'} District, to an extent of ${data.propertyExtent||'___'} within the following boundaries.`, style: 'bodyText', margin: [0,0,0,10] },
      {
        table: { widths: [80, '*'], body: [
          [{ text: 'EAST', bold: true, fontSize: 12 }, { text: `: ${data.boundaryEast||'___'}`, fontSize: 12 }],
          [{ text: 'WEST', bold: true, fontSize: 12 }, { text: `: ${data.boundaryWest||'___'}`, fontSize: 12 }],
          [{ text: 'NORTH', bold: true, fontSize: 12 }, { text: `: ${data.boundaryNorth||'___'}`, fontSize: 12 }],
          [{ text: 'SOUTH', bold: true, fontSize: 12 }, { text: `: ${data.boundarySouth||'___'}`, fontSize: 12 }],
        ]},
        layout: 'noBorders', margin: [50,0,0,10] as [number,number,number,number]
      },
      ...(data.easementRights ? [{ text: 'With all easement rights.', style: 'bodyText', margin: [0,0,0,30] as [number,number,number,number] }] : []),
      { text: 'COUNSEL FOR PETITIONER/PLAINTIFF', style: 'rightAlign', bold: true },
    ]

    // COVER PAGE (Page 9)
    const cover: Content[] = [
      { text: '', pageBreak: 'before' },
      { text: `${data.counselInitials||'B.M.K.'},`, style: 'bodyText' },
      { text: 'For Petitioner/Plaintiff', style: 'bodyText', margin: [0,0,0,30] },
      { text: data.courtName || '', style: 'courtName', margin: [0,0,0,20] },
      { text: `I.A. No. ${data.iaNumber||'___'}/${data.iaYear||'___'}`, style: 'heading' },
      { text: 'IN', style: 'heading' },
      { text: `O.S. No. ${data.osNumber||'        '} OF ${data.osYear||'___'}`, style: 'heading', margin: [0,0,0,30] },
      { text: data.petitionType?.toUpperCase() || 'PETITION FILED ON BEHALF OF THE PETITIONER/PLAINTIFF – UNDER ORDER XXXIX RULE 1 & 2 R/W SECTION 151 OF CPC', style: 'heading', margin: [0,0,0,120] },
      { text: 'ADDRESS FOR SERVICE', style: 'headingUnderline', margin: [0,0,0,10] },
      { text: (data.advocates||[]).map(a => `SRI ${a.name.toUpperCase()}, ${(a.qualifications||'').toUpperCase()},`).join('\n'), style: 'bodyText', alignment: 'center' },
      { text: `ADVOCATES, ${(data.counselAddress||'___').toUpperCase()}`, style: 'bodyText', alignment: 'center' },
      { text: `CELL: ${data.counselPhone||''}`, style: 'bodyText', alignment: 'center' },
    ]

    const finalContent = [...affidavit, ...petition, ...cover]
    
    if (data.verificationText) {
      finalContent.push({ text: 'VERIFICATION', style: 'headingUnderline', margin: [0,30,0,10], pageBreak: 'before' })
      finalContent.push({ text: data.verificationText, style: 'bodyText', margin: [0,0,0,10] })
      finalContent.push({ text: `Verified at ${data.executionPlace} on this the ${fmt(data.executionDate)}.`, style: 'bodyText', margin: [0,0,0,30] })
      finalContent.push({ text: 'DEPONENT', style: 'rightAlign', bold: true })
    }

    if (data.listOfDocuments && data.listOfDocuments.length > 0) {
      finalContent.push({ text: 'LIST OF DOCUMENTS', style: 'headingUnderline', margin: [0,30,0,10], pageBreak: 'before' })
      const list = data.listOfDocuments.map((doc, i) => ({
        columns: [
          { text: `${i+1}.`, width: 20 },
          { text: doc, width: '*' }
        ],
        margin: [0,0,0,8] as [number,number,number,number]
      }))
      finalContent.push(...list)
      finalContent.push({ text: 'COUNSEL FOR PETITIONER', style: 'rightAlign', bold: true, margin: [0,30,0,0] })
    }

    return {
      content: finalContent,
      styles,
      defaultStyle: { font: 'Roboto', fontSize: 12, lineHeight: 1.5 },
      pageSize: 'A4',
      pageMargins: [72, 72, 72, 72],
    }
  } else {
    // MAIN PLAINT
    const resps: Content[] = (data.respondents||[]).map((r, i) => ({
      text: `${i+1}. ${r.salutation||''} ${r.name||''}, ${r.relationPrefix||''} ${r.relationName||''}, Aged about: ${r.age||'___'} years, Occ: ${r.occupation||''}, R/o. ${formatAddress(r)}`,
      style: 'bodyText', margin: [0,0,0,4] as [number,number,number,number],
    }))

    const content: Content[] = [
      { text: data.courtName || '', style: 'courtName', margin: [0,0,0,10] },
      { text: `O.S. No. ${data.osNumber||'        '} OF ${data.osYear||'___'}`, style: 'heading', margin: [0,0,0,10] },
      { text: 'IN THE MATTER OF:', style: 'boldUnderlineLeft', margin: [0,0,0,10] },
      { text: `${data.petitionerSalutation||''} ${data.petitionerName||'___'}`, style: 'bodyText' },
      { text: '-- Plaintiff', style: 'rightAlign', margin: [0,0,0,5] },
      { text: 'Versus', style: 'heading', margin: [0,5,0,5] },
      { text: `${(data.respondents||[])[0]?.name||'___'} & Ors.,`, style: 'bodyText' },
      { text: '-- Defendants', style: 'rightAlign', margin: [0,0,0,20] },
      
      { text: data.petitionType?.toUpperCase() || 'PLAINT FILED ON BEHALF OF THE PLAINTIFF UNDER ORDER VII RULES 1 & 2 OF THE CODE OF CIVIL PROCEDURE', style: 'headingUnderline', margin: [0,0,0,15] },
      
      { text: 'Description of the Plaintiff:', style: 'boldUnderlineLeft', margin: [0,10,0,5] },
      { text: `${data.petitionerSalutation||''} ${data.petitionerName||'___'}, ${data.petitionerRelationPrefix||''} ${data.petitionerRelationName||''}, Aged about: ${data.petitionerAge||'___'} years, Occ: ${data.petitionerOccupation||'___'}, R/o ${formatPetitionerAddress(data)}.`, style: 'bodyText', margin: [0,0,0,10] },
      
      { text: 'Description of the Defendants:', style: 'boldUnderlineLeft', margin: [0,10,0,5] },
      ...resps,

      { text: 'Facts of the case:', style: 'boldUnderlineLeft', margin: [0,10,0,5] },
      { text: data.factsOfTheCase || (!buildAffidavitParagraphs(data).length ? 'It is submitted that the Plaintiff is the absolute owner and possessor of the Plaint Schedule Property. The Plaintiff acquired this property for valid sale consideration...' : ''), style: 'bodyText', margin: [0,0,0,10] },
      ...buildAffidavitParagraphs(data),
      
      { text: 'SCHEDULE OF PROPERTY', style: 'headingUnderline', margin: [0,30,0,15] },
      { text: `An ${data.propertyType||'Agricultural'} Land situated in Survey No. ${data.surveyNumber||'___'}, of ${data.village||'___'} Village, ${data.mandal||'___'} Mandal, ${data.district||'___'} District, ${data.state||'___'} State, to an extent of ${data.propertyExtent||'___'} within the following boundaries.`, style: 'bodyText', margin: [0,0,0,10] },
      {
        table: { widths: [80, '*'], body: [
          [{ text: 'EAST', bold: true, fontSize: 12 }, { text: `: ${data.boundaryEast||'___'}`, fontSize: 12 }],
          [{ text: 'WEST', bold: true, fontSize: 12 }, { text: `: ${data.boundaryWest||'___'}`, fontSize: 12 }],
          [{ text: 'NORTH', bold: true, fontSize: 12 }, { text: `: ${data.boundaryNorth||'___'}`, fontSize: 12 }],
          [{ text: 'SOUTH', bold: true, fontSize: 12 }, { text: `: ${data.boundarySouth||'___'}`, fontSize: 12 }],
        ]},
        layout: 'noBorders', margin: [50,0,0,10] as [number,number,number,number]
      },
      ...(data.easementRights ? [{ text: 'With all easement rights.', style: 'bodyText', margin: [0,0,0,30] as [number,number,number,number] }] : []),

      { text: 'COUNSEL FOR PLAINTIFF', style: 'rightAlign', bold: true, margin: [0,30,0,0] },
      { text: 'PLAINTIFF', style: 'rightAlign', bold: true, margin: [0,5,0,0] },
    ]

    if (data.verificationText) {
      content.push({ text: 'VERIFICATION', style: 'headingUnderline', margin: [0,30,0,10], pageBreak: 'before' })
      content.push({ text: data.verificationText, style: 'bodyText', margin: [0,0,0,10] })
      content.push({ text: `Verified at ${data.executionPlace} on this the ${fmt(data.executionDate)}.`, style: 'bodyText', margin: [0,0,0,30] })
      content.push({ text: 'PLAINTIFF', style: 'rightAlign', bold: true })
    }

    if (data.listOfDocuments && data.listOfDocuments.length > 0) {
      content.push({ text: 'LIST OF DOCUMENTS', style: 'headingUnderline', margin: [0,30,0,10], pageBreak: 'before' })
      const list = data.listOfDocuments.map((doc, i) => ({
        columns: [
          { text: `${i+1}.`, width: 20 },
          { text: doc, width: '*' }
        ],
        margin: [0,0,0,8] as [number,number,number,number]
      }))
      content.push(...list)
      content.push({ text: 'COUNSEL FOR PLAINTIFF', style: 'rightAlign', bold: true, margin: [0,30,0,0] })
    }

    content.push({ text: 'ADDRESS FOR SERVICE', style: 'headingUnderline', margin: [0,40,0,10], pageBreak: 'before' })
    if (data.advocates && data.advocates.length > 0) {
      data.advocates.forEach(a => {
        content.push({ text: `SRI ${a.name.toUpperCase()}, ${(a.qualifications||'').toUpperCase()},`, style: 'bodyText', alignment: 'center' })
      })
    } else {
      content.push({ text: '___', style: 'bodyText', alignment: 'center' })
    }
    content.push({ text: `ADVOCATES, ${(data.counselAddress||'___').toUpperCase()}`, style: 'bodyText', alignment: 'center' })
    content.push({ text: `CELL: ${data.counselPhone||''}`, style: 'bodyText', alignment: 'center' })

    return {
      content,
      styles,
      defaultStyle: { font: 'Roboto', fontSize: 12, lineHeight: 1.5 },
      pageSize: 'A4',
      pageMargins: [72, 72, 72, 72],
    }
  }
}

export const downloadPDF = (data: Partial<FormValues>) => {
  const docDefinition = generatePDFDocument(data)
  pdfMake.createPdf(docDefinition).download('LegalDocument.pdf')
}
