export interface ClientDetailData {
  id: string;
  name: string;
  shortName: string;
  category: 'Solar EPC' | 'Water Infrastructure';
  badge: string;
  sector: string;
  /** SVG path-only or letter-mark used when official logo unavailable */
  logoMark: string;
  /** Official logo URL — only use verified, stable sources */
  logoUrl?: string;
  overview: string;
  relevantJNPServices: string[];
  projectNote: string;
}

export const CLIENT_DETAILS: ClientDetailData[] = [
  // ── SOLAR EPC ───────────────────────────────────────────────────────────
  {
    id: "tata-power-solar",
    name: "Tata Power Solar",
    shortName: "Tata Power Solar",
    category: "Solar EPC",
    badge: "Utility Scale Solar",
    sector: "Clean Energy & EPC",
    logoMark: "TPS",
    logoUrl: "/images/clients/tata-power-solar.png",
    overview:
      "Tata Power Solar is India's largest integrated solar manufacturer and EPC solution provider with decades of experience in utility-scale solar parks, rooftop systems, and off-grid solutions across India and global markets.",
    relevantJNPServices: [
      "DTH Rock Piling & Tractor Auger Piling",
      "MMS Module Mounting Structure Installation",
      "Safety Boundary Mesh (Galvanized Steel)",
      "ICR & Inverter Room Fabrication",
      "Land Leveling using JCB / Hitachi"
    ],
    projectNote:
      "Project details to be added. JNP Infra Eng Works provides civil and mechanical execution support for solar infrastructure within Tata Power Solar project scopes."
  },
  {
    id: "lt-solar",
    name: "Larsen & Toubro (L&T)",
    shortName: "Larsen & Toubro",
    category: "Solar EPC",
    badge: "Heavy EPC & Renewables",
    sector: "Infrastructure & Energy",
    logoMark: "L&T",
    logoUrl: "/images/clients/larsen-toubro.png",
    overview:
      "L&T is one of India's largest engineering, procurement, and construction conglomerates with a major renewable energy EPC vertical delivering utility-scale solar projects.",
    relevantJNPServices: [
      "DTH Piling & Tractor Auger Piling for Solar Foundations",
      "MMS Module Installation",
      "Land Grading & Contour Management",
      "Galvanized Perimeter Fencing"
    ],
    projectNote:
      "Project details to be added. JNP Infra Eng Works provides ground-level solar civil execution support within L&T renewable project scopes."
  },
  {
    id: "waaree",
    name: "Waaree Energies",
    shortName: "Waaree",
    category: "Solar EPC",
    badge: "Solar Solutions",
    sector: "Solar PV EPC",
    logoMark: "WE",
    logoUrl: "/images/clients/waaree.png",
    overview:
      "Waaree Energies is India's largest solar panel manufacturer and a growing EPC contractor delivering solar parks, hybrid projects, and module supply across India and exports.",
    relevantJNPServices: [
      "Tractor Auger Piling for Pile Foundation Works",
      "MMS Module Mounting Structure Assembly",
      "Boundary Mesh & Perimeter Security",
      "Site Land Leveling"
    ],
    projectNote:
      "Project details to be added. JNP Infra Eng Works supports Waaree's ground-mounted solar execution with piling and MMS installation capability."
  },
  {
    id: "sterling-wilson",
    name: "Sterling & Wilson",
    shortName: "Sterling & Wilson",
    category: "Solar EPC",
    badge: "Global Solar EPC",
    sector: "Renewable EPC",
    logoMark: "S&W",
    logoUrl: "/images/clients/sterling-wilson.png",
    overview:
      "Sterling & Wilson Renewable Energy (an Shapoorji Pallonji Group company) is a global EPC player for large-scale solar power projects across 25+ countries.",
    relevantJNPServices: [
      "DTH Drilling for Hard Rock Solar Piling",
      "Module Mounting Structure (MMS) Installation",
      "ICR Structural Fabrication",
      "Safety Boundary Galvanized Mesh"
    ],
    projectNote:
      "Project details to be added. JNP Infra provides specialized piling and MMS civil works in Sterling & Wilson project execution areas."
  },
  {
    id: "mahindra-susten",
    name: "Mahindra Susten",
    shortName: "Susten by Mahindra",
    category: "Solar EPC",
    badge: "Clean Tech EPC",
    sector: "Renewables",
    logoMark: "MS",
    logoUrl: "/images/clients/susten.png",
    overview:
      "Mahindra Susten (a Mahindra Group company) develops, builds, and operates utility-scale solar parks across India with an owned-and-operated renewable portfolio.",
    relevantJNPServices: [
      "Tractor Auger & DTH Piling",
      "Land Leveling using JCB / Hitachi Machinery",
      "MMS Structure Assembly",
      "Galvanized Safety Fencing"
    ],
    projectNote:
      "Project details to be added."
  },
  {
    id: "jakson-green",
    name: "Jakson Green",
    shortName: "Jakson Green",
    category: "Solar EPC",
    badge: "Energy Transition EPC",
    sector: "Renewables & Power",
    logoMark: "JG",
    logoUrl: "/images/clients/jakson-green.png",
    overview:
      "Jakson Green (Jakson Group) develops, constructs, and operates renewable energy plants including solar PV, wind, and hybrid projects.",
    relevantJNPServices: [
      "Solar Foundation Piling (DTH & Auger)",
      "MMS Module Installation",
      "Perimeter Security Mesh",
      "Land Grading"
    ],
    projectNote:
      "Project details to be added."
  },
  {
    id: "adani-renewables",
    name: "Adani Renewables",
    shortName: "Adani Renewables",
    category: "Solar EPC",
    badge: "Mega Solar Parks",
    sector: "Green Energy",
    logoMark: "AR",
    logoUrl: "/images/clients/adani-renewables.png",
    overview:
      "Adani Green Energy Ltd is one of India's largest renewable energy companies, developing and operating gigawatt-scale solar and wind parks.",
    relevantJNPServices: [
      "DTH Piling for Large-Scale Solar Parks",
      "Tractor Auger Piling",
      "MMS Mechanical Assembly",
      "Safety Perimeter Fencing (GI Mesh)"
    ],
    projectNote:
      "Project details to be added. JNP Infra Eng Works provides civil piling and MMS execution support in Adani Renewables solar park scopes."
  },
  {
    id: "vikram-solar",
    name: "Vikram Solar",
    shortName: "Vikram Solar",
    category: "Solar EPC",
    badge: "EPC & PV Solutions",
    sector: "Solar Energy",
    logoMark: "VS",
    logoUrl: "/images/clients/vikram-solar.png",
    overview:
      "Vikram Solar is a leading solar manufacturer and EPC contractor delivering high-efficiency solar modules and large-scale plant development across India and globally.",
    relevantJNPServices: [
      "MMS Module Mounting Structure Installation",
      "Ground Piling (Tractor Auger)",
      "Land Leveling & Site Grading",
      "Boundary Security Mesh"
    ],
    projectNote:
      "Project details to be added."
  },
  {
    id: "ntpc-green",
    name: "NTPC Green",
    shortName: "NTPC Green",
    category: "Solar EPC",
    badge: "Public Sector Solar",
    sector: "Power Generation",
    logoMark: "NG",
    logoUrl: "/images/clients/ntpc-green.png",
    overview:
      "NTPC Green Energy Ltd is a wholly-owned subsidiary of NTPC Ltd (India's largest power producer), dedicated to renewable energy development including solar and wind.",
    relevantJNPServices: [
      "Hard Rock DTH Piling",
      "MMS Module Assembly",
      "ICR & Transformer Plinth Fabrication",
      "Perimeter Fencing"
    ],
    projectNote:
      "Project details to be added."
  },
  {
    id: "rays-power",
    name: "Rays Power Infra",
    shortName: "Rays Power Infra",
    category: "Solar EPC",
    badge: "Solar EPC Leader",
    sector: "Solar Parks",
    logoMark: "RP",
    logoUrl: "/images/clients/rays-power-infra.png",
    overview:
      "Rays Power Infra is a dedicated solar EPC company with expertise in utility-scale and commercial/industrial solar park development across India.",
    relevantJNPServices: [
      "Tractor Auger & DTH Piling",
      "MMS Structure Installation",
      "Land Leveling",
      "Boundary Security Fencing"
    ],
    projectNote:
      "Project details to be added."
  },

  // ── WATER INFRASTRUCTURE ─────────────────────────────────────────────────
  {
    id: "meil",
    name: "Megha Engineering & Infrastructures Ltd",
    shortName: "MEIL",
    category: "Water Infrastructure",
    badge: "Mega Water Projects",
    sector: "Water & Bulk Pipelines",
    logoMark: "MEIL",
    logoUrl: "/images/clients/meil.png",
    overview:
      "Megha Engineering and Infrastructures Ltd (MEIL) is one of India's fastest-growing infrastructure companies executing mega water supply, irrigation, and pipeline transmission projects.",
    relevantJNPServices: [
      "HDPE Butt Fusion Pipe Jointing",
      "DI Pipe Jointing & Thrust Block Work",
      "RCC / Block Valve Chamber Construction",
      "DWC Pipe Jointing"
    ],
    projectNote:
      "Project details to be added. JNP Infra provides machine jointing and civil works support in MEIL bulk water transmission project corridors."
  },
  {
    id: "wabag",
    name: "VA TECH WABAG",
    shortName: "Wabag",
    category: "Water Infrastructure",
    badge: "Water Treatment EPC",
    sector: "Desalination & Water",
    logoMark: "VTW",
    logoUrl: "/images/clients/wabag.png",
    overview:
      "VA TECH WABAG is a global leader in water and wastewater treatment technology, delivering EPC projects for municipal and industrial water treatment plants.",
    relevantJNPServices: [
      "HDPE Electrofusion & Butt Fusion Pipeline Works",
      "DI Pipe Laying & Jointing",
      "Valve Chamber RCC Construction",
      "Irrigation & Distribution Pipelines"
    ],
    projectNote:
      "Project details to be added."
  },
  {
    id: "lt-water",
    name: "L&T Construction (Water)",
    shortName: "Larsen & Toubro",
    category: "Water Infrastructure",
    badge: "WET IC Water Projects",
    sector: "Bulk Water Supply",
    logoMark: "L&T",
    logoUrl: "/images/clients/larsen-toubro.png",
    overview:
      "L&T Construction's Water & Effluent Treatment (WET) business delivers large-scale water supply, sewerage, and effluent treatment projects for municipal and industrial clients.",
    relevantJNPServices: [
      "HDPE Butt Fusion & Electrofusion Jointing",
      "DI Pipe Laying, Jointing & Thrust Block Work",
      "RCC Chamber Construction",
      "Irrigation Network Works"
    ],
    projectNote:
      "Project details to be added. JNP Infra supports L&T WET projects with specialized pipeline execution and civil chamber construction."
  },
  {
    id: "welspun",
    name: "Welspun Enterprises",
    shortName: "Welspun Enterprises",
    category: "Water Infrastructure",
    badge: "Water Transmission",
    sector: "National Pipelines",
    logoMark: "WE",
    logoUrl: "/images/clients/welspun-enterprises.png",
    overview:
      "Welspun Enterprises executes large-scale water supply, transmission pipelines, and urban infrastructure projects across India.",
    relevantJNPServices: [
      "HDPE Butt Fusion Jointing",
      "DI Pipe Jointing Works",
      "Hydrostatic Pressure Testing",
      "RCC Valve & Air Chambers"
    ],
    projectNote:
      "Project details to be added."
  },
  {
    id: "ncc",
    name: "NCC Limited",
    shortName: "NCC Limited",
    category: "Water Infrastructure",
    badge: "Urban Water & Irrigation",
    sector: "Water Supply Works",
    logoMark: "NCC",
    logoUrl: "/images/clients/ncc.png",
    overview:
      "NCC Limited is a major Indian construction company with strong execution in water supply, sewerage, irrigation, and urban infrastructure projects.",
    relevantJNPServices: [
      "HDPE Pipeline Jointing",
      "DI Pipe Works & Thrust Blocks",
      "Valve Chamber RCC Works",
      "Agricultural Pipeline & Wall Chambers"
    ],
    projectNote:
      "Project details to be added."
  },
  {
    id: "vishvaraj",
    name: "Vishvaraj Environment",
    shortName: "Vishvaraj Environment",
    category: "Water Infrastructure",
    badge: "Water Management",
    sector: "24/7 Water Projects",
    logoMark: "VE",
    logoUrl: "/images/clients/vishvaraj.png",
    overview:
      "Vishvaraj Environment Pvt Ltd specializes in 24x7 water supply projects and integrated water management infrastructure under public-private partnership models.",
    relevantJNPServices: [
      "Distribution Pipeline Jointing (HDPE/DI)",
      "Valve & Air Chamber Construction",
      "DWC Pipe Works for Drainage",
      "Hydrostatic Testing"
    ],
    projectNote:
      "Project details to be added."
  },
  {
    id: "tata-projects",
    name: "Tata Projects",
    shortName: "Tata Projects",
    category: "Water Infrastructure",
    badge: "Industrial Water Infrastructure",
    sector: "Industrial Pipelines",
    logoMark: "TP",
    logoUrl: "/images/clients/tata-projects.png",
    overview:
      "Tata Projects is a leading infrastructure company delivering complex projects across water, power, transportation, and urban infrastructure sectors.",
    relevantJNPServices: [
      "HDPE Butt Fusion & Electrofusion Works",
      "DI Pipe Laying & Jointing",
      "Thrust Block & Valve Chamber Construction",
      "Water Tank Installation (Zincalume / SMC)"
    ],
    projectNote:
      "Project details to be added. JNP Infra provides pipeline and civil support within Tata Projects infrastructure contracts."
  },
  {
    id: "spml",
    name: "SPML Infra",
    shortName: "SPML",
    category: "Water Infrastructure",
    badge: "Subsurface & Pipeline EPC",
    sector: "Smart Water Management",
    logoMark: "SPML",
    logoUrl: "/images/clients/spml.png",
    overview:
      "SPML Infra is a specialized water infrastructure company delivering bulk water transmission, distribution networks, and sewerage projects.",
    relevantJNPServices: [
      "HDPE Pipeline Machine Jointing",
      "DI Pipe Jointing & Thrust Block Work",
      "RCC Chambers & Civil Works",
      "Pressure Testing & Commissioning"
    ],
    projectNote:
      "Project details to be added."
  },
  {
    id: "enviro-infra",
    name: "Enviro Infra Engineers",
    shortName: "Enviro Infra Engineers",
    category: "Water Infrastructure",
    badge: "WWTP & Pipeline Execution",
    sector: "Water Distribution",
    logoMark: "EIE",
    logoUrl: "/images/clients/enviro-infra.png",
    overview:
      "Enviro Infra Engineers specializes in water supply, sewerage, and waste water treatment plant infrastructure projects across India.",
    relevantJNPServices: [
      "HDPE & DWC Pipeline Jointing",
      "Valve Chamber & Wall Chamber Works",
      "Irrigation Pipeline Systems",
      "Hydrostatic Testing"
    ],
    projectNote:
      "Project details to be added."
  },
  {
    id: "ems",
    name: "EMS Limited",
    shortName: "EMS",
    category: "Water Infrastructure",
    badge: "Sewerage & Water Schemes",
    sector: "Civil Water Infrastructure",
    logoMark: "EMS",
    logoUrl: "/images/clients/ems.png",
    overview:
      "EMS Limited executes water supply, sewerage collection, and civil water infrastructure projects under government schemes across India.",
    relevantJNPServices: [
      "DI & HDPE Pipeline Jointing",
      "DWC Pipe Laying Works",
      "RCC Manholes & Chambers",
      "Distribution Network Works"
    ],
    projectNote:
      "Project details to be added."
  }
];
