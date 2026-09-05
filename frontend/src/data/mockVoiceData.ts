import type { VoiceAppData, IntakeCaseData, Advocate } from '../types/voiceIntake';

const baseCase: IntakeCaseData = {
  case_id: 'CB-2026-000123',
  caller_name: 'Ravi Kumar',
  contact_phone: '+91 98765 43210',
  matter_type: 'cyber_fraud',
  amount: { value: 45000, currency: 'INR' },
  priority_score: 85,
  priority_category: 'HIGH',
  priority_reasons: [
    '+30: Financial loss within 24 hours',
    '+20: Amount clearly stated',
    '+15: Identity of perpetrator mentioned',
    '+10: Evidence available (SMS/Screenshot)',
    '+10: High emotional distress indicated',
  ],
  complexity_score: 55,
  complexity_category: 'HIGH',
  recommended_advocate_tier: 'Senior',
  status: 'Briefed',
  chronology: [
    { timestamp: '2026-09-04T14:30:00Z', description: 'Caller received electricity SMS with payment link', source_start: '00:15', source_end: '00:32' },
    { timestamp: '2026-09-04T14:35:00Z', description: 'Caller clicked link and entered UPI PIN', source_start: '00:45', source_end: '01:05' },
    { timestamp: '2026-09-04T14:38:00Z', description: 'Transaction of ₹45,000 debited from account', source_start: '01:20', source_end: '01:48' },
    { timestamp: '2026-09-04T15:10:00Z', description: 'Caller filed complaint at cyber crime portal', source_start: '02:30', source_end: '02:55' },
    { timestamp: '2026-09-05T09:30:00Z', description: 'Caller received second fraudulent SMS from same number', source_start: '03:10', source_end: '03:28' },
  ],
  contradictions: [
    { field: 'amount', values: ['45,000', '50,000'], timestamps: ['01:10', '02:15'] },
    { field: 'transaction_time', values: ['2:38 PM', '2:42 PM'], timestamps: ['01:25', '02:00'] },
  ],
  audit_log: [
    { action: 'Outbound Call Initiated via Vapi', timestamp: '2026-09-05T09:58:00Z', user_id: 'system' },
    { action: 'Call connected — AI interview started', timestamp: '2026-09-05T09:58:15Z', user_id: 'system' },
    { action: 'Transcript generated and structured', timestamp: '2026-09-05T10:05:00Z', user_id: 'ai-intake' },
    { action: 'Priority score calculated: 85 (HIGH)', timestamp: '2026-09-05T10:05:05Z', user_id: 'ai-scoring' },
    { action: 'Brief draft created — pending reviewer approval', timestamp: '2026-09-05T10:05:10Z', user_id: 'ai-intake' },
  ],
  key_facts: [
    { id: 'kf-1', text: 'Victim received fraudulent electricity bill SMS at 2:30 PM on Sept 4', verification: 'unverified' },
    { id: 'kf-2', text: 'Amount lost: ₹45,000 via UPI transaction', verification: 'unverified' },
    { id: 'kf-3', text: 'Fraudulent sender number: +91 90000 12345', verification: 'unverified' },
    { id: 'kf-4', text: 'Complaint filed on National Cyber Crime Portal', verification: 'unverified' },
    { id: 'kf-5', text: 'Victim is a salaried IT professional, sole earner in family', verification: 'unverified' },
  ],
  evidence_mentioned: [
    { id: 'ev-1', text: 'Screenshot of fraudulent SMS with payment link', verification: 'unverified' },
    { id: 'ev-2', text: 'Bank statement showing ₹45,000 debit', verification: 'unverified' },
    { id: 'ev-3', text: 'Cyber Crime Portal acknowledgment number', verification: 'unverified' },
    { id: 'ev-4', text: 'UPI transaction reference ID', verification: 'unverified' },
  ],
  missing_information: [
    { id: 'mi-1', text: 'Exact bank name and account number', verification: 'unverified' },
    { id: 'mi-2', text: 'FIR number (if police complaint filed separately)', verification: 'unverified' },
    { id: 'mi-3', text: 'Whether bank was notified within golden hour', verification: 'unverified' },
  ],
  assigned_to: null,
};

const case2: IntakeCaseData = {
  case_id: 'CB-2026-000124',
  caller_name: 'Priya Mehta',
  contact_phone: '+91 87654 32100',
  matter_type: 'domestic_violence',
  amount: { value: 0, currency: 'INR' },
  priority_score: 92,
  priority_category: 'CRITICAL',
  priority_reasons: [
    '+40: Immediate physical safety concern',
    '+25: Ongoing threat reported',
    '+15: Minor children involved',
    '+12: No current shelter or safe space',
  ],
  complexity_score: 70,
  complexity_category: 'HIGH',
  recommended_advocate_tier: 'Specialist',
  status: 'New',
  chronology: [
    { timestamp: '2026-09-03T22:00:00Z', description: 'Physical altercation at home', source_start: '00:20', source_end: '00:45' },
    { timestamp: '2026-09-04T08:00:00Z', description: 'Caller left home with two children', source_start: '01:00', source_end: '01:25' },
  ],
  contradictions: [],
  audit_log: [
    { action: 'Inbound call received', timestamp: '2026-09-05T11:00:00Z', user_id: 'system' },
    { action: 'Priority score calculated: 92 (CRITICAL)', timestamp: '2026-09-05T11:08:00Z', user_id: 'ai-scoring' },
  ],
  key_facts: [
    { id: 'kf-6', text: 'Physical violence reported on night of Sept 3', verification: 'unverified' },
    { id: 'kf-7', text: 'Two minor children (ages 5 and 8) involved', verification: 'unverified' },
    { id: 'kf-8', text: 'Currently staying at relative\'s house', verification: 'unverified' },
  ],
  evidence_mentioned: [
    { id: 'ev-5', text: 'Medical report from local clinic', verification: 'unverified' },
  ],
  missing_information: [
    { id: 'mi-4', text: 'Full address of matrimonial home', verification: 'unverified' },
    { id: 'mi-5', text: 'Marriage certificate details', verification: 'unverified' },
  ],
  assigned_to: null,
};

const case3: IntakeCaseData = {
  case_id: 'CB-2026-000125',
  caller_name: 'Suresh Agarwal',
  contact_phone: '+91 76543 21000',
  matter_type: 'property_dispute',
  amount: { value: 2500000, currency: 'INR' },
  priority_score: 45,
  priority_category: 'MEDIUM',
  priority_reasons: [
    '+20: High monetary value at stake',
    '+15: Documentary evidence available',
    '+10: Ongoing encroachment reported',
  ],
  complexity_score: 60,
  complexity_category: 'HIGH',
  recommended_advocate_tier: 'Senior',
  status: 'In Review',
  chronology: [
    { timestamp: '2026-08-15T10:00:00Z', description: 'Neighbor began construction on disputed boundary', source_start: '00:10', source_end: '00:30' },
    { timestamp: '2026-08-20T14:00:00Z', description: 'Caller sent written notice to neighbor', source_start: '00:50', source_end: '01:10' },
  ],
  contradictions: [
    { field: 'boundary_measurement', values: ['12 feet', '15 feet'], timestamps: ['00:35', '01:20'] },
  ],
  audit_log: [
    { action: 'Call initiated', timestamp: '2026-09-04T14:00:00Z', user_id: 'system' },
    { action: 'Priority score calculated: 45 (MEDIUM)', timestamp: '2026-09-04T14:10:00Z', user_id: 'ai-scoring' },
  ],
  key_facts: [
    { id: 'kf-9', text: 'Boundary encroachment by neighboring property owner', verification: 'unverified' },
    { id: 'kf-10', text: 'Property value estimated at ₹25,00,000', verification: 'unverified' },
  ],
  evidence_mentioned: [
    { id: 'ev-6', text: 'Original property deed and survey map', verification: 'unverified' },
    { id: 'ev-7', text: 'Photographs of encroachment', verification: 'unverified' },
  ],
  missing_information: [
    { id: 'mi-6', text: 'Municipal corporation records', verification: 'unverified' },
  ],
  assigned_to: null,
};

const case4: IntakeCaseData = {
  case_id: 'CB-2026-000126',
  caller_name: 'Anita Singh',
  contact_phone: '+91 65432 10000',
  matter_type: 'consumer_rights',
  amount: { value: 85000, currency: 'INR' },
  priority_score: 55,
  priority_category: 'MEDIUM',
  priority_reasons: [
    '+20: Defective product with warranty',
    '+15: Seller refusing refund/replacement',
    '+10: Written complaint already sent',
    '+10: Documentary evidence of purchase',
  ],
  complexity_score: 35,
  complexity_category: 'MEDIUM',
  recommended_advocate_tier: 'Mid-level',
  status: 'Briefed',
  chronology: [
    { timestamp: '2026-07-10T10:00:00Z', description: 'Purchased washing machine for ₹85,000', source_start: '00:08', source_end: '00:22' },
    { timestamp: '2026-08-05T09:00:00Z', description: 'Machine stopped working after 26 days', source_start: '00:35', source_end: '00:50' },
    { timestamp: '2026-08-10T11:00:00Z', description: 'Seller refused replacement citing "misuse"', source_start: '01:05', source_end: '01:25' },
  ],
  contradictions: [],
  audit_log: [
    { action: 'Call initiated', timestamp: '2026-09-03T16:00:00Z', user_id: 'system' },
    { action: 'Brief generated', timestamp: '2026-09-03T16:12:00Z', user_id: 'ai-intake' },
  ],
  key_facts: [
    { id: 'kf-11', text: 'Washing machine purchased with 2-year warranty', verification: 'unverified' },
    { id: 'kf-12', text: 'Product failed within 26 days of purchase', verification: 'unverified' },
    { id: 'kf-13', text: 'Seller alleges misuse without inspection', verification: 'unverified' },
  ],
  evidence_mentioned: [
    { id: 'ev-8', text: 'Purchase invoice and warranty card', verification: 'unverified' },
    { id: 'ev-9', text: 'Written complaint sent via registered post', verification: 'unverified' },
  ],
  missing_information: [
    { id: 'mi-7', text: 'Service center inspection report', verification: 'unverified' },
  ],
  assigned_to: null,
};

const advocates: Advocate[] = [
  {
    id: 'adv-1', name: 'Adv. Rajesh Sharma', specialty_tags: ['cyber_fraud', 'consumer_rights'],
    rating: 4.8, experience_years: 15, location: 'New Delhi',
    match_score: 92, match_reasons: ['Cyber fraud specialist', '15 years experience', 'High Court practitioner'],
    tier: 'Senior', avatar_initials: 'RS',
  },
  {
    id: 'adv-2', name: 'Adv. Kavita Desai', specialty_tags: ['cyber_fraud', 'property_dispute'],
    rating: 4.6, experience_years: 12, location: 'Mumbai',
    match_score: 88, match_reasons: ['IT Act expertise', 'Strong recovery track record'],
    tier: 'Senior', avatar_initials: 'KD',
  },
  {
    id: 'adv-3', name: 'Adv. Amit Patel', specialty_tags: ['domestic_violence', 'labor_dispute'],
    rating: 4.9, experience_years: 20, location: 'Ahmedabad',
    match_score: 95, match_reasons: ['DV Act specialist', 'Protection order expertise', 'Women\'s rights advocate'],
    tier: 'Specialist', avatar_initials: 'AP',
  },
  {
    id: 'adv-4', name: 'Adv. Sunita Rao', specialty_tags: ['consumer_rights', 'property_dispute'],
    rating: 4.5, experience_years: 8, location: 'Bangalore',
    match_score: 78, match_reasons: ['Consumer forum experience', 'Good success rate'],
    tier: 'Mid-level', avatar_initials: 'SR',
  },
  {
    id: 'adv-5', name: 'Adv. Vikram Joshi', specialty_tags: ['property_dispute', 'cyber_fraud'],
    rating: 4.3, experience_years: 6, location: 'Pune',
    match_score: 72, match_reasons: ['Property law background', 'Revenue court practice'],
    tier: 'Mid-level', avatar_initials: 'VJ',
  },
  {
    id: 'adv-6', name: 'Adv. Neha Gupta', specialty_tags: ['cyber_fraud', 'consumer_rights'],
    rating: 4.1, experience_years: 3, location: 'New Delhi',
    match_score: 65, match_reasons: ['Recent cyber law certification', 'Tech-savvy approach'],
    tier: 'Junior', avatar_initials: 'NG',
  },
];

export const initialVoiceAppData: VoiceAppData = {
  activeCase: baseCase,
  allCases: [baseCase, case2, case3, case4],
  advocates,
  applications: {},
};
