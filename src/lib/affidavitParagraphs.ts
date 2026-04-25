import type { FormValues } from "./schema"
import type { Content } from "pdfmake/interfaces"

function fmt(dateStr: string | undefined): string {
  if (!dateStr) return '___'
  try {
    const d = new Date(dateStr)
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    return `${dd}.${mm}.${d.getFullYear()}`
  } catch { return dateStr }
}

function para(num: number, text: string): Content {
  return {
    columns: [
      { width: 30, text: `${num}.`, style: 'bodyText', alignment: 'left' as const },
      { text, style: 'bodyText' }
    ],
    margin: [0, 0, 0, 10] as [number, number, number, number],
  }
}

export function buildAffidavitParagraphs(data: Partial<FormValues>): Content[] {
  const paragraphs: Content[] = []
  let n = 1

  // Para 1: Standing
  paragraphs.push(para(n++, 'I am the petitioner herein and plaintiff in the above said suit as such I am well acquainted with the facts of the case.'))

  // Para 2: Suit description
  paragraphs.push(para(n++, `I filed the suit for declaration of my rights as I am the absolute owner of the Plaint Schedule Property and consequential relief of permanent injunction restraining the respondents/defendants, their men or agents or anybody on his behalf from trespassing into and from interfering with my peaceful possession and enjoyment of over the Plaint Schedule Property in any manner.`))

  // Para 3: Ownership & Purchase
  if (data.surveyNumber || data.saleDeedNumber) {
    let t = `I respectfully submit that, I respectfully submit that, I am the absolute owner and possessor of ${data.propertyType?.toLowerCase() || 'agricultural'} land admeasuring ${data.propertyExtent || '___'} situated in Sy. No. ${data.surveyNumber || '___'} of ${data.village || '___'} Village, ${data.mandal || '___'} Mandal, ${data.district || '___'} District.`
    if (data.saleDeedNumber) {
      t += ` I had purchased the said land under a Registered Sale Deed bearing No. ${data.saleDeedNumber}/${data.saleDeedYear || '___'}, dated ${fmt(data.saleDeedDate)}`
      if (data.vendors && data.vendors.length > 0) {
        t += `, executed by ${data.vendors.map(v => v.name).join(' and ')}`
      }
      t += '.'
    }
    if (data.purchaseSurveyNumber && data.correctSurveyNumber && data.purchaseSurveyNumber !== data.correctSurveyNumber) {
      t += ` In the Registered Sale Deed, the survey number was mistakenly mentioned as Sy. No. ${data.purchaseSurveyNumber} instead of the correct Sy. No. ${data.correctSurveyNumber}.`
    }
    t += ` Pursuant to the said sale transaction, I was put in physical possession of the property on the date of execution of the Sale Deed itself. Since then, I have been in peaceful, continuous, and uninterrupted possession and enjoyment of the same.`
    if (data.compensationAmount) {
      t += ` It is further submitted that the Government acquired a portion of the land and awarded me compensation of Rs. ${Number(data.compensationAmount).toLocaleString('en-IN')}/-${data.compensationWords ? ` (Rupees ${data.compensationWords} only)` : ''}.`
    }
    paragraphs.push(para(n++, t))
  }

  // Para 4: Rectification Deed
  if (data.rectificationDeedNumber) {
    let t = `I further submit that, at the time of execution of Regd. Sale Deed No. ${data.saleDeedNumber || '___'}/${data.saleDeedYear || '___'}, dated ${fmt(data.saleDeedDate)}, a clerical error occurred in mentioning the Survey Number of the Plaint Schedule Property. The survey number was incorrectly stated as Sy. No. ${data.purchaseSurveyNumber || '___'}, whereas in fact, the correct Sy. No. is Sy. No. ${data.correctSurveyNumber || '___'}.`
    t += ` To rectify this inadvertent error, I have duly executed a Registered Rectification Deed bearing No. ${data.rectificationDeedNumber}/${data.rectificationDeedYear || '___'}, dated ${fmt(data.rectificationDeedDate)}, correcting the survey number in the original sale deed from Sy. No. ${data.purchaseSurveyNumber || '___'} to Sy. No. ${data.correctSurveyNumber || '___'}.`
    if (data.rectificationCircular) {
      t += ` The said rectification was carried out in accordance with ${data.rectificationCircular}.`
    }
    paragraphs.push(para(n++, t))
  }

  // Para 5: Revenue Recognition
  if (data.khataNumber) {
    let t = `I further submit that, the Revenue Authorities, upon verification of the Sale Deed and actual possession, recognized my ownership over the correct survey number, namely Sy. No. ${data.correctSurveyNumber || data.surveyNumber || '___'}, and accordingly mutated my name in the relevant revenue records`
    if (data.passbookIssued) {
      t += ` and also issued a Pattadar Passbook and Title Deed in my name under Khata No. ${data.khataNumber} for an extent of ${data.extentRecognized || data.propertyExtent || '___'} in Sy. No. ${data.correctSurveyNumber || data.surveyNumber || '___'}`
    }
    t += '.'
    paragraphs.push(para(n++, t))
  }

  // Para 6: Title Chain
  if (data.predecessors && data.predecessors.length > 0) {
    let t = `I further submit that, the above said ${data.propertyType?.toLowerCase() || 'agricultural'} land admeasuring ${data.propertyExtent || '___'} in Sy. No. ${data.surveyNumber || '___'} of ${data.village || '___'} Village, ${data.mandal || '___'} Mandal, ${data.district || '___'} District originally belonged to`
    data.predecessors.forEach((p, i) => {
      if (i === 0) {
        t += ` Sri ${p.ownerName}${p.parentage ? ', ' + p.parentage : ''}${p.residence ? ', resident of ' + p.residence : ''}.`
      }
      if (p.modeOfAcquisition === 'Sale Deed' && p.documentNumber) {
        const nextOwner = data.predecessors![i + 1]
        if (nextOwner) {
          t += ` On ${fmt(p.date)}, the said ${p.ownerName} sold the subject property to one ${nextOwner.ownerName}${nextOwner.parentage ? ', ' + nextOwner.parentage : ''}, under a Registered Sale Deed No. ${p.documentNumber}/${p.documentYear || '___'}, dated ${fmt(p.date)}, ${p.sroName || '___'}, who was put in lawful possession and enjoyment thereof.`
        }
      }
      if (p.modeOfAcquisition === 'Inheritance' && p.note) {
        t += ` After the demise of ${p.ownerName} intestate, ${p.note}`
      }
    })
    paragraphs.push(para(n++, t))
  }

  // Para 7: Impugned Sale Deed
  if (data.impugnedDeedNumber) {
    let t = `While so, I came to know that Defendant No. 1, though having no manner of right, title, or interest over any land in Sy. No. ${data.surveyNumber || '___'} of ${data.village || '___'} Village, managed to obtain a Registered Sale Deed bearing No. ${data.impugnedDeedNumber}/${data.impugnedDeedYear || '___'}, dated ${fmt(data.impugnedDeedDate)}, registered at ${data.impugnedDeedSRO || '___'}, in his favour, allegedly executed by one ${data.impugnedVendorName || '___'}${data.impugnedVendorParentage ? ', ' + data.impugnedVendorParentage : ''}${data.impugnedVendorResidence ? ', resident of ' + data.impugnedVendorResidence : ''}, for an extent of ${data.impugnedExtent || '___'}.`
    t += ` I submit that the said Registered Sale Deed is nothing but a fabricated and concocted document, brought into existence with a fraudulent and dishonest intention to lay false and baseless claims over my lawful property. In fact, neither Defendant No. 1 nor his alleged vendor or predecessor-in-title has ever owned, possessed, or enjoyed any land in Sy. No. ${data.surveyNumber || '___'}, either under a valid registered instrument or as reflected in any revenue or land records.`
    if (data.impugnedScheduleLanguage) {
      t += ` I further submit that the schedule of the said ${data.impugnedDeedYear || '___'} Sale Deed itself describes the property as "${data.impugnedScheduleLanguage}," which clearly indicates that the land sold by the original owner lies to the south of the land purportedly conveyed under the said document.`
    }
    paragraphs.push(para(n++, t))
  }

  // Para 8: Partition Deed
  if (data.partitionDeedNumber) {
    let t = `It has further come to my knowledge that the respondents/defendants, relying on the aforementioned illegal and void Registered Sale Deed No. ${data.impugnedDeedNumber || '___'} of ${data.impugnedDeedYear || '___'}, have executed a Regd. Partition Deed No. ${data.partitionDeedNumber}/${data.partitionDeedYear || '___'}, dated ${fmt(data.partitionDeedDate)}, among themselves.`
    t += ` I submit that since the very source of their title i.e., the sale deed of ${data.impugnedDeedYear || '___'} is illegal, void, and non-est in the eyes of law, the subsequent Partition Deed executed on its basis is also invalid and not binding on me.`
    if (data.partitionItemNumber) {
      t += ` Furthermore, in Item No. ${data.partitionItemNumber} of the D-Schedule of the Partition Deed No. ${data.partitionDeedNumber}/${data.partitionDeedYear || '___'}, dated ${fmt(data.partitionDeedDate)}, it is clearly mentioned that the land claimed by the Respondents/defendants in Sy. No. ${data.surveyNumber || '___'} is bounded on the southern side by the Plaint Schedule Property belongs to me. This further corroborates my lawful possession and disproves the Respondents/defendants' claims.`
    }
    paragraphs.push(para(n++, t))
  }

  // Para 9: Cause of Action / Trespass
  if (data.trespassDate || data.incidentNarrative) {
    let t = ''
    if (data.trespassDate) {
      t += `While so, relying upon the aforesaid false and fabricated documents, the Respondents/defendants, on ${fmt(data.trespassDate)}, unlawfully attempted to trespass into the Plaint Schedule Property to an extent of ${data.trespassExtent || data.propertyExtent || '___'}, with the intention of dispossessing my lawful property. However, I, with the assistance of our labourers and by asserting my lawful possession, resisted and prevented the said illegal attempt.`
    }
    if (data.incidentNarrative) {
      t += ' ' + data.incidentNarrative
    } else {
      t += ` While retreating from the property, the Respondents/defendants openly threatened me, declaring that they would take possession of the land by any means, lawful or unlawful, thereby creating a constant threat to my peaceful possession and enjoyment of the property.`
    }
    paragraphs.push(para(n++, t))
  }

  // Para 10: Law-abiding citizen
  paragraphs.push(para(n++, `I submit that being a law-abiding citizen with no political or official influence, and solely relies on the strength of her lawful title and possession over the property. In contrast, the Respondents/defendants, with ulterior motives and apparent support from unknown quarters, is attempting to unlawfully interfere with the Plaintiff's rightful possession. Hence, the Plaintiff is left with no option but to approach this Hon'ble Court for appropriate relief to safeguard her property and her legal rights.`))

  // Para 11: Scope limitation
  paragraphs.push(para(n++, `I respectfully submitted that though I am the absolute owner and possessor of a total extent of ${data.propertyExtent || '___'} in Sy. No. ${data.surveyNumber || '___'} of ${data.village || '___'} Village, the present dispute raised by the Respondents/defendants is confined only to an extent of ${data.trespassExtent || data.propertyExtent || '___'} out of the said land. Hence, I, without seeking any relief in respect of the remaining land, is presently constrained to seek declaration of title and consequential injunction only in respect of the disputed extent, which is specifically described in the Plaint Schedule Property.`))

  // Para 12: Invocation
  paragraphs.push(para(n++, `Having been left with no other recourse and being aggrieved by the deceitful and unlawful acts of the respondents/defendants, I now compelled to invoke the jurisdiction of this Hon'ble Court and seek appropriate relief for the enforcement of my rights.`))

  // Para 13: Prayer for temporary injunction (long)
  paragraphs.push(para(n++, `It is submitted that the Respondents/Defendants, having no manner of right, title, or interest over the suit schedule property, are persistently making unlawful attempts to interfere with the peaceful possession and enjoyment of the Petitioner/Plaintiff. Despite being fully aware of the Petitioner/Plaintiff's lawful ownership and long-standing possession, the Respondents/Defendants are repeatedly trying to trespass into the Petition Schedule Property, cause obstruction to agricultural operations, and threaten to dispossess her by force. Their continuous acts of interference have created a constant threat to the Petitioner/Plaintiff's enjoyment of her property and have disturbed her peaceful possession. Hence, to prevent further illegal interference and to safeguard the Petitioner/Plaintiff's lawful possession, it has become absolutely necessary that this Hon'ble Court be pleased to grant an order of temporary injunction restraining the Respondents/Defendants, their men, agents, or anyone claiming under them from interfering with the suit schedule property in any manner pending disposal of the suit.`))

  // Prima facie case paragraph (unnumbered, continuation)
  paragraphs.push({
    text: `It is respectfully submitted that the Petitioner/Plaintiff has made out a clear prima facie case in her favour, as she is the lawful owner and possessor of the suit schedule property by virtue of a valid registered Sale Deed and subsequent Rectification Deed, supported by continuous and undisputed possession for more than two decades, duly recognized by the Revenue Authorities through mutation and issuance of Pattadar Passbook and Title Deed in her name. The balance of convenience is entirely in favour of the Petitioner, as she is in settled possession and enjoyment of the property, whereas the Respondents, without any semblance of right, title, or possession, are attempting to encroach and dispossess her on the strength of false and fabricated documents. If the Respondents are not restrained by way of temporary injunction, the Petitioner will suffer irreparable loss and injury which cannot be adequately compensated in terms of money, whereas no hardship will be caused to the Respondents if the injunction is granted. Hence, it is just and necessary that this Hon'ble Court may be pleased to grant temporary injunction as prayed for to protect the lawful possession and ownership rights of the Petitioner pending disposal of the suit.`,
    style: 'bodyText',
    margin: [0, 0, 0, 10] as [number, number, number, number],
  })

  // Final prayer paragraph
  paragraphs.push({
    text: `Therefore, it is most respectfully prayed that this Hon'ble Court may be pleased to grant a temporary injunction restraining the Respondents/Defendants, their men, agents, servants, or any persons claiming under or through them from in any manner interfering with my peaceful possession and enjoyment of the Plaint Schedule Property, pending disposal of the suit, in the interest of justice; and pass such other and further orders as this Hon'ble Court may deem fit and proper in the circumstances of the case.`,
    style: 'bodyText',
    margin: [0, 0, 0, 10] as [number, number, number, number],
  })

  return paragraphs
}
