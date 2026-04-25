import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { FormValues } from "@/lib/schema"

export interface Draft {
  id: string
  name: string
  updatedAt: string
  data: Partial<FormValues>
}

interface FormState {
  activeDraftId: string | null
  formData: Partial<FormValues>
  savedDrafts: Draft[]
  
  // Actions
  setFormData: (data: Partial<FormValues>) => void
  saveDraft: (name: string) => void
  loadDraft: (id: string) => void
  deleteDraft: (id: string) => void
  clearForm: () => void
  loadSampleData: (sample: Partial<FormValues>) => void
}

export const defaultFormData: Partial<FormValues> = {
  courtName: "IN THE COURT OF HON'BLE PRINCIPAL CIVIL JUDGE (SENIOR DIVISION), KURNOOL",
  iaYear: new Date().getFullYear().toString(),
  osYear: new Date().getFullYear().toString(),
  petitionType: "Temporary Injunction under Order XXXIX Rule 1 & 2 r/w Section 151 CPC",
  easementRights: true,
  passbookIssued: false,
  executionPlace: "Kurnool",
  executionDate: new Date().toISOString().split("T")[0],
  respondents: [],
  predecessors: [],
  vendors: [],
  advocates: [],
}

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      activeDraftId: null,
      formData: defaultFormData,
      savedDrafts: [],

      setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
      
      saveDraft: (name) => {
        const { formData, savedDrafts, activeDraftId } = get()
        const now = new Date().toISOString()
        
        if (activeDraftId) {
          // Update existing draft
          set({
            savedDrafts: savedDrafts.map(d => 
              d.id === activeDraftId ? { ...d, name, updatedAt: now, data: formData } : d
            )
          })
        } else {
          // Create new draft
          const newDraft: Draft = {
            id: crypto.randomUUID(),
            name,
            updatedAt: now,
            data: formData
          }
          set({ savedDrafts: [...savedDrafts, newDraft], activeDraftId: newDraft.id })
        }
      },

      loadDraft: (id) => {
        const draft = get().savedDrafts.find(d => d.id === id)
        if (draft) {
          set({ activeDraftId: draft.id, formData: draft.data })
        }
      },

      deleteDraft: (id) => {
        set((state) => ({
          savedDrafts: state.savedDrafts.filter(d => d.id !== id),
          ...(state.activeDraftId === id ? { activeDraftId: null, formData: defaultFormData } : {})
        }))
      },

      clearForm: () => {
        set({ activeDraftId: null, formData: defaultFormData })
      },

      loadSampleData: (sample) => {
        set({ activeDraftId: null, formData: { ...defaultFormData, ...sample } })
      }
    }),
    {
      name: "legaldocgen-storage",
    }
  )
)
