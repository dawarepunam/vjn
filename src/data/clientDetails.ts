export interface ExecutedWork {
  title: string;
  scope: string;
  location?: string;
  image: string;
  tag: string;
}

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
  executedWorks?: ExecutedWork[];
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
      "JNP Infra Eng Works provides civil and mechanical execution support for solar infrastructure within Tata Power Solar project scopes.",
    executedWorks: [
      {
        title: "Solar Park Ground Piling",
        scope: "DTH Rock Piling & Tractor Auger for solar panel foundations across multiple MW blocks",
        location: "Rajasthan",
        image: "/images/solar-infra.jpg",
        tag: "Piling"
      },
      {
        title: "MMS Structure Installation",
        scope: "Module Mounting Structure (MMS) assembly and alignment for 50 MW solar park",
        location: "Gujarat",
        image: "/images/machinery-work.jpg",
        tag: "MMS"
      }
    ]
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
      "JNP Infra Eng Works provides ground-level solar civil execution support within L&T renewable project scopes.",
    executedWorks: [
      {
        title: "Solar Foundation Piling Works",
        scope: "Tractor Auger & DTH piling for pile foundation across 75 MW solar field",
        location: "Madhya Pradesh",
        image: "/images/solar-infra.jpg",
        tag: "Piling"
      },
      {
        title: "Perimeter Security Fencing",
        scope: "Galvanized steel mesh boundary fencing installation for solar park perimeter security",
        location: "Rajasthan",
        image: "/images/crash-barrier.jpg",
        tag: "Fencing"
      }
    ]
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
      "JNP Infra Eng Works supports Waaree's ground-mounted solar execution with piling and MMS installation capability.",
    executedWorks: [
      {
        title: "Ground Piling & MMS Assembly",
        scope: "Tractor Auger piling & complete MMS structure assembly for Waaree utility-scale solar",
        location: "Maharashtra",
        image: "/images/solar-infra.jpg",
        tag: "MMS & Piling"
      },
      {
        title: "Land Leveling Operations",
        scope: "JCB & Hitachi machinery land leveling and site grading for solar park preparation",
        location: "Telangana",
        image: "/images/machinery-work.jpg",
        tag: "Civil"
      }
    ]
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
      "JNP Infra provides specialized piling and MMS civil works in Sterling & Wilson project execution areas.",
    executedWorks: [
      {
        title: "DTH Hard Rock Piling",
        scope: "Down-the-hole (DTH) drilling & piling for hard-rock terrain solar foundations",
        location: "Karnataka",
        image: "/images/solar-infra.jpg",
        tag: "Piling"
      },
      {
        title: "ICR Structural Fabrication",
        scope: "Inverter Control Room (ICR) structural fabrication and erection on site",
        location: "Andhra Pradesh",
        image: "/images/heavy-fab.jpg",
        tag: "Fabrication"
      }
    ]
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
      "JNP Infra provides civil execution support within Mahindra Susten project scopes.",
    executedWorks: [
      {
        title: "Solar Park Civil Works",
        scope: "Complete piling, MMS assembly and boundary safety fencing for utility-scale solar project",
        location: "Rajasthan",
        image: "/images/solar-infra.jpg",
        tag: "Civil & MMS"
      },
      {
        title: "Site Grading & Land Leveling",
        scope: "Large-scale terrain leveling and grading using JCB & Hitachi machinery",
        location: "Gujarat",
        image: "/images/machinery-work.jpg",
        tag: "Civil"
      }
    ]
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
      "JNP Infra provides foundation piling and MMS execution support in Jakson Green project scopes.",
    executedWorks: [
      {
        title: "Foundation Piling & MMS",
        scope: "DTH & Auger piling, MMS installation and perimeter mesh for renewable energy park",
        location: "Uttar Pradesh",
        image: "/images/solar-infra.jpg",
        tag: "Piling & MMS"
      }
    ]
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
      "JNP Infra Eng Works provides civil piling and MMS execution support in Adani Renewables solar park scopes.",
    executedWorks: [
      {
        title: "Gigawatt-Scale Solar Piling",
        scope: "DTH Piling for large-scale solar park across hard rocky terrain",
        location: "Rajasthan",
        image: "/images/solar-infra.jpg",
        tag: "Piling"
      },
      {
        title: "GI Mesh Boundary Fencing",
        scope: "Galvanized iron mesh perimeter security fencing for mega solar park",
        location: "Gujarat",
        image: "/images/crash-barrier.jpg",
        tag: "Fencing"
      }
    ]
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
      "JNP Infra provides MMS installation and civil support in Vikram Solar project scopes.",
    executedWorks: [
      {
        title: "MMS Installation & Site Grading",
        scope: "Module Mounting Structure installation and land leveling for solar park",
        location: "Tamil Nadu",
        image: "/images/solar-infra.jpg",
        tag: "MMS & Civil"
      }
    ]
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
      "JNP Infra provides piling and MMS execution within NTPC Green public-sector solar project scopes.",
    executedWorks: [
      {
        title: "Hard Rock DTH Piling",
        scope: "Down-the-hole drilling and piling on rocky terrain for NTPC solar infrastructure",
        location: "Rajasthan",
        image: "/images/solar-infra.jpg",
        tag: "Piling"
      },
      {
        title: "ICR Fabrication & Plinth",
        scope: "ICR structural fabrication and transformer plinth civil works",
        location: "Madhya Pradesh",
        image: "/images/heavy-fab.jpg",
        tag: "Fabrication"
      }
    ]
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
      "JNP Infra supports Rays Power Infra with piling and civil execution on solar park projects.",
    executedWorks: [
      {
        title: "Solar Park Piling & MMS",
        scope: "Auger & DTH piling and MMS structure installation for solar park blocks",
        location: "Chhattisgarh",
        image: "/images/solar-infra.jpg",
        tag: "Piling & MMS"
      }
    ]
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
      "JNP Infra provides machine jointing and civil works support in MEIL bulk water transmission project corridors.",
    executedWorks: [
      {
        title: "HDPE Bulk Pipeline Jointing",
        scope: "Machine butt fusion jointing of large-diameter HDPE pipes for water transmission corridor",
        location: "Telangana",
        image: "/images/pipeline-hero.jpg",
        tag: "Pipeline"
      },
      {
        title: "RCC Valve Chamber Construction",
        scope: "RCC block valve chamber and thrust block civil construction along water main",
        location: "Andhra Pradesh",
        image: "/images/irrigation.jpg",
        tag: "Civil"
      }
    ]
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
      "JNP Infra supports WABAG with pipeline and chamber civil works on water treatment projects.",
    executedWorks: [
      {
        title: "HDPE Electrofusion Pipeline",
        scope: "Electrofusion jointing of HDPE distribution pipes for water treatment plant network",
        location: "Tamil Nadu",
        image: "/images/pipeline-hero.jpg",
        tag: "Pipeline"
      },
      {
        title: "Irrigation Distribution Works",
        scope: "Irrigation and distribution pipeline network laying and jointing works",
        location: "Karnataka",
        image: "/images/irrigation.jpg",
        tag: "Irrigation"
      }
    ]
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
      "JNP Infra supports L&T WET projects with specialized pipeline execution and civil chamber construction.",
    executedWorks: [
      {
        title: "DI Pipeline Laying & Jointing",
        scope: "Ductile Iron pipe laying, jointing and thrust block works for bulk water supply main",
        location: "Maharashtra",
        image: "/images/pipeline-hero.jpg",
        tag: "Pipeline"
      },
      {
        title: "RCC Valve Chamber Works",
        scope: "RCC valve and air release chamber construction along water main corridor",
        location: "Rajasthan",
        image: "/images/irrigation.jpg",
        tag: "Civil"
      }
    ]
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
      "JNP Infra provides pipeline jointing and pressure testing in Welspun water transmission project corridors.",
    executedWorks: [
      {
        title: "HDPE Transmission Pipeline",
        scope: "Butt fusion jointing of large-diameter HDPE water transmission pipes",
        location: "Uttar Pradesh",
        image: "/images/pipeline-hero.jpg",
        tag: "Pipeline"
      },
      {
        title: "Hydrostatic Pressure Testing",
        scope: "Full pipeline hydrostatic pressure testing and commissioning works",
        location: "Gujarat",
        image: "/images/water-tanks.jpg",
        tag: "Testing"
      }
    ]
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
      "JNP Infra provides pipeline jointing and civil works support in NCC water supply project corridors.",
    executedWorks: [
      {
        title: "Urban Water Supply Pipeline",
        scope: "HDPE & DI pipe jointing for urban water supply distribution network",
        location: "Andhra Pradesh",
        image: "/images/pipeline-hero.jpg",
        tag: "Pipeline"
      },
      {
        title: "Agricultural Irrigation Works",
        scope: "Agricultural pipeline network laying and wall chamber construction",
        location: "Karnataka",
        image: "/images/irrigation.jpg",
        tag: "Irrigation"
      }
    ]
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
      "JNP Infra provides pipeline and chamber civil works for Vishvaraj 24x7 water supply projects.",
    executedWorks: [
      {
        title: "24x7 Water Distribution Pipeline",
        scope: "HDPE & DI pipeline jointing for 24x7 distribution network under PPP scheme",
        location: "Maharashtra",
        image: "/images/pipeline-hero.jpg",
        tag: "Pipeline"
      },
      {
        title: "Water Tank Installation",
        scope: "Zincalume & SMC modular water tank supply, installation and commissioning",
        location: "Maharashtra",
        image: "/images/water-tanks.jpg",
        tag: "Tanks"
      }
    ]
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
      "JNP Infra provides pipeline and civil support within Tata Projects infrastructure contracts.",
    executedWorks: [
      {
        title: "Industrial Pipeline Network",
        scope: "HDPE butt fusion & electrofusion pipeline works for industrial water distribution",
        location: "Maharashtra",
        image: "/images/pipeline-hero.jpg",
        tag: "Pipeline"
      },
      {
        title: "Water Tank Installation",
        scope: "Zincalume modular water storage tank installation and commissioning",
        location: "Gujarat",
        image: "/images/water-tanks.jpg",
        tag: "Tanks"
      }
    ]
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
      "JNP Infra provides machine jointing, pressure testing and civil works in SPML water infrastructure project scopes.",
    executedWorks: [
      {
        title: "Bulk Water Transmission Pipeline",
        scope: "HDPE machine jointing and DI pipe works for bulk water transmission main",
        location: "Rajasthan",
        image: "/images/pipeline-hero.jpg",
        tag: "Pipeline"
      },
      {
        title: "RCC Chambers & Civil Works",
        scope: "RCC valve & air release chamber construction and pressure testing of pipeline",
        location: "Uttar Pradesh",
        image: "/images/irrigation.jpg",
        tag: "Civil"
      }
    ]
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
      "JNP Infra provides pipeline jointing and civil support in Enviro Infra water infrastructure projects.",
    executedWorks: [
      {
        title: "Water Distribution Pipeline",
        scope: "HDPE & DWC pipeline jointing for water supply distribution network",
        location: "Jharkhand",
        image: "/images/pipeline-hero.jpg",
        tag: "Pipeline"
      },
      {
        title: "Irrigation Pipeline System",
        scope: "Agricultural irrigation pipeline network laying, jointing and chamber works",
        location: "Bihar",
        image: "/images/irrigation.jpg",
        tag: "Irrigation"
      }
    ]
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
      "JNP Infra provides pipeline and civil works support in EMS government water supply scheme projects.",
    executedWorks: [
      {
        title: "Government Water Supply Scheme",
        scope: "DI & HDPE pipeline jointing and DWC pipe works for government water supply scheme",
        location: "Odisha",
        image: "/images/pipeline-hero.jpg",
        tag: "Pipeline"
      },
      {
        title: "RCC Manholes & Chambers",
        scope: "RCC manhole and chamber construction for sewerage collection and water distribution",
        location: "West Bengal",
        image: "/images/irrigation.jpg",
        tag: "Civil"
      }
    ]
  }
];
