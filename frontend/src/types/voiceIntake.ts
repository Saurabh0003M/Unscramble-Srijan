export type CallStatus = 'idle' | 'calling' | 'live' | 'generating' | 'completed';

export type PriorityCategory = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type ComplexityCategory = 'HIGH' | 'MEDIUM' | 'LOW';
export type AdvocateTier = 'Junior' | 'Mid-level' | 'Senior' | 'Specialist';
export type IntakeCaseStatus = 'New' | 'In Review' | 'Briefed' | 'Assigned' | 'Closed';
export type MatterType =
  | 'cyber_fraud'
  | 'domestic_violence'
  | 'property_dispute'
  | 'consumer_rights'
  | 'labor_dispute'
  | 'traffic_violation';

export type VerificationStatus = 'unverified' | 'verified' | 'needs_correction' | 'unclear';
export type ApplicationStatus = 'none' | 'sent' | 'viewed' | 'accepted';

export interface ChronologyEvent {
  timestamp: string;
  description: string;
  source_start: string;
  source_end: string;
}

export interface Contradiction {
  field: string;
  values: string[];
  timestamps: string[];
}

export interface AuditLogEntry {
  action: string;
  timestamp: string;
  user_id: string;
}

export interface FactItem {
  id: string;
  text: string;
  verification: VerificationStatus;
}

export interface IntakeCaseData {
  case_id: string;
  caller_name: string;
  contact_phone: string;
  matter_type: MatterType;
  amount: { value: number; currency: string };
  priority_score: number;
  priority_category: PriorityCategory;
  priority_reasons: string[];
  complexity_score: number;
  complexity_category: ComplexityCategory;
  recommended_advocate_tier: AdvocateTier;
  chronology: ChronologyEvent[];
  contradictions: Contradiction[];
  audit_log: AuditLogEntry[];
  status: IntakeCaseStatus;
  key_facts: FactItem[];
  evidence_mentioned: FactItem[];
  missing_information: FactItem[];
  assigned_to: string | null;
}

export interface Advocate {
  id: string;
  name: string;
  specialty_tags: MatterType[];
  rating: number;
  experience_years: number;
  location: string;
  match_score: number;
  match_reasons: string[];
  tier: AdvocateTier;
  avatar_initials: string;
}

export type VoiceActiveTab = 'call' | 'dashboard' | 'marketplace';

export interface VoiceAppData {
  activeCase: IntakeCaseData;
  allCases: IntakeCaseData[];
  advocates: Advocate[];
  applications: Record<string, ApplicationStatus>;
}
