import type { FormValues } from "./schema"

export interface DocumentTemplate {
  id: string
  name: string
  description: string
  data: Partial<FormValues>
}

export const templates: DocumentTemplate[] = [
  {
    id: "ia-temp-injunction",
    name: "Temporary Injunction (IA)",
    description: "Application under Order XXXIX Rule 1 & 2 r/w Section 151 CPC",
    data: {
      courtName: "IN THE COURT OF THE PRINCIPAL CIVIL JUDGE, SAMPLE DISTRICT",
      iaNumber: "123",
      iaYear: "2025",
      osNumber: "456",
      osYear: "2025",
      petitionType: "Temporary Injunction under Order XXXIX Rule 1 & 2 r/w Section 151 CPC",
      petitionerSalutation: "Smt.",
      petitionerName: "Sample petitionerName 1",
      petitionerRelationPrefix: "W/o",
      petitionerRelationName: "Sample petitionerRelationName 1",
      petitionerAge: 69,
      petitionerOccupation: "Housewife",
      petitionerAddress: "Sample Address",
      respondents: [
        {
          id: "r1",
          salutation: "Sri",
          name: "Sample name 1",
          relationPrefix: "S/o",
          relationName: "Sample relationName 1",
          age: 67,
          occupation: "Agriculture",
          address: "Sample Address"
        },
        {
          id: "r2",
          salutation: "Sri",
          name: "Sample name 2",
          relationPrefix: "S/o",
          relationName: "Sample relationName 2",
          age: 39,
          occupation: "Business",
          address: "Sample Address"
        },
        {
          id: "r3",
          salutation: "Smt.",
          name: "Sample name 3",
          relationPrefix: "W/o",
          relationName: "Sample relationName 3",
          age: 35,
          occupation: "Housewife",
          address: "Sample Address"
        },
        {
          id: "r4",
          salutation: "Smt.",
          name: "Sample name 4",
          relationPrefix: "W/o",
          relationName: "Sample relationName 4",
          age: 38,
          occupation: "Housewife",
          address: "Sample Address"
        },
        {
          id: "r5",
          salutation: "Smt.",
          name: "Sample name 5",
          relationPrefix: "W/o",
          relationName: "Sample relationName 5",
          age: 39,
          occupation: "Housewife",
          address: "Sample Address"
        }
      ],
      propertyType: "Agricultural",
      propertyExtent: "Ac. 1.00 cents",
      surveyNumber: "101",
      village: "Sample Village",
      mandal: "Sample Mandal",
      district: "Sample District",
      state: "Sample State",
      boundaryEast: "Sample boundary",
      boundaryWest: "Sample boundary",
      boundaryNorth: "Sample boundary",
      boundarySouth: "Sample boundary",
      easementRights: true,
      predecessors: [
        {
          id: "p1",
          ownerName: "Sample ownerName 1",
          parentage: "S/o Sample Parent",
          residence: "Sample Address",
          modeOfAcquisition: "Original Owner"
        },
        {
          id: "p2",
          ownerName: "Sample ownerName 2",
          parentage: "S/o Sample Parent",
          modeOfAcquisition: "Sale Deed",
          documentNumber: "101",
          documentYear: "2020",
          date: "2020-01-01",
          sroName: "Sample SRO"
        },
        {
          id: "p3",
          ownerName: "Sample ownerName 3",
          parentage: "S/o Sample Parent",
          modeOfAcquisition: "Sale Deed",
          documentNumber: "102",
          documentYear: "2020",
          date: "2020-01-01",
          sroName: "Sample SRO"
        },
        {
          id: "p4",
          ownerName: "Sample ownerName 4",
          note: "Sample text.",
          modeOfAcquisition: "Inheritance"
        }
      ],
      saleDeedNumber: "101",
      saleDeedYear: "2020",
      saleDeedDate: "2020-01-01",
      vendors: [
        { id: "v1", name: "Sample Person 1" },
        { id: "v2", name: "Sample Person 2" },
        { id: "v3", name: "Sample Person 3" }
      ],
      purchaseSurveyNumber: "101",
      correctSurveyNumber: "101",
      rectificationDeedNumber: "101",
      rectificationDeedYear: "2020",
      rectificationDeedDate: "2020-01-01",
      rectificationCircular: "Sample text.",
      khataNumber: "101",
      extentRecognized: "Ac. 1.00 cents",
      passbookIssued: true,
      compensationAmount: "100000",
      compensationWords: "One Lakh",
      impugnedDeedNumber: "101",
      impugnedDeedYear: "2020",
      impugnedDeedDate: "2020-01-01",
      impugnedDeedSRO: "Sample SRO",
      impugnedVendorName: "Sample impugnedVendorName 1",
      impugnedVendorParentage: "S/o Sample Parent",
      impugnedExtent: "Ac. 1.00 cents",
      impugnedScheduleLanguage: "Sample text.",
      partitionDeedNumber: "101",
      partitionDeedYear: "2020",
      partitionDeedDate: "2020-01-01",
      partitionItemNumber: "101",
      trespassDate: "2020-01-01",
      advocates: [
        { id: "a1", name: "Sample Person 4", qualifications: "B.A., LL.B.", isPrimary: true },
        { id: "a2", name: "Sample Person 5", qualifications: "B.A., LL.B.", isPrimary: false },
        { id: "a3", name: "Sample Person 6", qualifications: "B.A., LL.B.", isPrimary: false }
      ],
      counselAddress: "Sample Address",
      counselPhone: "0000000000",
      counselInitials: "S.A.",
      executionPlace: "Sample District",
      executionDate: "2020-01-01"
    }
  },
  {
    id: "plaint-permanent-injunction",
    name: "Main Plaint (Suit)",
    description: "Suit for Permanent Injunction under Order VII Rules 1 & 2 CPC",
    data: {
      courtName: "IN THE COURT OF THE PRINCIPAL CIVIL JUDGE, SAMPLE DISTRICT",
      iaNumber: "",
      iaYear: "",
      osNumber: "",
      osYear: "2026",
      petitionType: "Plaint for Permanent Injunction under Order VII Rules 1 & 2 CPC",
      petitionerSalutation: "Smt.",
      petitionerName: "Sample petitionerName 2",
      petitionerRelationPrefix: "W/o",
      petitionerRelationName: "Sample petitionerRelationName 2",
      petitionerAge: 35,
      petitionerOccupation: "Housewife",
      petitionerAddress: "Sample Address",
      respondents: [
        {
          id: "r1",
          salutation: "Smt.",
          name: "Sample name 6",
          relationPrefix: "W/o",
          relationName: "Sample relationName 6",
          age: 42,
          occupation: "Housewife",
          address: "Sample Address"
        },
        {
          id: "r2",
          salutation: "Sri",
          name: "Sample name 7",
          relationPrefix: "S/o",
          relationName: "Sample relationName 7",
          age: 35,
          occupation: "Private Employee",
          address: "Sample Address"
        },
        {
          id: "r3",
          salutation: "Sri",
          name: "Sample name 8",
          relationPrefix: "S/o",
          relationName: "Sample relationName 8",
          age: 68,
          occupation: "Pensioner",
          address: "Sample Address"
        }
      ],
      propertyType: "Residential/Open Land",
      propertyExtent: "Ac. 1.00 cents",
      surveyNumber: "102",
      village: "Sample Village",
      mandal: "Sample Mandal",
      district: "Sample District",
      state: "Sample State",
      boundaryEast: "___",
      boundaryWest: "___",
      boundaryNorth: "___",
      boundarySouth: "___",
      easementRights: true,
      predecessors: [
        {
          id: "p1",
          ownerName: "Sample ownerName 5",
          modeOfAcquisition: "Original Owner"
        },
        {
          id: "p2",
          ownerName: "Sample ownerName 6",
          modeOfAcquisition: "Sale Deed",
          documentNumber: "103",
          documentYear: "2020",
          date: "2020-01-01",
          sroName: "Sample SRO"
        },
        {
          id: "p3",
          ownerName: "Sample ownerName 7",
          modeOfAcquisition: "Sale Deed",
          documentNumber: "104",
          documentYear: "2020",
          date: "2020-01-01",
          sroName: "Sample SRO"
        }
      ],
      saleDeedNumber: "___",
      saleDeedYear: "2020",
      saleDeedDate: "2020-01-01",
      vendors: [
        { id: "v1", name: "Sample Person 7" }
      ],
      trespassDate: "2020-01-01",
      advocates: [
        { id: "a1", name: "Sample Person 8", qualifications: "B.A., LL.B.", isPrimary: true },
        { id: "a2", name: "Sample Person 9", qualifications: "B.A., LL.B.", isPrimary: false },
        { id: "a3", name: "Sample Person 10", qualifications: "B.A., LL.B.", isPrimary: false },
        { id: "a4", name: "Sample Person 11", qualifications: "B.A., LL.B.", isPrimary: false }
      ],
      counselAddress: "Sample Address",
      counselPhone: "0000000000",
      counselInitials: "S.A.",
      executionPlace: "Sample District",
      executionDate: "2020-01-01",
      verificationText: "Sample text.",
      listOfDocuments: [
        "Sample document.",
        "Sample document.",
        "Sample document.",
        "Sample document."
      ]
    }
  }
]

export const sampleData = templates[0].data
