import type { DocumentTemplate } from '@/lib/sampleData'

interface TemplateSelectorProps {
  templates: DocumentTemplate[]
  selectedTemplateId: string
  onTemplateChange: (id: string) => void
}

export function TemplateSelector({ templates, selectedTemplateId, onTemplateChange }: TemplateSelectorProps) {
  return (
    <select 
      value={selectedTemplateId} 
      onChange={(e) => onTemplateChange(e.target.value)}
      className="text-xs h-9 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-slate-300 transition-colors cursor-pointer"
    >
      {templates.map(t => (
        <option key={t.id} value={t.id}>{t.name}</option>
      ))}
    </select>
  )
}
