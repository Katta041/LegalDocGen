import type { FormValues } from '@/lib/schema'
import { formatAddress, formatPetitionerAddress } from '@/lib/utils'
import { useEffect } from 'react'
import { useUIStore } from '@/store/useFormStore'

interface PreviewPaneProps {
  data: Partial<FormValues>
}

export function PreviewPane({ data }: PreviewPaneProps) {
  const activeSection = useUIStore(state => state.activeSection)
  const isIA = data.petitionType?.toLowerCase().includes("interlocutory") || data.petitionType?.toLowerCase().includes("ia") || data.petitionType?.toLowerCase().includes("injunction") && !data.petitionType?.toLowerCase().includes("plaint")
  
  useEffect(() => {
    if (activeSection) {
      const el = document.getElementById(`preview-${activeSection}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [activeSection])

  const respondentsList = data.respondents?.map((r, i) => `${i + 1}. ${r.salutation} ${r.name}, ${r.relationPrefix} ${r.relationName}, aged about ${r.age} years, ${r.occupation}, R/o ${formatAddress(r)}`).join('\n') || ''

  if (isIA) {
    return (
      <div className="flex flex-col items-center space-y-8 pb-12">
        {/* Page 1: Affidavit */}
        <div className="w-[794px] min-h-[1123px] bg-white shadow-xl p-[72px] font-serif text-[16px] leading-[1.5] text-black shrink-0 relative">
          <div id="preview-section-1" className="text-center font-bold text-[18px] mb-4 uppercase">{data.courtName}</div>
          <div className="text-center font-bold uppercase">I.A. No. {data.iaNumber || '___'} OF {data.iaYear || '___'}</div>
          <div className="text-center font-bold uppercase">IN</div>
          <div className="text-center font-bold mb-4 uppercase">O.S. No. {data.osNumber || '___'} OF {data.osYear || '___'}</div>
          
          <div className="font-bold underline mb-4 uppercase">IN THE MATTER OF:</div>
          <div id="preview-section-2" className="text-justify mb-2">
            {data.petitionerSalutation} {data.petitionerName}, {data.petitionerRelationPrefix} {data.petitionerRelationName}, aged about {data.petitionerAge} years, {data.petitionerOccupation}, R/o {formatPetitionerAddress(data)}
          </div>
          <div className="text-right mb-4">...Petitioner/Plaintiff</div>
          
          <div className="text-center font-bold mb-4 uppercase">-Versus-</div>
          
          <div id="preview-section-3" className="text-justify mb-2 whitespace-pre-wrap">{respondentsList}</div>
          <div className="text-right mb-8">...Respondents/Defendants</div>

          <div className="text-center font-bold underline mb-6 uppercase">AFFIDAVIT OF THE PETITIONER/PLAINTIFF</div>
          
          <div className="text-justify mb-4">
            I, {data.petitionerSalutation} {data.petitionerName}, {data.petitionerRelationPrefix} {data.petitionerRelationName}, aged about {data.petitionerAge} years, resident of {formatPetitionerAddress(data)}, do hereby solemnly affirm and state on oath as follows:
          </div>

          <div id="preview-section-8" className="text-justify mb-4 whitespace-pre-wrap">
            {data.factsOfTheCase || '1. I am the petitioner/plaintiff herein and as such I am well acquainted with the facts of the case.\n\n2. I filed the suit for declaration of my rights...'}
          </div>
          
          <div className="mt-12 text-right font-bold mb-8">DEPONENT</div>
          
          <div id="preview-section-10" className="text-justify mb-8">
            Solemnly affirmed and signed before me on this the {data.executionDate ? new Date(data.executionDate).toLocaleDateString('en-GB').replace(/\//g, '.') : '___'} at {data.executionPlace || '___'}.
          </div>
          
          <div className="text-right font-bold uppercase">ADVOCATE, {data.executionPlace?.toUpperCase() || '___'}</div>
        </div>
      </div>
    )
  }

  // Default: Main Plaint view
  return (
    <div className="flex flex-col items-center space-y-8 pb-12">
      {/* Page 1: Plaint */}
      <div className="w-[794px] min-h-[1123px] bg-white shadow-xl p-[72px] font-serif text-[16px] leading-[1.5] text-black shrink-0 relative">
        <div id="preview-section-1" className="text-center font-bold text-[18px] mb-4 uppercase">{data.courtName}</div>
        <div className="text-center font-bold uppercase mb-4 whitespace-pre">O.S. NO. {data.osNumber || '        '} OF {data.osYear || '___'}</div>
        
        <div className="font-bold underline mb-4 uppercase">IN THE MATTER OF:</div>
        <div className="text-justify mb-2">
          {data.petitionerSalutation} {data.petitionerName}
        </div>
        <div className="text-right mb-4">--Plaintiff</div>
        
        <div className="text-center font-bold mb-4 uppercase">Versus</div>
        
        <div className="text-justify mb-2">
          {data.respondents && data.respondents.length > 0 ? `${data.respondents[0].salutation} ${data.respondents[0].name} & ${data.respondents.length - 1} Ors.,` : '___'}
        </div>
        <div className="text-right mb-8">--Defendants</div>

        <div className="text-center font-bold underline mb-6 uppercase">{data.petitionType || 'PLAINT FILED ON BEHALF OF THE PLAINTIFF'}</div>
        
        <div className="font-bold mb-2 uppercase">Description of the Plaintiff:</div>
        <div id="preview-section-2" className="text-justify mb-6">
          {data.petitionerSalutation} {data.petitionerName}, {data.petitionerRelationPrefix} {data.petitionerRelationName}, Aged about: {data.petitionerAge} years, Occ: {data.petitionerOccupation}, R/o {formatPetitionerAddress(data)}.
        </div>

        <div className="font-bold mb-2 uppercase">Description of the Defendants:</div>
        <div id="preview-section-3" className="text-justify mb-6 whitespace-pre-wrap">{respondentsList}</div>

        <div className="font-bold mb-2 uppercase">Facts of the case:</div>
        <div id="preview-section-8" className="text-justify mb-4 whitespace-pre-wrap">
          {data.factsOfTheCase || 'It is submitted that the Plaintiff is the absolute owner and possessor of the Plaint Schedule Property. The Plaintiff acquired this property for valid sale consideration...'}
        </div>

        <div className="mt-12 text-right font-bold mb-8 uppercase">COUNSEL FOR PLAINTIFF</div>
        <div className="text-right font-bold mb-12 uppercase">PLAINTIFF</div>

        {data.verificationText && (
          <div id="preview-section-10" className="mt-8 border-t border-slate-200 pt-8">
            <div className="text-center font-bold underline mb-4 uppercase">VERIFICATION</div>
            <div className="text-justify mb-4">{data.verificationText}</div>
            <div className="text-justify mb-4">Verified at {data.executionPlace} on this {data.executionDate ? new Date(data.executionDate).toLocaleDateString('en-GB').replace(/\//g, '.') : '___'}.</div>
            <div className="text-right font-bold mt-8 uppercase">PLAINTIFF</div>
          </div>
        )}

        {data.listOfDocuments && data.listOfDocuments.length > 0 && (
          <div className="mt-12">
            <div className="text-center font-bold underline mb-4 uppercase">LIST OF DOCUMENTS</div>
            <div className="space-y-2">
              {data.listOfDocuments.map((doc, idx) => (
                <div key={idx} className="flex gap-2 text-justify">
                  <span>{idx + 1}.</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
            <div className="text-right font-bold mt-12 uppercase">COUNSEL FOR PLAINTIFF</div>
          </div>
        )}
      </div>
    </div>
  )
}
