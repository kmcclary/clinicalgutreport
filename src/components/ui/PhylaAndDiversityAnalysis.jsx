import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';  
import { 
  ChevronDown, ChevronRight, Info, BarChart2, Circle, Link2,
  FileText, Layers, HelpCircle, Library 
} from 'lucide-react';

const PhylaAndDiversityAnalysis = () => {
  const [expandedSections, setExpandedSections] = useState({
    introduction: true,
    phylaOverview: false,
    alphaDiversity: false,
    references: false,
    glossary: false,
    suggestedReading: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const parsePositionValue = (pos) => {
    if (pos === "Healthy") return 0;  
    return parseFloat(pos); 
  };

  const references = [
    {
      id: 1,
      title: "Human Microbiome Project Consortium",
      authors: "Human Microbiome Project",
      journal: "Nature",
      year: 2012,
      link: "https://www.nature.com/articles/nature11209"
    },
    {
      id: 2,
      title: "The Gut Microbiome and Its Role in Health and Disease",
      authors: "Eckburg et al.",
      journal: "Science",
      year: 2005,
      link: "https://doi.org/10.1126/science.1117595"
    },
    {
      id: 3,
      title: "Alpha diversity and the human gut microbiome",
      authors: "Lloyd-Price et al.",
      journal: "Nature Medicine",
      year: 2017,
      link: "https://doi.org/10.1038/nm.4479"
    }
  ];

  const glossary = [
    { term: "Phylum", definition: "A high-level classification rank grouping organisms that share a common evolutionary ancestor." },
    { term: "Dysbiosis", definition: "An imbalance in the microbial communities that can lead to health issues." },
    { term: "Alpha Diversity", definition: "A measure of the variety (richness) of species within a single sample or environment." },
    { term: "SCFA (Short-Chain Fatty Acids)", definition: "Beneficial compounds produced by gut bacteria that support gut health and metabolism." },
    { term: "Shannon Diversity Index", definition: "A metric used to measure species diversity, accounting for both abundance and evenness of species." }
  ];

  const suggestedReadings = [
    {
      title: "The Good Gut: Taking Control of Your Weight, Your Mood, and Your Long-term Health",
      authors: "Justin and Erica Sonnenburg",
      description: "A consumer-friendly book explaining how the microbiome influences health and how to support it."
    },
    {
      title: "Missing Microbes: How the Overuse of Antibiotics Is Fueling Our Modern Plagues",
      authors: "Martin J. Blaser",
      description: "Explores how changes in our microbiome due to antibiotic overuse affect various aspects of health."
    },
    {
      title: "Gut: The Inside Story of Our Body’s Most Underrated Organ",
      authors: "Giulia Enders",
      description: "A humorous yet informative look at gut function and microbial communities."
    }
  ];

  const getRandomPosition = () => {
    const positions = ["-25%", "-12.5%", "Healthy", "+12.5%", "+25%"];
    return positions[Math.floor(Math.random() * positions.length)];
  };

  // Define a consistent, distinctive color palette for the phyla to unify their representation
  const phylaData = [
    { 
      name: "Bacteroidota", 
      color: "bg-blue-500", 
      position: getRandomPosition(),
      description: "Primary carbohydrate degraders",
      subInfo: [
        "Produces beneficial short-chain fatty acids (SCFAs)",
        "Help break down complex plant polysaccharides",
        "Important for maintaining gut barrier function",
        "Key genera include Bacteroides and Prevotella"
      ]
    },
    { 
      name: "Firmicutes", 
      color: "bg-purple-500", 
      position: getRandomPosition(),
      description: "Energy harvest specialists",
      subInfo: [
        "Major butyrate producers for colon health",
        "Involved in bile acid metabolism",
        "Important for nutrient absorption",
        "Includes beneficial Lactobacillus and Clostridium clusters"
      ]
    },
    { 
      name: "Actinobacteriota", 
      color: "bg-orange-500", 
      position: getRandomPosition(),
      description: "Fiber metabolism experts",
      subInfo: [
        "Critical for infant gut development",
        "Produces vitamins and antimicrobial compounds",
        "Helps maintain immune system balance",
        "Notable genus Bifidobacterium aids in pathogen resistance"
      ]
    },
    { 
      name: "Proteobacteria", 
      color: "bg-teal-500", 
      position: getRandomPosition(),
      description: "Inflammation indicators",
      subInfo: [
        "Elevated levels may indicate gut inflammation",
        "Contains both beneficial and potentially harmful species",
        "Important for vitamin B12 synthesis",
        "Includes E. coli and other key metabolic contributors"
      ]
    },
    { 
      name: "Verrucomicrobiota", 
      color: "bg-green-500", 
      position: getRandomPosition(),
      description: "Gut barrier supporters",
      subInfo: [
        "Strengthens intestinal barrier integrity",
        "Key genus Akkermansia linked to metabolic health",
        "Helps regulate glucose metabolism",
        "May protect against obesity and inflammation"
      ]
    }
  ];

  return (
    <Card className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl border border-gray-200">
      <CardHeader className="p-4">
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-6 w-6 text-gray-800" />
          <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent text-lg font-semibold">
            Phyla and Diversity Analysis
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-6 space-y-6">
        {/* Introduction section */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button 
            onClick={() => toggleSection('introduction')}
            className="w-full flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Introduction</h2>
            </div>
            {expandedSections.introduction ? 
              <ChevronDown className="h-4 w-4 text-gray-700" /> : 
              <ChevronRight className="h-4 w-4 text-gray-700" />
            }
          </button>

          {expandedSections.introduction && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>
                The gut microbiome consists of thousands of microbial species that co-exist, interact, and influence human health. 
                At a high level, these species are grouped into taxonomic ranks. Among the most broadly defined ranks is the <strong>phylum</strong>.
              </p>
              <p>
                Understanding phyla composition provides a macro-level snapshot of your gut’s ecological landscape. 
                While each phylum encompasses a diverse set of species, their collective metabolic tendencies can guide us in understanding overall gut function.
              </p>
            </div>
          )}
        </section>
        
        {/* Phyla Overview */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button 
            onClick={() => toggleSection('phylaOverview')}
            className="w-full flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Phyla Overview</h2>
            </div>
            {expandedSections.phylaOverview ? 
              <ChevronDown className="h-4 w-4 text-gray-700" /> : 
              <ChevronRight className="h-4 w-4 text-gray-700" />
            }
          </button>

          {expandedSections.phylaOverview && (
            <div className="space-y-4 mt-4 text-sm text-gray-700">
              <p>
                There are several main bacterial phyla commonly referenced in gut microbiome analysis. Each phylum has distinct metabolic roles:
              </p>
              <div className="grid gap-4">
                {phylaData.map((phylum, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg overflow-hidden">
                    <div className="flex items-start gap-3 p-4 border-b border-gray-200">
                      <span className={`inline-block w-3 h-3 rounded-full ${phylum.color} mt-1 flex-shrink-0`}></span>
                      <div className="flex-1">
                        <span className="font-semibold text-gray-900">{phylum.name}</span>
                        <p className="text-gray-700 mt-1">{phylum.description}</p>
                      </div>
                    </div>
                    <div className="px-4 py-3">
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        {phylum.subInfo.map((info, idx) => (
                          <li key={idx}>{info}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Relative Abundances & Dysbiosis Indicators</h3>
                <p className="mb-2">
                  Below is an example chart connecting each phylum’s color-coded indicator above to its relative abundance compared to a healthy baseline.
                </p>

                {/* Phyla abundance chart */}
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex justify-between text-xs text-gray-600 mb-4 border-b pb-2">
                    <span className="font-medium text-gray-700">Low (-25%)</span>
                    <span className="font-medium text-gray-700">Healthy (0%)</span>
                    <span className="font-medium text-gray-700">High (+25%)</span>
                  </div>
                  {phylaData.map((phylum, i) => {
                    const val = parsePositionValue(phylum.position); 
                    const ratio = (val / 25) * 50; 
                    const barLeft = val >= 0 ? "50%" : `${50 + ratio}%`;
                    const barWidth = Math.abs(ratio) + "%";
                    return (
                      <div key={i} className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-800 font-medium flex items-center gap-2">
                            <span className={`inline-block w-3 h-3 rounded-full ${phylum.color}`}></span>
                            {phylum.name}
                          </span>
                          <span className="text-xs text-gray-600">{phylum.position}</span>
                        </div>
                        <div className="relative w-full h-3 bg-gray-200 rounded-full">
                          {/* Center line (Healthy) */}
                          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black opacity-50"></div>
                          {/* Actual bar */}
                          {val !== 0 && (
                            <div 
                              className={`${phylum.color} h-3 rounded-full absolute top-0 bottom-0`} 
                              style={{ left: barLeft, width: barWidth }}
                            ></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{phylum.description}</p>
                      </div>
                    );
                  })}
                  <p className="text-xs text-gray-500 mt-4 border-t pt-2">
                    Deviation from healthy reference range shown as percentages (±25%)
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Alpha Diversity */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button 
            onClick={() => toggleSection('alphaDiversity')}
            className="w-full flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Alpha Diversity</h2>
            </div>
            {expandedSections.alphaDiversity ? 
              <ChevronDown className="h-4 w-4 text-gray-700" /> : 
              <ChevronRight className="h-4 w-4 text-gray-700" />
            }
          </button>

          {expandedSections.alphaDiversity && (
            <div className="space-y-4 mt-4 text-sm text-gray-700">
              <p>
                Alpha diversity measures the richness and evenness of species within your sample. 
                A balanced gut often shows moderate to high alpha diversity, indicating a stable and robust microbial ecosystem.
              </p>
              <p>
                Low alpha diversity could signal recent microbial losses due to antibiotics or poor diet. 
                Very high diversity can sometimes mean instability, as the microbiome may be shifting before finding equilibrium.
              </p>

              <div className="border rounded-lg p-4 bg-white shadow-sm justify-center">
                {/* Example bar comparison */}
                <div className="flex items-end gap-4 justify-center mb-4">
                  <div className="flex flex-col-reverse items-center">
                    <div className="w-8 bg-purple-500 h-32 rounded"></div>
                    <span className="text-xs text-gray-700 mt-1">Healthy Sample</span>
                  </div>
                  <div className="flex flex-col-reverse items-center">
                    <div className="w-8 bg-blue-500 h-36 rounded"></div>
                    <span className="text-xs text-gray-700 mt-1">Your Sample</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 text-center">
                  These bars represent Shannon Diversity Index values. Higher bars suggest greater diversity.
                </p>
              </div>

              <p>
                Monitoring alpha diversity over time can provide insights into how lifestyle changes 
                (e.g., diet, probiotics, exercise) affect the balance and resilience of your microbiome.
              </p>
            </div>
          )}
        </section>



        {/* Suggested Reading */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button 
            onClick={() => toggleSection('suggestedReading')}
            className="w-full flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-2">
              <Library className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Suggested Reading</h2>
            </div>
            {expandedSections.suggestedReading ? 
              <ChevronDown className="h-4 w-4 text-gray-700" /> : 
              <ChevronRight className="h-4 w-4 text-gray-700" />
            }
          </button>

          {expandedSections.suggestedReading && (
            <div className="space-y-3 mt-4 text-sm text-gray-700">
              {suggestedReadings.map((sr, idx) => (
                <div key={idx} className="border-l-2 border-blue-500 pl-2">
                  <div className="font-medium text-gray-900">{sr.title}</div>
                  <div className="text-xs text-gray-600">{sr.authors}</div>
                  <p className="mt-1 text-gray-700">{sr.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>


      </CardContent>
    </Card>
  );
};

export default PhylaAndDiversityAnalysis;
