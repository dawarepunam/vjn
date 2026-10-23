'use client';

import { useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  Calendar,
  Layers,
  Wrench,
  HelpCircle
} from 'lucide-react';
import styles from './DetailedEnquiryModal.module.css';

export interface SlideContextData {
  id: string;
  category: string;
  title: string;
  quoteTitle: string;
  quoteEstimate: string;
  scopeSummary: string;
}

interface DetailedEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  slideData: SlideContextData;
}

export default function DetailedEnquiryModal({
  isOpen,
  onClose,
  slideData
}: DetailedEnquiryModalProps) {
  // Common Contact & User Details
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [districtState, setDistrictState] = useState('');
  const [targetTimeline, setTargetTimeline] = useState('Immediate (Within 15 days)');
  const [preferredContactMode, setPreferredContactMode] = useState<'Call' | 'WhatsApp' | 'Email'>('WhatsApp');

  // Dynamic Technical Specifications by Service Slide
  // 1. Water Pipeline Works
  const [pipeMaterial, setPipeMaterial] = useState('HDPE (PE100 / PE80)');
  const [pipeDiameter, setPipeDiameter] = useState('110mm - 315mm (Medium)');
  const [totalLengthMeters, setTotalLengthMeters] = useState('');
  const [pipelineScope, setPipelineScope] = useState<string[]>([
    'Automatic Butt Fusion Jointing',
    'Pressure Hydrostatic Testing'
  ]);

  // 2. Solar Infrastructure
  const [solarCapacity, setSolarCapacity] = useState('1 MW - 5 MW');
  const [pilingMethod, setPilingMethod] = useState('DTH Hard Rock Drilling');
  const [strataType, setStrataType] = useState('Hard Rock Strata');
  const [solarScope, setSolarScope] = useState<string[]>([
    'DTH / Auger Piling & Concreting',
    'MMS Mechanical Assembly'
  ]);

  // 3. Liquid Storage Tanks
  const [tankType, setTankType] = useState('Zincalume Bolted Steel Tank');
  const [tankCapacityLiters, setTankCapacityLiters] = useState('1 Lakh to 5 Lakh Litres');
  const [storedLiquid, setStoredLiquid] = useState('Potable Drinking Water');
  const [civilBaseStatus, setCivilBaseStatus] = useState('Ring Beam Foundation Ready');

  // 4. Heavy Structural Fabrication
  const [structureType, setStructureType] = useState('Bus Passenger Shelters');
  const [estimatedTonnage, setEstimatedTonnage] = useState('5 to 25 Metric Tons');
  const [coatingFinish, setCoatingFinish] = useState('Hot-Dip Galvanized + PU Paint');
  const [drawingStatus, setDrawingStatus] = useState('Approved CAD / Structural Drawings Ready');

  // Additional Special Remarks
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [leadReferenceId, setLeadReferenceId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const togglePipelineScope = (item: string) => {
    setPipelineScope(prev => 
      prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
    );
  };

  const toggleSolarScope = (item: string) => {
    setSolarScope(prev => 
      prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !phone.trim() || !siteLocation.trim()) {
      setErrorMessage('Please fill in your Full Name, 10-Digit Mobile, and Project Site Location.');
      return;
    }

    // Validate phone number
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile contact number.');
      return;
    }

    setIsSubmitting(true);

    // Build comprehensive specifications payload
    let technicalSpecs: Record<string, any> = {};

    if (slideData.id === 'water-pipeline') {
      technicalSpecs = {
        pipeMaterial,
        pipeDiameter,
        totalLength: totalLengthMeters ? `${totalLengthMeters} Meters` : 'To be surveyed',
        scopeOfWork: pipelineScope.join(', ')
      };
    } else if (slideData.id === 'solar-infrastructure') {
      technicalSpecs = {
        capacity: solarCapacity,
        pilingTechnique: pilingMethod,
        geologicalStrata: strataType,
        workPackages: solarScope.join(', ')
      };
    } else if (slideData.id === 'water-storage-tanks') {
      technicalSpecs = {
        reservoirType: tankType,
        storageCapacity: tankCapacityLiters,
        liquidType: storedLiquid,
        foundationState: civilBaseStatus
      };
    } else {
      // Heavy fabrication
      technicalSpecs = {
        fabricatedItem: structureType,
        estimatedWeight: estimatedTonnage,
        protectiveCoating: coatingFinish,
        cadDrawingsAvailable: drawingStatus
      };
    }

    const payload = {
      fullName: fullName.trim(),
      company: companyName.trim() ? `${companyName.trim()} (${designation.trim() || 'Executive'})` : 'Individual Project',
      phone: phone.trim(),
      email: email.trim(),
      serviceType: `${slideData.category} — ${slideData.title}`,
      location: `${siteLocation.trim()}${districtState.trim() ? `, ${districtState.trim()}` : ''}`,
      budget: `Reference Estimate: ${slideData.quoteEstimate} | Timeline: ${targetTimeline}`,
      message: `[DETAILED CUSTOM PROPOSAL REQUEST]
Target Timeline: ${targetTimeline}
Preferred Contact Mode: ${preferredContactMode}
--- TECHNICAL SPECIFICATIONS ---
${Object.entries(technicalSpecs).map(([key, val]) => `• ${key}: ${val}`).join('\n')}
--- CLIENT NOTES / REMARKS ---
${additionalNotes.trim() || 'No additional notes provided.'}`
    };

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissionSuccess(true);
        setLeadReferenceId(data.leadId || `PRJ-${Date.now().toString().slice(-6)}`);
      } else {
        setErrorMessage(data.message || 'Unable to register request. Please check your inputs.');
      }
    } catch (err) {
      setErrorMessage('Server connection error. Please call our technical director directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmissionSuccess(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modalCard} role="dialog" aria-modal="true">
        
        {/* Top Header Strip */}
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <span className={styles.categoryBadge}>
              <Sparkles size={14} className={styles.badgeIcon} />
              {slideData.category}
            </span>
            <h2 className={styles.formTitle}>Custom Engineering Proposal Request</h2>
          </div>
          <button 
            type="button" 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Selected Service Context Pill */}
        <div className={styles.serviceContextBanner}>
          <div className={styles.contextInfo}>
            <span className={styles.contextLabel}>Target Project Scope:</span>
            <strong className={styles.contextProjectName}>{slideData.title}</strong>
          </div>
          <div className={styles.contextRateTag}>
            <span className={styles.rateLabel}>Indicative Rate Card:</span>
            <span className={styles.rateVal}>{slideData.quoteEstimate}</span>
          </div>
        </div>

        {submissionSuccess ? (
          /* SUCCESS VIEW */
          <div className={styles.successContainer}>
            <div className={styles.successIconWrapper}>
              <CheckCircle2 size={56} className={styles.successCheckIcon} />
            </div>
            <h3 className={styles.successHeading}>Quotation Request Registered!</h3>
            <p className={styles.successLeadText}>
              Thank you, <strong>{fullName}</strong>. Your project specifications for <strong>{slideData.title}</strong> have been securely routed to our senior project engineering team.
            </p>

            <div className={styles.refBox}>
              <span className={styles.refLabel}>PROJECT ENQUIRY REFERENCE ID</span>
              <span className={styles.refNumber}>{leadReferenceId}</span>
              <span className={styles.refNote}>We will reach out via {preferredContactMode} at {phone} within 2 business hours.</span>
            </div>

            <div className={styles.successActions}>
              <button 
                type="button" 
                className={styles.doneBtn}
                onClick={handleResetAndClose}
              >
                Close & Return to Site
              </button>
              <a 
                href={`tel:+919923561010`} 
                className={styles.directCallLink}
              >
                Need Urgent Rate Validation? Call Technical Director
              </a>
            </div>
          </div>
        ) : (
          /* DETAILED MULTI-SECTION FORM */
          <form onSubmit={handleSubmit} className={styles.enquiryForm}>
            
            {errorMessage && (
              <div className={styles.errorAlert}>
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className={styles.sectionsGrid}>
              
              {/* SECTION 1: DETAILED TECHNICAL SPECIFICATIONS (Dynamic per Slide) */}
              <div className={styles.formSection}>
                <div className={styles.sectionHeadingRow}>
                  <div className={styles.sectionNumber}>1</div>
                  <div>
                    <h3 className={styles.sectionTitle}>Project Technical Parameters</h3>
                    <p className={styles.sectionSub}>Tailored for {slideData.category}</p>
                  </div>
                </div>

                <div className={styles.fieldsContainer}>

                  {/* SLIDE 1: WATER PIPELINE WORKS */}
                  {slideData.id === 'water-pipeline' && (
                    <>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Pipe Material / Class</label>
                        <select 
                          className={styles.select} 
                          value={pipeMaterial} 
                          onChange={(e) => setPipeMaterial(e.target.value)}
                        >
                          <option value="HDPE (PE100 High-Density)">HDPE (PE100 High-Density Polyethylene)</option>
                          <option value="HDPE (PE80 Medium Density)">HDPE (PE80 Medium Density)</option>
                          <option value="DI (Ductile Iron Class K7 / K9)">DI (Ductile Iron Class K7 / K9)</option>
                          <option value="MS (Mild Steel Spiral Welded)">MS (Mild Steel Spiral Welded)</option>
                          <option value="UPVC / CPVC Industrial">UPVC / CPVC Heavy Industrial</option>
                        </select>
                      </div>

                      <div className={styles.row2Cols}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Pipe Diameter (OD)</label>
                          <select 
                            className={styles.select} 
                            value={pipeDiameter} 
                            onChange={(e) => setPipeDiameter(e.target.value)}
                          >
                            <option value="63mm - 110mm (Small Distribution)">63mm – 110mm (Distribution)</option>
                            <option value="110mm - 315mm (Medium Feeder)">110mm – 315mm (Feeder Main)</option>
                            <option value="355mm - 630mm (Heavy Transmission)">355mm – 630mm (Heavy Main)</option>
                            <option value="710mm - 1200mm (Ultra-Heavy BulkWeld)">710mm – 1200mm (Bulk Trunkline)</option>
                          </select>
                        </div>

                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Estimated Run Length (Meters)</label>
                          <input 
                            type="text" 
                            className={styles.input} 
                            placeholder="e.g. 2,500 Meters / 2.5 KM" 
                            value={totalLengthMeters} 
                            onChange={(e) => setTotalLengthMeters(e.target.value)} 
                          />
                        </div>
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Scope Packages Required (Select Multiple)</label>
                        <div className={styles.chipGroup}>
                          {[
                            'Automatic Butt Fusion Jointing',
                            'Electrofusion Fittings & Tees',
                            'Trenching & Excavation',
                            'RCC Thrust Blocks at Bends',
                            'Hydrostatic Pressure Testing (10-16 Bar)'
                          ].map(item => (
                            <button
                              type="button"
                              key={item}
                              className={`${styles.chip} ${pipelineScope.includes(item) ? styles.chipActive : ''}`}
                              onClick={() => togglePipelineScope(item)}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* SLIDE 2: SOLAR INFRASTRUCTURE */}
                  {slideData.id === 'solar-infrastructure' && (
                    <>
                      <div className={styles.row2Cols}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Solar Project Scale</label>
                          <select 
                            className={styles.select} 
                            value={solarCapacity} 
                            onChange={(e) => setSolarCapacity(e.target.value)}
                          >
                            <option value="Rooftop / Ground (Under 1 MW)">Commercial & C&I (&lt; 1 MW)</option>
                            <option value="1 MW - 5 MW Utility">1 MW – 5 MW Utility Sub-Plant</option>
                            <option value="5 MW - 25 MW Solar Park">5 MW – 25 MW Ground Solar Park</option>
                            <option value="25 MW - 100+ MW Utility Scale">25 MW – 100+ MW Mega Solar Park</option>
                          </select>
                        </div>

                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Foundation / Drilling Type</label>
                          <select 
                            className={styles.select} 
                            value={pilingMethod} 
                            onChange={(e) => setPilingMethod(e.target.value)}
                          >
                            <option value="DTH Hard Rock Drilling">DTH Hard Rock Drilling (Tractor/Rig)</option>
                            <option value="Tractor Auger Soil Boring">Tractor Auger Soil Boring (Soft/Murrum)</option>
                            <option value="Cast-in-Situ Reinforced RCC Piling">Cast-in-Situ Concrete Piling</option>
                            <option value="Ramming / Ground Screws">Hydraulic Pile Ramming</option>
                          </select>
                        </div>
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Site Strata Condition</label>
                        <select 
                          className={styles.select} 
                          value={strataType} 
                          onChange={(e) => setStrataType(e.target.value)}
                        >
                          <option value="Hard Basalt / Granite Rock">Hard Basalt / Granite Bedrock (Requires DTH)</option>
                          <option value="Hard Murrum & Boulders">Hard Murrum & Semi-Rocky Boulders</option>
                          <option value="Black Cotton / Loose Soil">Black Cotton / Agricultural Loam</option>
                          <option value="Strata Testing Pending">Geotechnical Strata Report Pending</option>
                        </select>
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Mechanical Scope Packages</label>
                        <div className={styles.chipGroup}>
                          {[
                            'DTH / Auger Piling & Concreting',
                            'MMS Structure Torque Assembly',
                            'PV Module Mounting & Clamping',
                            'ICR / Inverter Foundation Plinths',
                            'GI Security Perimeter Fencing'
                          ].map(item => (
                            <button
                              type="button"
                              key={item}
                              className={`${styles.chip} ${solarScope.includes(item) ? styles.chipActive : ''}`}
                              onClick={() => toggleSolarScope(item)}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* SLIDE 3: LIQUID STORAGE TANKS */}
                  {slideData.id === 'water-storage-tanks' && (
                    <>
                      <div className={styles.row2Cols}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Reservoir Engineering Technology</label>
                          <select 
                            className={styles.select} 
                            value={tankType} 
                            onChange={(e) => setTankType(e.target.value)}
                          >
                            <option value="Zincalume Bolted Steel Tank">Zincalume Bolted Steel Reservoir</option>
                            <option value="SMC Modular Panel Tank">SMC Modular GRP / FRP Panel Tank</option>
                            <option value="Glass-Fused-to-Steel (GFS)">Glass-Fused-to-Steel (GFS) Industrial</option>
                            <option value="Stainless Steel SS304/SS316">Stainless Steel Bolted Reservoir</option>
                          </select>
                        </div>

                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Required Storage Capacity</label>
                          <select 
                            className={styles.select} 
                            value={tankCapacityLiters} 
                            onChange={(e) => setTankCapacityLiters(e.target.value)}
                          >
                            <option value="25,000 to 50,000 Litres">25,000 to 50,000 Litres</option>
                            <option value="50,000 to 2,00,000 Litres">50,000 to 2,00,000 Litres</option>
                            <option value="2,00,000 to 10,00,000 Litres">2,00,000 to 10,00,000 Litres</option>
                            <option value="10 Lakh to 50 Lakh+ Litres (Mega)">10 Lakh to 50 Lakh+ Litres</option>
                          </select>
                        </div>
                      </div>

                      <div className={styles.row2Cols}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Storage Medium (Liquid Stored)</label>
                          <select 
                            className={styles.select} 
                            value={storedLiquid} 
                            onChange={(e) => setStoredLiquid(e.target.value)}
                          >
                            <option value="Potable Drinking Water (Municipal/JJNM)">Potable Drinking Water (JJNM / MIDC)</option>
                            <option value="Fire Fighting Hydrant Water Reserve">Fire Protection / Hydrant Storage</option>
                            <option value="Treated Sewage / STP Effluent">Treated Sewage / STP Water</option>
                            <option value="Industrial Process / RO Water">Industrial Process / Demineralized Water</option>
                          </select>
                        </div>

                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Civil Ring Beam Base Status</label>
                          <select 
                            className={styles.select} 
                            value={civilBaseStatus} 
                            onChange={(e) => setCivilBaseStatus(e.target.value)}
                          >
                            <option value="Civil Ring Beam Ready on Site">Civil Ring Beam Already Cast & Ready</option>
                            <option value="Need JNP Infra to Cast Foundation">Need JNP Infra to Cast Civil Foundation</option>
                            <option value="Roof-top Steel Platform">Rooftop Structural Steel Staging</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* SLIDE 4: HEAVY STRUCTURAL FABRICATION */}
                  {slideData.id === 'heavy-fabrication' && (
                    <>
                      <div className={styles.row2Cols}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Structural Component Type</label>
                          <select 
                            className={styles.select} 
                            value={structureType} 
                            onChange={(e) => setStructureType(e.target.value)}
                          >
                            <option value="Bus Passenger Transit Shelters">Bus Passenger Transit Shelters (BRTS / Urban)</option>
                            <option value="Highway W-Beam Crash Barriers">Highway W-Beam Metal Crash Barriers</option>
                            <option value="Industrial PEB Shed & Portal Girders">Industrial PEB Heavy Trusses & Girders</option>
                            <option value="Transmission / Telecom Steel Towers">Transmission / Substation Gantries</option>
                            <option value="Custom Plate Girders & Heavy Built-up">Custom Heavy Built-Up Sections</option>
                          </select>
                        </div>

                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Estimated Weight / Quantity</label>
                          <select 
                            className={styles.select} 
                            value={estimatedTonnage} 
                            onChange={(e) => setEstimatedTonnage(e.target.value)}
                          >
                            <option value="1 to 5 Metric Tons (Small Prototype)">1 to 5 Metric Tons (Small / Prototype)</option>
                            <option value="5 to 25 Metric Tons (Standard Batch)">5 to 25 Metric Tons (Standard Batch)</option>
                            <option value="25 to 100 Metric Tons (Commercial)">25 to 100 Metric Tons (Commercial)</option>
                            <option value="100+ Metric Tons (Heavy Infrastructure)">100+ Metric Tons (Heavy Infrastructure)</option>
                          </select>
                        </div>
                      </div>

                      <div className={styles.row2Cols}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Protective Surface Coating</label>
                          <select 
                            className={styles.select} 
                            value={coatingFinish} 
                            onChange={(e) => setCoatingFinish(e.target.value)}
                          >
                            <option value="Hot-Dip Galvanized + PU Paint">Hot-Dip Galvanized + Polyurethane Epoxy Finish</option>
                            <option value="Hot-Dip Galvanized Only (80+ Micron)">Hot-Dip Galvanized Only (IS 4759 Standards)</option>
                            <option value="Zinc Chromate Primer + 2 Coats Enamel">Zinc Chromate Primer + Enamel Paint</option>
                            <option value="Powder Coating (Architectural)">Architectural Powder Coating</option>
                          </select>
                        </div>

                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Structural Drawings / CAD Files</label>
                          <select 
                            className={styles.select} 
                            value={drawingStatus} 
                            onChange={(e) => setDrawingStatus(e.target.value)}
                          >
                            <option value="Approved CAD / Structural Drawings Ready">Approved CAD / Structural Drawings Available</option>
                            <option value="Concept Sketch Ready (Need Engineering Detailing)">Concept Sketch Ready (Need Shop Drawings)</option>
                            <option value="Turnkey Design & Fabrication Required">Turnkey Design, PE Stamping & Erection Required</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Project Target Timeline */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Expected Execution Timeline</label>
                    <div className={styles.radioPillGroup}>
                      {[
                        'Immediate (Within 15 days)',
                        'Within 1 Month',
                        'Next Quarter / Tendering Stage',
                        'Budgetary Planning'
                      ].map(timeline => (
                        <button
                          type="button"
                          key={timeline}
                          className={`${styles.radioPill} ${targetTimeline === timeline ? styles.radioPillActive : ''}`}
                          onClick={() => setTargetTimeline(timeline)}
                        >
                          {timeline}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION 2: DETAILED CLIENT & ORGANIZATIONAL DETAILS */}
              <div className={styles.formSection}>
                <div className={styles.sectionHeadingRow}>
                  <div className={styles.sectionNumber}>2</div>
                  <div>
                    <h3 className={styles.sectionTitle}>Client & Site Contact Information</h3>
                    <p className={styles.sectionSub}>Official correspondence for technical quotation</p>
                  </div>
                </div>

                <div className={styles.fieldsContainer}>
                  
                  {/* Full Name & Designation */}
                  <div className={styles.row2Cols}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Full Name <span className={styles.reqStar}>*</span></label>
                      <div className={styles.inputWithIcon}>
                        <User size={16} className={styles.fieldIcon} />
                        <input 
                          type="text" 
                          required
                          className={styles.input} 
                          placeholder="e.g. Rajesh Patil"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Your Role / Designation</label>
                      <div className={styles.inputWithIcon}>
                        <Briefcase size={16} className={styles.fieldIcon} />
                        <input 
                          type="text" 
                          className={styles.input} 
                          placeholder="e.g. Project Head / Contractor"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Organization / Firm / EPC Name</label>
                    <div className={styles.inputWithIcon}>
                      <Building2 size={16} className={styles.fieldIcon} />
                      <input 
                        type="text" 
                        className={styles.input} 
                        placeholder="e.g. Patil Infracon Pvt. Ltd. (or Government Body)"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className={styles.row2Cols}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Contact Mobile Number <span className={styles.reqStar}>*</span></label>
                      <div className={styles.inputWithIcon}>
                        <Phone size={16} className={styles.fieldIcon} />
                        <input 
                          type="tel" 
                          required
                          className={styles.input} 
                          placeholder="10-digit mobile number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Work Email Address</label>
                      <div className={styles.inputWithIcon}>
                        <Mail size={16} className={styles.fieldIcon} />
                        <input 
                          type="email" 
                          className={styles.input} 
                          placeholder="e.g. info@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Site Location & District/State */}
                  <div className={styles.row2Cols}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Project Site Location <span className={styles.reqStar}>*</span></label>
                      <div className={styles.inputWithIcon}>
                        <MapPin size={16} className={styles.fieldIcon} />
                        <input 
                          type="text" 
                          required
                          className={styles.input} 
                          placeholder="Taluka / City / MIDC Zone"
                          value={siteLocation}
                          onChange={(e) => setSiteLocation(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>District & State</label>
                      <input 
                        type="text" 
                        className={styles.input} 
                        placeholder="e.g. Ahmednagar, Maharashtra"
                        value={districtState}
                        onChange={(e) => setDistrictState(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Preferred Contact Mode */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Preferred Callback Mode</label>
                    <div className={styles.contactModeGroup}>
                      {(['WhatsApp', 'Call', 'Email'] as const).map(mode => (
                        <button
                          type="button"
                          key={mode}
                          className={`${styles.modeBtn} ${preferredContactMode === mode ? styles.modeBtnActive : ''}`}
                          onClick={() => setPreferredContactMode(mode)}
                        >
                          {mode === 'WhatsApp' && '💬 WhatsApp (Fastest)'}
                          {mode === 'Call' && '📞 Phone Call'}
                          {mode === 'Email' && '✉️ Official Email'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Extra Remarks / Notes */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Additional Scope Notes or Tender Specs</label>
                    <textarea 
                      rows={3}
                      className={styles.textarea}
                      placeholder="Mention any specific site constraints, BOQ bill of quantities, pipe wall thickness, or custom instructions..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                    />
                  </div>

                </div>
              </div>

            </div>

            {/* Modal Bottom Submission Footer */}
            <div className={styles.modalFooter}>
              <div className={styles.assuranceNote}>
                <ShieldCheck size={18} className={styles.shieldIcon} />
                <span>Zero spam guarantee. Official estimate evaluated by certified civil & mechanical engineers.</span>
              </div>

              <div className={styles.footerButtons}>
                <button 
                  type="button" 
                  className={styles.cancelBtn}
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Back to Overview
                </button>

                <button 
                  type="submit" 
                  className={styles.submitProposalBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Registering Specifications...</span>
                  ) : (
                    <>
                      <span>Generate Custom Project Proposal</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
