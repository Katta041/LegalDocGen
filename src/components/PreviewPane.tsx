import type { FormValues } from '@/lib/schema'
import { formatAddress, formatPetitionerAddress } from '@/lib/utils'
import { useEffect } from 'react'
import { useUIStore } from '@/store/useFormStore'
import { generateFactsString } from '@/lib/affidavitParagraphs'

interface PreviewPaneProps {
  data: Partial<FormValues>
}

export function PreviewPane({ data }: PreviewPaneProps) {
  const activeSection = useUIStore(state => state.activeSection)
  const isIA = data.petitionType?.toLowerCase().includes("interlocutory") || data.petitionType?.toLowerCase().includes("ia") || data.petitionType?.toLowerCase().includes("injunction") && !data.petitionType?.toLowerCase().includes("plaint")
  const autoFacts = generateFactsString(data)
  
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
            {data.factsOfTheCase}
            {data.factsOfTheCase && autoFacts ? '\n\n' : ''}
            {autoFacts || (!data.factsOfTheCase && '1. I am the petitioner/plaintiff herein and as such I am well acquainted with the facts of the case...')}
          </div>
          
          <div className="mt-12 text-right font-bold mb-8">DEPONENT</div>
          
          <div id="preview-section-10" className="text-justify mb-8">
            Solemnly affirmed and signed before me on this the {data.executionDate ? new Date(data.executionDate).toLocaleDateString('en-GB').replace(/\//g, '.') : '___'} at {data.executionPlace || '___'}.
          </div>
          
          <div className="text-right font-bold uppercase mb-12">ADVOCATE, {data.executionPlace?.toUpperCase() || '___'}</div>

          {/* Add Plaint Schedule Property block */}
          <div id="preview-section-4" className="mt-8 border-t border-slate-200 pt-8">
            <div className="text-center font-bold underline mb-4 uppercase">SCHEDULE OF PROPERTY</div>
            <div className="text-justify mb-4">
              An {data.propertyType||'Agricultural'} Land situated in Survey No. {data.surveyNumber||'___'}, of {data.village||'___'} Village, {data.mandal||'___'} Mandal, {data.district||'___'} District, {data.state||'___'} State, to an extent of {data.propertyExtent||'___'} within the following boundaries:
            </div>
            <div className="ml-12 mb-4 space-y-2">
              <div className="flex"><span className="w-24 font-bold">EAST</span><span>: {data.boundaryEast||'___'}</span></div>
              <div className="flex"><span className="w-24 font-bold">WEST</span><span>: {data.boundaryWest||'___'}</span></div>
              <div className="flex"><span className="w-24 font-bold">NORTH</span><span>: {data.boundaryNorth||'___'}</span></div>
              <div className="flex"><span className="w-24 font-bold">SOUTH</span><span>: {data.boundarySouth||'___'}</span></div>
            </div>
            {data.easementRights && <div className="text-justify mb-4">With all easement rights.</div>}
            <div className="text-right font-bold uppercase mt-8 mb-12">COUNSEL FOR PETITIONER/PLAINTIFF</div>
          </div>

          {/* Address for Service */}
          <div id="preview-section-9" className="mt-8 border-t border-slate-200 pt-8">
            <div className="text-center font-bold underline mb-4 uppercase">ADDRESS FOR SERVICE</div>
            {data.counselInitials && <div className="text-left font-bold mb-2 uppercase">{data.counselInitials},</div>}
            {data.advocates && data.advocates.length > 0 ? (
              data.advocates.map((a, idx) => (
                <div key={idx} className="text-center uppercase mb-1">SRI {a.name}, {a.qualifications},</div>
              ))
            ) : (
              <div className="text-center uppercase mb-1">___</div>
            )}
            <div className="text-center uppercase mb-1">ADVOCATES, {data.counselAddress?.toUpperCase() || '___'}</div>
            <div className="text-center uppercase">CELL: {data.counselPhone || '___'}</div>
          </div>

          {data.verificationText && (
            <div id="preview-section-10" className="mt-8 border-t border-slate-200 pt-8">
              <div className="text-center font-bold underline mb-4 uppercase">VERIFICATION</div>
              <div className="text-justify mb-4">{data.verificationText}</div>
              <div className="text-justify mb-4">Verified at {data.executionPlace} on this {data.executionDate ? new Date(data.executionDate).toLocaleDateString('en-GB').replace(/\//g, '.') : '___'}.</div>
              <div className="text-right font-bold mt-8 uppercase">DEPONENT</div>
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
              <div className="text-right font-bold mt-12 uppercase">COUNSEL FOR PETITIONER</div>
            </div>
          )}

          {/* Petition Block (IA) */}
          <div className="mt-16 border-t border-slate-400 pt-16">
            <div className="text-center font-bold mb-4 uppercase">{data.courtName || '___'}</div>
            <div className="text-center font-bold mb-4 uppercase">
              I.A. No. {data.iaNumber || '___'} OF {data.iaYear || '___'}<br/>
              IN<br/>
              O.S. No. {data.osNumber || '        '} OF {data.osYear || '___'}
            </div>
            <div className="text-left font-bold underline mb-4">IN THE MATTER OF:</div>
            <div className="text-justify mb-2">
              {data.petitionerSalutation || ''} {data.petitionerName || '___'}, {data.petitionerRelationPrefix || ''} {data.petitionerRelationName || ''}, aged: {data.petitionerAge || '___'} years, Occ: {data.petitionerOccupation || '___'}, residing at {formatPetitionerAddress(data)}.
            </div>
            <div className="text-right mb-4">-- Petitioner/Plaintiff</div>
            <div className="text-center font-bold mb-4">- Versus -</div>
            <div className="text-justify mb-2">
              {(data.respondents || []).map((r, i) => (
                <div key={i} className="mb-1">
                  {i + 1}. {r.salutation || ''} {r.name || ''}, {r.relationPrefix || ''} {r.relationName || ''}, Aged about: {r.age || '___'} years, Occ: {r.occupation || ''}, R/o. {formatAddress(r)}
                </div>
              ))}
            </div>
            <div className="text-right mb-12">-- Respondents/Defendants</div>

            <div className="text-center font-bold underline mb-8 uppercase">
              {data.petitionType || 'PETITION FILED ON BEHALF OF THE PETITIONER/PLAINTIFF – UNDER ORDER XXXIX RULE 1&2 R/W SECTION 151 OF CPC'}
            </div>
            <div className="text-justify mb-12">
              For the reasons stated in the accompanying affidavit, it is most respectfully prayed that this Hon'ble Court may be pleased to grant a temporary injunction restraining the Respondents/Defendants, their men, agents, servants, or any persons claiming under or through them from in any manner interfering with the Petitioner's/Plaintiff's peaceful possession and enjoyment of the Plaint Schedule Property, pending disposal of the suit, in the interest of justice; and pass such other and further orders as this Hon'ble Court may deem fit and proper in the circumstances of the case.
            </div>
            <div className="text-right font-bold uppercase mb-12">COUNSEL FOR PETITIONER/PLAINTIFF</div>
          </div>
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
          {data.factsOfTheCase}
          {data.factsOfTheCase && autoFacts ? '\n\n' : ''}
          {autoFacts || (!data.factsOfTheCase && 'It is submitted that the Plaintiff is the absolute owner and possessor of the Plaint Schedule Property. The Plaintiff acquired this property for valid sale consideration...')}
        </div>

        {/* Add Plaint Schedule Property block */}
        <div id="preview-section-4" className="mt-8 pt-8">
          <div className="text-center font-bold underline mb-4 uppercase">SCHEDULE OF PROPERTY</div>
          <div className="text-justify mb-4">
            An {data.propertyType||'Agricultural'} Land situated in Survey No. {data.surveyNumber||'___'}, of {data.village||'___'} Village, {data.mandal||'___'} Mandal, {data.district||'___'} District, {data.state||'___'} State, to an extent of {data.propertyExtent||'___'} within the following boundaries:
          </div>
          <div className="ml-12 mb-4 space-y-2">
            <div className="flex"><span className="w-24 font-bold">EAST</span><span>: {data.boundaryEast||'___'}</span></div>
            <div className="flex"><span className="w-24 font-bold">WEST</span><span>: {data.boundaryWest||'___'}</span></div>
            <div className="flex"><span className="w-24 font-bold">NORTH</span><span>: {data.boundaryNorth||'___'}</span></div>
            <div className="flex"><span className="w-24 font-bold">SOUTH</span><span>: {data.boundarySouth||'___'}</span></div>
          </div>
          {data.easementRights && <div className="text-justify mb-4">With all easement rights.</div>}
        </div>

        <div className="mt-12 flex justify-between">
          <div className="w-1/2"></div>
          <div className="w-1/2 text-right">
            <div className="font-bold mb-12 uppercase">COUNSEL FOR PLAINTIFF</div>
            <div className="font-bold mb-12 uppercase">PLAINTIFF</div>
          </div>
        </div>

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

        {/* Address for Service */}
        <div id="preview-section-9" className="mt-8 border-t border-slate-200 pt-8">
          <div className="text-center font-bold underline mb-4 uppercase">ADDRESS FOR SERVICE</div>
          {data.counselInitials && <div className="text-left font-bold mb-2 uppercase">{data.counselInitials},</div>}
          {data.advocates && data.advocates.length > 0 ? (
            data.advocates.map((a, idx) => (
              <div key={idx} className="text-center uppercase mb-1">SRI {a.name}, {a.qualifications},</div>
            ))
          ) : (
            <div className="text-center uppercase mb-1">___</div>
          )}
          <div className="text-center uppercase mb-1">ADVOCATES, {data.counselAddress?.toUpperCase() || '___'}</div>
          <div className="text-center uppercase">CELL: {data.counselPhone || '___'}</div>
        </div>
      </div>
    </div>
  )
}
