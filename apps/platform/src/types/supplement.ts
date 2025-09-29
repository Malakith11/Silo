export interface Supplement {
  id: string
  name: string
  commonNames: string[]
  category: SupplementCategory
  description: string
  scientificName?: string
  casNumber?: string

  dosing: {
    defaultDose: number
    unit: DoseUnit
    minDose: number
    maxDose: number
    frequency: Frequency
    timing: TimingRecommendation[]
  }

  forms: SupplementForm[]
  bioavailability: BioavailabilityInfo[]

  safety: {
    contraindications: string[]
    sideEffects: SideEffect[]
    interactions: Interaction[]
    pregnancyCategory?: PregnancyCategory
    warnings: string[]
  }

  research: {
    evidenceGrade: EvidenceGrade
    studyCount: number
    lastReviewDate: Date
    keyFindings: string[]
  }

  goals: HealthGoal[]
  tags: string[]

  metadata: {
    createdAt: Date
    updatedAt: Date
    reviewedBy?: string
    version: string
  }
}

export type SupplementCategory =
  | 'vitamins'
  | 'minerals'
  | 'amino-acids'
  | 'herbs'
  | 'nootropics'
  | 'performance'
  | 'probiotics'
  | 'omega-fatty-acids'
  | 'adaptogens'
  | 'other'

export type DoseUnit =
  | 'mg' | 'g' | 'mcg' | 'iu' | 'ml' | 'drops' | 'capsules' | 'tablets'

export type Frequency =
  | 'once-daily' | 'twice-daily' | 'three-times-daily'
  | 'weekly' | 'as-needed' | 'cycling'

export type TimingRecommendation =
  | 'morning' | 'afternoon' | 'evening' | 'bedtime'
  | 'with-food' | 'empty-stomach' | 'pre-workout' | 'post-workout'

export interface SupplementForm {
  type: FormType
  absorption: AbsorptionRate
  notes?: string
}

export type FormType =
  | 'capsule' | 'tablet' | 'powder' | 'liquid' | 'gummy'
  | 'sublingual' | 'topical' | 'injection'

export type AbsorptionRate = 'high' | 'medium' | 'low'

export interface BioavailabilityInfo {
  form: FormType
  bioavailability: number // percentage
  notes: string
  enhancers?: string[] // substances that improve absorption
  inhibitors?: string[] // substances that reduce absorption
}

export interface SideEffect {
  effect: string
  frequency: 'common' | 'uncommon' | 'rare'
  severity: 'mild' | 'moderate' | 'severe'
}

export interface Interaction {
  type: 'supplement' | 'medication' | 'food'
  target: string
  severity: 'major' | 'moderate' | 'minor'
  description: string
  mechanism?: string
}

export type PregnancyCategory = 'A' | 'B' | 'C' | 'D' | 'X'

export type EvidenceGrade = 'A' | 'B' | 'C' | 'D' | 'insufficient'

export type HealthGoal =
  | 'energy' | 'sleep' | 'focus' | 'mood' | 'stress'
  | 'immunity' | 'recovery' | 'performance' | 'longevity'
  | 'heart-health' | 'brain-health' | 'bone-health'
  | 'skin-health' | 'digestive-health' | 'weight-management'

export interface SupplementInstance {
  id: string
  supplementId: string
  supplement: Supplement
  userDose: number
  userUnit: DoseUnit
  userFrequency: Frequency
  userTiming: TimingRecommendation[]
  userForm: FormType
  startDate: Date
  endDate?: Date
  notes?: string
  adherenceRate?: number
}

export interface SupplementSearchResult {
  supplement: Supplement
  relevanceScore: number
  matchType: 'name' | 'description' | 'goal' | 'category'
  trending?: boolean
}

export interface SupplementUsageStats {
  supplementId: string
  userCount: number
  popularityRank: number
  trendingScore: number
  averageAdherence: number
  commonDoses: Array<{
    dose: number
    unit: DoseUnit
    percentage: number
  }>
  commonTimings: Array<{
    timing: TimingRecommendation
    percentage: number
  }>
  goalDistribution: Record<HealthGoal, number>
}