export type HealthGoal =
  | "longevity"
  | "performance"
  | "cognitive"
  | "metabolic"
  | "immune"
  | "sleep"
  | "stress";

export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  goals: HealthGoal[];
  focusAreas: string[];
  createdAt: string;
  updatedAt: string;
}
