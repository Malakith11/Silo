import type { LiteratureReference, SupplementProduct } from "./supplement";

export interface ProtocolStep {
  id: string;
  supplementId: string;
  schedule: "daily" | "weekly" | "cycle";
  dosage?: string;
  notes?: string;
}

export interface Protocol {
  id: string;
  ownerId: string;
  name: string;
  description?: string;
  steps: ProtocolStep[];
  createdAt: string;
  updatedAt: string;
  references?: LiteratureReference[];
}

export interface ProtocolSuggestion {
  profileId: string;
  supplements: SupplementProduct[];
  rationale: string;
}
