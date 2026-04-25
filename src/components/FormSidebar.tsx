import { useFormContext, useFieldArray } from 'react-hook-form'
import type { FormValues } from '@/lib/schema'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2 } from 'lucide-react'

export function FormSidebar() {
  const { register, control } = useFormContext<FormValues>()
  
  const { fields: respondentFields, append: appendRespondent, remove: removeRespondent } = useFieldArray({ control, name: 'respondents' })
  const { append: _appendPredecessor, remove: _removePredecessor } = useFieldArray({ control, name: 'predecessors' })
  const { append: _appendAdvocate, remove: _removeAdvocate } = useFieldArray({ control, name: 'advocates' })

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Court Details */}
      <Card>
        <CardHeader><CardTitle>1. Court & Case Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Court Name</Label>
            <Input {...register('courtName')} placeholder="IN THE COURT OF..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>I.A. Number</Label><Input {...register('iaNumber')} /></div>
            <div className="space-y-2"><Label>I.A. Year</Label><Input {...register('iaYear')} /></div>
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
      <Card>
        <CardHeader><CardTitle>2. Petitioner Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2 col-span-1"><Label>Salutation</Label><Input {...register('petitionerSalutation')} placeholder="Sri/Smt." /></div>
            <div className="space-y-2 col-span-2"><Label>Full Name</Label><Input {...register('petitionerName')} /></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2 col-span-1"><Label>Relation</Label><Input {...register('petitionerRelationPrefix')} placeholder="S/o, W/o" /></div>
            <div className="space-y-2 col-span-2"><Label>Relative Name</Label><Input {...register('petitionerRelationName')} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Age</Label><Input type="number" {...register('petitionerAge')} /></div>
            <div className="space-y-2"><Label>Occupation</Label><Input {...register('petitionerOccupation')} /></div>
          </div>
          <div className="space-y-2"><Label>Address</Label><Textarea {...register('petitionerAddress')} /></div>
        </CardContent>
      </Card>

      {/* 3. Respondents */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>3. Respondents</CardTitle>
          <Button type="button" size="sm" onClick={() => appendRespondent({ salutation: '', name: '', relationPrefix: '', relationName: '', address: '' })}>
            <Plus className="w-4 h-4 mr-2" /> Add Respondent
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {respondentFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg relative space-y-4 dark:border-slate-800">
              <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500" onClick={() => removeRespondent(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
              <Label className="text-slate-500">Respondent #{index + 1}</Label>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2"><Label>Salutation</Label><Input {...register(`respondents.${index}.salutation`)} /></div>
                <div className="space-y-2 col-span-2"><Label>Name</Label><Input {...register(`respondents.${index}.name`)} /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2"><Label>Relation</Label><Input {...register(`respondents.${index}.relationPrefix`)} /></div>
                <div className="space-y-2 col-span-2"><Label>Relative Name</Label><Input {...register(`respondents.${index}.relationName`)} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Age</Label><Input type="number" {...register(`respondents.${index}.age`)} /></div>
                <div className="space-y-2"><Label>Occupation</Label><Input {...register(`respondents.${index}.occupation`)} /></div>
              </div>
              <div className="space-y-2"><Label>Address</Label><Textarea {...register(`respondents.${index}.address`)} /></div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 4. Property */}
      <Card>
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

      {/* 8. Cause of Action */}
      <Card>
        <CardHeader><CardTitle>8. Cause of Action</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Trespass Date</Label><Input type="date" {...register('trespassDate')} /></div>
            <div className="space-y-2"><Label>Extent Attempted</Label><Input {...register('trespassExtent')} /></div>
          </div>
          <div className="space-y-2">
            <Label>Narrative</Label>
            <Textarea className="h-32" {...register('incidentNarrative')} />
          </div>
        </CardContent>
      </Card>

      {/* 10. Execution */}
      <Card>
        <CardHeader><CardTitle>10. Execution</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Execution Place</Label><Input {...register('executionPlace')} /></div>
            <div className="space-y-2"><Label>Execution Date</Label><Input type="date" {...register('executionDate')} /></div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
