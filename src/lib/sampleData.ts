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
      courtName: "IN THE COURT OF HON'BLE PRINCIPAL CIVIL JUDGE (SENIOR DIVISION), KURNOOL",
      iaNumber: "123",
      iaYear: "2025",
      osNumber: "456",
      osYear: "2025",
      petitionType: "Temporary Injunction under Order XXXIX Rule 1 & 2 r/w Section 151 CPC",
      petitionerSalutation: "Smt.",
      petitionerName: "Reddypogu Sowdhamani",
      petitionerRelationPrefix: "W/o",
      petitionerRelationName: "Sri K. Manoraju",
      petitionerAge: 69,
      petitionerOccupation: "Housewife",
      petitionerAddress: "Flat No. 105, D-Block, Yelukuru Bunglows, Behind Radio Station, Kurnool City & District, Andhra Pradesh – 518004",
      respondents: [
        {
          id: "r1",
          salutation: "Sri",
          name: "Boya Lakshmanna",
          relationPrefix: "S/o",
          relationName: "B. Balanna",
          age: 67,
          occupation: "Agriculture",
          address: "H. No. 2-6, P. Rudravaram Village, Kurnool Mandal, Kurnool District – 518452"
        },
        {
          id: "r2",
          salutation: "Sri",
          name: "Boya Vikram",
          relationPrefix: "S/o",
          relationName: "Boya Lakshmanna",
          age: 39,
          occupation: "Business",
          address: "H. No. 3-89B, P. Rudravaram Village, Kurnool Mandal, Kurnool District – 518452"
        },
        {
          id: "r3",
          salutation: "Smt.",
          name: "Boya Padmavathi",
          relationPrefix: "W/o",
          relationName: "B. Vikram",
          age: 35,
          occupation: "Housewife",
          address: "H. No. 2-5, P. Rudravaram Village, Kurnool Mandal, Kurnool District – 518452"
        },
        {
          id: "r4",
          salutation: "Smt.",
          name: "Boya Lalitha",
          relationPrefix: "W/o",
          relationName: "Late B. Krishna",
          age: 38,
          occupation: "Housewife",
          address: "H. No. 2-6, P. Rudravaram Village, Kurnool Mandal, Kurnool District – 518452"
        },
        {
          id: "r5",
          salutation: "Smt.",
          name: "Boya Yellamma",
          relationPrefix: "W/o",
          relationName: "Boya Krishna",
          age: 39,
          occupation: "Housewife",
          address: "H. No. 70-121-6-1, Near Aditya School, Kallur, Kurnool City & District – 518003"
        }
      ],
      propertyType: "Agricultural",
      propertyExtent: "Ac. 4.36 cents",
      surveyNumber: "507/H2",
      village: "Rudravaram",
      mandal: "Kurnool Rural",
      district: "Kurnool",
      state: "Andhra Pradesh",
      boundaryEast: "Gattu",
      boundaryWest: "Pedda Salanna's Land",
      boundaryNorth: "Boya Dandanna's Land adjacent to Gattu",
      boundarySouth: "Remaining land of Plaintiff in the same Sy. No. i.e., 507/H2",
      easementRights: true,
      predecessors: [
        {
          id: "p1",
          ownerName: "Bajaru Reddy",
          parentage: "S/o Nandyal Veerappa",
          residence: "Rudravaram Village",
          modeOfAcquisition: "Original Owner"
        },
        {
          id: "p2",
          ownerName: "Harijana Ganganna",
          parentage: "S/o Harijana Naganna",
          modeOfAcquisition: "Sale Deed",
          documentNumber: "892",
          documentYear: "1975",
          date: "1975-03-31",
          sroName: "Kurnool SRO"
        },
        {
          id: "p3",
          ownerName: "S. Isamiah",
          parentage: "S/o Rahiman Khan",
          modeOfAcquisition: "Sale Deed",
          documentNumber: "1538",
          documentYear: "1992",
          date: "1992-04-01",
          sroName: "Kurnool SRO"
        },
        {
          id: "p4",
          ownerName: "Sharifa Bee & sons",
          note: "devolved after demise of S. Isamiah intestate",
          modeOfAcquisition: "Inheritance"
        }
      ],
      saleDeedNumber: "4988",
      saleDeedYear: "2002",
      saleDeedDate: "2002-07-16",
      vendors: [
        { id: "v1", name: "Smt. Sharifa Bee" },
        { id: "v2", name: "Sri S. Fazulu Rahim" },
        { id: "v3", name: "Sri S. Fayaz Basha" }
      ],
      purchaseSurveyNumber: "507/H1",
      correctSurveyNumber: "507/H2",
      rectificationDeedNumber: "33390",
      rectificationDeedYear: "2024",
      rectificationDeedDate: "2024-11-06",
      rectificationCircular: "Circular Memo No. G1/E-1699599/2022, dated 26.04.2022",
      khataNumber: "360",
      extentRecognized: "Ac. 2-18 cents",
      passbookIssued: true,
      compensationAmount: "3400000",
      compensationWords: "Thirty-Four Lakhs",
      impugnedDeedNumber: "344",
      impugnedDeedYear: "1997",
      impugnedDeedDate: "1997-01-17",
      impugnedDeedSRO: "Kurnool SRO",
      impugnedVendorName: "Sri Boya Dandanna",
      impugnedVendorParentage: "S/o Peesanna",
      impugnedExtent: "Ac. 2-18 cents",
      impugnedScheduleLanguage: "Bajaru Reddy Itharulaku Ammina Bhumi",
      partitionDeedNumber: "8022",
      partitionDeedYear: "2018",
      partitionDeedDate: "2018-07-27",
      partitionItemNumber: "2",
      trespassDate: "2025-07-10",
      advocates: [
        { id: "a1", name: "B. Mohana Krishna", qualifications: "B.A., LL.B.", isPrimary: true },
        { id: "a2", name: "B. Shiva Shankar", qualifications: "B.A., LL.B.", isPrimary: false },
        { id: "a3", name: "A. Ramanajaneyulu", qualifications: "B.A., LL.B.", isPrimary: false }
      ],
      counselAddress: "Kurnool",
      counselPhone: "8500840030",
      counselInitials: "B.M.K.",
      executionPlace: "Kurnool",
      executionDate: "2025-10-13"
    }
  },
  {
    id: "plaint-permanent-injunction",
    name: "Main Plaint (Suit)",
    description: "Suit for Permanent Injunction under Order VII Rules 1 & 2 CPC",
    data: {
      courtName: "IN THE COURT OF THE HON'BLE PRINCIPAL CIVIL JUDGE (JUNIOR DIVISION), KURNOOL",
      iaNumber: "",
      iaYear: "",
      osNumber: "",
      osYear: "2026",
      petitionType: "Plaint for Permanent Injunction under Order VII Rules 1 & 2 CPC",
      petitionerSalutation: "Smt.",
      petitionerName: "Balappagari Swathy",
      petitionerRelationPrefix: "W/o",
      petitionerRelationName: "Balappagari Chinna Ranganna",
      petitionerAge: 35,
      petitionerOccupation: "Housewife",
      petitionerAddress: "Door No. 2-246, Main Bazar, Pyalakurthy Village, Kodumur Mandal, Kurnool District",
      respondents: [
        {
          id: "r1",
          salutation: "Smt.",
          name: "Shaik Shakeena Bi",
          relationPrefix: "W/o",
          relationName: "Shaik Mohhamad Hussain",
          age: 42,
          occupation: "Housewife",
          address: "Door No. 44/67-A, Roza Street, Kurnool City & District"
        },
        {
          id: "r2",
          salutation: "Sri",
          name: "Shaik Mohhamad Hussain",
          relationPrefix: "S/o",
          relationName: "Shaik Balapeera",
          age: 35,
          occupation: "Private Employee",
          address: "Door No. 1-235/7, Telugu Geri, Panchalingala Village, Kurnool Rural Mandal, Kurnool District"
        },
        {
          id: "r3",
          salutation: "Sri",
          name: "Shaik Balapeera",
          relationPrefix: "S/o",
          relationName: "Shaik Sultan Saheb",
          age: 68,
          occupation: "Pensioner",
          address: "Door No. 1-235/7, Telugu Geri, Panchalingala Village, Kurnool Rural Mandal, Kurnool District"
        }
      ],
      propertyType: "Residential/Open Land",
      propertyExtent: "Plaint Schedule Property",
      surveyNumber: "Panchalingala Village",
      village: "Panchalingala",
      mandal: "Kurnool Rural",
      district: "Kurnool",
      state: "Andhra Pradesh",
      boundaryEast: "___",
      boundaryWest: "___",
      boundaryNorth: "___",
      boundarySouth: "___",
      easementRights: true,
      predecessors: [
        {
          id: "p1",
          ownerName: "Shaik Balapeera (D3)",
          modeOfAcquisition: "Original Owner"
        },
        {
          id: "p2",
          ownerName: "Shaik Mohhamad Hussain (D2)",
          modeOfAcquisition: "Sale Deed",
          documentNumber: "10609",
          documentYear: "2018",
          date: "2018-09-29",
          sroName: "Kurnool SRO"
        },
        {
          id: "p3",
          ownerName: "Shaik Shakeena Bi (D1)",
          modeOfAcquisition: "Sale Deed",
          documentNumber: "17746",
          documentYear: "2021",
          date: "2021-12-28",
          sroName: "Kurnool SRO"
        }
      ],
      saleDeedNumber: "___",
      saleDeedYear: "2022",
      saleDeedDate: "2022-01-31",
      vendors: [
        { id: "v1", name: "Smt. Shaik Shakeena Bi (D1)" }
      ],
      trespassDate: "2026-02-15",
      advocates: [
        { id: "a1", name: "B. Mohana Krishna", qualifications: "B.A., LL.B.", isPrimary: true },
        { id: "a2", name: "B. Shiva Shankar", qualifications: "B.A., LL.B.", isPrimary: false },
        { id: "a3", name: "B. Manoj", qualifications: "B.A., LL.B.", isPrimary: false },
        { id: "a4", name: "Kuruva Ganesh", qualifications: "B.A., LL.B.", isPrimary: false }
      ],
      counselAddress: "Kurnool",
      counselPhone: "8500840030",
      counselInitials: "B.M.K.",
      executionPlace: "Kurnool",
      executionDate: "2026-03-21",
      verificationText: "I, Smt. Balappagari Swathi, W/o Balappagari Chinna Ranganna, Aged about 35 years, Occ: Housewife, R/o Door No. 2-246, Main Bazar, Pyalakurthy Village, Kodumur Mandal, Kurnool District, the Plaintiff herein, do hereby verify that the contents of paragraphs 1 to 5 of the plaint are true and correct to my personal knowledge, and the contents of paragraphs 6 to 8 are based on legal advice, which I believe to be true and correct.",
      listOfDocuments: [
        "Certified Copy of Registered Sale Deed dated 31.01.2022 executed by Defendant No.1 in favour of the Plaintiff.",
        "Certified Copy of Registered Sale Deed No. 17746/2021 dated 28.12.2021 executed by Defendant No.2 in favour of Defendant No.1.",
        "Certified Copy of Registered Sale Deed No. 10609/2018 dated 29.09.2018 executed by Defendant No.3 in favour of Defendant No.2.",
        "Online Copy of Encumbrance Certificate relating to the Plaint Schedule Property."
      ]
    }
  }
]

export const sampleData = templates[0].data
