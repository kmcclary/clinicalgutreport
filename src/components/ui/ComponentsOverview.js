// ComponentsOverview.jsx

import React, { useState } from 'react';
import TotalScoreCard from './TotalScoreCard';
import LevelSection from './LevelSection';
import Achievements from './Achievements';
import EnterotypeProfile from './EnterotypeProfile';
import RecommendationsSection from './RecommendationsSection';
import MEPSVisual from './MEPSVisual';
import MicrobiomePersonalityV2 from './MicrobiomePersonality';
import PathogenDetection from './PathogenDetection';
import CommensalMicrobeDetection from './CommensalMicrobeDetection';
import PhylaAndDiversityAnalysis from './PhylaAndDiversityAnalysis';
import MicrobialCompositionOverview from './MicrobialCompositionOverview';
import StreakStatus from './StreakStatus';
import PatientInfoDropdown from './PatientInfo';
import ExecutiveSummary from './ExecutiveSummary';
import AnalysisOverview from './AnalysisOverview';
import GutMicrobiotaComposition from './GutMicrobiotaComposition';
import RecommendedProbioticsSection from './RecommendedProbioticsSection';
import LifestyleRecommendationsSection from './LifestyleRecommendationsSection';
import ConclusionPage from './ConclusionPage';

// Replace these imports with your own Card/CardHeader/etc. components if needed
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
import { BookOpen, Star, ChevronDown } from 'lucide-react';

const ComponentsOverview = () => {
  const reportData = {
    user_name: "Jane Smith",
    report_date: "November 10, 2024",
    level: {
      current: 3,
      title: "Health Challenger",
      points_to_next: 16
    },
    scores: {
      total: 54.5,
      base: 18.5,
      action_points: 26,
      streak_bonus: 10
    },
    current_profile: {
      ETF: 0.6,
      ETB: 0.2,
      ETP: 0.1,
      ETX: 0.1,
      date: "November 10, 2024"
    },
    previous_profile: {
      ETF: 0.7,
      ETB: 0.15,
      ETP: 0.1,
      ETX: 0.05,
      date: "October 10, 2024"
    },
    streak: {
      days: 14,
      message: "🔥 Maximum bonus achieved!"
    },
    enterotype_profile: {
      ETF: 0.6,
      ETB: 0.2,
      ETP: 0.1,
      ETX: 0.1
    }
  };

  const patientData = {
    testId: 'MBX-2024-0472',
    patientName: 'John Doe',
    patientDOB: '1975-07-22',
    physicianName: 'Dr. Jane Smith',
    collectionDate: '2024-03-15',
    reportDate: '2024-03-18',
    resultStatus: 'POSITIVE',
    riskScore: 0.82,
    patientNotes: 'Patient reported intermittent changes in bowel habits and mild abdominal discomfort.'
  };

  const analysisData = {
    totalSequences: 1234567,
    uniqueSpecies: 342,
    dominantPhyla: [
      'Firmicutes',
      'Bacteroidetes',
      'Proteobacteria',
      'Actinobacteria'
    ]
  };

  const sampleMicrobiomeData = {
    beneficialMicrobes: [
      { name: 'Bifidobacterium longum', abundance: 15 },
      { name: 'Lactobacillus acidophilus', abundance: 12 },
    ],
    opportunisticMicrobes: [
      { name: 'Escherichia coli O157:H7', abundance: 5 },
      { name: 'Clostridioides difficile', abundance: 3 },
    ],
    dysbiosisIndex: 2.5
  };

  // State to control the collapse of "Resources & References"
  const [refsOpen, setRefsOpen] = useState(false);

  return (
    <div className="space-y-8">

<div>
            <h1 className="text-2xl font-bold text-blue-900">GutSignature™</h1>
            <p className="text-sm text-gray-600">
              Advanced Microbiome Health Screening
            </p>
          </div>
      {/* Patient Info */}
      <div id="patient-info" className="component-section">
        <PatientInfoDropdown patientData={patientData} />
      </div>

      {/* Executive Summary */}
      <ExecutiveSummary />

      {/* Analysis Overview */}
      <AnalysisOverview analysisData={analysisData} />

      {/* Gut Microbiota Composition */}
      <div id="gut-microbiota" className="component-section">
        <GutMicrobiotaComposition {...sampleMicrobiomeData} />
      </div>

      {/* Pathogen Detection */}
      <div id="pathogen-detection" className="component-section">
        <PathogenDetection />
      </div>

      {/* Commensal Microbe Detection */}
      <div id="commensal-microbe-detection" className="component-section">
        <CommensalMicrobeDetection />
      </div>

      {/* Recommendations */}
      <div id="recommendations" className="component-section">
        <RecommendationsSection />
      </div>

      {/* Recommended Probiotics */}
      <div id="recommended-probiotics" className="component-section">
        <RecommendedProbioticsSection />
      </div>

      {/* Lifestyle Recommendations */}
      <div id="lifestyle-recommendations" className="component-section">
        <LifestyleRecommendationsSection />
      </div>

      {/* Microbial Composition */}
      <div id="microbial-composition" className="component-section">
        <MicrobialCompositionOverview />
      </div>

      {/* Conclusion Page */}
      <div id="conclusion-page" className="component-section">
        <ConclusionPage />
      </div>

      {/* Collapsible Resources & References Card */}
      <Card className="rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-200 border-t-4 border-t-indigo-600 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div 
            onClick={() => setRefsOpen(!refsOpen)}
            className="cursor-pointer flex justify-between items-start"
          >
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                Resources &amp; References
              </CardTitle>
              <CardDescription className="mt-2">
                Further reading on the science behind our test
              </CardDescription>
            </div>
            <ChevronDown 
              className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                refsOpen ? 'transform rotate-180' : ''
              }`}
            />
          </div>
        </CardHeader>

        {refsOpen && (
          <CardContent className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <div className="space-y-2">
              <p>
                <span className="font-medium">Test Methodology:</span>
                {' '}Next-generation sequencing (NGS) of stool samples identifies taxa and functional genes.
                Bioinformatics pipelines correlate microbial abundances with CRC risk signatures.
              </p>
              <p>
                <span className="font-medium">Limitations:</span>
                {' '}Not a substitute for colonoscopy. Factors influencing CRC risk (genetics, non-microbial lifestyle) may not be captured.
              </p>
            </div>
            
            <div>
              <p className="font-medium mb-3">
                Peer-Reviewed Literature &amp; Guidelines (Additional Citations):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
    {/* 2 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Sung, J., et al. (2024). “Gut Microbiome Wellness Index 2 (GMWI2) for assessing gut health.” 
          <em> Nature Communications</em>, 15(1), 456.
        </p>
      </div>
    </div>
    
    {/* 3 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Morgan, X. C., et al. (2012). “Dysfunction of the intestinal microbiome in inflammatory bowel disease and treatment.” 
          <em> Genome Biology</em>, 13(9), R79.
        </p>
      </div>
    </div>
    
    {/* 4 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Gopalakrishnan, V., et al. (2018). “The Influence of the Gut Microbiome on Cancer, Immunity, and Cancer Immunotherapy.” 
          <em> Cancer Cell</em>, 33(4), 570-580.
        </p>
      </div>
    </div>
    
    {/* 5 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Pasolli, E., et al. (2019). “Extensive Unexplored Human Microbiome Diversity Revealed by Over 150,000 Genomes from Metagenomes Spanning Age, Geography, and Lifestyle.” 
          <em> Cell</em>, 176(3), 649-662.e20.
        </p>
      </div>
    </div>
    
    {/* 6 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Wu, Y., et al. (2021). “Identification of microbial markers across populations in early detection of colorectal cancer.” 
          <em> Nature Communications</em>, 12(1), 3063.
        </p>
      </div>
    </div>
    
    {/* 7 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Durack, J., &amp; Lynch, S. V. (2019). “The gut microbiome: Relationships with disease and opportunities for therapy.” 
          <em> Journal of Experimental Medicine</em>, 216(1), 20-40.
        </p>
      </div>
    </div>
    
    {/* 8 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Rooks, M. G., &amp; Garrett, W. S. (2016). “Gut microbiota, metabolites and host immunity.” 
          <em> Nature Reviews Immunology</em>, 16(6), 341-352.
        </p>
      </div>
    </div>
    
    {/* 9 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Krautkramer, K. A., et al. (2021). “Gut microbial metabolites as multi-kingdom intermediates.” 
          <em> Nature Reviews Microbiology</em>, 19(2), 77-94.
        </p>
      </div>
    </div>
    
    {/* 10 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Dinan, T. G., &amp; Cryan, J. F. (2017). “Gut-brain axis in 2016: Brain-gut-microbiota axis – mood, metabolism and behaviour.” 
          <em> Nature Reviews Gastroenterology &amp; Hepatology</em>, 14(2), 69-70.
        </p>
      </div>
    </div>
    
    {/* 11 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Lloyd-Price, J., et al. (2019). “Multi-omics of the gut microbial ecosystem in inflammatory bowel diseases.” 
          <em> Nature</em>, 569(7758), 655-662.
        </p>
      </div>
    </div>
    
    {/* 12 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Zeevi, D., et al. (2015). “Personalized Nutrition by Prediction of Glycemic Responses.” 
          <em> Cell</em>, 163(5), 1079-1094.
        </p>
      </div>
    </div>
    
    {/* 13 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Forslund, S. K., et al. (2021). “Combinatorial, additive and dose-dependent drug-microbiome associations.” 
          <em> Nature</em>, 600(7889), 500-505.
        </p>
      </div>
    </div>
    
    {/* 14 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Vatanen, T., et al. (2018). “The human gut microbiome in early-onset type 1 diabetes from the TEDDY study.” 
          <em> Nature</em>, 562(7728), 589-594.
        </p>
      </div>
    </div>
    
    {/* 15 (Note: also appears in the original list) */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Wirbel, J., et al. (2019). “Meta-analysis of fecal metagenomes reveals global microbial signatures that are specific for colorectal cancer.” 
          <em> Nature Medicine</em>, 25(4), 679-689.
        </p>
      </div>
    </div>
    
    {/* 16 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Franzosa, E. A., et al. (2019). “Gut microbiome structure and metabolic activity in inflammatory bowel disease.” 
          <em> Nature Microbiology</em>, 4(2), 293-305.
        </p>
      </div>
    </div>
    
    {/* 17 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Valles-Colomer, M., et al. (2019). “The neuroactive potential of the human gut microbiota in quality of life and depression.” 
          <em> Nature Microbiology</em>, 4(4), 623-632.
        </p>
      </div>
    </div>
    
    {/* 18 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Rothschild, D., et al. (2018). “Environment dominates over host genetics in shaping human gut microbiota.” 
          <em> Nature</em>, 555(7695), 210-215.
        </p>
      </div>
    </div>
    
    {/* 19 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Thaiss, C. A., et al. (2018). “Persistent microbiome alterations modulate the rate of post-dieting weight regain.” 
          <em> Nature</em>, 540(7634), 544-551.
        </p>
      </div>
    </div>
    
    {/* 20 */}
    <div className="space-y-1 bg-gray-50 p-3 rounded-md shadow-md">
      <div className="flex items-start gap-2">
        <Star className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm leading-relaxed">
          Zimmermann, M., et al. (2019). “Mapping human microbiome drug metabolism by gut bacteria and their genes.” 
          <em> Nature</em>, 570(7762), 462-467.
        </p>
      </div>
    </div>

                {/* Add as many references as you want below... */}
                {/* ... continue with your references from the original post ... */}
              </div>
            </div>

            <p>
              Additional materials, including patient support and educational resources, can be found at the
              <a
                href="https://www.microbiomescreen.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline ml-1 hover:text-blue-800 transition-colors"
              >
                MicrobiomeScreen™ official website
              </a>
              .
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ComponentsOverview;
