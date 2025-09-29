import { ResearchLibrary } from '@/components/lens/research-library'

export default function LensLibraryPage() {
  // Mock studies data
  const studies = [
    {
      id: '1',
      title: 'Effects of Creatine Supplementation on Exercise Performance and Recovery',
      authors: ['Smith, J.', 'Johnson, K.', 'Williams, R.'],
      journal: 'Journal of Sports Medicine',
      year: 2023,
      studyType: 'Randomized Controlled Trial',
      qualityScore: 85,
      tags: ['Creatine', 'Performance', 'Recovery', 'Exercise'],
      summary: 'This double-blind RCT examined the effects of 20g daily creatine supplementation for 6 weeks on exercise performance in 120 trained athletes. Results showed significant improvements in power output and reduced recovery time.'
    },
    {
      id: '2',
      title: 'Magnesium Glycinate vs Magnesium Oxide: Bioavailability and Sleep Quality',
      authors: ['Davis, M.', 'Brown, L.'],
      journal: 'Sleep Medicine Reviews',
      year: 2023,
      studyType: 'Comparative Study',
      qualityScore: 78,
      tags: ['Magnesium', 'Sleep', 'Bioavailability'],
      summary: 'Comparative analysis of magnesium forms showed superior bioavailability and sleep quality improvements with glycinate form compared to oxide in 80 participants over 8 weeks.'
    }
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Research Library</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Access peer-reviewed research on supplements with quality scores and AI-generated summaries
        </p>
      </div>

      <ResearchLibrary studies={studies} />
    </div>
  )
}