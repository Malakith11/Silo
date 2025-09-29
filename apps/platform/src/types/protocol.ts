import { SupplementInstance, HealthGoal } from './supplement'

export interface Protocol {
  id: string
  name: string
  description: string
  goals: HealthGoal[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: ProtocolDuration

  supplements: SupplementInstance[]
  schedule: ProtocolSchedule

  creator: {
    type: 'expert' | 'community' | 'ai'
    id: string
    name: string
    credentials?: string
  }

  metadata: {
    createdAt: Date
    updatedAt: Date
    version: string
    isPublic: boolean
    tags: string[]
  }

  analytics: {
    userCount: number
    rating: number
    reviewCount: number
    successRate?: number
    popularityRank?: number
  }

  evidence: {
    researchBacked: boolean
    studyReferences: string[]
    evidenceLevel: 'high' | 'medium' | 'low'
    warnings: string[]
  }
}

export interface ProtocolDuration {
  type: 'fixed' | 'ongoing' | 'cycles'
  length?: number // in days
  unit?: 'days' | 'weeks' | 'months'
  cycles?: {
    onDays: number
    offDays: number
    totalCycles: number
  }
}

export interface ProtocolSchedule {
  timeBlocks: TimeBlock[]
  specialInstructions: SpecialInstruction[]
  restDays?: number[] // days of week (0-6) to rest
}

export interface TimeBlock {
  id: string
  name: string
  time: string // HH:MM format
  supplements: Array<{
    supplementInstanceId: string
    notes?: string
  }>
  conditions?: string[] // "with food", "empty stomach", etc.
}

export interface SpecialInstruction {
  type: 'timing' | 'cycling' | 'stacking' | 'warning'
  title: string
  description: string
  supplementIds?: string[]
  priority: 'high' | 'medium' | 'low'
}

export interface UserProtocol {
  id: string
  protocolId: string
  protocol: Protocol
  userId: string

  customizations: {
    modifiedSupplements: SupplementInstance[]
    modifiedSchedule: Partial<ProtocolSchedule>
    personalNotes: string
  }

  tracking: {
    startDate: Date
    endDate?: Date
    currentPhase: string
    adherenceRate: number
    logs: ProtocolLog[]
  }

  status: 'active' | 'paused' | 'completed' | 'discontinued'

  outcomes: {
    goals: Array<{
      goal: HealthGoal
      baselineScore?: number
      currentScore?: number
      targetScore?: number
    }>
    sideEffects: string[]
    notes: string[]
  }
}

export interface ProtocolLog {
  id: string
  date: Date
  timeBlockId: string
  supplementLogs: Array<{
    supplementInstanceId: string
    taken: boolean
    actualDose?: number
    actualTime?: string
    notes?: string
  }>
  mood?: number // 1-10 scale
  energy?: number // 1-10 scale
  sleep?: number // 1-10 scale
  notes?: string
}

export interface ProtocolTemplate {
  id: string
  name: string
  description: string
  category: ProtocolCategory
  goals: HealthGoal[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'

  templateSupplements: Array<{
    supplementId: string
    role: 'primary' | 'supporting' | 'optional'
    defaultDose?: number
    defaultTiming?: string[]
    alternatives?: string[] // alternative supplement IDs
  }>

  defaultSchedule: ProtocolSchedule
  estimatedCost: {
    monthly: number
    currency: string
  }

  prerequisites?: string[]
  contraindications?: string[]

  metadata: {
    createdBy: string
    createdAt: Date
    lastUpdated: Date
    usageCount: number
    rating: number
    featured: boolean
  }
}

export type ProtocolCategory =
  | 'sleep'
  | 'energy'
  | 'focus'
  | 'mood'
  | 'performance'
  | 'recovery'
  | 'immunity'
  | 'longevity'
  | 'weight'
  | 'stress'
  | 'custom'

export interface ProtocolComparison {
  protocols: Protocol[]
  comparison: {
    supplements: {
      common: string[]
      unique: Record<string, string[]>
    }
    cost: Record<string, number>
    complexity: Record<string, number>
    evidence: Record<string, string>
    duration: Record<string, string>
  }
}

export interface ProtocolOptimization {
  protocolId: string
  suggestions: Array<{
    type: 'add' | 'remove' | 'modify' | 'reorder'
    target: string // supplement ID or instruction
    reason: string
    evidence: string
    priority: 'high' | 'medium' | 'low'
    estimatedImpact: number // 1-10 scale
  }>
  riskAssessment: {
    interactions: number
    contraindications: number
    overallRisk: 'low' | 'medium' | 'high'
  }
}