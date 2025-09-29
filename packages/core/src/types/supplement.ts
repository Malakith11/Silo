export interface LiteratureReference {
  id: string;
  title: string;
  url: string;
  publicationDate?: string;
  summary?: string;
  evidenceLevel?: "strong" | "moderate" | "emerging";
}

export interface SupplementIngredient {
  id: string;
  name: string;
  amount?: string;
  unit?: string;
  standardization?: string;
}

export interface SupplementProduct {
  id: string;
  brand: string;
  name: string;
  category: string;
  score?: number;
  certifications?: string[];
  ingredients: SupplementIngredient[];
  references?: LiteratureReference[];
}
