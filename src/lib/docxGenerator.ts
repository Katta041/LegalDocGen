import { Document, Paragraph, TextRun, AlignmentType, convertInchesToTwip, Packer } from "docx"
import { saveAs } from "file-saver"
import type { FormValues } from "./schema"
import { formatAddress, formatPetitionerAddress } from "./utils"

export function generateDOCXDocument(data: Partial<FormValues>): Document {
  const isIA = data.petitionType?.toLowerCase().includes("interlocutory") || data.petitionType?.toLowerCase().includes("ia") || data.petitionType?.toLowerCase().includes("injunction") && !data.petitionType?.toLowerCase().includes("plaint")
  const respondentsList = data.respondents?.map((r, i) => `${i + 1}. ${r.salutation} ${r.name}, ${r.relationPrefix} ${r.relationName}, aged about ${r.age} years, ${r.occupation}, R/o ${formatAddress(r)}`).join('\n') || ''

  if (isIA) {
    const buildCauseTitle = () => [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: data.courtName || '', bold: true, size: 28, font: "Times New Roman" })],
        spacing: { after: 200 }
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: `I.A. No. ${data.iaNumber || '___'} OF ${data.iaYear || '___'}`, bold: true, size: 24, font: "Times New Roman" })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: `IN`, bold: true, size: 24, font: "Times New Roman" })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: `O.S. No. ${data.osNumber || '        '} OF ${data.osYear || '___'}`, bold: true, size: 24, font: "Times New Roman" })],
        spacing: { after: 200 }
      }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [new TextRun({ text: 'IN THE MATTER OF:', bold: true, underline: {}, size: 24, font: "Times New Roman" })],
        spacing: { after: 200 }
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [new TextRun({ text: `${data.petitionerSalutation} ${data.petitionerName}, ${data.petitionerRelationPrefix} ${data.petitionerRelationName}, aged about ${data.petitionerAge} years, ${data.petitionerOccupation}, R/o ${formatPetitionerAddress(data)}`, size: 24, font: "Times New Roman" })],
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: '...Petitioner/Plaintiff', size: 24, font: "Times New Roman" })],
        spacing: { after: 100 }
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: '-Versus-', bold: true, size: 24, font: "Times New Roman" })],
        spacing: { after: 100 }
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [new TextRun({ text: respondentsList, size: 24, font: "Times New Roman" })],
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: '...Respondents/Defendants', size: 24, font: "Times New Roman" })],
        spacing: { after: 400 }
      }),
    ]

    return new Document({
      styles: {
        default: {
          document: {
            run: { size: 24, font: "Times New Roman" },
            paragraph: { spacing: { line: 360 } } // 1.5 spacing
          }
        }
      },
      sections: [
        {
          properties: {
            page: {
              margin: { top: convertInchesToTwip(1), right: convertInchesToTwip(1), bottom: convertInchesToTwip(1), left: convertInchesToTwip(1) }
            }
          },
          children: [
            ...buildCauseTitle(),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: 'AFFIDAVIT OF THE PETITIONER/PLAINTIFF', bold: true, underline: {}, size: 24 })],
              spacing: { after: 300 }
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [new TextRun({ text: `I, ${data.petitionerName}, ${data.petitionerRelationPrefix} ${data.petitionerRelationName}, aged about ${data.petitionerAge} years, ${data.petitionerOccupation}, resident of ${formatPetitionerAddress(data)}, do hereby solemnly affirm and state on oath as follows:` })],
              spacing: { after: 200 }
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({ text: data.factsOfTheCase || '1. I am the petitioner/plaintiff herein and as such I am well acquainted with the facts of the case.\n\n2. I filed the suit for declaration of my rights...' })
              ],
              spacing: { after: 200 }
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ text: 'DEPONENT', bold: true })],
              spacing: { before: 600, after: 400 }
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [new TextRun({ text: `Solemnly affirmed and signed before me on this the ${data.executionDate ? new Date(data.executionDate).toLocaleDateString('en-GB').split('/').join('.') : ''} at ${data.executionPlace}.` })],
              spacing: { after: 400 }
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ text: `ADVOCATE, ${data.executionPlace?.toUpperCase()}`, bold: true })],
            })
          ]
        },
        {
          children: [
            ...buildCauseTitle(),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: 'PETITION FILED ON BEHALF OF THE PETITIONER/PLAINTIFF – UNDER ORDER XXXIX RULE 1&2 R/W SECTION 151 OF CPC', bold: true, underline: {} })],
              spacing: { after: 300 }
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [new TextRun({ text: 'For the reasons stated in the accompanying affidavit, it is prayed that the Hon\'ble Court may be pleased to grant a Temporary Injunction restraining the respondents/defendants and their men from interfering with the petitioner/plaintiff\'s peaceful possession and enjoyment of the schedule property pending disposal of the suit and pass such other order or orders as the Hon\'ble Court may deem fit and proper in the circumstances of the case.' })],
              spacing: { after: 600 }
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ text: 'COUNSEL FOR PETITIONER/PLAINTIFF', bold: true })],
              spacing: { after: 400 }
            }),
          ]
        }
      ]
    })
  } else {
    // MAIN PLAINT
    return new Document({
      styles: {
        default: {
          document: {
            run: { size: 24, font: "Times New Roman" },
            paragraph: { spacing: { line: 360 } }
          }
        }
      },
      sections: [{
        properties: {
          page: {
            margin: { top: convertInchesToTwip(1), right: convertInchesToTwip(1), bottom: convertInchesToTwip(1), left: convertInchesToTwip(1) }
          }
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: data.courtName || '', bold: true, size: 28 })],
            spacing: { after: 200 }
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: `O.S. NO. ${data.osNumber || '        '} OF ${data.osYear || '___'}`, bold: true, size: 24 })],
            spacing: { after: 200 }
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [new TextRun({ text: 'IN THE MATTER OF:', bold: true, underline: {}, size: 24 })],
            spacing: { after: 200 }
          }),
          new Paragraph({
            children: [new TextRun({ text: `${data.petitionerSalutation} ${data.petitionerName}`, size: 24 })],
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: '--Plaintiff', size: 24 })],
            spacing: { after: 200 }
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: 'Versus', bold: true, size: 24 })],
            spacing: { after: 200 }
          }),
          new Paragraph({
            children: [new TextRun({ text: data.respondents && data.respondents.length > 0 ? `${data.respondents[0].salutation} ${data.respondents[0].name} & ${data.respondents.length - 1} Ors.,` : '___', size: 24 })],
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: '--Defendants', size: 24 })],
            spacing: { after: 400 }
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: data.petitionType?.toUpperCase() || 'PLAINT FILED ON BEHALF OF THE PLAINTIFF UNDER ORDER VII RULES 1 & 2 OF THE CODE OF CIVIL PROCEDURE', bold: true, underline: {} })],
            spacing: { after: 400 }
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Description of the Plaintiff:', bold: true, underline: {} })],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [new TextRun({ text: `${data.petitionerSalutation} ${data.petitionerName}, ${data.petitionerRelationPrefix} ${data.petitionerRelationName}, Aged about: ${data.petitionerAge} years, Occ: ${data.petitionerOccupation}, R/o ${formatPetitionerAddress(data)}.` })],
            spacing: { after: 200 }
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Description of the Defendants:', bold: true, underline: {} })],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [new TextRun({ text: respondentsList })],
            spacing: { after: 400 }
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Facts of the case:', bold: true, underline: {} })],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [new TextRun({ text: data.factsOfTheCase || 'It is submitted that the Plaintiff is the absolute owner and possessor of the Plaint Schedule Property. The Plaintiff acquired this property for valid sale consideration...' })],
            spacing: { after: 600 }
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: 'COUNSEL FOR PLAINTIFF', bold: true })],
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: 'PLAINTIFF', bold: true })],
          }),
          ...(data.verificationText ? [
            new Paragraph({ text: "", pageBreakBefore: true }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: 'VERIFICATION', bold: true, underline: {} })],
              spacing: { after: 300 }
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [new TextRun({ text: data.verificationText })],
              spacing: { after: 200 }
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [new TextRun({ text: `Verified at ${data.executionPlace} on this the ${data.executionDate ? new Date(data.executionDate).toLocaleDateString('en-GB').split('/').join('.') : ''}.` })],
              spacing: { after: 400 }
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ text: 'PLAINTIFF', bold: true })],
            })
          ] : []),
          ...(data.listOfDocuments && data.listOfDocuments.length > 0 ? [
            new Paragraph({ text: "", pageBreakBefore: true }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: 'LIST OF DOCUMENTS', bold: true, underline: {} })],
              spacing: { after: 300 }
            }),
            ...data.listOfDocuments.map((doc, i) => new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [new TextRun({ text: `${i+1}.\t${doc}` })],
              spacing: { after: 100 }
            })),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ text: 'COUNSEL FOR PLAINTIFF', bold: true })],
              spacing: { before: 400 }
            })
          ] : [])
        ]
      }]
    })
  }
}

export const downloadDOCX = async (data: Partial<FormValues>) => {
  const doc = generateDOCXDocument(data)
  const blob = await Packer.toBlob(doc)
  saveAs(blob, "LegalDocument.docx")
}
