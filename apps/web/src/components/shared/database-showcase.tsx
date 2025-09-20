"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Checkbox } from "../ui/checkbox"
import { Search, ChevronDown, ChevronUp, X, Package, Target, Bell, Bookmark, BarChart3, Zap } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useMotion } from "../Global/motion-provider"
import { motion } from "framer-motion"

// Typing Animation Component

interface Study {
  id: string
  title: string
  supplement: string
  category: string
  rating: number
  year: number
  studySize: number
  effectSize: number
  duration: string
  dosage: string
  keyFindings: string[]
  sideEffects: string[]
  studyDesign: string
  compounds: string[]
  qualityScore: number
  methodologyScore: number
  relevanceScore: number
  expanded?: boolean
  // Additional assessment data
  randomizationScore: number
  blindingScore: number
  allocationScore: number
  outcomeScore: number
  pValue: string
  confidenceInterval: string
  statisticalPower: number
  dropoutRate: number
  treatmentGroup: number
  controlGroup: number
  completedStudy: number
  studyType: string
  studyDesignFull: string
  primaryOutcome: string
  participants: string
  evidenceLevel: string
  jadad: string
  consort: string
  cochrane: string
}

const STUDIES: Study[] = [
  {
    id: "1",
    title: "Creatine Monohydrate and Cognitive Performance in Healthy Adults",
    supplement: "Creatine Monohydrate",
    category: "Cognitive",
    rating: 4.8,
    year: 2023,
    studySize: 156,
    effectSize: 0.72,
    duration: "8 weeks",
    dosage: "5g daily",
    keyFindings: [
      "Significant improvement in working memory tasks (+23%)",
      "Enhanced processing speed in complex cognitive tasks",
      "Reduced mental fatigue during prolonged cognitive work",
    ],
    sideEffects: ["Mild water retention in 8% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Creatine Monohydrate", "Magnesium Stearate"],
    qualityScore: 94,
    methodologyScore: 91,
    relevanceScore: 88,
    randomizationScore: 95.0,
    blindingScore: 89.2,
    allocationScore: 92.8,
    outcomeScore: 87.5,
    pValue: "<0.001",
    confidenceInterval: "[0.51, 0.93]",
    statisticalPower: 96,
    dropoutRate: 3.2,
    treatmentGroup: 78,
    controlGroup: 78,
    completedStudy: 151,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Working memory performance",
    participants: "156 healthy adults (18-35 years)",
    evidenceLevel: "Level 1b Evidence (High Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "2",
    title: "Rhodiola Rosea Extract for Stress-Related Fatigue",
    supplement: "Rhodiola Rosea",
    category: "Stress",
    rating: 4.6,
    year: 2023,
    studySize: 89,
    effectSize: 0.65,
    duration: "12 weeks",
    dosage: "400mg daily",
    keyFindings: [
      "Reduced perceived stress levels by 31%",
      "Improved stress resilience markers",
      "Better sleep quality scores",
    ],
    sideEffects: ["Mild dizziness in first week (12% of participants)"],
    studyDesign: "Randomized controlled trial",
    compounds: ["Rhodiola Rosea Extract", "Rosavins", "Salidroside"],
    qualityScore: 87,
    methodologyScore: 89,
    relevanceScore: 92,
    randomizationScore: 88.5,
    blindingScore: 85.0,
    allocationScore: 90.2,
    outcomeScore: 91.8,
    pValue: "<0.01",
    confidenceInterval: "[0.42, 0.88]",
    statisticalPower: 85,
    dropoutRate: 7.8,
    treatmentGroup: 45,
    controlGroup: 44,
    completedStudy: 82,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Single-Blind, Placebo-Controlled",
    primaryOutcome: "Perceived stress scale scores",
    participants: "89 working adults (25-50 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low to Moderate Risk of Bias",
  },
  {
    id: "3",
    title: "Magnesium Glycinate and Sleep Quality Improvement",
    supplement: "Magnesium Glycinate",
    category: "Sleep",
    rating: 4.7,
    year: 2024,
    studySize: 124,
    effectSize: 0.58,
    duration: "6 weeks",
    dosage: "400mg before bed",
    keyFindings: [
      "Reduced sleep onset time by 37%",
      "Increased deep sleep duration",
      "Improved morning alertness scores",
    ],
    sideEffects: ["Mild digestive upset in 5% of participants"],
    studyDesign: "Double-blind, placebo-controlled",
    compounds: ["Magnesium Glycinate", "Glycine"],
    qualityScore: 92,
    methodologyScore: 88,
    relevanceScore: 95,
    randomizationScore: 93.2,
    blindingScore: 91.5,
    allocationScore: 89.7,
    outcomeScore: 94.1,
    pValue: "<0.001",
    confidenceInterval: "[0.35, 0.81]",
    statisticalPower: 92,
    dropoutRate: 4.8,
    treatmentGroup: 62,
    controlGroup: 62,
    completedStudy: 118,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Pittsburgh Sleep Quality Index",
    participants: "124 adults with sleep difficulties (30-65 years)",
    evidenceLevel: "Level 1b Evidence (High Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "4",
    title: "Caffeine + L-Theanine Synergy for Sustained Energy",
    supplement: "Caffeine + L-Theanine",
    category: "Energy",
    rating: 4.9,
    year: 2023,
    studySize: 203,
    effectSize: 0.81,
    duration: "4 weeks",
    dosage: "100mg caffeine + 200mg L-theanine",
    keyFindings: [
      "Sustained energy without jitters",
      "Improved focus duration (+45%)",
      "Reduced afternoon energy crashes",
    ],
    sideEffects: ["None reported"],
    studyDesign: "Crossover, double-blind study",
    compounds: ["Caffeine Anhydrous", "L-Theanine"],
    qualityScore: 96,
    methodologyScore: 94,
    relevanceScore: 90,
    randomizationScore: 97.1,
    blindingScore: 94.8,
    allocationScore: 95.5,
    outcomeScore: 92.3,
    pValue: "<0.0001",
    confidenceInterval: "[0.64, 0.98]",
    statisticalPower: 98,
    dropoutRate: 1.5,
    treatmentGroup: 203,
    controlGroup: 203,
    completedStudy: 200,
    studyType: "Crossover Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled Crossover",
    primaryOutcome: "Sustained attention response task",
    participants: "203 healthy adults (20-40 years)",
    evidenceLevel: "Level 1a Evidence (Excellent Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Very Low Risk of Bias",
  },
  {
    id: "5",
    title: "Omega-3 EPA/DHA and Mood Regulation",
    supplement: "Omega-3 EPA/DHA",
    category: "Mood",
    rating: 4.5,
    year: 2024,
    studySize: 167,
    effectSize: 0.54,
    duration: "16 weeks",
    dosage: "2g daily (EPA:DHA 2:1)",
    keyFindings: ["Significant mood improvement scores", "Reduced inflammatory markers", "Better emotional regulation"],
    sideEffects: ["Fishy aftertaste in 15% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["EPA (Eicosapentaenoic Acid)", "DHA (Docosahexaenoic Acid)", "Fish Oil"],
    qualityScore: 89,
    methodologyScore: 92,
    relevanceScore: 86,
    randomizationScore: 91.3,
    blindingScore: 87.9,
    allocationScore: 93.1,
    outcomeScore: 88.7,
    pValue: "<0.05",
    confidenceInterval: "[0.31, 0.77]",
    statisticalPower: 87,
    dropoutRate: 8.4,
    treatmentGroup: 84,
    controlGroup: 83,
    completedStudy: 153,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Hamilton Depression Rating Scale",
    participants: "167 adults with mild depression (25-60 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "6",
    title: "Vitamin D3 and Immune Function Enhancement",
    supplement: "Vitamin D3",
    category: "Immune",
    rating: 4.4,
    year: 2023,
    studySize: 298,
    effectSize: 0.48,
    duration: "12 weeks",
    dosage: "4000 IU daily",
    keyFindings: [
      "Reduced frequency of upper respiratory infections",
      "Improved immune cell activity",
      "Better seasonal mood scores",
    ],
    sideEffects: ["None at this dosage"],
    studyDesign: "Large-scale randomized controlled trial",
    compounds: ["Cholecalciferol (Vitamin D3)", "Medium Chain Triglycerides"],
    qualityScore: 91,
    methodologyScore: 87,
    relevanceScore: 89,
    randomizationScore: 89.7,
    blindingScore: 83.2,
    allocationScore: 91.8,
    outcomeScore: 85.9,
    pValue: "<0.01",
    confidenceInterval: "[0.25, 0.71]",
    statisticalPower: 89,
    dropoutRate: 6.7,
    treatmentGroup: 149,
    controlGroup: 149,
    completedStudy: 278,
    studyType: "Large-Scale Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Incidence of respiratory infections",
    participants: "298 adults (18-70 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "7",
    title: "Ashwagandha Root Extract for Cortisol Reduction",
    supplement: "Ashwagandha",
    category: "Stress",
    rating: 4.3,
    year: 2024,
    studySize: 134,
    effectSize: 0.62,
    duration: "8 weeks",
    dosage: "600mg daily",
    keyFindings: ["28% reduction in cortisol levels", "Improved stress tolerance", "Better sleep quality"],
    sideEffects: ["Mild drowsiness in 6% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Ashwagandha Root Extract", "Withanolides"],
    qualityScore: 88,
    methodologyScore: 85,
    relevanceScore: 91,
    randomizationScore: 87.2,
    blindingScore: 89.1,
    allocationScore: 86.5,
    outcomeScore: 90.3,
    pValue: "<0.001",
    confidenceInterval: "[0.39, 0.85]",
    statisticalPower: 91,
    dropoutRate: 5.2,
    treatmentGroup: 67,
    controlGroup: 67,
    completedStudy: 127,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Serum cortisol levels",
    participants: "134 chronically stressed adults (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "8",
    title: "Lion's Mane Mushroom Extract and Neurogenesis",
    supplement: "Lion's Mane",
    category: "Cognitive",
    rating: 4.6,
    year: 2024,
    studySize: 89,
    effectSize: 0.71,
    duration: "12 weeks",
    dosage: "1000mg daily",
    keyFindings: ["Increased BDNF levels by 34%", "Enhanced memory formation", "Improved cognitive flexibility"],
    sideEffects: ["None reported"],
    studyDesign: "Double-blind, placebo-controlled",
    compounds: ["Hericenones", "Erinacines", "Beta-glucans"],
    qualityScore: 93,
    methodologyScore: 90,
    relevanceScore: 87,
    randomizationScore: 92.8,
    blindingScore: 91.4,
    allocationScore: 89.7,
    outcomeScore: 88.2,
    pValue: "<0.001",
    confidenceInterval: "[0.48, 0.94]",
    statisticalPower: 94,
    dropoutRate: 3.4,
    treatmentGroup: 45,
    controlGroup: 44,
    completedStudy: 86,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "BDNF serum levels",
    participants: "89 healthy adults (30-65 years)",
    evidenceLevel: "Level 1b Evidence (High Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "9",
    title: "Curcumin with Piperine for Inflammation Reduction",
    supplement: "Curcumin + Piperine",
    category: "Recovery",
    rating: 4.4,
    year: 2023,
    studySize: 178,
    effectSize: 0.59,
    duration: "10 weeks",
    dosage: "500mg curcumin + 5mg piperine",
    keyFindings: ["42% reduction in inflammatory markers", "Improved joint mobility", "Faster recovery times"],
    sideEffects: ["Mild stomach upset in 8% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Curcumin", "Piperine", "Turmeric Extract"],
    qualityScore: 90,
    methodologyScore: 88,
    relevanceScore: 92,
    randomizationScore: 89.5,
    blindingScore: 87.3,
    allocationScore: 91.2,
    outcomeScore: 89.8,
    pValue: "<0.01",
    confidenceInterval: "[0.36, 0.82]",
    statisticalPower: 88,
    dropoutRate: 6.7,
    treatmentGroup: 89,
    controlGroup: 89,
    completedStudy: 166,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "C-reactive protein levels",
    participants: "178 adults with chronic inflammation (35-70 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "10",
    title: "Coenzyme Q10 (CoQ10) and Mitochondrial Function",
    supplement: "CoQ10",
    category: "Energy",
    rating: 4.5,
    year: 2024,
    studySize: 112,
    effectSize: 0.68,
    duration: "12 weeks",
    dosage: "200mg daily",
    keyFindings: ["Increased ATP production by 25%", "Improved exercise performance", "Reduced fatigue"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Coenzyme Q10", "Ubiquinone"],
    qualityScore: 91,
    methodologyScore: 89,
    relevanceScore: 88,
    randomizationScore: 90.2,
    blindingScore: 88.5,
    allocationScore: 92.1,
    outcomeScore: 87.9,
    pValue: "<0.001",
    confidenceInterval: "[0.45, 0.91]",
    statisticalPower: 93,
    dropoutRate: 4.1,
    treatmentGroup: 56,
    controlGroup: 56,
    completedStudy: 107,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "ATP production rate",
    participants: "112 adults with fatigue (30-60 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "11",
    title: "L-Theanine and Alpha Brainwave Activity",
    supplement: "L-Theanine",
    category: "Cognitive",
    rating: 4.7,
    year: 2023,
    studySize: 95,
    effectSize: 0.75,
    duration: "4 weeks",
    dosage: "200mg daily",
    keyFindings: ["Increased alpha brainwave activity", "Improved relaxation", "Enhanced focus"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["L-Theanine"],
    qualityScore: 92,
    methodologyScore: 90,
    relevanceScore: 94,
    randomizationScore: 91.5,
    blindingScore: 89.8,
    allocationScore: 93.4,
    outcomeScore: 92.1,
    pValue: "<0.001",
    confidenceInterval: "[0.52, 0.98]",
    statisticalPower: 95,
    dropoutRate: 2.8,
    treatmentGroup: 48,
    controlGroup: 47,
    completedStudy: 92,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Alpha brainwave amplitude",
    participants: "95 healthy adults (20-45 years)",
    evidenceLevel: "Level 1b Evidence (High Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "12",
    title: "Melatonin and Sleep Latency Reduction",
    supplement: "Melatonin",
    category: "Sleep",
    rating: 4.6,
    year: 2024,
    studySize: 105,
    effectSize: 0.65,
    duration: "2 weeks",
    dosage: "3mg before bed",
    keyFindings: ["Reduced sleep latency by 30%", "Improved sleep efficiency", "Better sleep quality"],
    sideEffects: ["Mild drowsiness in 5% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Melatonin"],
    qualityScore: 89,
    methodologyScore: 87,
    relevanceScore: 91,
    randomizationScore: 88.2,
    blindingScore: 86.5,
    allocationScore: 90.1,
    outcomeScore: 89.3,
    pValue: "<0.01",
    confidenceInterval: "[0.42, 0.88]",
    statisticalPower: 88,
    dropoutRate: 3.9,
    treatmentGroup: 53,
    controlGroup: 52,
    completedStudy: 101,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Sleep latency",
    participants: "105 adults with insomnia (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "13",
    title: "Rhodiola Rosea and Cognitive Function Under Stress",
    supplement: "Rhodiola Rosea",
    category: "Stress",
    rating: 4.4,
    year: 2023,
    studySize: 78,
    effectSize: 0.62,
    duration: "4 weeks",
    dosage: "400mg daily",
    keyFindings: ["Improved cognitive performance under stress", "Reduced mental fatigue", "Enhanced mood"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Rhodiola Rosea Extract", "Rosavins", "Salidroside"],
    qualityScore: 90,
    methodologyScore: 88,
    relevanceScore: 92,
    randomizationScore: 89.5,
    blindingScore: 87.8,
    allocationScore: 91.4,
    outcomeScore: 90.2,
    pValue: "<0.01",
    confidenceInterval: "[0.39, 0.85]",
    statisticalPower: 89,
    dropoutRate: 5.1,
    treatmentGroup: 39,
    controlGroup: 39,
    completedStudy: 74,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Cognitive performance scores",
    participants: "78 adults under stress (20-45 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "14",
    title: "Vitamin C and Immune Cell Activity",
    supplement: "Vitamin C",
    category: "Immune",
    rating: 4.3,
    year: 2024,
    studySize: 120,
    effectSize: 0.58,
    duration: "8 weeks",
    dosage: "1000mg daily",
    keyFindings: ["Increased immune cell activity", "Reduced cold duration", "Improved antioxidant status"],
    sideEffects: ["Mild stomach upset in 3% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Ascorbic Acid", "Vitamin C"],
    qualityScore: 88,
    methodologyScore: 86,
    relevanceScore: 90,
    randomizationScore: 87.2,
    blindingScore: 85.5,
    allocationScore: 89.1,
    outcomeScore: 88.3,
    pValue: "<0.01",
    confidenceInterval: "[0.35, 0.81]",
    statisticalPower: 87,
    dropoutRate: 4.7,
    treatmentGroup: 60,
    controlGroup: 60,
    completedStudy: 114,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Immune cell count",
    participants: "120 healthy adults (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "15",
    title: "Zinc and Upper Respiratory Tract Infections",
    supplement: "Zinc",
    category: "Immune",
    rating: 4.2,
    year: 2023,
    studySize: 98,
    effectSize: 0.55,
    duration: "1 week",
    dosage: "50mg daily",
    keyFindings: [
      "Reduced duration of upper respiratory infections",
      "Improved immune response",
      "Decreased symptom severity",
    ],
    sideEffects: ["Mild nausea in 4% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Zinc Gluconate", "Zinc Sulfate"],
    qualityScore: 87,
    methodologyScore: 85,
    relevanceScore: 89,
    randomizationScore: 86.5,
    blindingScore: 84.8,
    allocationScore: 88.4,
    outcomeScore: 87.6,
    pValue: "<0.05",
    confidenceInterval: "[0.32, 0.78]",
    statisticalPower: 86,
    dropoutRate: 5.3,
    treatmentGroup: 49,
    controlGroup: 49,
    completedStudy: 93,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Duration of respiratory infection",
    participants: "98 adults with cold symptoms (18-60 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "16",
    title: "Creatine and Muscle Strength in Resistance Training",
    supplement: "Creatine Monohydrate",
    category: "Performance",
    rating: 4.8,
    year: 2024,
    studySize: 135,
    effectSize: 0.72,
    duration: "8 weeks",
    dosage: "5g daily",
    keyFindings: ["Increased muscle strength by 15%", "Improved power output", "Enhanced muscle mass"],
    sideEffects: ["Mild water retention in 6% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Creatine Monohydrate"],
    qualityScore: 93,
    methodologyScore: 91,
    relevanceScore: 92,
    randomizationScore: 92.8,
    blindingScore: 91.1,
    allocationScore: 94.7,
    outcomeScore: 91.9,
    pValue: "<0.001",
    confidenceInterval: "[0.49, 0.95]",
    statisticalPower: 94,
    dropoutRate: 3.7,
    treatmentGroup: 68,
    controlGroup: 67,
    completedStudy: 129,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Muscle strength",
    participants: "135 adults in resistance training (20-40 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "17",
    title: "Beta-Alanine and Exercise Performance",
    supplement: "Beta-Alanine",
    category: "Performance",
    rating: 4.7,
    year: 2023,
    studySize: 118,
    effectSize: 0.68,
    duration: "4 weeks",
    dosage: "4g daily",
    keyFindings: ["Improved exercise performance", "Increased muscle endurance", "Reduced muscle fatigue"],
    sideEffects: ["Mild paresthesia in 7% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Beta-Alanine"],
    qualityScore: 91,
    methodologyScore: 89,
    relevanceScore: 91,
    randomizationScore: 90.5,
    blindingScore: 88.8,
    allocationScore: 92.4,
    outcomeScore: 90.6,
    pValue: "<0.001",
    confidenceInterval: "[0.45, 0.91]",
    statisticalPower: 92,
    dropoutRate: 4.2,
    treatmentGroup: 59,
    controlGroup: 59,
    completedStudy: 113,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Exercise performance",
    participants: "118 athletes (20-35 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "18",
    title: "Citrulline Malate and Muscle Soreness Reduction",
    supplement: "Citrulline Malate",
    category: "Recovery",
    rating: 4.5,
    year: 2024,
    studySize: 102,
    effectSize: 0.65,
    duration: "1 week",
    dosage: "6g daily",
    keyFindings: ["Reduced muscle soreness by 34%", "Improved recovery time", "Enhanced blood flow"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Citrulline Malate"],
    qualityScore: 90,
    methodologyScore: 88,
    relevanceScore: 90,
    randomizationScore: 89.2,
    blindingScore: 87.5,
    allocationScore: 91.1,
    outcomeScore: 89.9,
    pValue: "<0.01",
    confidenceInterval: "[0.42, 0.88]",
    statisticalPower: 89,
    dropoutRate: 4.5,
    treatmentGroup: 51,
    controlGroup: 51,
    completedStudy: 97,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Muscle soreness",
    participants: "102 adults after exercise (20-40 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "19",
    title: "Tart Cherry Juice and Inflammation Reduction",
    supplement: "Tart Cherry Juice",
    category: "Recovery",
    rating: 4.4,
    year: 2023,
    studySize: 85,
    effectSize: 0.62,
    duration: "1 week",
    dosage: "480ml daily",
    keyFindings: ["Reduced inflammation markers", "Improved sleep quality", "Faster muscle recovery"],
    sideEffects: ["Mild digestive upset in 2% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Anthocyanins", "Tart Cherry Extract"],
    qualityScore: 88,
    methodologyScore: 86,
    relevanceScore: 91,
    randomizationScore: 87.8,
    blindingScore: 85.1,
    allocationScore: 89.7,
    outcomeScore: 88.5,
    pValue: "<0.01",
    confidenceInterval: "[0.39, 0.85]",
    statisticalPower: 87,
    dropoutRate: 5.8,
    treatmentGroup: 43,
    controlGroup: 42,
    completedStudy: 80,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Inflammation markers",
    participants: "85 adults after exercise (20-45 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "20",
    title: "Magnesium and Muscle Cramps",
    supplement: "Magnesium",
    category: "Recovery",
    rating: 4.3,
    year: 2024,
    studySize: 92,
    effectSize: 0.59,
    duration: "4 weeks",
    dosage: "400mg daily",
    keyFindings: ["Reduced muscle cramps", "Improved muscle relaxation", "Enhanced sleep quality"],
    sideEffects: ["Mild digestive upset in 3% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Magnesium Citrate", "Magnesium Oxide"],
    qualityScore: 87,
    methodologyScore: 85,
    relevanceScore: 89,
    randomizationScore: 86.2,
    blindingScore: 84.5,
    allocationScore: 88.1,
    outcomeScore: 87.3,
    pValue: "<0.05",
    confidenceInterval: "[0.36, 0.82]",
    statisticalPower: 86,
    dropoutRate: 6.1,
    treatmentGroup: 46,
    controlGroup: 46,
    completedStudy: 86,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Muscle cramps",
    participants: "92 adults with muscle cramps (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "21",
    title: "Vitamin D and Bone Health",
    supplement: "Vitamin D",
    category: "Immune",
    rating: 4.6,
    year: 2023,
    studySize: 110,
    effectSize: 0.68,
    duration: "12 weeks",
    dosage: "2000 IU daily",
    keyFindings: ["Improved bone density", "Reduced risk of fractures", "Enhanced immune function"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Vitamin D3", "Cholecalciferol"],
    qualityScore: 91,
    methodologyScore: 89,
    relevanceScore: 92,
    randomizationScore: 90.8,
    blindingScore: 89.1,
    allocationScore: 92.7,
    outcomeScore: 91.5,
    pValue: "<0.001",
    confidenceInterval: "[0.45, 0.91]",
    statisticalPower: 92,
    dropoutRate: 3.5,
    treatmentGroup: 55,
    controlGroup: 55,
    completedStudy: 105,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Bone density",
    participants: "110 adults with low bone density (30-60 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "22",
    title: "Probiotics and Gut Health",
    supplement: "Probiotics",
    category: "Immune",
    rating: 4.5,
    year: 2024,
    studySize: 98,
    effectSize: 0.65,
    duration: "4 weeks",
    dosage: "5 billion CFU daily",
    keyFindings: ["Improved gut health", "Reduced bloating", "Enhanced immune function"],
    sideEffects: ["Mild digestive upset in 4% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Lactobacillus", "Bifidobacterium"],
    qualityScore: 90,
    methodologyScore: 88,
    relevanceScore: 91,
    randomizationScore: 89.5,
    blindingScore: 87.8,
    allocationScore: 91.4,
    outcomeScore: 90.2,
    pValue: "<0.001",
    confidenceInterval: "[0.42, 0.88]",
    statisticalPower: 91,
    dropoutRate: 4.2,
    treatmentGroup: 49,
    controlGroup: 49,
    completedStudy: 93,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Gut health",
    participants: "98 adults with gut issues (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "23",
    title: "Omega-3 Fatty Acids and Heart Health",
    supplement: "Omega-3",
    category: "Mood",
    rating: 4.7,
    year: 2023,
    studySize: 125,
    effectSize: 0.72,
    duration: "12 weeks",
    dosage: "2g daily",
    keyFindings: ["Improved heart health", "Reduced blood pressure", "Enhanced mood"],
    sideEffects: ["Fishy aftertaste in 5% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["EPA", "DHA"],
    qualityScore: 92,
    methodologyScore: 90,
    relevanceScore: 93,
    randomizationScore: 91.2,
    blindingScore: 89.5,
    allocationScore: 93.1,
    outcomeScore: 91.9,
    pValue: "<0.001",
    confidenceInterval: "[0.49, 0.95]",
    statisticalPower: 93,
    dropoutRate: 3.8,
    treatmentGroup: 63,
    controlGroup: 62,
    completedStudy: 120,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Heart health",
    participants: "125 adults with heart issues (30-60 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "24",
    title: "Saffron and Mood Improvement",
    supplement: "Saffron",
    category: "Mood",
    rating: 4.6,
    year: 2024,
    studySize: 108,
    effectSize: 0.68,
    duration: "8 weeks",
    dosage: "30mg daily",
    keyFindings: ["Improved mood", "Reduced anxiety", "Enhanced sleep quality"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Crocins", "Picrocrocin"],
    qualityScore: 91,
    methodologyScore: 89,
    relevanceScore: 92,
    randomizationScore: 90.5,
    blindingScore: 88.8,
    allocationScore: 92.4,
    outcomeScore: 90.6,
    pValue: "<0.001",
    confidenceInterval: "[0.45, 0.91]",
    statisticalPower: 92,
    dropoutRate: 4.1,
    treatmentGroup: 54,
    controlGroup: 54,
    completedStudy: 103,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Mood",
    participants: "108 adults with mood issues (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "25",
    title: "Ginseng and Cognitive Function",
    supplement: "Ginseng",
    category: "Cognitive",
    rating: 4.4,
    year: 2023,
    studySize: 95,
    effectSize: 0.62,
    duration: "4 weeks",
    dosage: "200mg daily",
    keyFindings: ["Improved cognitive function", "Enhanced memory", "Reduced fatigue"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Ginsenosides"],
    qualityScore: 89,
    methodologyScore: 87,
    relevanceScore: 90,
    randomizationScore: 88.2,
    blindingScore: 86.5,
    allocationScore: 90.1,
    outcomeScore: 89.3,
    pValue: "<0.01",
    confidenceInterval: "[0.39, 0.85]",
    statisticalPower: 88,
    dropoutRate: 5.2,
    treatmentGroup: 48,
    controlGroup: 47,
    completedStudy: 90,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Cognitive function",
    participants: "95 healthy adults (20-45 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "26",
    title: "Bacopa Monnieri and Memory Enhancement",
    supplement: "Bacopa Monnieri",
    category: "Cognitive",
    rating: 4.3,
    year: 2024,
    studySize: 88,
    effectSize: 0.59,
    duration: "12 weeks",
    dosage: "300mg daily",
    keyFindings: ["Enhanced memory", "Improved learning", "Reduced anxiety"],
    sideEffects: ["Mild digestive upset in 3% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Bacosides"],
    qualityScore: 88,
    methodologyScore: 86,
    relevanceScore: 89,
    randomizationScore: 87.5,
    blindingScore: 85.8,
    allocationScore: 89.4,
    outcomeScore: 88.6,
    pValue: "<0.05",
    confidenceInterval: "[0.36, 0.82]",
    statisticalPower: 87,
    dropoutRate: 6.5,
    treatmentGroup: 44,
    controlGroup: 44,
    completedStudy: 82,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Memory",
    participants: "88 adults with memory issues (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "27",
    title: "L-Carnitine and Exercise Performance",
    supplement: "L-Carnitine",
    category: "Performance",
    rating: 4.7,
    year: 2023,
    studySize: 115,
    effectSize: 0.75,
    duration: "4 weeks",
    dosage: "2g daily",
    keyFindings: ["Improved exercise performance", "Reduced muscle fatigue", "Enhanced fat metabolism"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["L-Carnitine"],
    qualityScore: 92,
    methodologyScore: 90,
    relevanceScore: 93,
    randomizationScore: 91.5,
    blindingScore: 89.8,
    allocationScore: 93.4,
    outcomeScore: 92.1,
    pValue: "<0.001",
    confidenceInterval: "[0.52, 0.98]",
    statisticalPower: 95,
    dropoutRate: 3.2,
    treatmentGroup: 58,
    controlGroup: 57,
    completedStudy: 110,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Exercise performance",
    participants: "115 athletes (20-35 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "28",
    title: "Beetroot Juice and Blood Pressure",
    supplement: "Beetroot Juice",
    category: "Performance",
    rating: 4.6,
    year: 2024,
    studySize: 102,
    effectSize: 0.68,
    duration: "2 weeks",
    dosage: "70ml daily",
    keyFindings: ["Reduced blood pressure", "Improved exercise performance", "Enhanced blood flow"],
    sideEffects: ["Red urine in 2% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Nitrates"],
    qualityScore: 91,
    methodologyScore: 89,
    relevanceScore: 92,
    randomizationScore: 90.8,
    blindingScore: 89.1,
    allocationScore: 92.7,
    outcomeScore: 91.5,
    pValue: "<0.001",
    confidenceInterval: "[0.45, 0.91]",
    statisticalPower: 92,
    dropoutRate: 4.5,
    treatmentGroup: 51,
    controlGroup: 51,
    completedStudy: 97,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Blood pressure",
    participants: "102 adults with high blood pressure (30-60 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "29",
    title: "Turmeric and Joint Pain",
    supplement: "Turmeric",
    category: "Recovery",
    rating: 4.5,
    year: 2023,
    studySize: 90,
    effectSize: 0.65,
    duration: "8 weeks",
    dosage: "500mg daily",
    keyFindings: ["Reduced joint pain", "Improved mobility", "Reduced inflammation"],
    sideEffects: ["Mild digestive upset in 4% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Curcumin"],
    qualityScore: 90,
    methodologyScore: 88,
    relevanceScore: 91,
    randomizationScore: 89.5,
    blindingScore: 87.8,
    allocationScore: 91.4,
    outcomeScore: 90.2,
    pValue: "<0.001",
    confidenceInterval: "[0.42, 0.88]",
    statisticalPower: 91,
    dropoutRate: 5.8,
    treatmentGroup: 45,
    controlGroup: 45,
    completedStudy: 85,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Joint pain",
    participants: "90 adults with joint pain (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "30",
    title: "Ginger and Muscle Soreness",
    supplement: "Ginger",
    category: "Recovery",
    rating: 4.4,
    year: 2024,
    studySize: 82,
    effectSize: 0.62,
    duration: "1 week",
    dosage: "2g daily",
    keyFindings: ["Reduced muscle soreness", "Improved recovery time", "Reduced inflammation"],
    sideEffects: ["Mild digestive upset in 3% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Gingerol"],
    qualityScore: 88,
    methodologyScore: 86,
    relevanceScore: 90,
    randomizationScore: 87.8,
    blindingScore: 85.1,
    allocationScore: 89.7,
    outcomeScore: 88.5,
    pValue: "<0.01",
    confidenceInterval: "[0.39, 0.85]",
    statisticalPower: 87,
    dropoutRate: 6.1,
    treatmentGroup: 41,
    controlGroup: 41,
    completedStudy: 76,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Muscle soreness",
    participants: "82 adults after exercise (20-45 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "31",
    title: "Vitamin E and Skin Health",
    supplement: "Vitamin E",
    category: "Immune",
    rating: 4.3,
    year: 2023,
    studySize: 95,
    effectSize: 0.59,
    duration: "8 weeks",
    dosage: "400 IU daily",
    keyFindings: ["Improved skin health", "Reduced inflammation", "Enhanced antioxidant status"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Tocopherol"],
    qualityScore: 87,
    methodologyScore: 85,
    relevanceScore: 89,
    randomizationScore: 86.2,
    blindingScore: 84.5,
    allocationScore: 88.1,
    outcomeScore: 87.3,
    pValue: "<0.05",
    confidenceInterval: "[0.36, 0.82]",
    statisticalPower: 86,
    dropoutRate: 7.2,
    treatmentGroup: 48,
    controlGroup: 47,
    completedStudy: 88,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Skin health",
    participants: "95 adults with skin issues (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "32",
    title: "Selenium and Immune Function",
    supplement: "Selenium",
    category: "Immune",
    rating: 4.2,
    year: 2024,
    studySize: 88,
    effectSize: 0.55,
    duration: "4 weeks",
    dosage: "200mcg daily",
    keyFindings: ["Improved immune function", "Reduced inflammation", "Enhanced antioxidant status"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Selenomethionine"],
    qualityScore: 86,
    methodologyScore: 84,
    relevanceScore: 88,
    randomizationScore: 85.5,
    blindingScore: 83.8,
    allocationScore: 87.4,
    outcomeScore: 86.6,
    pValue: "<0.05",
    confidenceInterval: "[0.32, 0.78]",
    statisticalPower: 85,
    dropoutRate: 8.5,
    treatmentGroup: 44,
    controlGroup: 44,
    completedStudy: 80,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Immune function",
    participants: "88 adults with immune issues (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "33",
    title: "CoQ10 and Energy Production",
    supplement: "CoQ10",
    category: "Energy",
    rating: 4.8,
    year: 2023,
    studySize: 120,
    effectSize: 0.78,
    duration: "8 weeks",
    dosage: "100mg daily",
    keyFindings: ["Increased energy production", "Reduced fatigue", "Improved exercise performance"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Ubiquinone"],
    qualityScore: 93,
    methodologyScore: 91,
    relevanceScore: 94,
    randomizationScore: 92.8,
    blindingScore: 91.1,
    allocationScore: 94.7,
    outcomeScore: 91.9,
    pValue: "<0.001",
    confidenceInterval: "[0.55, 0.99]",
    statisticalPower: 96,
    dropoutRate: 2.5,
    treatmentGroup: 60,
    controlGroup: 60,
    completedStudy: 117,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Energy production",
    participants: "120 adults with fatigue (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "34",
    title: "Rhodiola Rosea and Mental Performance",
    supplement: "Rhodiola Rosea",
    category: "Energy",
    rating: 4.7,
    year: 2024,
    studySize: 112,
    effectSize: 0.75,
    duration: "4 weeks",
    dosage: "200mg daily",
    keyFindings: ["Improved mental performance", "Reduced stress", "Enhanced mood"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Rosavins", "Salidroside"],
    qualityScore: 92,
    methodologyScore: 90,
    relevanceScore: 93,
    randomizationScore: 91.5,
    blindingScore: 89.8,
    allocationScore: 93.4,
    outcomeScore: 92.1,
    pValue: "<0.001",
    confidenceInterval: "[0.52, 0.98]",
    statisticalPower: 95,
    dropoutRate: 3.2,
    treatmentGroup: 56,
    controlGroup: 56,
    completedStudy: 108,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Mental performance",
    participants: "112 healthy adults (20-45 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "35",
    title: "L-Theanine and Relaxation",
    supplement: "L-Theanine",
    category: "Sleep",
    rating: 4.6,
    year: 2023,
    studySize: 105,
    effectSize: 0.72,
    duration: "2 weeks",
    dosage: "200mg daily",
    keyFindings: ["Improved relaxation", "Reduced anxiety", "Enhanced sleep quality"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["L-Theanine"],
    qualityScore: 91,
    methodologyScore: 89,
    relevanceScore: 92,
    randomizationScore: 90.2,
    blindingScore: 88.5,
    allocationScore: 92.1,
    outcomeScore: 90.9,
    pValue: "<0.001",
    confidenceInterval: "[0.49, 0.95]",
    statisticalPower: 93,
    dropoutRate: 4.5,
    treatmentGroup: 53,
    controlGroup: 52,
    completedStudy: 100,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Relaxation",
    participants: "105 adults with anxiety (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "36",
    title: "Melatonin and Sleep Quality",
    supplement: "Melatonin",
    category: "Sleep",
    rating: 4.5,
    year: 2024,
    studySize: 98,
    effectSize: 0.68,
    duration: "1 week",
    dosage: "3mg daily",
    keyFindings: ["Improved sleep quality", "Reduced insomnia", "Enhanced mood"],
    sideEffects: ["Mild drowsiness in 5% of participants"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Melatonin"],
    qualityScore: 90,
    methodologyScore: 88,
    relevanceScore: 91,
    randomizationScore: 89.5,
    blindingScore: 87.8,
    allocationScore: 91.4,
    outcomeScore: 90.2,
    pValue: "<0.001",
    confidenceInterval: "[0.45, 0.91]",
    statisticalPower: 92,
    dropoutRate: 5.8,
    treatmentGroup: 49,
    controlGroup: 49,
    completedStudy: 92,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Sleep quality",
    participants: "98 adults with insomnia (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "37",
    title: "Ashwagandha and Stress Reduction",
    supplement: "Ashwagandha",
    category: "Stress",
    rating: 4.8,
    year: 2023,
    studySize: 115,
    effectSize: 0.78,
    duration: "8 weeks",
    dosage: "300mg daily",
    keyFindings: ["Reduced stress", "Improved mood", "Enhanced sleep quality"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Withanolides"],
    qualityScore: 93,
    methodologyScore: 91,
    relevanceScore: 94,
    randomizationScore: 92.8,
    blindingScore: 91.1,
    allocationScore: 94.7,
    outcomeScore: 91.9,
    pValue: "<0.001",
    confidenceInterval: "[0.55, 0.99]",
    statisticalPower: 96,
    dropoutRate: 2.5,
    treatmentGroup: 58,
    controlGroup: 57,
    completedStudy: 112,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Stress",
    participants: "115 adults with stress (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "38",
    title: "Lemon Balm and Anxiety",
    supplement: "Lemon Balm",
    category: "Stress",
    rating: 4.7,
    year: 2024,
    studySize: 108,
    effectSize: 0.75,
    duration: "4 weeks",
    dosage: "300mg daily",
    keyFindings: ["Reduced anxiety", "Improved mood", "Enhanced sleep quality"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Rosmarinic Acid"],
    qualityScore: 92,
    methodologyScore: 90,
    relevanceScore: 93,
    randomizationScore: 91.5,
    blindingScore: 89.8,
    allocationScore: 93.4,
    outcomeScore: 92.1,
    pValue: "<0.001",
    confidenceInterval: "[0.52, 0.98]",
    statisticalPower: 95,
    dropoutRate: 3.2,
    treatmentGroup: 54,
    controlGroup: 54,
    completedStudy: 104,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Anxiety",
    participants: "108 adults with anxiety (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "39",
    title: "Vitamin C and Cold Duration",
    supplement: "Vitamin C",
    category: "Immune",
    rating: 4.6,
    year: 2023,
    studySize: 95,
    effectSize: 0.72,
    duration: "1 week",
    dosage: "1000mg daily",
    keyFindings: ["Reduced cold duration", "Improved immune function", "Enhanced mood"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Ascorbic Acid"],
    qualityScore: 91,
    methodologyScore: 89,
    relevanceScore: 92,
    randomizationScore: 90.2,
    blindingScore: 88.5,
    allocationScore: 92.1,
    outcomeScore: 90.9,
    pValue: "<0.001",
    confidenceInterval: "[0.49, 0.95]",
    statisticalPower: 93,
    dropoutRate: 4.5,
    treatmentGroup: 48,
    controlGroup: 47,
    completedStudy: 90,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Cold duration",
    participants: "95 adults with cold symptoms (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "40",
    title: "Zinc and Immune Response",
    supplement: "Zinc",
    category: "Immune",
    rating: 4.5,
    year: 2024,
    studySize: 88,
    effectSize: 0.68,
    duration: "2 weeks",
    dosage: "50mg daily",
    keyFindings: ["Improved immune response", "Reduced inflammation", "Enhanced mood"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Zinc Gluconate"],
    qualityScore: 90,
    methodologyScore: 88,
    relevanceScore: 91,
    randomizationScore: 89.5,
    blindingScore: 87.8,
    allocationScore: 91.4,
    outcomeScore: 90.2,
    pValue: "<0.001",
    confidenceInterval: "[0.45, 0.91]",
    statisticalPower: 92,
    dropoutRate: 5.8,
    treatmentGroup: 44,
    controlGroup: 44,
    completedStudy: 82,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Immune response",
    participants: "88 adults with immune issues (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "41",
    title: "Creatine and Power Output",
    supplement: "Creatine",
    category: "Performance",
    rating: 4.8,
    year: 2023,
    studySize: 120,
    effectSize: 0.78,
    duration: "8 weeks",
    dosage: "5g daily",
    keyFindings: ["Increased power output", "Reduced fatigue", "Improved exercise performance"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Creatine Monohydrate"],
    qualityScore: 93,
    methodologyScore: 91,
    relevanceScore: 94,
    randomizationScore: 92.8,
    blindingScore: 91.1,
    allocationScore: 94.7,
    outcomeScore: 91.9,
    pValue: "<0.001",
    confidenceInterval: "[0.55, 0.99]",
    statisticalPower: 96,
    dropoutRate: 2.5,
    treatmentGroup: 60,
    controlGroup: 60,
    completedStudy: 117,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Power output",
    participants: "120 athletes (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "42",
    title: "Beta-Alanine and Muscle Endurance",
    supplement: "Beta-Alanine",
    category: "Performance",
    rating: 4.7,
    year: 2024,
    studySize: 112,
    effectSize: 0.75,
    duration: "4 weeks",
    dosage: "4g daily",
    keyFindings: ["Increased muscle endurance", "Reduced fatigue", "Improved exercise performance"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Beta-Alanine"],
    qualityScore: 92,
    methodologyScore: 90,
    relevanceScore: 93,
    randomizationScore: 91.5,
    blindingScore: 89.8,
    allocationScore: 93.4,
    outcomeScore: 92.1,
    pValue: "<0.001",
    confidenceInterval: "[0.52, 0.98]",
    statisticalPower: 95,
    dropoutRate: 3.2,
    treatmentGroup: 56,
    controlGroup: 56,
    completedStudy: 108,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Muscle endurance",
    participants: "112 athletes (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "43",
    title: "Citrulline and Blood Flow",
    supplement: "Citrulline",
    category: "Recovery",
    rating: 4.6,
    year: 2023,
    studySize: 105,
    effectSize: 0.72,
    duration: "2 weeks",
    dosage: "6g daily",
    keyFindings: ["Increased blood flow", "Reduced muscle soreness", "Improved recovery time"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Citrulline Malate"],
    qualityScore: 91,
    methodologyScore: 89,
    relevanceScore: 92,
    randomizationScore: 90.2,
    blindingScore: 88.5,
    allocationScore: 92.1,
    outcomeScore: 90.9,
    pValue: "<0.001",
    confidenceInterval: "[0.49, 0.95]",
    statisticalPower: 93,
    dropoutRate: 4.5,
    treatmentGroup: 53,
    controlGroup: 52,
    completedStudy: 100,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Blood flow",
    participants: "105 adults after exercise (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "44",
    title: "Tart Cherry and Muscle Recovery",
    supplement: "Tart Cherry",
    category: "Recovery",
    rating: 4.5,
    year: 2024,
    studySize: 98,
    effectSize: 0.68,
    duration: "1 week",
    dosage: "480ml daily",
    keyFindings: ["Improved muscle recovery", "Reduced inflammation", "Enhanced mood"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Anthocyanins"],
    qualityScore: 90,
    methodologyScore: 88,
    relevanceScore: 91,
    randomizationScore: 89.5,
    blindingScore: 87.8,
    allocationScore: 91.4,
    outcomeScore: 90.2,
    pValue: "<0.001",
    confidenceInterval: "[0.45, 0.91]",
    statisticalPower: 92,
    dropoutRate: 5.8,
    treatmentGroup: 49,
    controlGroup: 49,
    completedStudy: 92,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Muscle recovery",
    participants: "98 adults after exercise (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "45",
    title: "Magnesium and Muscle Function",
    supplement: "Magnesium",
    category: "Recovery",
    rating: 4.4,
    year: 2023,
    studySize: 85,
    effectSize: 0.65,
    duration: "8 weeks",
    dosage: "400mg daily",
    keyFindings: ["Improved muscle function", "Reduced muscle cramps", "Enhanced mood"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Magnesium Citrate"],
    qualityScore: 89,
    methodologyScore: 87,
    relevanceScore: 90,
    randomizationScore: 88.2,
    blindingScore: 86.5,
    allocationScore: 90.1,
    outcomeScore: 89.3,
    pValue: "<0.01",
    confidenceInterval: "[0.42, 0.88]",
    statisticalPower: 88,
    dropoutRate: 6.1,
    treatmentGroup: 43,
    controlGroup: 42,
    completedStudy: 80,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Muscle function",
    participants: "85 adults with muscle issues (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "46",
    title: "Vitamin D and Immune Health",
    supplement: "Vitamin D",
    category: "Immune",
    rating: 4.8,
    year: 2024,
    studySize: 120,
    effectSize: 0.78,
    duration: "12 weeks",
    dosage: "2000 IU daily",
    keyFindings: ["Improved immune health", "Reduced inflammation", "Enhanced mood"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Vitamin D3"],
    qualityScore: 93,
    methodologyScore: 91,
    relevanceScore: 94,
    randomizationScore: 92.8,
    blindingScore: 91.1,
    allocationScore: 94.7,
    outcomeScore: 91.9,
    pValue: "<0.001",
    confidenceInterval: "[0.55, 0.99]",
    statisticalPower: 96,
    dropoutRate: 2.5,
    treatmentGroup: 60,
    controlGroup: 60,
    completedStudy: 117,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Immune health",
    participants: "120 adults with immune issues (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "47",
    title: "Probiotics and Gut Function",
    supplement: "Probiotics",
    category: "Immune",
    rating: 4.7,
    year: 2023,
    studySize: 112,
    effectSize: 0.75,
    duration: "4 weeks",
    dosage: "5 billion CFU daily",
    keyFindings: ["Improved gut function", "Reduced bloating", "Enhanced mood"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Lactobacillus"],
    qualityScore: 92,
    methodologyScore: 90,
    relevanceScore: 93,
    randomizationScore: 91.5,
    blindingScore: 89.8,
    allocationScore: 93.4,
    outcomeScore: 92.1,
    pValue: "<0.001",
    confidenceInterval: "[0.52, 0.98]",
    statisticalPower: 95,
    dropoutRate: 3.2,
    treatmentGroup: 56,
    controlGroup: 56,
    completedStudy: 108,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Gut function",
    participants: "112 adults with gut issues (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "48",
    title: "Omega-3 and Mood Stability",
    supplement: "Omega-3",
    category: "Mood",
    rating: 4.6,
    year: 2024,
    studySize: 105,
    effectSize: 0.72,
    duration: "12 weeks",
    dosage: "2g daily",
    keyFindings: ["Improved mood stability", "Reduced anxiety", "Enhanced sleep quality"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["EPA", "DHA"],
    qualityScore: 91,
    methodologyScore: 89,
    relevanceScore: 92,
    randomizationScore: 90.2,
    blindingScore: 88.5,
    allocationScore: 92.1,
    outcomeScore: 90.9,
    pValue: "<0.001",
    confidenceInterval: "[0.49, 0.95]",
    statisticalPower: 93,
    dropoutRate: 4.5,
    treatmentGroup: 53,
    controlGroup: 52,
    completedStudy: 100,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Mood stability",
    participants: "105 adults with mood issues (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "49",
    title: "Saffron and Emotional Well-being",
    supplement: "Saffron",
    category: "Mood",
    rating: 4.5,
    year: 2023,
    studySize: 98,
    effectSize: 0.68,
    duration: "8 weeks",
    dosage: "30mg daily",
    keyFindings: ["Improved emotional well-being", "Reduced anxiety", "Enhanced sleep quality"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Crocins"],
    qualityScore: 90,
    methodologyScore: 88,
    relevanceScore: 91,
    randomizationScore: 89.5,
    blindingScore: 87.8,
    allocationScore: 91.4,
    outcomeScore: 90.2,
    pValue: "<0.001",
    confidenceInterval: "[0.45, 0.91]",
    statisticalPower: 92,
    dropoutRate: 5.8,
    treatmentGroup: 49,
    controlGroup: 49,
    completedStudy: 92,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Emotional well-being",
    participants: "98 adults with mood issues (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "50",
    title: "Ginseng and Cognitive Performance",
    supplement: "Ginseng",
    category: "Cognitive",
    rating: 4.8,
    year: 2024,
    studySize: 120,
    effectSize: 0.78,
    duration: "4 weeks",
    dosage: "200mg daily",
    keyFindings: ["Improved cognitive performance", "Reduced fatigue", "Enhanced mood"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Ginsenosides"],
    qualityScore: 93,
    methodologyScore: 91,
    relevanceScore: 94,
    randomizationScore: 92.8,
    blindingScore: 91.1,
    allocationScore: 94.7,
    outcomeScore: 91.9,
    pValue: "<0.001",
    confidenceInterval: "[0.55, 0.99]",
    statisticalPower: 96,
    dropoutRate: 2.5,
    treatmentGroup: 60,
    controlGroup: 60,
    completedStudy: 117,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Cognitive performance",
    participants: "120 healthy adults (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "51",
    title: "Bacopa and Memory Recall",
    supplement: "Bacopa",
    category: "Cognitive",
    rating: 4.7,
    year: 2023,
    studySize: 112,
    effectSize: 0.75,
    duration: "12 weeks",
    dosage: "300mg daily",
    keyFindings: ["Improved memory recall", "Reduced anxiety", "Enhanced mood"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Bacosides"],
    qualityScore: 92,
    methodologyScore: 90,
    relevanceScore: 93,
    randomizationScore: 91.5,
    blindingScore: 89.8,
    allocationScore: 93.4,
    outcomeScore: 92.1,
    pValue: "<0.001",
    confidenceInterval: "[0.52, 0.98]",
    statisticalPower: 95,
    dropoutRate: 3.2,
    treatmentGroup: 56,
    controlGroup: 56,
    completedStudy: 108,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Memory recall",
    participants: "112 adults with memory issues (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "52",
    title: "L-Carnitine and Fat Metabolism",
    supplement: "L-Carnitine",
    category: "Performance",
    rating: 4.6,
    year: 2024,
    studySize: 105,
    effectSize: 0.72,
    duration: "4 weeks",
    dosage: "2g daily",
    keyFindings: ["Improved fat metabolism", "Reduced fatigue", "Improved exercise performance"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["L-Carnitine"],
    qualityScore: 91,
    methodologyScore: 89,
    relevanceScore: 92,
    randomizationScore: 90.2,
    blindingScore: 88.5,
    allocationScore: 92.1,
    outcomeScore: 90.9,
    pValue: "<0.001",
    confidenceInterval: "[0.49, 0.95]",
    statisticalPower: 93,
    dropoutRate: 4.5,
    treatmentGroup: 53,
    controlGroup: 52,
    completedStudy: 100,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Fat metabolism",
    participants: "105 athletes (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "53",
    title: "Beetroot and Exercise Capacity",
    supplement: "Beetroot",
    category: "Performance",
    rating: 4.5,
    year: 2023,
    studySize: 98,
    effectSize: 0.68,
    duration: "2 weeks",
    dosage: "70ml daily",
    keyFindings: ["Improved exercise capacity", "Reduced blood pressure", "Enhanced mood"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Nitrates"],
    qualityScore: 90,
    methodologyScore: 88,
    relevanceScore: 91,
    randomizationScore: 89.5,
    blindingScore: 87.8,
    allocationScore: 91.4,
    outcomeScore: 90.2,
    pValue: "<0.001",
    confidenceInterval: "[0.45, 0.91]",
    statisticalPower: 92,
    dropoutRate: 5.8,
    treatmentGroup: 49,
    controlGroup: 49,
    completedStudy: 92,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Exercise capacity",
    participants: "98 adults with high blood pressure (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "54",
    title: "Turmeric and Inflammation",
    supplement: "Turmeric",
    category: "Recovery",
    rating: 4.8,
    year: 2024,
    studySize: 120,
    effectSize: 0.78,
    duration: "8 weeks",
    dosage: "500mg daily",
    keyFindings: ["Reduced inflammation", "Improved joint pain", "Enhanced mood"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Curcumin"],
    qualityScore: 93,
    methodologyScore: 91,
    relevanceScore: 94,
    randomizationScore: 92.8,
    blindingScore: 91.1,
    allocationScore: 94.7,
    outcomeScore: 91.9,
    pValue: "<0.001",
    confidenceInterval: "[0.55, 0.99]",
    statisticalPower: 96,
    dropoutRate: 2.5,
    treatmentGroup: 60,
    controlGroup: 60,
    completedStudy: 117,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Inflammation",
    participants: "120 adults with joint pain (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "55",
    title: "Ginger and Muscle Recovery",
    supplement: "Ginger",
    category: "Recovery",
    rating: 4.7,
    year: 2023,
    studySize: 112,
    effectSize: 0.75,
    duration: "1 week",
    dosage: "2g daily",
    keyFindings: ["Improved muscle recovery", "Reduced soreness", "Enhanced mood"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Gingerol"],
    qualityScore: 92,
    methodologyScore: 90,
    relevanceScore: 93,
    randomizationScore: 91.5,
    blindingScore: 89.8,
    allocationScore: 93.4,
    outcomeScore: 92.1,
    pValue: "<0.001",
    confidenceInterval: "[0.52, 0.98]",
    statisticalPower: 95,
    dropoutRate: 3.2,
    treatmentGroup: 56,
    controlGroup: 56,
    completedStudy: 108,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Muscle recovery",
    participants: "112 adults after exercise (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "56",
    title: "Vitamin E and Skin Health",
    supplement: "Vitamin E",
    category: "Immune",
    rating: 4.6,
    year: 2024,
    studySize: 105,
    effectSize: 0.72,
    duration: "8 weeks",
    dosage: "400 IU daily",
    keyFindings: ["Improved skin health", "Reduced inflammation", "Enhanced mood"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Tocopherol"],
    qualityScore: 91,
    methodologyScore: 89,
    relevanceScore: 92,
    randomizationScore: 90.2,
    blindingScore: 88.5,
    allocationScore: 92.1,
    outcomeScore: 90.9,
    pValue: "<0.001",
    confidenceInterval: "[0.49, 0.95]",
    statisticalPower: 93,
    dropoutRate: 4.5,
    treatmentGroup: 53,
    controlGroup: 52,
    completedStudy: 100,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Skin health",
    participants: "105 adults with skin issues (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "5/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
  {
    id: "57",
    title: "Selenium and Immune Function",
    supplement: "Selenium",
    category: "Immune",
    rating: 4.5,
    year: 2023,
    studySize: 98,
    effectSize: 0.68,
    duration: "4 weeks",
    dosage: "200mcg daily",
    keyFindings: ["Improved immune function", "Reduced inflammation", "Enhanced mood"],
    sideEffects: ["None reported"],
    studyDesign: "Randomized, double-blind, placebo-controlled",
    compounds: ["Selenomethionine"],
    qualityScore: 90,
    methodologyScore: 88,
    relevanceScore: 91,
    randomizationScore: 89.5,
    blindingScore: 87.8,
    allocationScore: 91.4,
    outcomeScore: 90.2,
    pValue: "<0.001",
    confidenceInterval: "[0.45, 0.91]",
    statisticalPower: 92,
    dropoutRate: 5.8,
    treatmentGroup: 49,
    controlGroup: 49,
    completedStudy: 92,
    studyType: "Randomized Controlled Trial",
    studyDesignFull: "Double-Blind, Placebo-Controlled",
    primaryOutcome: "Immune function",
    participants: "98 adults with immune issues (25-55 years)",
    evidenceLevel: "Level 1b Evidence (Good Quality RCT)",
    jadad: "4/5",
    consort: "CONSORT Compliant",
    cochrane: "Low Risk of Bias",
  },
]

const LENS_CAPABILITIES = [
  {
    icon: Search,
    title: "Intelligent Research Engine",
    shortDesc: "AI-powered study analysis and discovery",
    fullDesc: "Our advanced neural networks process over 150,000 peer-reviewed studies in real-time, extracting critical insights about efficacy, dosing, and safety profiles. Machine learning algorithms identify patterns across decades of research to surface the most relevant findings for your specific health goals.",
    metrics: "150,000+ studies analyzed",
    color: "blue",
    category: "Discovery"
  },
  {
    icon: BarChart3,
    title: "Methodology Validation",
    shortDesc: "Rigorous quality scoring and bias detection",
    fullDesc: "Every study undergoes comprehensive methodology analysis using validated frameworks including JADAD scales, CONSORT guidelines, and Cochrane risk assessment. Our proprietary scoring system evaluates sample sizes, randomization quality, blinding protocols, and statistical power to ensure evidence reliability.",
    metrics: "12 quality parameters assessed",
    color: "emerald",
    category: "Validation"
  },
  {
    icon: Target,
    title: "Precision Matching",
    shortDesc: "Personalized evidence recommendations",
    fullDesc: "Advanced algorithms analyze your health profile, genetic markers, existing conditions, and supplement history to deliver hyper-personalized research recommendations. Each suggestion includes confidence scores and compatibility assessments tailored to your unique biochemistry.",
    metrics: "97% recommendation accuracy",
    color: "purple",
    category: "Personalization"
  },
  {
    icon: Bell,
    title: "Live Research Monitoring",
    shortDesc: "Real-time study alerts and updates",
    fullDesc: "Stay ahead with instant notifications when new research emerges in your areas of interest. Our monitoring system tracks journal publications, clinical trial completions, and regulatory updates, delivering curated insights straight to your dashboard.",
    metrics: "Daily research updates",
    color: "orange",
    category: "Monitoring"
  },
  {
    icon: Zap,
    title: "Protocol Intelligence",
    shortDesc: "Evidence-based stack optimization",
    fullDesc: "Transform research insights into actionable protocols with our intelligent builder. Automatically detects compound interactions, optimizes timing and dosages, and suggests synergistic combinations based on the latest scientific evidence.",
    metrics: "50,000+ protocols optimized",
    color: "red",
    category: "Optimization"
  },
  {
    icon: Bookmark,
    title: "Evidence Library",
    shortDesc: "Personal research curation and insights",
    fullDesc: "Build your personalized evidence vault with advanced tagging, annotation, and cross-referencing capabilities. Track research evolution over time and generate comprehensive reports for healthcare providers or personal reference.",
    metrics: "Unlimited study storage",
    color: "teal",
    category: "Curation"
  },
]

const CATEGORIES = [
  { name: "All", count: STUDIES.length },
  { name: "Cognitive", count: STUDIES.filter((s) => s.category === "Cognitive").length },
  { name: "Energy", count: STUDIES.filter((s) => s.category === "Energy").length },
  { name: "Sleep", count: STUDIES.filter((s) => s.category === "Sleep").length },
  { name: "Stress", count: STUDIES.filter((s) => s.category === "Stress").length },
  { name: "Mood", count: STUDIES.filter((s) => s.category === "Mood").length },
  { name: "Performance", count: STUDIES.filter((s) => s.category === "Performance").length },
  { name: "Recovery", count: STUDIES.filter((s) => s.category === "Recovery").length },
  { name: "Immune", count: STUDIES.filter((s) => s.category === "Immune").length },
]

// Utility class for frosted glass effect
const frostedGlassClass = "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg";

export function DatabaseShowcase() {
  const router = useRouter()
  const [selectedDatabase, setSelectedDatabase] = useState("research")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("rating")
  const [expandedStudies, setExpandedStudies] = useState<Set<string>>(new Set())
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(STUDIES[0]) // Default to first study
  const [selectedCompounds, setSelectedCompounds] = useState<string[]>([])

  // Add refs for each section
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: capabilitiesRef, inView: capabilitiesInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: assessmentRef, inView: assessmentInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: metricsRef, inView: metricsInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const contentRef = useRef<HTMLDivElement>(null)

  const filteredStudies = STUDIES.filter((study) => {
    const matchesSearch =
      (study.title?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
      (study.supplement?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || study.category === selectedCategory
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "year":
        return b.year - a.year
      case "studySize":
        return b.studySize - a.studySize
      case "effectSize":
        return b.effectSize - a.effectSize
      case "qualityScore":
        return b.qualityScore - a.qualityScore
      default:
        return 0
    }
  })

  const toggleStudyExpansion = (studyId: string) => {
    const newExpanded = new Set(expandedStudies)
    if (newExpanded.has(studyId)) {
      newExpanded.delete(studyId)
    } else {
      newExpanded.add(studyId)
    }
    setExpandedStudies(newExpanded)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSelectedCategory("All")
  }

  const handleViewCompounds = (study: Study) => {
    const compoundsQuery = study.compounds.join(",")
    router.push(`/database?tab=supplements&search=${encodeURIComponent(compoundsQuery)}`)
  }


  const handleAddToVantaLab = (study: Study) => {
    setSelectedStudy(study)
    setSelectedCompounds([])
    setAddDialogOpen(true)
  }

  const handleCompoundSelection = (compound: string, checked: boolean) => {
    if (checked) {
      setSelectedCompounds([...selectedCompounds, compound])
    } else {
      setSelectedCompounds(selectedCompounds.filter((c) => c !== compound))
    }
  }

  const handleSaveToVantaLab = () => {
    if (selectedStudy && selectedCompounds.length > 0) {
      const vantaLabData = {
        studyId: selectedStudy.id,
        studyTitle: selectedStudy.title,
        compounds: selectedCompounds,
        category: selectedStudy.category,
        dosage: selectedStudy.dosage,
        timestamp: new Date().toISOString(),
      }

      const existingVantaLab = JSON.parse(localStorage.getItem("vantaLab") || "[]")
      existingVantaLab.push(vantaLabData)
      localStorage.setItem("vantaLab", JSON.stringify(existingVantaLab))

      setAddDialogOpen(false)
      setSelectedStudy(null)
      setSelectedCompounds([])

      router.push("/stack-lab")
    }
  }

  const handleStudyClick = (study: Study) => {
    setSelectedStudy(study)
  }

  const displayStudies = filteredStudies.slice(0, 5)

  const { shouldAnimate } = useMotion()

  return (
    <section id="database" className="relative bg-transparent py-24 w-full">
      {/* DATABASE Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/Background Videos/abtract-pill-dissolve-bg-4.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="relative z-10 mx-auto w-full max-w-none">

        {/* LENS Header */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Title */}
            <div className="text-left mb-16 pl-4 sm:pl-6 md:pl-8 lg:pl-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black">LENS - Our Research, Evidence and Study Scoring Database</h2>
              </div>

              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
                style={shouldAnimate ? { transitionDelay: "200ms" } : {}}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-white font-medium">Powering SILO's Scientific Credibility</span>
              </div>
              
              {/* Subtitle */}
              <div
                className="text-xl font-bold text-black max-w-4xl mb-12"
                style={shouldAnimate ? { transitionDelay: "400ms" } : {}}
              >
                <p>
                  Advanced research analytics and supplement verification powered by AI-driven data synthesis. LENS
                  transforms complex scientific literature into actionable insights for evidence-based supplementation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* LENS Capabilities */}
        <div ref={capabilitiesRef}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={capabilitiesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Intelligence Overview - Interactive Grid */}
          <div 
            className={`mb-16 w-full px-4 sm:px-6 md:px-8 lg:px-12 ${shouldAnimate ? "transform transition-all duration-1000" : ""} ${
              shouldAnimate && capabilitiesInView
                ? "translate-y-0 opacity-100"
                : shouldAnimate
                  ? "translate-y-12 opacity-0"
                  : "opacity-100"
            }`}
          >
            {/* Subtitle */}
            <div
              className={`${shouldAnimate ? "transform transition-all duration-700" : ""} ${
                shouldAnimate && headerInView
                  ? "translate-y-0 opacity-100"
                  : shouldAnimate
                    ? "translate-y-6 opacity-0"
                    : "opacity-100"
              }`}
              style={shouldAnimate ? { transitionDelay: "400ms" } : {}}
            >
              <p className="text-xl font-bold text-black max-w-4xl mb-12">
                Advanced research analytics and supplement verification powered by AI-driven data synthesis. LENS
                transforms complex scientific literature into actionable insights for evidence-based supplementation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* LENS Intelligence Overview - Interactive Grid */}
        <div 
          className={`mb-16 w-full px-4 sm:px-6 md:px-8 lg:px-12 ${shouldAnimate ? "transform transition-all duration-1000" : ""} ${
            shouldAnimate && capabilitiesInView
              ? "translate-y-0 opacity-100"
              : shouldAnimate
                ? "translate-y-12 opacity-0"
                : "opacity-100"
          }`}
          ref={capabilitiesRef}
        >
          <div className="relative">
            <div className="relative p-0">
              {/* Header Section */}
              <div 
                className={`text-center mb-12 ${shouldAnimate ? "transform transition-all duration-700" : ""} ${
                  shouldAnimate && capabilitiesInView
                    ? "translate-y-0 opacity-100"
                    : shouldAnimate
                      ? "translate-y-6 opacity-0"
                      : "opacity-100"
                }`}
                style={shouldAnimate ? { transitionDelay: "200ms" } : {}}
              >
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Intelligence Engine</span>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">LENS Capabilities</h3>
                <p className="text-lg text-white/70 max-w-3xl mx-auto">
                  Six pillars of evidence-based supplement intelligence, powered by advanced AI and rigorous scientific methodology
                </p>
              </div>

              {/* Interactive Grid Layout */}
              <div 
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${shouldAnimate ? "transform transition-all duration-700" : ""} ${
                  shouldAnimate && capabilitiesInView
                    ? "translate-y-0 opacity-100"
                    : shouldAnimate
                      ? "translate-y-8 opacity-0"
                      : "opacity-100"
                }`}
                style={shouldAnimate ? { transitionDelay: "400ms" } : {}}
              >
                {LENS_CAPABILITIES.map((capability, index) => {
                  const IconComponent = capability.icon
                  const [isExpanded, setIsExpanded] = useState(false)
                  
                  return (
                    <motion.div
                      key={index}
                      className={`group relative ${frostedGlassClass} rounded-xl cursor-pointer overflow-hidden`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: shouldAnimate ? 0.6 + index * 0.1 : 0,
                        duration: 0.6,
                        ease: [0.23, 1, 0.32, 1]
                      }}
                      onHoverStart={() => setIsExpanded(true)}
                      onHoverEnd={() => setIsExpanded(false)}
                      whileHover={{ 
                        scale: 1.02,
                        y: -8,
                        transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
                      }}
                    >
                      {/* Gradient Border Animation */}
                      <motion.div 
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(135deg, var(--${capability.color}-500/20), var(--${capability.color}-400/10))`
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Content Container */}
                      <div className="relative p-6 h-full flex flex-col">
                        {/* Category Badge */}
                        <motion.div 
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ 
                            opacity: isExpanded ? 1 : 0,
                            x: isExpanded ? 0 : 10
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${capability.color}-500/20 text-${capability.color}-300 border border-${capability.color}-500/30`}>
                            {capability.category}
                          </span>
                        </motion.div>

                        {/* Icon */}
                        <motion.div
                          className={`w-14 h-14 bg-${capability.color}-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                          whileHover={{ rotate: 5 }}
                        >
                          <IconComponent className={`w-7 h-7 text-${capability.color}-400`} />
                        </motion.div>

                        {/* Title */}
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">
                          {capability.title}
                        </h4>

                        {/* Short Description - Always Visible */}
                        <p className="text-sm text-white/70 mb-4 leading-relaxed">
                          {capability.shortDesc}
                        </p>

                        {/* Expandable Content */}
                        <motion.div
                          className="overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: isExpanded ? "auto" : 0,
                            opacity: isExpanded ? 1 : 0
                          }}
                          transition={{ 
                            duration: 0.4, 
                            ease: [0.23, 1, 0.32, 1]
                          }}
                        >
                          <div className="pb-4 border-t border-white/10 pt-4">
                            <p className="text-sm text-white/80 leading-relaxed mb-3">
                              {capability.fullDesc}
                            </p>
                            
                            {/* Metrics */}
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-mono text-${capability.color}-300 bg-${capability.color}-500/10 px-2 py-1 rounded`}>
                                {capability.metrics}
                              </span>
                              <motion.div
                                className="w-2 h-2 bg-green-400 rounded-full"
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                  opacity: [0.7, 1, 0.7]
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                            </div>
                          </div>
                        </motion.div>

                        {/* Hover Indicator */}
                        <motion.div
                          className="absolute bottom-4 left-6 right-6 text-center opacity-0 group-hover:opacity-100"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: isExpanded ? 1 : 0,
                            y: isExpanded ? 0 : 10
                          }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <span className="text-xs text-white/50 font-medium">
                            • Hover to explore •
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Bottom CTA */}
              <motion.div
                className={`text-center mt-12 ${shouldAnimate ? "transform transition-all duration-700" : ""} ${
                  shouldAnimate && capabilitiesInView
                    ? "translate-y-0 opacity-100"
                    : shouldAnimate
                      ? "translate-y-6 opacity-0"
                      : "opacity-100"
                }`}
                style={shouldAnimate ? { transitionDelay: "1000ms" } : {}}
              >
                <p className="text-white/60 text-sm mb-4">
                  Experience the future of evidence-based supplementation
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Two Column Layout - Equal Heights */}
        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 px-4 sm:px-6 md:px-8 lg:px-12 ${shouldAnimate ? "transform transition-all duration-1000" : ""} ${
            shouldAnimate && assessmentInView
              ? "translate-y-0 opacity-100"
              : shouldAnimate
                ? "translate-y-16 opacity-0"
                : "opacity-100"
          }`}
          ref={assessmentRef}
        >
          {/* Left Column - Research Quality Assessment Framework */}
                <div 
                  className={`flex flex-col h-full ${shouldAnimate ? "transform transition-all duration-800" : ""} ${
                    shouldAnimate && assessmentInView
                      ? "translate-y-0 opacity-100"
                      : shouldAnimate
                        ? "translate-y-12 opacity-0"
                        : "opacity-100"
                  }`}
                  style={shouldAnimate ? { transitionDelay: "200ms" } : {}}
                >
                  <Card className={`${frostedGlassClass} h-full relative overflow-hidden`}>
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-black/60 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/10">
                      <BarChart3 className="w-6 h-6 text-slate-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Research Quality Assessment</h3>
                      <p className="text-slate-400 text-sm">
                      {selectedStudy
                        ? `Analyzing: "${selectedStudy.title}" (${selectedStudy.year})`
                        : "Select a study to view analysis"}
                      </p>
                    </div>
                    </div>
                    <div className="flex flex-col h-full">
                    <Card className={`${frostedGlassClass} h-full flex flex-col`}>
                    </Card>
                    </div>

                {selectedStudy && (
                    <div className="relative z-10 flex-1 flex flex-col">
                      {/* Study Overview */}
                      <div className="relative overflow-hidden mb-6">
                      {/* Side accent */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-blue-500 to-purple-500"></div>

                      <div className={`${frostedGlassClass} p-6 ml-4 relative`}>
                        {/* Corner detail */}
                        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-amber-500/30 to-transparent"></div>

                        <h4 className="text-lg font-semibold text-white mb-4 relative">
                        Study Overview
                        <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-amber-500 to-blue-500"></div>
                        </h4>

                        <div className="space-y-3 text-sm">
                        {[
                          { label: "Study Type", value: selectedStudy.studyType },
                          { label: "Design", value: selectedStudy.studyDesignFull },
                          { label: "Duration", value: selectedStudy.duration },
                          { label: "Participants", value: selectedStudy.participants },
                          { label: "Primary Outcome", value: selectedStudy.primaryOutcome },
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between items-start py-2 relative">
                          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-slate-600 to-transparent opacity-50"></div>
                          <span className="text-slate-400 pl-4">{item.label}:</span>
                          <span className="text-white text-right max-w-xs">{item.value}</span>
                          </div>
                        ))}
                        </div>

                        {/* Overall Scores with creative layout */}
                        <div className="grid grid-cols-2 gap-6 mt-6 pt-6 relative">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>

                        <div className="text-center relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent"></div>
                          <div className="relative p-4">
                          <div className="text-4xl font-mono font-bold text-amber-400 mb-2 relative">
                            {selectedStudy.qualityScore}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400/30 transform rotate-45"></div>
                          </div>
                          <div className="text-sm text-slate-300 mb-1">Overall Quality Index</div>
                          <div className="text-xs text-amber-500 mb-2">
                            {selectedStudy.qualityScore >= 95
                            ? "Grade A+ (Excellent)"
                            : selectedStudy.qualityScore >= 90
                              ? "Grade A (Excellent)"
                              : selectedStudy.qualityScore >= 85
                              ? "Grade B+ (Good)"
                              : selectedStudy.qualityScore >= 80
                                ? "Grade B (Good)"
                                : "Grade C (Acceptable)"}
                          </div>
                          <div className="text-xs text-slate-500">
                            {selectedStudy.qualityScore >= 95
                            ? "Top 1% of studies"
                            : selectedStudy.qualityScore >= 90
                              ? "Top 5% of studies"
                              : selectedStudy.qualityScore >= 85
                              ? "Top 15% of studies"
                              : "Above average"}
                          </div>
                          </div>
                        </div>

                        <div className="text-center relative">
                          <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/5 to-transparent"></div>
                          <div className="relative p-4">
                          <div className="text-4xl font-mono font-bold text-amber-400 mb-2 relative">
                            {selectedStudy.methodologyScore}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400/30 transform rotate-45"></div>
                          </div>
                          <div className="text-sm text-slate-300 mb-1">Methodology Score</div>
                          <div className="text-xs text-amber-500 mb-2">
                            {selectedStudy.methodologyScore >= 90 ? "Rigorous Design" : "Good Design"}
                          </div>
                          <div className="text-xs text-slate-500">
                            {selectedStudy.studyDesignFull.includes("Double-Blind")
                            ? "Gold standard RCT"
                            : "Standard RCT"}
                          </div>
                          </div>
                        </div>
                        </div>
                      </div>
                      </div>

                      {/* Methodology Assessment */}
                      <div className="relative mb-6 overflow-hidden">
                      {/* Diagonal background accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/10 to-transparent transform rotate-12"></div>

                      <div className={`${frostedGlassClass} p-6 relative`}>
                        <h4 className="text-lg font-semibold text-white mb-6 relative">
                        Methodology Assessment
                        <div className="absolute -bottom-2 left-0 w-20 h-0.5 bg-gradient-to-r from-amber-500 to-blue-500"></div>
                        </h4>

                        <div className="space-y-6">
                        {[
                          {
                          label: "Randomization Quality",
                          score: selectedStudy.randomizationScore,
                          description: "Computer-generated sequence, stratified allocation",
                          },
                          {
                          label: "Blinding Protocol",
                          score: selectedStudy.blindingScore,
                          description: selectedStudy.studyDesignFull.includes("Double-Blind")
                            ? "Double-blind maintained, identical placebo"
                            : "Single-blind protocol",
                          },
                          {
                          label: "Statistical Analysis",
                          score: selectedStudy.statisticalPower,
                          description: `Effect size: ${selectedStudy.effectSize}, P-value: ${selectedStudy.pValue}, CI: ${selectedStudy.confidenceInterval}`,
                          },
                          {
                          label: "Outcome Assessment",
                          score: selectedStudy.outcomeScore,
                          description: "Primary and secondary endpoints clearly defined",
                          },
                        ].map((item, index) => (
                          <div key={index} className="relative">
                          <div className="flex justify-between mb-3">
                            <span className="text-sm text-slate-300 font-medium">{item.label}</span>
                            <span className="text-sm font-mono text-amber-400 font-bold">{item.score}/100</span>
                          </div>

                          <div className="relative mb-2">
                            <div className="w-full bg-slate-800/60 h-3 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-800"></div>
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 transition-all duration-1000 relative overflow-hidden"
                              style={{ width: `${item.score}%` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                            </div>
                            </div>
                          </div>

                          <div className="text-xs text-slate-500 pl-1">{item.description}</div>

                          {index < 3 && (
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                          )}
                          </div>
                        ))}
                        </div>

                        {/* Statistical Rigor Section */}
                        <div className="mt-8 pt-6 relative">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>

                        <h5 className="text-sm font-semibold text-amber-400 mb-4 flex items-center">
                          <div className="w-3 h-3 bg-amber-400 transform rotate-45 mr-3"></div>
                          Statistical Rigor
                        </h5>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                          <div className="space-y-3">
                          {[
                            { label: "Sample Size Calculation", value: "✓ Adequate" },
                            { label: "Intent-to-Treat Analysis", value: "✓ Applied" },
                            { label: "Multiple Comparisons", value: "✓ Adjusted" },
                          ].map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-1">
                            <span className="text-slate-400">{item.label}:</span>
                            <span className="text-white font-medium">{item.value}</span>
                            </div>
                          ))}
                          </div>

                          <div className="space-y-3">
                          {[
                            { label: "Dropout Rate", value: `${selectedStudy.dropoutRate}%` },
                            { label: "Effect Size", value: selectedStudy.effectSize },
                            { label: "Statistical Power", value: `${selectedStudy.statisticalPower}%` },
                          ].map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-1">
                            <span className="text-slate-400">{item.label}:</span>
                            <span className="text-white font-medium">{item.value}</span>
                            </div>
                          ))}
                          </div>
                        </div>
                        </div>
                      </div>
                      </div>

                      {/* Evidence Summary */}
                      <div className="relative overflow-hidden">
                      {/* Diagonal accent line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-blue-500 to-purple-500"></div>

                      <div className={`${frostedGlassClass} rounded-none p-6 relative`}>
                        {/* Corner accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-500/20 to-transparent"></div>

                        <h4 className="text-lg font-semibold text-white mb-4 relative">
                        Evidence Quality Summary
                        <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-amber-500"></div>
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h5 className="text-sm font-semibold text-amber-400 mb-3 flex items-center">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                          Study Classification
                          </h5>
                          <div className="text-xs text-slate-300 space-y-2 pl-4">
                          <div className="flex items-start">
                            <div className="w-1 h-1 bg-slate-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span>{selectedStudy.evidenceLevel}</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1 h-1 bg-slate-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span>{selectedStudy.cochrane}</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1 h-1 bg-slate-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span>JADAD Score: {selectedStudy.jadad}</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1 h-1 bg-slate-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span>{selectedStudy.consort}</span>
                          </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h5 className="text-sm font-semibold text-amber-400 mb-3 flex items-center">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                          Sample Analysis
                          </h5>
                          <div className="text-xs text-slate-300 space-y-2 pl-4">
                          <div className="flex items-start">
                            <div className="w-1 h-1 bg-slate-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span>Total participants: {selectedStudy.studySize}</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1 h-1 bg-slate-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span>Completed study: {selectedStudy.completedStudy}</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1 h-1 bg-slate-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span>Dropout rate: {selectedStudy.dropoutRate}%</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1 h-1 bg-slate-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span>Statistical power: {selectedStudy.statisticalPower}%</span>
                          </div>
                          </div>
                        </div>
                        </div>
                      </div>
                      </div>

                        {/* Action Section */}
                        <div className="relative mt-6 overflow-hidden">
                        {/* Geometric background pattern - moved to right corner */}
                        <div className="absolute inset-0 pointer-events-none opacity-10">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 transform rotate-45 translate-x-8 -translate-y-8"></div>
                          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-500 to-orange-500 transform rotate-12 translate-x-12 translate-y-12"></div>
                        </div>

                      <div className={`${frostedGlassClass} relative p-8`}>
                        {/* Top accent bar */}

                        <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm mb-4 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 transform rotate-45"></div>
                          <Search className="w-8 h-8 text-blue-400 relative z-10" />
                        </div>

                        <h4 className="text-2xl font-bold text-white mb-3 relative">
                          Dive Deeper into the Research
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        </h4>

                        <p className="text-sm text-slate-300 max-w-md mx-auto">
                          Explore comprehensive analysis, find supplements, and build your protocol
                        </p>
                        </div>

                        <div className="space-y-4">
                        <Button
                          onClick={() => router.push("/research")}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-4 relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                          <div className="relative flex items-center justify-center">
                          <Search className="w-5 h-5 mr-3" />
                          Explore Full LENS Database
                          </div>
                        </Button>

                        <div className="grid grid-cols-2 gap-4">
                          <Button
                          onClick={() => handleViewCompounds(selectedStudy)}
                          className="border bg-slate-900/70 hover:bg-slate-800/80 text-white font-medium py-3 relative overflow-hidden group backdrop-blur-sm"
                          >
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-slate-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                          <div className="relative flex items-center justify-center">
                            <Package className="w-4 h-4 mr-2" />
                            View Compounds
                          </div>
                          </Button>

                          <Button
                          onClick={() => router.push("/stack-compass")}
                          className="border bg-slate-900/70 hover:bg-slate-800/80 text-white font-medium py-3 relative overflow-hidden group backdrop-blur-sm"
                          >
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-slate-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                          <div className="relative flex items-center justify-center">
                            <Target className="w-4 h-4 mr-2" />
                            Stack Compass
                          </div>
                          </Button>
                        </div>

                        <Button
                          onClick={() => handleAddToVantaLab(selectedStudy)}
                          className="w-full bg-black/90 border text-white font-semibold py-4 relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-1000"></div>
                          <div className="relative flex items-center justify-center">
                          <Zap className="w-5 h-5 mr-3" />
                          Add to VANTA Lab & Build Protocol
                          </div>
                        </Button>
                        </div>

                        <div className="text-center mt-6 pt-6 relative">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                        <div className="inline-flex items-center space-x-2">
                          <div className="w-2 h-2 bg-amber-400 transform rotate-45"></div>
                          <p className="text-xs text-slate-400 font-medium">
                          <span className="text-amber-400 font-semibold">LENS</span> • Evidence-Based Supplement
                          Intelligence
                          </p>
                          <div className="w-2 h-2 bg-amber-400 transform rotate-45"></div>
                        </div>
                        </div>
                      </div>
                      </div>
                    </div>
                    )}
                  </CardContent>
                  </Card>
                </div>

          {/* Right Column - Research Database Interface */}
          <div 
            className={`flex flex-col h-full ${shouldAnimate ? "transform transition-all duration-800" : ""} ${
              shouldAnimate && assessmentInView
                ? "translate-y-0 opacity-100"
                : shouldAnimate
                  ? "translate-y-12 opacity-0"
                  : "opacity-100"
            }`}
            style={shouldAnimate ? { transitionDelay: "400ms" } : {}}
          >
            <div className="h-full flex flex-col" ref={contentRef}>
              <Card className={`${frostedGlassClass} h-full flex flex-col`}>
          <CardContent className="p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">Searchable Research Library</h3>
              <Badge variant="outline" className="gap-1 text-green-600 border-green-600/30">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          {filteredStudies.length} Studies Found
              </Badge>
                  </div>
                  {/* Search and Controls */}
                  <div className="space-y-6 mb-8">
                    <div className="flex gap-6 items-center">
                      <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                          placeholder="Search by supplement name, effect, or study focus..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-12 pr-12 h-12 text-base bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        />
                        {searchTerm && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearSearch}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-white/60 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-56 h-12 bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Sort by..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rating">Highest Quality Score</SelectItem>
                          <SelectItem value="qualityScore">Research Quality</SelectItem>
                          <SelectItem value="year">Most Recent</SelectItem>
                          <SelectItem value="studySize">Largest Study Size</SelectItem>
                          <SelectItem value="effectSize">Strongest Effect</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-3">
                      {CATEGORIES.map((category) => (
                        <Button
                          key={category.name}
                          variant={selectedCategory === category.name ? "default" : "outline"}
                          size="default"
                          onClick={() => setSelectedCategory(category.name)}
                          className="gap-2 px-4 py-2"
                        >
                          {category.name}
                          <Badge variant="secondary" className="ml-1">
                            {category.name === "All"
                              ? category.count
                              : selectedCategory === category.name
                                ? filteredStudies.length
                                : category.count}
                          </Badge>
                        </Button>
                      ))}
                    </div>
                  </div>
                  {/* Results - Scrollable */}
                  <div className="relative flex-1 overflow-hidden">
                    <div className="h-full overflow-y-auto space-y-4 pr-2">
                      {displayStudies.length === 0 ? (
                        <div className="text-center py-12 text-white/60">
                          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <h4 className="text-base font-medium mb-2">No studies found</h4>
                          <p className="text-sm mb-3">Try adjusting your search terms or filters</p>
                          <Button variant="outline" onClick={clearSearch} size="sm">
                            Clear All Filters
                          </Button>
                        </div>
                      ) : (
                        <>
                          {/* All studies - clickable */}
                          {displayStudies.map((study) => (
                            <Card
                              key={study.id}
                              className={`border-white/20 hover:bg-white/10 transition-colors cursor-pointer ${
                                selectedStudy?.id === study.id
                                  ? "bg-white/15 border-amber-500/50 ring-1 ring-amber-500/30"
                                  : "bg-white/5"
                              }`}
                              onClick={() => handleStudyClick(study)}
                            >
                              <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                  {/* Left: Study Info */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-3">
                                      <h4 className="font-semibold text-lg text-white">{study.title}</h4>
                                      <Badge
                                        variant="outline"
                                        className={`text-xs px-2 py-1 ${
                                          study.category === "Cognitive"
                                            ? "bg-purple-500/20 text-purple-300 border-purple-400/30"
                                            : study.category === "Energy"
                                              ? "bg-orange-500/20 text-orange-300 border-orange-400/30"
                                              : study.category === "Sleep"
                                                ? "bg-blue-500/20 text-blue-300 border-blue-400/30"
                                                : study.category === "Stress"
                                                  ? "bg-red-500/20 text-red-300 border-red-400/30"
                                                  : study.category === "Mood"
                                                    ? "bg-pink-500/20 text-pink-300 border-pink-400/30"
                                                    : study.category === "Performance"
                                                      ? "bg-green-500/20 text-green-300 border-green-400/30"
                                                      : study.category === "Recovery"
                                                        ? "bg-teal-500/20 text-teal-300 border-teal-400/30"
                                                        : "bg-indigo-500/20 text-indigo-300 border-indigo-400/30"
                                        }`}
                                      >
                                        {study.category}
                                      </Badge>
                                    </div>
                                    {/* Study metrics */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                      <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-xs text-white/60 mb-1">Quality Score</div>
                                        <div className="text-lg font-bold text-green-400">
                                          {study.qualityScore}/100
                                        </div>
                                      </div>
                                      <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-xs text-white/60 mb-1">Study Size</div>
                                        <div className="text-lg font-bold text-blue-400">n={study.studySize}</div>
                                      </div>
                                    </div>
                                    {/* Study details */}
                                    <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
                                      <span className="font-medium text-white">{study.supplement}</span>
                                      <span>•</span>
                                      <span>{study.duration}</span>
                                      <span>•</span>
                                      <span>{study.dosage}</span>
                                    </div>
                                    {/* Expandable details */}
                                    {expandedStudies.has(study.id) && (
                                      <div className="mt-4 pt-4 border-t border-white/20 space-y-4">
                                        <div>
                                          <h5 className="font-medium mb-2 text-white">Key Findings</h5>
                                          <div className="space-y-1 text-sm text-white/70">
                                            {study.keyFindings.map((finding, index) => (
                                              <p key={index}>• {finding}</p>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  {/* Right: Action Buttons */}
                                  <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleStudyExpansion(study.id)}
                                      className="h-8 w-8 p-0 text-white/60 hover:text-white"
                                    >
                                      {expandedStudies.has(study.id) ? (
                                        <ChevronUp className="w-4 h-4" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4" />
                                      )}
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleViewCompounds(study)}
                                      className="gap-1 text-xs px-2 py-1 h-7 whitespace-nowrap border-white/20 text-white/80 hover:text-white"
                                    >
                                      <Package className="w-3 h-3" />
                                      Compounds
                                    </Button>
                                    <Button
                                      size="sm"
                                      onClick={() => handleAddToVantaLab(study)}
                                      className="gap-1 text-xs px-2 py-1 h-7 whitespace-nowrap bg-blue-600 hover:bg-blue-500"
                                    >
                                      <Zap className="w-3 h-3" />
                                      VANTA
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          {/* Show more button if there are more studies */}
                          {filteredStudies.length > 5 && (
                            <div className="text-center pt-4">
                              <Button
                                onClick={() => router.push("/research")}
                                className="bg-blue-600 hover:bg-blue-500 text-white"
                              >
                                View All {filteredStudies.length} Studies
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* LENS Performance Metrics */}
        <div className="space-y-8 mt-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">LENS Intelligence Metrics</h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              Real-time analytics showcasing the depth and accuracy of our evidence-based research platform
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">156,203</div>
                <div className="text-xs text-white/70">Research Papers</div>
                <div className="text-xs text-green-400 mt-1">+2,847 analyzed</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">12,847</div>
                <div className="text-xs text-white/70">Supplements</div>
                <div className="text-xs text-blue-400 mt-1">+456 compounds</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">98.7%</div>
                <div className="text-xs text-white/70">Quality Score</div>
                <div className="text-xs text-green-400 mt-1">Methodology verified</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-xs text-white/70">Live Updates</div>
                <div className="text-xs text-orange-400 mt-1">Real-time monitoring</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add to VANTA Lab Dialog */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Compounds to VANTA Lab</DialogTitle>
              <DialogDescription>
                Select the compounds from "{selectedStudy?.title}" that you want to add to your VANTA Lab for protocol
                building.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {selectedStudy?.compounds.map((compound) => (
                <div key={compound} className="flex items-center space-x-2">
                  <Checkbox
                    id={compound}
                    checked={selectedCompounds.includes(compound)}
                    onCheckedChange={(checked) => handleCompoundSelection(compound, checked as boolean)}
                  />
                  <label
                    htmlFor={compound}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {compound}
                  </label>
                </div>
              ))}
            </div>

            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSaveToVantaLab}
                disabled={selectedCompounds.length === 0}
                className="gap-2 bg-blue-600 hover:bg-blue-500"
              >
                <Zap className="w-4 h-4" />
                Add to VANTA Lab ({selectedCompounds.length})
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    </section>
  )
}
