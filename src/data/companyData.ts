export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  longDesc: string;
  heroImage: string;
  features: string[];
  subCapabilities: {
    title: string;
    description: string;
    specifications?: string[];
  }[];
  brochureHighlights: string[];
}

export interface ClientItem {
  name: string;
  category: 'Solar EPC' | 'Water Infrastructure';
  badge: string;
  sector: string;
}

export interface ProjectWorkItem {
  id: string;
  title: string;
  category: 'water-pipeline' | 'solar-infrastructure' | 'water-tanks' | 'heavy-fabrication';
  categoryLabel: string;
  description: string;
  scopeOfWork: string[];
  machineryUsed: string[];
  image: string;
  badge: string;
}

export interface ContactDetails {
  companyName: string;
  tagline: string;
  subTagline: string;
  address: string;
  googleMapUrl: string;
  owners: {
    name: string;
    designation: string;
    phones: string[];
    emails: string[];
  }[];
}

export const COMPANY_CONTACT: ContactDetails = {
  companyName: "M/s JNP Infra Eng Works",
  tagline: "Engineering with Precision. Execution with Responsibility.",
  subTagline: "Quality Work Is Our Backbone.",
  address: "SR NO-42/2, Plot No-A/204, RAMAN STELLAR, Tathawade, Ta. Mulashi, Dist. Pune 33, Maharashtra, India.",
  googleMapUrl: "https://maps.google.com/?q=RAMAN+STELLAR+Tathawade+Mulashi+Pune+Maharashtra+India",
  owners: [
    {
      name: "Nitin Pawar",
      designation: "MD / Owner",
      phones: ["+919923561010"],
      emails: ["jnpinfraengworks@gmail.com", "nitinrpawar55@gmail.com"]
    },
    {
      name: "Sidharam Jamadar",
      designation: "MD / PM / Owner",
      phones: ["+917249824995", "+919834888875"],
      emails: ["jnpinfraengworks@gmail.com", "sidharamjnpengworks@gmail.com"]
    }
  ]
};

export const CERTIFICATIONS = [
  {
    code: "ISO 9001:2015",
    title: "Quality Management System",
    description: "Standardized quality control across pipeline jointing, testing, and infrastructure execution."
  },
  {
    code: "ISO 14001:2015",
    title: "Environmental Management",
    description: "Environmentally conscious excavation, trenching, soil conservation, and responsible site handover."
  },
  {
    code: "ISO 45001:2018",
    title: "Occupational Health & Safety",
    description: "Rigorous onsite worker safety, heavy machine handling protocols, and safety boundary installations."
  }
];

export const CLIENTS_DATA: ClientItem[] = [
  // Solar EPC Clients
  { name: "Tata Power Solar", category: "Solar EPC", badge: "Utility Scale Solar", sector: "Clean Energy & EPC" },
  { name: "Larsen & Toubro (L&T)", category: "Solar EPC", badge: "Heavy EPC & Renewables", sector: "Infrastructure & Energy" },
  { name: "Waaree Energies", category: "Solar EPC", badge: "Solar Solutions", sector: "Solar PV EPC" },
  { name: "Sterling & Wilson", category: "Solar EPC", badge: "Global Solar EPC", sector: "Renewable EPC" },
  { name: "Mahindra Susten", category: "Solar EPC", badge: "Clean Tech EPC", sector: "Renewables" },
  { name: "Jakson Green", category: "Solar EPC", badge: "Energy Transition EPC", sector: "Renewables & Power" },
  { name: "Adani Renewables", category: "Solar EPC", badge: "Mega Solar Parks", sector: "Green Energy" },
  { name: "Vikram Solar", category: "Solar EPC", badge: "EPC & PV Solutions", sector: "Solar Energy" },
  { name: "NTPC Green", category: "Solar EPC", badge: "Public Sector Solar", sector: "Power Generation" },
  { name: "Rays Power Infra", category: "Solar EPC", badge: "Solar EPC Leader", sector: "Solar Parks" },

  // Water Infrastructure Clients
  { name: "MEIL (Megha Eng & Infra Ltd)", category: "Water Infrastructure", badge: "Mega Water Projects", sector: "Water & Bulk Pipelines" },
  { name: "VA TECH WABAG", category: "Water Infrastructure", badge: "Water Treatment EPC", sector: "Desalination & Water" },
  { name: "L&T Construction (Water)", category: "Water Infrastructure", badge: "WET IC Water Projects", sector: "Bulk Water Supply" },
  { name: "Welspun Enterprises", category: "Water Infrastructure", badge: "Water Transmission", sector: "National Pipelines" },
  { name: "NCC Limited", category: "Water Infrastructure", badge: "Urban Water & Irrigation", sector: "Water Supply Works" },
  { name: "Vishvaraj Environment", category: "Water Infrastructure", badge: "Water Management", sector: "24/7 Water Projects" },
  { name: "Tata Projects", category: "Water Infrastructure", badge: "Industrial Water Infrastructure", sector: "Industrial Pipelines" },
  { name: "SPML Infra", category: "Water Infrastructure", badge: "Subsurface & Pipeline EPC", sector: "Smart Water Management" },
  { name: "Enviro Infra Engineers", category: "Water Infrastructure", badge: "WWTP & Pipeline Execution", sector: "Water Distribution" },
  { name: "EMS Limited", category: "Water Infrastructure", badge: "Sewerage & Water Schemes", sector: "Civil Water Infrastructure" }
];

export const SERVICES_DATA: Record<string, ServiceItem> = {
  "water-pipeline": {
    id: "water-pipeline",
    slug: "water-pipeline",
    title: "Water Pipeline Infrastructure",
    category: "Bulk Water Transmission & Distribution",
    shortDesc: "Specialized HDPE butt fusion, electrofusion, DI pipe jointing, thrust blocks, chambers, and agricultural pipeline networks.",
    longDesc: "M/s JNP Infra Eng Works is a specialized infrastructure execution contractor delivering complete piping execution from trenching, machine jointing, pressure hydro testing to backfilling. Our team integrates advanced butt fusion machines and electrofusion systems operated by certified technicians for leakage-free bulk water transmission.",
    heroImage: "/images/pipeline-hero.jpg",
    features: [
      "Precision machine jointing for high-pressure HDPE & DI pipelines",
      "Hydrostatic pressure testing up to standard bar ratings before commissioning",
      "Dedicated RCC and precast chamber construction for air and sluice valves",
      "Seamless integration across urban potable supply and agricultural irrigation"
    ],
    subCapabilities: [
      {
        title: "HDPE Butt Fusion Machine Work",
        description: "Hydraulic butt welding for large diameter HDPE pipes (up to 1200mm) ensuring pipe-to-pipe joint strength matching parent pipe wall integrity.",
        specifications: ["Automated temperature control", "Hydraulic clamp alignment", "Pressure-time graph logging"]
      },
      {
        title: "HDPE Electro Fusion Machine Work",
        description: "Specialized electrofusion couplers and fittings for distribution lines, service connections, and complex urban trench geometry.",
        specifications: ["Barcode scan parameter input", "Zero-leakage molecular fusion", "Ideal for cramped and urban trenches"]
      },
      {
        title: "DI Pipe Jointing & Push-Fit Work",
        description: "Ductile Iron (DI) socket and spigot jointing with Tyton rubber gaskets, ensuring resilient urban water distribution.",
        specifications: ["Laser alignment checking", "Correct gasket seating check", "Deflection testing adherence"]
      },
      {
        title: "DI Pipe Thrust Block Work",
        description: "Engineered M20/M25 concrete thrust blocks at pipeline bends, tees, and reducers to counteract high dynamic water hammer pressure.",
        specifications: ["Soil bearing capacity calculation", "Precision shuttering & reinforcement", "Mass concrete curing"]
      },
      {
        title: "RCC & Block Chamber Construction",
        description: "Robust valve chambers for Air Valves, Sluice Valves, Flow Meters, and Scour Valves with heavy-duty ductile iron covers.",
        specifications: ["Waterproof concrete mix", "Precast & in-situ RCC blocks", "Corrosion-resistant ladder rungs"]
      },
      {
        title: "DWC Pipe Jointing Work",
        description: "Double Wall Corrugated (DWC) HDPE pipe installation for gravity flow drainage, wastewater conveyance, and cable ducting.",
        specifications: ["Smooth internal surface", "High ring stiffness", "Elastomeric sealing rings"]
      },
      {
        title: "Agriculture Pipeline & Irrigation Systems",
        description: "Sub-surface irrigation pipelines, canal intake distribution, micro-irrigation manifolds, and wall chamber works for rural schemes.",
        specifications: ["Rapid trenching & pipe laying", "Long-distance rural coverage", "Reliable pressure testing"]
      }
    ],
    brochureHighlights: [
      "HDPE Butt Fusion Machine",
      "HDPE Electro Fusion Machine",
      "DI Pipe Thrust Block Work",
      "DI Pipe Jointing Work",
      "RCC / Block Chamber Work",
      "DWC Pipe Jointing Work",
      "Agriculture Pipeline",
      "Wall Chamber Work",
      "Irrigation Systems"
    ]
  },
  "solar-infrastructure": {
    id: "solar-infrastructure",
    slug: "solar-infrastructure",
    title: "Solar Infrastructure",
    category: "Renewable Utility-Scale Solutions",
    shortDesc: "End-to-end solar civil & mechanical works: DTH piling, tractor auger piling, MMS installation, galvanized safety mesh, ICR, and land leveling.",
    longDesc: "Providing comprehensive civil and mechanical execution for utility-scale solar parks and rooftop installations. JNP Infra deploys heavy earthmoving equipment, hydraulic tractor augers, and pneumatic DTH rigs to tackle tough geological strata, delivering millimeter-accurate module mounting structure (MMS) foundations.",
    heroImage: "/images/solar-infra.jpg",
    features: [
      "Rigid geological penetration through rock strata using DTH drilling",
      "Fast-track MMS module installation with certified torque calibration",
      "Site grading and contour management using JCB 3DX & Hitachi Excavators",
      "Perimeter security fencing with Galvanized Steel boundary mesh"
    ],
    subCapabilities: [
      {
        title: "DTH (Down-The-Hole) Piling",
        description: "Pneumatic percussion drilling through hard basalt, granite, and rocky terrain for solar column foundation stability.",
        specifications: ["Deep penetration in dense rock", "Vertical plumb line tolerance <1°", "High pull-out resistance"]
      },
      {
        title: "Tractor Auger Piling",
        description: "High-mobility auger piling in loose, sandy, or agricultural soil for rapid pile hole digging at lower operating cost.",
        specifications: ["Rapid daily hole drilling rate", "Adjustable auger diameters (250mm - 600mm)", "Minimal ground disturbance"]
      },
      {
        title: "MMS Module Installation",
        description: "Assembly and torque-tightening of Module Mounting Structures (fixed tilt and seasonal tracking) with solar PV module mounting.",
        specifications: ["Calibrated torque wrenches", "Anti-theft fastener installation", "String-level alignment precision"]
      },
      {
        title: "Safety Boundary Mesh in Galvanized Steel",
        description: "Heavy-duty GI chainlink and weld mesh boundary fencing protecting solar park assets from unauthorized entry and wildlife.",
        specifications: ["Hot-dip galvanized coating", "Y-arm barbed wire top security", "Concrete foundation grouting"]
      },
      {
        title: "ICR & Inverter Room Fabrication",
        description: "Structural fabrication of Inverter Control Rooms (ICR), transformer plinths, cable trays, and weather-protected enclosures.",
        specifications: ["Pre-engineered steel columns", "Industrial fire-rated sheeting", "Proper drainage & earthing grids"]
      },
      {
        title: "Land Leveling using JCB / Hitachi",
        description: "Topographic site preparation, contour grading, cut-and-fill operations, and internal road development using heavy earthmovers.",
        specifications: ["Laser-guided grading", "Optimum drainage slope planning", "Compaction testing verification"]
      }
    ],
    brochureHighlights: [
      "DTH Piling",
      "MMS Module Installation",
      "Safety Boundary Mesh in Galvanized Steel",
      "ICR and Fabrication Work",
      "Land Leveling using JCB / Hitachi",
      "Tractor Auger Piling"
    ]
  },
  "water-tanks": {
    id: "water-tanks",
    slug: "water-tanks",
    title: "Water Storage Tanks",
    category: "Bulk Industrial & Potable Liquid Storage",
    shortDesc: "Engineered installation of Zincalume, SMC Panel, FBEC, GLS/GFS, and custom MS fabricated liquid storage reservoirs.",
    longDesc: "Engineering high-capacity, hygienic, and corrosion-resistant water storage solutions for municipal supplies, industrial plants, fire-fighting systems, and rural tap water projects. We specialize in bolted steel and composite panel technologies with extended life cycles.",
    heroImage: "/images/water-tanks.jpg",
    features: [
      "Modular bolted assembly enabling rapid on-site erection without hot-work",
      "Certified food-grade and potable water contact liners and coatings",
      "Zero corrosion risks with specialized Glass-Fused-to-Steel and Zincalume alloys",
      "Capacities ranging from 10,000 Litres to multi-million litre reservoirs"
    ],
    subCapabilities: [
      {
        title: "Zincalume Tanks",
        description: "Corrugated steel tanks coated with Zinc-Aluminium alloy providing up to 4x the corrosion resistance of standard galvanized steel, lined with reinforced geomembranes.",
        specifications: ["Alu-Zinc protective alloy", "Reinforced PVC / EPDM food-grade liner", "Lightweight yet structural"]
      },
      {
        title: "SMC (Sheet Moulding Compound) Panel Tanks",
        description: "Precision-moulded composite panels bolted together for roof-top and basement potable water reservoirs, completely rust-proof.",
        specifications: ["Non-toxic composite material", "Flexible volume configurations", "Zero bacterial growth surface"]
      },
      {
        title: "FBEC (Fusion Bonded Epoxy Coated) Tanks",
        description: "Heavy-duty steel plates coated with fusion bonded epoxy powder for harsh industrial effluents and treated wastewater storage.",
        specifications: ["Electrostatic powder coating", "Chemical & abrasion resistance", "High holiday-free coating index"]
      },
      {
        title: "GLS / GFS (Glass-Fused-to-Steel) Tanks",
        description: "Titanium-rich steel plates fused with glass enamel at 850°C, combining steel flexibility with glass inertness for ultimate durability.",
        specifications: ["pH 1 - 14 chemical resistance", "Zero maintenance interior", "Life expectancy exceeding 30 years"]
      },
      {
        title: "MS Fabricated Tanks",
        description: "Custom heavy mild steel welded tanks, fabricated, sandblasted, and epoxy-painted on-site for custom industrial storage footprints.",
        specifications: ["IS 2062 Grade steel plates", "Ultrasonic weld inspection", "Epoxy primer & PU topcoats"]
      }
    ],
    brochureHighlights: [
      "Zincalume Tanks",
      "SMC Panel Tanks",
      "FBEC Tanks",
      "GLS / GFS Tanks",
      "MS Fabricated Tanks"
    ]
  },
  "heavy-fabrication": {
    id: "heavy-fabrication",
    slug: "heavy-fabrication",
    title: "Heavy Fabrication & Infrastructure Works",
    category: "Industrial Structural Engineering",
    shortDesc: "Structural steel fabrication for bus shelters, railway bridges, industrial warehouses, crash barriers, and custom civil structures.",
    longDesc: "Equipped with welding stations, shearing machines, beam assembly bays, and mobile erection rigs, JNP Infra delivers robust structural steel fabrications engineered to stringent safety codes for transportation, transit, and commercial hubs.",
    heroImage: "/images/heavy-fab.jpg",
    features: [
      "Certified multi-pass arc and MIG welding verified by non-destructive testing (NDT)",
      "Strict compliance with Indian Railway and Highway authority engineering standards",
      "Corrosion protection through hot-dip galvanizing and multi-coat industrial coatings",
      "Full turnkey lifecycle: shop drawing, fabrication, transport, and site erection"
    ],
    subCapabilities: [
      {
        title: "Bus Shelters & Transit Infrastructure",
        description: "Durable, aesthetically modern bus transit shelters, passenger kiosks, and cantilever steel roofing for urban transport authorities.",
        specifications: ["Modular tubular steel frame", "Polycarbonate or color-coated roof sheets", "Anti-corrosion powder coating"]
      },
      {
        title: "Railway Bridges & Girders",
        description: "Heavy-section plate girders, foot-over-bridge (FOB) superstructures, and trackside portal frames fabricated to RDSO guidelines.",
        specifications: ["High tensile steel plates", "Ultrasonic & dye-penetrant weld testing", "Precision camber management"]
      },
      {
        title: "Industrial Warehouses & PEB",
        description: "Pre-Engineered Building (PEB) fabrication, portal frames, purlins, and heavy industrial warehouse trusses for storage hubs.",
        specifications: ["Clear-span truss design", "Integrated crane gantry girders", "Rapid bolted site assembly"]
      },
      {
        title: "Crash Barriers (W-Beam & Thrie-Beam)",
        description: "Cold-rolled galvanized W-beam metal crash barriers and steel posts for expressways, highway bends, and flyovers.",
        specifications: ["Conforms to MORTH / IRC specifications", "High energy absorption profile", "550 g/m² hot-dip galvanization"]
      }
    ],
    brochureHighlights: [
      "Bus Shelters",
      "Railway Bridges",
      "Industrial Warehouses",
      "Highway Crash Barriers"
    ]
  }
};

export const WORK_SHOWCASE_ITEMS: ProjectWorkItem[] = [
  {
    id: "work-1",
    title: "Large-Scale HDPE Butt Fusion & Water Mains Jointing",
    category: "water-pipeline",
    categoryLabel: "Water Pipeline",
    description: "Hydraulic butt fusion machine jointing and hydrostatic pressure testing for trunk potable water transmission line.",
    scopeOfWork: ["HDPE Pipe Trenching & Stringing", "Butt Fusion Jointing 400mm-800mm", "Hydrostatic Pressure Testing", "RCC Valve Chamber Construction"],
    machineryUsed: ["Hydraulic HDPE Butt Fusion Machine", "Excavator 20 Ton", "Hydro Testing Pump & Bar Loggers"],
    image: "/images/pipeline-hero.jpg",
    badge: "Representative Execution Capability"
  },
  {
    id: "work-2",
    title: "DTH Rock Piling & MMS Installation for Solar Farm",
    category: "solar-infrastructure",
    categoryLabel: "Solar Infrastructure",
    description: "Percussion DTH piling through dense rock strata and fast-track MMS structure assembly for multi-megawatt solar plant.",
    scopeOfWork: ["Hard Rock DTH Drilling", "Pile Casting & Plumb Alignment", "MMS Mechanical Assembly", "Torque Calibration & Module Clamping"],
    machineryUsed: ["Pneumatic DTH Drilling Rig", "Mobile Air Compressor", "Calibrated Torque Wrenches"],
    image: "/images/solar-infra.jpg",
    badge: "Representative Execution Capability"
  },
  {
    id: "work-3",
    title: "Ductile Iron (DI) Pipeline Jointing & Concrete Thrust Blocks",
    category: "water-pipeline",
    categoryLabel: "Water Pipeline",
    description: "Push-fit DI pipe laying with precision Tyton gaskets and reinforced concrete thrust block construction at bends and junctions.",
    scopeOfWork: ["Trench excavation & bed preparation", "DI socket jointing with laser alignment", "Reinforced M25 concrete thrust blocks", "Backfilling & soil compaction"],
    machineryUsed: ["JCB 3DX Earthmover", "Transit Mixer & Concrete Vibrators", "Pipe Laying Crane"],
    image: "/images/machinery-work.jpg",
    badge: "Representative Execution Capability"
  },
  {
    id: "work-4",
    title: "Industrial Zincalume & GLS Bolted Water Storage Reservoir",
    category: "water-tanks",
    categoryLabel: "Water Storage Tanks",
    description: "Precision erection of high-capacity Zincalume steel tank with food-grade internal membrane liner for municipal bulk storage.",
    scopeOfWork: ["Ring wall foundation inspection", "Bolted Zincalume panel assembly", "Liner installation & vacuum testing", "Inlet/outlet nozzle fabrication"],
    machineryUsed: ["Hydraulic Jacks System", "Electric Torque Drives", "Liner Testing Kit"],
    image: "/images/water-tanks.jpg",
    badge: "Representative Execution Capability"
  },
  {
    id: "work-5",
    title: "Galvanized Steel Safety Boundary Mesh for Solar Facility",
    category: "solar-infrastructure",
    categoryLabel: "Solar Infrastructure",
    description: "High-security perimeter fencing using hot-dip galvanized wire mesh, concrete footings, and Y-arm barbed wire.",
    scopeOfWork: ["Post hole auger digging", "GI post vertical alignment & grouting", "Chainlink / weld mesh tensioning", "3-tier razor barbed wire installation"],
    machineryUsed: ["Tractor-Mounted Auger", "Concrete Mixer", "Wire Tensioning Winch"],
    image: "/images/solar-infra.jpg",
    badge: "Representative Execution Capability"
  },
  {
    id: "work-6",
    title: "Heavy Structural Steel Fabrication & Transit Shelters",
    category: "heavy-fabrication",
    categoryLabel: "Heavy Fabrication",
    description: "Precision workshop fabrication and site erection of cantilever bus transit shelters and industrial steel warehouse trusses.",
    scopeOfWork: ["Structural steel cutting & beveling", "Certified multi-pass MIG welding", "Industrial multi-coat paint finish", "Mobile crane lifting & erection"],
    machineryUsed: ["MIG/ARC Welding Machines", "Mobile Boom Crane", "Magnetic Core Drilling Rigs"],
    image: "/images/heavy-fab.jpg",
    badge: "Representative Execution Capability"
  },
  {
    id: "work-7",
    title: "Highway W-Beam Crash Barriers & Road Safety Enclosure",
    category: "heavy-fabrication",
    categoryLabel: "Heavy Fabrication",
    description: "Installation of cold-rolled galvanized steel W-beam barriers and C-channel posts along highway curve segments.",
    scopeOfWork: ["Post driving into road shoulders", "W-beam panel splicing & bolting", "Terminal section anchoring", "Reflector deliniator fitting"],
    machineryUsed: ["Hydraulic Post Driver", "Impact Wrenches", "Survey Alignment Station"],
    image: "/images/crash-barrier.jpg",
    badge: "Representative Execution Capability"
  },
  {
    id: "work-8",
    title: "Agricultural Irrigation Network & Valve Chambers",
    category: "water-pipeline",
    categoryLabel: "Water Pipeline",
    description: "Rural command area pipe distribution involving DWC and HDPE pipe laying, wall chambers, and micro-irrigation manifold setups.",
    scopeOfWork: ["Cross-country trench excavation", "Electrofusion and push-fit jointing", "Brick/block valve chamber creation", "Field outlet hydrants"],
    machineryUsed: ["Hitachi Mini Excavator", "HDPE Electro Fusion Unit", "Diesel Dewatering Pumps"],
    image: "/images/irrigation.jpg",
    badge: "Representative Execution Capability"
  }
];

export const EXECUTION_STEPS = [
  {
    step: "01",
    title: "Plan",
    subtitle: "Thorough Engineering Preparation",
    desc: "Rigorous site surveying, geotechnical assessment, route profile validation, equipment mobilization, and HSE risk protocols before ground breaking."
  },
  {
    step: "02",
    title: "Execute",
    subtitle: "Machine & Manual Precision",
    desc: "Deployment of heavy earthmovers, automated butt fusion rigs, pneumatic DTH pilers, and skilled ground crews to execute works to millimeter tolerances."
  },
  {
    step: "03",
    title: "Test",
    subtitle: "Pressure & Structural Validation",
    desc: "Hydrostatic pressure testing of pipelines, pull-out torque checks on solar pilings, holiday testing on coatings, and ultrasonic weld inspections."
  },
  {
    step: "04",
    title: "Inspect",
    subtitle: "Quality Assurance & Compliance",
    desc: "Joint inspection with client engineers, third-party audits, compliance sign-offs with ISO 9001/14001/45001 standards, and defect checks."
  },
  {
    step: "05",
    title: "Complete",
    subtitle: "Commissioning & Handover",
    desc: "Trench backfilling, surface restoration, documentation submission (as-built drawings & test logs), and responsible handover to EPC clients."
  }
];

export const CAPABILITIES_DATA = [
  {
    title: "Technical Execution Capability",
    desc: "Deep domain understanding of piping hydrodynamics, structural load distributions, solar MMS geometries, and heavy foundation engineering."
  },
  {
    title: "Machine & Manual Synergy",
    desc: "Strategic combination of modern high-tonnage construction machinery with experienced artisan technicians for difficult terrain."
  },
  {
    title: "Skilled & Certified Workforce",
    desc: "Trained operators for butt fusion, electrofusion, DTH drilling rigs, torque alignment, and certified heavy equipment maneuvering."
  },
  {
    title: "Quality-Focused Execution",
    desc: "“Quality Work Is Our Backbone.” Stringent material testing, zero-tolerance joint inspection, and complete process documentation."
  },
  {
    title: "Modern Machinery Fleet",
    desc: "Fully equipped with automated HDPE Butt Fusion rigs, Electrofusion units, JCB / Hitachi excavators, and tractor auger pilers."
  },
  {
    title: "Site & Terrain Adaptability",
    desc: "Proven capability to execute in rocky basalt, water-logged black cotton soils, urban congested streets, and remote solar park contours."
  }
];
