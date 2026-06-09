import { useFormContext, useFieldArray } from 'react-hook-form'
import type { FormValues } from '@/lib/schema'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2 } from 'lucide-react'
import { useUIStore } from '@/store/useFormStore'

export function FormSidebar() {
  const { register, control, setValue, watch } = useFormContext<FormValues>()
  const listOfDocuments = watch('listOfDocuments')
  const setActiveSection = useUIStore(state => state.setActiveSection)
  
  const { fields: respondentFields, append: appendRespondent, remove: removeRespondent } = useFieldArray({ control, name: 'respondents' })
  const { fields: predecessorFields, append: appendPredecessor, remove: removePredecessor } = useFieldArray({ control, name: 'predecessors' })
  const { fields: advocateFields, append: appendAdvocate, remove: removeAdvocate } = useFieldArray({ control, name: 'advocates' })

  const isIA = watch('petitionType')?.toLowerCase().includes("interlocutory") || watch('petitionType')?.toLowerCase().includes("ia") || watch('petitionType')?.toLowerCase().includes("injunction") && !watch('petitionType')?.toLowerCase().includes("plaint")

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Court Details */}
      <Card onFocusCapture={() => setActiveSection('section-1')}>
        <CardHeader><CardTitle>1. Court & Case Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Court Name</Label>
            <Input {...register('courtName')} placeholder="IN THE COURT OF..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {isIA && (
              <>
                <div className="space-y-2"><Label>I.A. Number</Label><Input {...register('iaNumber')} /></div>
                <div className="space-y-2"><Label>I.A. Year</Label><Input {...register('iaYear')} /></div>
              </>
            )}
            <div className="space-y-2"><Label>O.S. Number</Label><Input {...register('osNumber')} /></div>
            <div className="space-y-2"><Label>O.S. Year</Label><Input {...register('osYear')} /></div>
          </div>
          <div className="space-y-2">
            <Label>Petition Type</Label>
            <Input {...register('petitionType')} />
          </div>
        </CardContent>
      </Card>

      {/* 2. Petitioner Details */}
      <Card onFocusCapture={() => setActiveSection('section-2')}>
        <CardHeader><CardTitle>2. {isIA ? 'Petitioner' : 'Plaintiff'} Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2 col-span-1"><Label>Salutation</Label><Input {...register('petitionerSalutation')} placeholder="Sri/Smt." /></div>
            <div className="space-y-2 col-span-2"><Label>Full Name</Label><Input {...register('petitionerName')} /></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2 col-span-1">
              <Label>Relation</Label>
              <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:focus-visible:ring-slate-300" {...register('petitionerRelationPrefix')}>
                <option value="S/o">S/o</option>
                <option value="W/o">W/o</option>
                <option value="D/o">D/o</option>
                <option value="F/o">F/o</option>
                <option value="C/o">C/o</option>
              </select>
            </div>
            <div className="space-y-2 col-span-2"><Label>Relative Name</Label><Input {...register('petitionerRelationName')} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Age</Label><Input type="number" {...register('petitionerAge')} /></div>
            <div className="space-y-2"><Label>Occupation</Label><Input {...register('petitionerOccupation')} /></div>
          </div>
          <div className="space-y-2 pt-2"><Label className="font-semibold text-slate-700 dark:text-slate-300">Address</Label></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Village</Label><Input {...register('petitionerAddressVillage')} /></div>
            <div className="space-y-2"><Label>Mandal</Label><Input {...register('petitionerAddressMandal')} /></div>
            <div className="space-y-2"><Label>Town/City</Label><Input {...register('petitionerAddressTown')} /></div>
            <div className="space-y-2"><Label>District</Label><Input {...register('petitionerAddressDistrict')} /></div>
            <div className="space-y-2 col-span-2"><Label>State</Label><Input {...register('petitionerAddressState')} /></div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Respondents */}
      <Card onFocusCapture={() => setActiveSection('section-3')}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>3. {isIA ? 'Respondents' : 'Defendants'}</CardTitle>
          <Button type="button" size="sm" onClick={() => appendRespondent({ salutation: '', name: '', relationPrefix: 'S/o', relationName: '', addressVillage: '', addressMandal: '', addressTown: '', addressDistrict: '', addressState: '' })}>
            <Plus className="w-4 h-4 mr-2" /> Add {isIA ? 'Respondent' : 'Defendant'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {respondentFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg relative space-y-4 dark:border-slate-800">
              <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500" onClick={() => removeRespondent(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
              <Label className="text-slate-500">{isIA ? 'Respondent' : 'Defendant'} #{index + 1}</Label>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2"><Label>Salutation</Label><Input {...register(`respondents.${index}.salutation`)} /></div>
                <div className="space-y-2 col-span-2"><Label>Name</Label><Input {...register(`respondents.${index}.name`)} /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Relation</Label>
                  <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:focus-visible:ring-slate-300" {...register(`respondents.${index}.relationPrefix`)}>
                    <option value="S/o">S/o</option>
                    <option value="W/o">W/o</option>
                    <option value="D/o">D/o</option>
                    <option value="F/o">F/o</option>
                    <option value="C/o">C/o</option>
                  </select>
                </div>
                <div className="space-y-2 col-span-2"><Label>Relative Name</Label><Input {...register(`respondents.${index}.relationName`)} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Age</Label><Input type="number" {...register(`respondents.${index}.age`)} /></div>
                <div className="space-y-2"><Label>Occupation</Label><Input {...register(`respondents.${index}.occupation`)} /></div>
              </div>
              <div className="space-y-2 pt-2"><Label className="font-semibold text-slate-700 dark:text-slate-300">Address</Label></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Village</Label><Input {...register(`respondents.${index}.addressVillage`)} /></div>
                <div className="space-y-2"><Label>Mandal</Label><Input {...register(`respondents.${index}.addressMandal`)} /></div>
                <div className="space-y-2"><Label>Town/City</Label><Input {...register(`respondents.${index}.addressTown`)} /></div>
                <div className="space-y-2"><Label>District</Label><Input {...register(`respondents.${index}.addressDistrict`)} /></div>
                <div className="space-y-2 col-span-2"><Label>State</Label><Input {...register(`respondents.${index}.addressState`)} /></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 4. Property */}
      <Card onFocusCapture={() => setActiveSection('section-4')}>
        <CardHeader><CardTitle>4. Property Schedule</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Type</Label><Input {...register('propertyType')} /></div>
            <div className="space-y-2"><Label>Extent</Label><Input {...register('propertyExtent')} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Survey No.</Label><Input {...register('surveyNumber')} /></div>
            <div className="space-y-2"><Label>Village</Label><Input {...register('village')} /></div>
            <div className="space-y-2"><Label>Mandal</Label><Input {...register('mandal')} /></div>
            <div className="space-y-2"><Label>District</Label><Input {...register('district')} /></div>
            <div className="space-y-2"><Label>State</Label><Input {...register('state')} /></div>
          </div>
          <div className="space-y-2 pt-4"><Label className="font-bold">Boundaries</Label></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>East</Label><Input {...register('boundaryEast')} /></div>
            <div className="space-y-2"><Label>West</Label><Input {...register('boundaryWest')} /></div>
            <div className="space-y-2"><Label>North</Label><Input {...register('boundaryNorth')} /></div>
            <div className="space-y-2"><Label>South</Label><Input {...register('boundarySouth')} /></div>
          </div>
        </CardContent>
      </Card>

      {/* 5. Title Chain */}
      <Card onFocusCapture={() => setActiveSection('section-5')}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>5. Title Chain</CardTitle>
          <Button type="button" size="sm" onClick={() => appendPredecessor({ ownerName: '', modeOfAcquisition: 'Sale Deed' })}>
            <Plus className="w-4 h-4 mr-2" /> Add Predecessor
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {predecessorFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg relative space-y-4">
              <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500" onClick={() => removePredecessor(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
              <Label className="text-slate-500">Predecessor #{index + 1}</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Owner Name</Label><Input {...register(`predecessors.${index}.ownerName`)} /></div>
                <div className="space-y-2"><Label>Parentage</Label><Input {...register(`predecessors.${index}.parentage`)} /></div>
                <div className="space-y-2"><Label>Mode of Acquisition</Label><Input {...register(`predecessors.${index}.modeOfAcquisition`)} /></div>
                <div className="space-y-2"><Label>Document No.</Label><Input {...register(`predecessors.${index}.documentNumber`)} /></div>
                <div className="space-y-2"><Label>Doc Year</Label><Input {...register(`predecessors.${index}.documentYear`)} /></div>
                <div className="space-y-2"><Label>Date</Label><Input type="date" {...register(`predecessors.${index}.date`)} /></div>
                <div className="space-y-2"><Label>SRO Name</Label><Input {...register(`predecessors.${index}.sroName`)} /></div>
                <div className="space-y-2"><Label>Note</Label><Input {...register(`predecessors.${index}.note`)} /></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 6. Petitioner's Acquisition */}
      <Card onFocusCapture={() => setActiveSection('section-6')}>
        <CardHeader><CardTitle>6. Petitioner's Acquisition</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Sale Deed No.</Label><Input {...register('saleDeedNumber')} /></div>
            <div className="space-y-2"><Label>Sale Deed Year</Label><Input {...register('saleDeedYear')} /></div>
            <div className="space-y-2"><Label>Sale Deed Date</Label><Input type="date" {...register('saleDeedDate')} /></div>
            <div className="space-y-2"><Label>Purchase Extent</Label><Input {...register('purchaseExtent')} /></div>
            <div className="space-y-2"><Label>Purchase Sy. No.</Label><Input {...register('purchaseSurveyNumber')} /></div>
            <div className="space-y-2"><Label>Correct Sy. No.</Label><Input {...register('correctSurveyNumber')} /></div>
            <div className="space-y-2"><Label>Rectification Deed No.</Label><Input {...register('rectificationDeedNumber')} /></div>
            <div className="space-y-2"><Label>Khata No.</Label><Input {...register('khataNumber')} /></div>
          </div>
        </CardContent>
      </Card>

      {/* 7. Defendants' Impugned Documents */}
      <Card onFocusCapture={() => setActiveSection('section-7')}>
        <CardHeader><CardTitle>7. Impugned Documents</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Impugned Deed No.</Label><Input {...register('impugnedDeedNumber')} /></div>
            <div className="space-y-2"><Label>Impugned Year</Label><Input {...register('impugnedDeedYear')} /></div>
            <div className="space-y-2"><Label>Partition Deed No.</Label><Input {...register('partitionDeedNumber')} /></div>
            <div className="space-y-2"><Label>Partition Year</Label><Input {...register('partitionDeedYear')} /></div>
          </div>
        </CardContent>
      </Card>

      {/* 8. Cause of Action */}
      <Card onFocusCapture={() => setActiveSection('section-8')}>
        <CardHeader><CardTitle>8. Cause of Action</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Trespass Date</Label><Input type="date" {...register('trespassDate')} /></div>
            <div className="space-y-2"><Label>Extent Attempted</Label><Input {...register('trespassExtent')} /></div>
          </div>
          <div className="space-y-2">
            <Label>Cause of Action Narrative</Label>
            <Textarea className="h-24" {...register('incidentNarrative')} />
          </div>
          <div className="space-y-2 pt-4">
            <Label className="font-semibold">Facts of the Case / Affidavit Details</Label>
            <Textarea className="h-40" {...register('factsOfTheCase')} placeholder="It is submitted that the Plaintiff is the absolute owner..." />
          </div>
        </CardContent>
      </Card>

      {/* 9. Counsel */}
      <Card onFocusCapture={() => setActiveSection('section-9')}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>9. Counsel</CardTitle>
          <Button type="button" size="sm" onClick={() => appendAdvocate({ name: '', qualifications: '', isPrimary: false })}>
            <Plus className="w-4 h-4 mr-2" /> Add Advocate
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Counsel Address</Label><Input {...register('counselAddress')} /></div>
            <div className="space-y-2"><Label>Counsel Phone</Label><Input {...register('counselPhone')} /></div>
            <div className="space-y-2"><Label>Counsel Initials</Label><Input {...register('counselInitials')} /></div>
          </div>
          {advocateFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg relative space-y-4">
              <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500" onClick={() => removeAdvocate(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
              <Label className="text-slate-500">Advocate #{index + 1}</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Name</Label><Input {...register(`advocates.${index}.name`)} /></div>
                <div className="space-y-2"><Label>Qualifications</Label><Input {...register(`advocates.${index}.qualifications`)} /></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 10. Execution */}
      <Card onFocusCapture={() => setActiveSection('section-10')}>
        <CardHeader><CardTitle>10. Execution</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Execution Place</Label><Input {...register('executionPlace')} /></div>
            <div className="space-y-2"><Label>Execution Date</Label><Input type="date" {...register('executionDate')} /></div>
          </div>
          <div className="space-y-2">
            <Label>Verification Text</Label>
            <Textarea className="h-24" {...register('verificationText')} />
          </div>
          <div className="space-y-2">
            <Label>List of Documents (comma separated)</Label>
            <Textarea 
              className="h-24" 
              placeholder="Sale deed, Encumbrance certificate..." 
              onChange={(e) => {
                const val = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                setValue('listOfDocuments', val, { shouldValidate: true, shouldDirty: true });
              }}
              value={listOfDocuments?.join(', ') || ''}
            />
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
