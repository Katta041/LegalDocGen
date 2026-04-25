import { z } from "zod"

export const respondentSchema = z.object({
  id: z.string().optional(),
  salutation: z.string().min(1, "Required"),
  name: z.string().min(1, "Name is required"),
  relationPrefix: z.string().min(1, "Required"),
  relationName: z.string().min(1, "Required"),
  age: z.number().or(z.string()).optional(),
  occupation: z.string().optional(),
  address: z.string().min(1, "Address is required"),
})

export const predecessorSchema = z.object({
  id: z.string().optional(),
  ownerName: z.string().min(1, "Required"),
  parentage: z.string().optional(),
  residence: z.string().optional(),
  modeOfAcquisition: z.string().min(1, "Required"),
  documentNumber: z.string().optional(),
  documentYear: z.string().optional(),
  date: z.string().optional(),
  sroName: z.string().optional(),
  note: z.string().optional(),
})

export const vendorSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Required"),
})

export const advocateSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Required"),
  qualifications: z.string().optional(),
  isPrimary: z.boolean().optional().default(false),
})

export const formSchema = z.object({
  // 1. Court & Case Details
  courtName: z.string().min(1, "Court name is required"),
  iaNumber: z.string().optional(),
  iaYear: z.string().optional(),
  osNumber: z.string().optional(),
  osYear: z.string().optional(),
  petitionType: z.string().min(1, "Petition type is required"),
  petitionTypeOther: z.string().optional(),

  // 2. Petitioner Details
  petitionerSalutation: z.string().min(1, "Required"),
  petitionerName: z.string().min(1, "Required"),
  petitionerRelationPrefix: z.string().min(1, "Required"),
  petitionerRelationName: z.string().min(1, "Required"),
  petitionerAge: z.number().or(z.string()).optional(),
  petitionerOccupation: z.string().optional(),
  petitionerAddress: z.string().min(1, "Required"),

  // 3. Respondents
  respondents: z.array(respondentSchema).min(1, "At least one respondent is required"),

  // 4. Property Schedule
  propertyType: z.string().min(1, "Required"),
  propertyExtent: z.string().min(1, "Required"),
  surveyNumber: z.string().min(1, "Required"),
  village: z.string().min(1, "Required"),
  mandal: z.string().min(1, "Required"),
  district: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  boundaryEast: z.string().min(1, "Required"),
  boundaryWest: z.string().min(1, "Required"),
  boundaryNorth: z.string().min(1, "Required"),
  boundarySouth: z.string().min(1, "Required"),
  easementRights: z.boolean().default(true),

  // 5. Title Chain
  predecessors: z.array(predecessorSchema).optional(),

  // 6. Petitioner's Acquisition
  saleDeedNumber: z.string().optional(),
  saleDeedYear: z.string().optional(),
  saleDeedDate: z.string().optional(),
  saleDeedSRO: z.string().optional(),
  vendors: z.array(vendorSchema).optional(),
  purchaseExtent: z.string().optional(),
  purchaseSurveyNumber: z.string().optional(),
  correctSurveyNumber: z.string().optional(),
  rectificationDeedNumber: z.string().optional(),
  rectificationDeedYear: z.string().optional(),
  rectificationDeedDate: z.string().optional(),
  rectificationCircular: z.string().optional(),
  khataNumber: z.string().optional(),
  extentRecognized: z.string().optional(),
  passbookIssued: z.boolean().default(false),
  compensationAmount: z.string().optional(),
  compensationWords: z.string().optional(),

  // 7. Defendants' Impugned Documents
  impugnedDeedNumber: z.string().optional(),
  impugnedDeedYear: z.string().optional(),
  impugnedDeedDate: z.string().optional(),
  impugnedDeedSRO: z.string().optional(),
  impugnedVendorName: z.string().optional(),
  impugnedVendorParentage: z.string().optional(),
  impugnedVendorResidence: z.string().optional(),
  impugnedExtent: z.string().optional(),
  impugnedScheduleLanguage: z.string().optional(),
  partitionDeedNumber: z.string().optional(),
  partitionDeedYear: z.string().optional(),
  partitionDeedDate: z.string().optional(),
  partitionItemNumber: z.string().optional(),
  partitionExtent: z.string().optional(),
  partitionBoundaryQuote: z.string().optional(),

  // 8. Cause of Action
  trespassDate: z.string().optional(),
  trespassExtent: z.string().optional(),
  incidentNarrative: z.string().optional(),
  threatsMade: z.string().optional(),

  // 9. Counsel
  advocates: z.array(advocateSchema).min(1, "At least one advocate is required"),
  counselAddress: z.string().min(1, "Required"),
  counselPhone: z.string().min(1, "Required"),
  counselInitials: z.string().min(1, "Required"),

  // 10. Execution & Verification
  executionPlace: z.string().min(1, "Required"),
  executionDate: z.string().min(1, "Required"),
  verificationText: z.string().optional(),
  listOfDocuments: z.array(z.string()).optional(),
})

export type FormValues = z.infer<typeof formSchema>
