import type { FormValues } from '@/lib/schema'

interface PreviewPaneProps {
  data: Partial<FormValues>
}

export function PreviewPane({ data }: PreviewPaneProps) {
  const isIA = !!data.iaNumber || data.petitionType?.toLowerCase().includes("interlocutory") || data.petitionType?.toLowerCase().includes("ia")
  
  const respondentsList = data.respondents?.map((r, i) => `${i + 1}. ${r.salutation} ${r.name}, ${r.relationPrefix} ${r.relationName}, aged about ${r.age} years, ${r.occupation}, R/o ${r.address}`).join('\n') || ''

  if (isIA) {
    return (
      <div className="flex flex-col items-center space-y-8 pb-12">
        {/* Page 1: Affidavit */}
        <div className="w-[794px] min-h-[1123px] bg-white shadow-xl p-[72px] font-serif text-[16px] leading-[1.5] text-black shrink-0 relative">
          <div className="text-center font-bold text-[18px] mb-4 uppercase">{data.courtName}</div>
          <div className="text-center font-bold uppercase">I.A. No. {data.iaNumber || '___'} OF {data.iaYear || '___'}</div>
          <div className="text-center font-bold uppercase">IN</div>
          <div className="text-center font-bold mb-4 uppercase">O.S. No. {data.osNumber || '___'} OF {data.osYear || '___'}</div>
          
          <div className="font-bold underline mb-4 uppercase">IN THE MATTER OF:</div>
          <div className="text-justify mb-2">
            {data.petitionerSalutation} {data.petitionerName}, {data.petitionerRelationPrefix} {data.petitionerRelationName}, aged about {data.petitionerAge} years, {data.petitionerOccupation}, R/o {data.petitionerAddress}
          </div>
          <div className="text-right mb-4">...Petitioner/Plaintiff</div>
          
          <div className="text-center font-bold mb-4 uppercase">-Versus-</div>
          
          <div className="text-justify mb-2 whitespace-pre-wrap">{respondentsList}</div>
          <div className="text-right mb-8">...Respondents/Defendants</div>

          <div className="text-center font-bold underline mb-6 uppercase">AFFIDAVIT OF THE PETITIONER/PLAINTIFF</div>
          
          <div className="text-justify mb-4">
            I, {data.petitionerSalutation} {data.petitionerName}, {data.petitionerRelationPrefix} {data.petitionerRelationName}, aged about {data.petitionerAge} years, resident of {data.petitionerAddress}, do hereby solemnly affirm and state on oath as follows:
          </div>

          <div className="flex mb-4">
            <div className="w-12 shrink-0 text-left pr-2">1.</div>
            <div className="text-justify">I am the petitioner/plaintiff herein and as such I am well acquainted with the facts of the case.</div>
          </div>

          <div className="flex mb-4">
            <div className="w-12 shrink-0 text-left pr-2">2.</div>
            <div className="text-justify">I filed the suit for declaration of my rights as I am the absolute owner of the Plaint Schedule Property and consequential relief of permanent injunction...</div>
          </div>
          
          <div className="mt-12 text-right font-bold mb-8">DEPONENT</div>
          
          <div className="text-justify mb-8">
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
        <div className="text-center font-bold text-[18px] mb-4 uppercase">{data.courtName}</div>
        <div className="text-center font-bold uppercase mb-4">O.S. NO. {data.osNumber || '___'} OF {data.osYear || '___'}</div>
        
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

        <div className="text-center font-bold underline mb-6 uppercase">PLAINT FILED ON BEHALF OF THE PLAINTIFF UNDER ORDER VII RULES 1 & 2 OF THE CODE OF CIVIL PROCEDURE</div>
        
        <div className="font-bold mb-2 uppercase">Description of the Plaintiff:</div>
        <div className="text-justify mb-6">
          {data.petitionerSalutation} {data.petitionerName}, {data.petitionerRelationPrefix} {data.petitionerRelationName}, Aged about: {data.petitionerAge} years, Occ: {data.petitionerOccupation}, R/o {data.petitionerAddress}.
        </div>

        <div className="font-bold mb-2 uppercase">Description of the Defendants:</div>
        <div className="text-justify mb-6 whitespace-pre-wrap">{respondentsList}</div>

        <div className="font-bold mb-2 uppercase">Facts of the case:</div>
        <div className="text-justify mb-4">
          It is submitted that the Plaintiff is the absolute owner and possessor of the Plaint Schedule Property. The Plaintiff acquired this property for valid sale consideration...
        </div>

        <div className="mt-12 text-right font-bold mb-8 uppercase">COUNSEL FOR PLAINTIFF</div>
        <div className="text-right font-bold mb-12 uppercase">PLAINTIFF</div>

        {data.verificationText && (
          <div className="mt-8 border-t border-slate-200 pt-8">
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
