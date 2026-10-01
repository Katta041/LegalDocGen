import type { FormValues } from "./schema"

// All sample data in this file is fictional. The people, advocates, addresses,
// the locality (Sampurna District, Ranganpet, Kovelapadu) and every case,
// survey and document number were invented for demonstration. PIN codes use
// the unassigned 999xxx range and the phone number is a placeholder.

export interface DocumentTemplate {
  id: string
  name: string
  description: string
  data: Partial<FormValues>
}

const demoAdvocates = [
  { id: "a1", name: "K. Arvind Rao", qualifications: "B.A., LL.B.", isPrimary: true },
  { id: "a2", name: "M. Divya Sree", qualifications: "B.Com., LL.B.", isPrimary: false },
  { id: "a3", name: "P. Naveen Chandra", qualifications: "B.A., LL.B.", isPrimary: false },
]

export const templates: DocumentTemplate[] = [
  {
    id: "ia-temp-injunction",
    name: "Temporary Injunction (IA)",
    description: "Application under Order XXXIX Rule 1 & 2 r/w Section 151 CPC",
    data: {
      courtName: "IN THE COURT OF HON'BLE PRINCIPAL CIVIL JUDGE (SENIOR DIVISION), SAMPURNA",
      iaNumber: "101",
      iaYear: "2025",
      osNumber: "202",
      osYear: "2025",
      petitionType: "Temporary Injunction under Order XXXIX Rule 1 & 2 r/w Section 151 CPC",
      petitionerSalutation: "Smt.",
      petitionerName: "Sarojini Annapureddy",
      petitionerRelationPrefix: "W/o",
      petitionerRelationName: "Sri A. Venkat Rao",
      petitionerAge: 62,
      petitionerOccupation: "Retired Teacher",
      petitionerAddressTown: "Flat No. 12, Lotus Residency, Temple Road, Sampurna Town",
      petitionerAddressDistrict: "Sampurna",
      petitionerAddressState: "Andhra Pradesh - 999101",
      respondents: [
        {
          id: "r1",
          salutation: "Sri",
          name: "Gopal Rao Vemuri",
          relationPrefix: "S/o",
          relationName: "V. Narasimha Rao",
          age: 64,
          occupation: "Agriculture",
          addressTown: "H. No. 4-17",
          addressVillage: "Ranganpet",
          addressMandal: "Sampurna Rural",
          addressDistrict: "Sampurna",
          addressState: "Andhra Pradesh - 999102"
        },
        {
          id: "r2",
          salutation: "Sri",
          name: "Mahesh Vemuri",
          relationPrefix: "S/o",
          relationName: "Gopal Rao Vemuri",
          age: 38,
          occupation: "Business",
          addressTown: "H. No. 4-17/A",
          addressVillage: "Ranganpet",
          addressMandal: "Sampurna Rural",
          addressDistrict: "Sampurna",
          addressState: "Andhra Pradesh - 999102"
        },
        {
          id: "r3",
          salutation: "Smt.",
          name: "Lavanya Vemuri",
          relationPrefix: "W/o",
          relationName: "Mahesh Vemuri",
          age: 34,
          occupation: "Homemaker",
          addressTown: "H. No. 4-17/A",
          addressVillage: "Ranganpet",
          addressMandal: "Sampurna Rural",
          addressDistrict: "Sampurna",
          addressState: "Andhra Pradesh - 999102"
        }
      ],
      propertyType: "Agricultural",
      propertyExtent: "Ac. 3.20 cents",
      surveyNumber: "118/B2",
      village: "Ranganpet",
      mandal: "Sampurna Rural",
      district: "Sampurna",
      state: "Andhra Pradesh",
      boundaryEast: "Irrigation channel",
      boundaryWest: "Land of one Ramaiah Chowdary",
      boundaryNorth: "Village cart track",
      boundarySouth: "Remaining land of Plaintiff in the same Sy. No. i.e., 118/B2",
      easementRights: true,
      predecessors: [
        {
          id: "p1",
          ownerName: "Ramalinga Sastry",
          parentage: "S/o Seshagiri Sastry",
          residence: "Ranganpet Village",
          modeOfAcquisition: "Original Owner"
        },
        {
          id: "p2",
          ownerName: "Kondaiah Hanumaiah",
          parentage: "S/o Veeraiah Hanumaiah",
          modeOfAcquisition: "Sale Deed",
          documentNumber: "1201",
          documentYear: "1981",
          date: "1981-05-14",
          sroName: "Sampurna SRO"
        },
        {
          id: "p3",
          ownerName: "Abdul Kareem",
          parentage: "S/o Abdul Rasheed",
          modeOfAcquisition: "Sale Deed",
          documentNumber: "2207",
          documentYear: "1994",
          date: "1994-08-22",
          sroName: "Sampurna SRO"
        },
        {
          id: "p4",
          ownerName: "Nasreen Begum & sons",
          note: "devolved after demise of Abdul Kareem intestate",
          modeOfAcquisition: "Inheritance"
        }
      ],
      saleDeedNumber: "3105",
      saleDeedYear: "2004",
      saleDeedDate: "2004-02-09",
      vendors: [
        { id: "v1", name: "Smt. Nasreen Begum" },
        { id: "v2", name: "Sri Imran Kareem" },
        { id: "v3", name: "Sri Salman Kareem" }
      ],
      purchaseSurveyNumber: "118/B1",
      correctSurveyNumber: "118/B2",
      rectificationDeedNumber: "4410",
      rectificationDeedYear: "2024",
      rectificationDeedDate: "2024-03-18",
      rectificationCircular: "Circular Memo No. DEMO/R-0001/2022, dated 01.04.2022",
      khataNumber: "77",
      extentRecognized: "Ac. 1-60 cents",
      passbookIssued: true,
      compensationAmount: "1250000",
      compensationWords: "Twelve Lakhs Fifty Thousand",
      impugnedDeedNumber: "655",
      impugnedDeedYear: "1999",
      impugnedDeedDate: "1999-11-03",
      impugnedDeedSRO: "Sampurna SRO",
      impugnedVendorName: "Sri Pullaiah Gorantla",
      impugnedVendorParentage: "S/o Venkataiah",
      impugnedExtent: "Ac. 1-60 cents",
      impugnedScheduleLanguage: "Ramalinga Sastry Gari Polamu",
      partitionDeedNumber: "5120",
      partitionDeedYear: "2019",
      partitionDeedDate: "2019-06-12",
      partitionItemNumber: "3",
      trespassDate: "2025-06-02",
      advocates: demoAdvocates,
      counselAddress: "Sampurna",
      counselPhone: "0000000000",
      counselInitials: "K.A.R.",
      executionPlace: "Sampurna",
      executionDate: "2025-07-15"
    }
  },
  {
    id: "plaint-permanent-injunction",
    name: "Main Plaint (Suit)",
    description: "Suit for Permanent Injunction under Order VII Rules 1 & 2 CPC",
    data: {
      courtName: "IN THE COURT OF THE HON'BLE PRINCIPAL CIVIL JUDGE (JUNIOR DIVISION), SAMPURNA",
      iaNumber: "",
      iaYear: "",
      osNumber: "",
      osYear: "2026",
      petitionType: "Plaint for Permanent Injunction under Order VII Rules 1 & 2 CPC",
      petitionerSalutation: "Smt.",
      petitionerName: "Hemavathi Bandaru",
      petitionerRelationPrefix: "W/o",
      petitionerRelationName: "Bandaru Srinivas",
      petitionerAge: 41,
      petitionerOccupation: "Tailor",
      petitionerAddressTown: "Door No. 7-112, Market Street",
      petitionerAddressVillage: "Kovelapadu",
      petitionerAddressMandal: "Kovelapadu",
      petitionerAddressDistrict: "Sampurna",
      respondents: [
        {
          id: "r1",
          salutation: "Smt.",
          name: "Farzana Shaik",
          relationPrefix: "W/o",
          relationName: "Rafiq Shaik",
          age: 45,
          occupation: "Homemaker",
          addressTown: "Door No. 2-31, Mosque Street, Sampurna Town",
          addressDistrict: "Sampurna"
        },
        {
          id: "r2",
          salutation: "Sri",
          name: "Rafiq Shaik",
          relationPrefix: "S/o",
          relationName: "Jaffar Shaik",
          age: 49,
          occupation: "Private Employee",
          addressTown: "Door No. 9-4, Canal Road",
          addressVillage: "Ranganpet",
          addressMandal: "Sampurna Rural",
          addressDistrict: "Sampurna"
        },
        {
          id: "r3",
          salutation: "Sri",
          name: "Jaffar Shaik",
          relationPrefix: "S/o",
          relationName: "Khader Shaik",
          age: 72,
          occupation: "Pensioner",
          addressTown: "Door No. 9-4, Canal Road",
          addressVillage: "Ranganpet",
          addressMandal: "Sampurna Rural",
          addressDistrict: "Sampurna"
        }
      ],
      propertyType: "Residential/Open Land",
      propertyExtent: "Plaint Schedule Property",
      surveyNumber: "Ranganpet Village",
      village: "Ranganpet",
      mandal: "Sampurna Rural",
      district: "Sampurna",
      state: "Andhra Pradesh",
      boundaryEast: "___",
      boundaryWest: "___",
      boundaryNorth: "___",
      boundarySouth: "___",
      easementRights: true,
      predecessors: [
        {
          id: "p1",
          ownerName: "Jaffar Shaik (D3)",
          modeOfAcquisition: "Original Owner"
        },
        {
          id: "p2",
          ownerName: "Rafiq Shaik (D2)",
          modeOfAcquisition: "Sale Deed",
          documentNumber: "6012",
          documentYear: "2017",
          date: "2017-10-05",
          sroName: "Sampurna SRO"
        },
        {
          id: "p3",
          ownerName: "Farzana Shaik (D1)",
          modeOfAcquisition: "Sale Deed",
          documentNumber: "8840",
          documentYear: "2020",
          date: "2020-12-11",
          sroName: "Sampurna SRO"
        }
      ],
      saleDeedNumber: "___",
      saleDeedYear: "2022",
      saleDeedDate: "2022-03-04",
      vendors: [
        { id: "v1", name: "Smt. Farzana Shaik (D1)" }
      ],
      trespassDate: "2026-01-20",
      advocates: [
        ...demoAdvocates,
        { id: "a4", name: "S. Harika Reddy", qualifications: "B.A., LL.B.", isPrimary: false }
      ],
      counselAddress: "Sampurna",
      counselPhone: "0000000000",
      counselInitials: "K.A.R.",
      executionPlace: "Sampurna",
      executionDate: "2026-02-10",
      verificationText: "I, Smt. Hemavathi Bandaru, W/o Bandaru Srinivas, Aged about 41 years, Occ: Tailor, R/o Door No. 7-112, Market Street, Kovelapadu Village, Kovelapadu Mandal, Sampurna District, the Plaintiff herein, do hereby verify that the contents of paragraphs 1 to 5 of the plaint are true and correct to my personal knowledge, and the contents of paragraphs 6 to 8 are based on legal advice, which I believe to be true and correct.",
      listOfDocuments: [
        "Certified Copy of Registered Sale Deed dated 04.03.2022 executed by Defendant No.1 in favour of the Plaintiff.",
        "Certified Copy of Registered Sale Deed No. 8840/2020 dated 11.12.2020 executed by Defendant No.2 in favour of Defendant No.1.",
        "Certified Copy of Registered Sale Deed No. 6012/2017 dated 05.10.2017 executed by Defendant No.3 in favour of Defendant No.2.",
        "Online Copy of Encumbrance Certificate relating to the Plaint Schedule Property."
      ],
      factsOfTheCase: "It is submitted that the Plaintiff is the absolute owner and possessor of the Plaint Schedule Property..."
    }
  }
]

export const sampleData = templates[0].data
