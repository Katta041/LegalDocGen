import { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from '@/lib/schema'
import type { FormValues } from '@/lib/schema'
import { useFormStore, defaultFormData } from '@/store/useFormStore'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { downloadPDF } from '@/lib/pdfGenerator'
import { downloadDOCX } from '@/lib/docxGenerator'
import { FormSidebar } from '@/components/FormSidebar'
import { PreviewPane } from '@/components/PreviewPane'
import { LoginPage } from '@/components/LoginPage'
import { templates } from '@/lib/sampleData'
import type { DocumentTemplate } from '@/lib/sampleData'
import { FileText, Download, LogOut, User } from 'lucide-react'
import { TemplateSelector } from '@/components/TemplateSelector'

function App() {
  const { isAuthenticated, username, logout } = useAuthStore()
  const { formData, setFormData, loadSampleData, clearForm } = useFormStore()
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id)

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema as any),
    defaultValues: formData,
    mode: 'onChange'
  })

  // Autosave
  useEffect(() => {
    const subscription = methods.watch((value) => {
      setFormData(value as Partial<FormValues>)
    })
    return () => subscription.unsubscribe()
  }, [methods.watch, setFormData])

  if (!isAuthenticated) {
    return <LoginPage />
  }

  const handleExportPDF = () => {
    downloadPDF(methods.getValues())
  }

  const handleExportDOCX = () => {
    downloadDOCX(methods.getValues())
  }

  const handleTemplateChange = (id: string) => {
    setSelectedTemplateId(id)
    const template = templates.find(t => t.id === id)
    if (template) {
      loadSampleData(template.data)
      methods.reset(template.data)
    }
  }

  const handleLoadSample = () => {
    const template = templates.find(t => t.id === selectedTemplateId)
    if (template) {
      loadSampleData(template.data)
      methods.reset(template.data)
    }
  }

  const handleClear = () => {
    if(window.confirm("Are you sure you want to clear the form? This will erase all data.")) {
      localStorage.removeItem('legaldocgen-storage')
      clearForm()
      methods.reset({
        ...defaultFormData,
        respondents: [],
        predecessors: [],
        vendors: [],
        advocates: [],
      })
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 dark:text-white overflow-hidden font-sans">
      <FormProvider {...methods}>
        {/* Left Sidebar Form */}
        <div className="w-1/2 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-10 shadow-lg">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
            <div className="flex items-center space-x-2">
              <FileText className="w-6 h-6 text-blue-600" />
              <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">LegalDocGen</h1>
            </div>
            <div className="flex items-center space-x-2">
              <TemplateSelector 
                templates={templates} 
                selectedTemplateId={selectedTemplateId} 
                onTemplateChange={handleTemplateChange} 
              />
              <Button variant="outline" size="sm" onClick={handleLoadSample}>Load Sample</Button>
              <Button variant="ghost" size="sm" onClick={handleClear} className="text-red-500">Reset</Button>
              <div className="h-5 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <User className="w-3.5 h-3.5" />
                <span>{username}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={logout} className="text-slate-500 hover:text-red-500">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Form Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
            <FormSidebar />
          </div>
          
        </div>

        {/* Right Preview Pane */}
        <div className="w-1/2 flex flex-col bg-slate-100 dark:bg-slate-950 relative">
          
          {/* Export Bar */}
          <div className="absolute top-0 w-full flex items-center justify-end p-4 z-20 space-x-2 bg-gradient-to-b from-slate-100 dark:from-slate-950 to-transparent">
            <Button onClick={handleExportPDF} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={handleExportDOCX} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md">
              <Download className="w-4 h-4 mr-2" />
              Download DOCX
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-12">
             <PreviewPane data={methods.watch()} />
          </div>

        </div>
      </FormProvider>
    </div>
  )
}

export default App
