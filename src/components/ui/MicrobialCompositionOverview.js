import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';  
import {
  ChevronDown, ChevronRight, Info, BarChart2, Circle, Link2,
  FileText, Layers, HelpCircle, Library, Globe2, BarChart, Flame
} from 'lucide-react';

// Chart.js + venn.js + d3
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Title,
  Legend,
  LineElement,
  ArcElement,
  Filler
} from 'chart.js';
import { Scatter, Bar, Line, Pie, Bubble } from 'react-chartjs-2';
import * as venn from 'venn.js';
import * as d3 from 'd3';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  ArcElement,
  Filler
);

// ------------------------------
// Chart Data and Configuration
// ------------------------------

// PCoA
const pcoaData = {
  datasets: [
    {
      label: 'Case',
      data: Array.from({ length: 50 }, () => ({ x: Math.random()*2 - 1, y: Math.random()*2 - 1 })),
      backgroundColor: 'rgba(255,99,132,0.7)',
    },
    {
      label: 'Control',
      data: Array.from({ length: 50 }, () => ({ x: Math.random()*2 - 1, y: Math.random()*2 - 1 })),
      backgroundColor: 'rgba(54,162,235,0.7)',
    },
  ],
};

const pcoaOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'PCoA Plot (Example)',
    },
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    x: {
      type: 'linear',
      title: { display: true, text: 'PCo1 (24.4%)' },
    },
    y: {
      type: 'linear',
      title: { display: true, text: 'PCo2 (13.1%)' },
    },
  },
};

// Original abundance data (Bar)
const abundanceData = {
  labels: ['Bacteroidetes', 'Firmicutes', 'Proteobacteria', 'Actinobacteria', 'Verrucomicrobia'],
  datasets: [
    {
      label: 'Relative Abundance (%)',
      data: [35, 30, 15, 12, 8],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
      ],
    },
  ],
};

const abundanceOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Relative Abundance of Major Phyla',
    },
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Abundance (%)' },
    },
  },
};

// Additional stacked bar chart: comparison across multiple samples
const stackedAbundanceData = {
  labels: ['Sample A', 'Sample B', 'Sample C', 'Sample D'],
  datasets: [
    {
      label: 'Bacteroidetes',
      data: [40, 30, 25, 35],
      backgroundColor: 'rgba(255, 99, 132, 0.7)',
    },
    {
      label: 'Firmicutes',
      data: [30, 35, 40, 32],
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
    },
    {
      label: 'Proteobacteria',
      data: [10, 15, 10, 12],
      backgroundColor: 'rgba(255, 206, 86, 0.7)',
    },
    {
      label: 'Actinobacteria',
      data: [15, 12, 18, 10],
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
    },
    {
      label: 'Verrucomicrobia',
      data: [5, 8, 7, 11],
      backgroundColor: 'rgba(153, 102, 255, 0.7)',
    },
  ],
};

const stackedAbundanceOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Comparative Taxonomic Profiles Across Multiple Samples',
    },
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    x: { stacked: true },
    y: {
      stacked: true,
      title: { display: true, text: 'Abundance (%)' },
      beginAtZero: true,
    },
  },
};

// Bubble chart data: abundance vs. diversity metric
const bubbleData = {
  datasets: [
    {
      label: 'Microbial Communities',
      data: [
        { x: 35, y: 4.2, r: 15, genus: 'Faecalibacterium' },
        { x: 30, y: 3.8, r: 10, genus: 'Bifidobacterium' },
        { x: 15, y: 4.5, r: 8, genus: 'Roseburia' },
        { x: 12, y: 3.5, r: 12, genus: 'Ruminococcus' },
        { x: 8, y: 4.0, r: 7, genus: 'Akkermansia' },
      ],
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
    },
  ],
};

const bubbleOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Abundance vs. Diversity of Select Genera',
    },
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const { genus } = context.raw;
          return `${genus}: Abundance=${context.raw.x}%, Diversity=${context.raw.y}`;
        },
      },
    },
  },
  scales: {
    x: {
      title: { display: true, text: 'Relative Abundance (%)' },
      beginAtZero: true,
    },
    y: {
      title: { display: true, text: 'Diversity (Shannon Index)' },
      beginAtZero: true,
    },
  },
};

// SCFA line chart data and options
const scfaTimeData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
  datasets: [
    {
      label: 'Acetate',
      data: [50, 55, 60, 58, 62],
      borderColor: 'rgba(255, 99, 132, 0.7)',
      fill: false,
    },
    {
      label: 'Propionate',
      data: [20, 22, 25, 23, 26],
      borderColor: 'rgba(54, 162, 235, 0.7)',
      fill: false,
    },
    {
      label: 'Butyrate',
      data: [15, 17, 18, 19, 20],
      borderColor: 'rgba(75, 192, 192, 0.7)',
      fill: false,
    },
  ],
};

const scfaTimeOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'SCFA Concentrations Over Time',
    },
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    x: {
      title: { display: true, text: 'Time (Weeks)' },
    },
    y: {
      title: { display: true, text: 'Concentration (μmol/g)' },
      beginAtZero: true,
    },
  },
};

// SCFA pie chart data
const scfaPieData = {
  labels: ['Acetate', 'Propionate', 'Butyrate'],
  datasets: [
    {
      data: [62, 26, 12],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(75, 192, 192, 0.7)',
      ],
    },
  ],
};

const scfaPieOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'SCFA Proportions',
    },
    legend: {
      position: 'bottom',
    },
  },
};

// Venn Diagram component
const VennDiagram = () => {
  const ref = useRef(null);

  useEffect(() => {
    const sets = [
      { sets: ['CRC1'], size: 40 },
      { sets: ['CRC2'], size: 21 },
      { sets: ['CRC3'], size: 36 },
      { sets: ['CRC4'], size: 6 },
      { sets: ['CRC5'], size: 5 },
      { sets: ['CRC6'], size: 11 },
      { sets: ['CRC7'], size: 10 },
      // Overlaps
      { sets: ['CRC1', 'CRC2'], size: 15 },
      { sets: ['CRC1', 'CRC3'], size: 10 },
      { sets: ['CRC2', 'CRC3'], size: 8 },
      { sets: ['CRC1', 'CRC2', 'CRC3'], size: 5 },
    ];

    const chart = venn.VennDiagram().width(300).height(300);
    d3.select(ref.current).datum(sets).call(chart);

    d3.select(ref.current)
      .selectAll('text')
      .style('fill', '#444')
      .style('font-size', '12px');
  }, []);

  return <div ref={ref} className="flex justify-center mt-4"></div>;
};

// -------------------------------------------
// Combined Page: Phyla + Composition Overview
// -------------------------------------------
const MicrobialCompositionOverview = () => {
  const [expandedSections, setExpandedSections] = useState({
    // Sections from "PhylaAndDiversityAnalysis"
    introduction: true,
    phylaOverview: false,
    alphaDiversity: false,
    references: false,
    glossary: false,
    suggestedReading: false,

    // Sections from "MicrobialCompositionOverview"
    compositionIntro: false,
    pcoa: false,
    venn: false,
    abundance: false,
    metabolism: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Helper from the first page
  const parsePositionValue = (pos) => {
    if (pos === 'Healthy') return 0;
    return parseFloat(pos);
  };

  // References + Glossary + Reading from the first page
  const references = [
    {
      id: 1,
      title: 'Human Microbiome Project Consortium',
      authors: 'Human Microbiome Project',
      journal: 'Nature',
      year: 2012,
      link: 'https://www.nature.com/articles/nature11209',
    },
    {
      id: 2,
      title: 'The Gut Microbiome and Its Role in Health and Disease',
      authors: 'Eckburg et al.',
      journal: 'Science',
      year: 2005,
      link: 'https://doi.org/10.1126/science.1117595',
    },
    {
      id: 3,
      title: 'Alpha diversity and the human gut microbiome',
      authors: 'Lloyd-Price et al.',
      journal: 'Nature Medicine',
      year: 2017,
      link: 'https://doi.org/10.1038/nm.4479',
    },
  ];

  const glossary = [
    {
      term: 'Phylum',
      definition:
        'A high-level classification rank grouping organisms that share a common evolutionary ancestor.',
    },
    {
      term: 'Dysbiosis',
      definition:
        'An imbalance in the microbial communities that can lead to health issues.',
    },
    {
      term: 'Alpha Diversity',
      definition:
        'A measure of the variety (richness) of species within a single sample or environment.',
    },
    {
      term: 'SCFA (Short-Chain Fatty Acids)',
      definition:
        'Beneficial compounds produced by gut bacteria that support gut health and metabolism.',
    },
    {
      term: 'Shannon Diversity Index',
      definition:
        'A metric used to measure species diversity, accounting for both abundance and evenness of species.',
    },
  ];

  const suggestedReadings = [
    {
      title:
        'The Good Gut: Taking Control of Your Weight, Your Mood, and Your Long-term Health',
      authors: 'Justin and Erica Sonnenburg',
      description:
        'A consumer-friendly book explaining how the microbiome influences health and how to support it.',
    },
    {
      title:
        'Missing Microbes: How the Overuse of Antibiotics Is Fueling Our Modern Plagues',
      authors: 'Martin J. Blaser',
      description:
        'Explores how changes in our microbiome due to antibiotic overuse affect various aspects of health.',
    },
    {
      title:
        'Gut: The Inside Story of Our Body’s Most Underrated Organ',
      authors: 'Giulia Enders',
      description:
        'A humorous yet informative look at gut function and microbial communities.',
    },
  ];

  // Phyla data from the first page
  const getRandomPosition = () => {
    const positions = ['-25%', '-12.5%', 'Healthy', '+12.5%', '+25%'];
    return positions[Math.floor(Math.random() * positions.length)];
  };

  const phylaData = [
    {
      name: 'Bacteroidota',
      color: 'bg-blue-500',
      position: getRandomPosition(),
      description: 'Primary carbohydrate degraders',
      subInfo: [
        'Produces beneficial short-chain fatty acids (SCFAs)',
        'Help break down complex plant polysaccharides',
        'Important for maintaining gut barrier function',
        'Key genera include Bacteroides and Prevotella',
      ],
    },
    {
      name: 'Firmicutes',
      color: 'bg-purple-500',
      position: getRandomPosition(),
      description: 'Energy harvest specialists',
      subInfo: [
        'Major butyrate producers for colon health',
        'Involved in bile acid metabolism',
        'Important for nutrient absorption',
        'Includes beneficial Lactobacillus and Clostridium clusters',
      ],
    },
    {
      name: 'Actinobacteriota',
      color: 'bg-orange-500',
      position: getRandomPosition(),
      description: 'Fiber metabolism experts',
      subInfo: [
        'Critical for infant gut development',
        'Produces vitamins and antimicrobial compounds',
        'Helps maintain immune system balance',
        'Notable genus Bifidobacterium aids in pathogen resistance',
      ],
    },
    {
      name: 'Proteobacteria',
      color: 'bg-teal-500',
      position: getRandomPosition(),
      description: 'Inflammation indicators',
      subInfo: [
        'Elevated levels may indicate gut inflammation',
        'Contains both beneficial and potentially harmful species',
        'Important for vitamin B12 synthesis',
        'Includes E. coli and other key metabolic contributors',
      ],
    },
    {
      name: 'Verrucomicrobiota',
      color: 'bg-green-500',
      position: getRandomPosition(),
      description: 'Gut barrier supporters',
      subInfo: [
        'Strengthens intestinal barrier integrity',
        'Key genus Akkermansia linked to metabolic health',
        'Helps regulate glucose metabolism',
        'May protect against obesity and inflammation',
      ],
    },
  ];

  return (
    <Card className="rounded-xl bg-gradient-to-br from-white via-orange-50 to-purple-100 shadow-xl border border-gray-200 border-t-4 border-t-orange-600">
      <CardHeader className="p-4">
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-6 w-6 text-gray-800" />
          <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent text-lg font-semibold">
            Detailed Microbiome Overview
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-6 space-y-6">


        {/* ----------------------------------
            2) Phyla Overview
        ---------------------------------- */}
        <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl">
          <button
            onClick={() => toggleSection('phylaOverview')}
            className="w-full flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Phyla Overview</h2>
            </div>
            {expandedSections.phylaOverview ? (
              <ChevronDown className="h-4 w-4 text-gray-700" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-700" />
            )}
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
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${phylum.color} mt-1 flex-shrink-0`}
                      ></span>
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
                <h3 className="font-medium text-gray-900 mb-2">
                  Relative Abundances & Dysbiosis Indicators
                </h3>
                <p className="mb-2">
                  Below is an example chart connecting each phylum’s color-coded indicator above to
                  its relative abundance compared to a healthy baseline.
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
                    const barLeft = val >= 0 ? '50%' : `${50 + ratio}%`;
                    const barWidth = Math.abs(ratio) + '%';
                    return (
                      <div key={i} className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-800 font-medium flex items-center gap-2">
                            <span
                              className={`inline-block w-3 h-3 rounded-full ${phylum.color}`}
                            ></span>
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

        {/* ----------------------------------
            3) Alpha Diversity
        ---------------------------------- */}
        <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl">
          <button
            onClick={() => toggleSection('alphaDiversity')}
            className="w-full flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Alpha Diversity</h2>
            </div>
            {expandedSections.alphaDiversity ? (
              <ChevronDown className="h-4 w-4 text-gray-700" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-700" />
            )}
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



        {/* 4.2) PCoA Scatter */}
        <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl">
          <button
            onClick={() => toggleSection('pcoa')}
            className="w-full flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">PCoA Ordination</h2>
            </div>
            {expandedSections.pcoa ? (
              <ChevronDown className="h-4 w-4 text-gray-700" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-700" />
            )}
          </button>
          {expandedSections.pcoa && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>
                Principal Coordinates Analysis (PCoA) provides a way to visualize similarities or differences
                in microbial communities across samples. Each point represents a sample; points closer
                together are more similar in community structure.
              </p>
              <div className="max-w-lg mx-auto">
                <Scatter data={pcoaData} options={pcoaOptions} />
              </div>
            </div>
          )}
        </section>

        {/* 4.3) Venn Diagram */}
        <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl">
          <button
            onClick={() => toggleSection('venn')}
            className="w-full flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Shared Features</h2>
            </div>
            {expandedSections.venn ? (
              <ChevronDown className="h-4 w-4 text-gray-700" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-700" />
            )}
          </button>
          {expandedSections.venn && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>
                Venn diagrams help visualize overlap in features (like shared taxa) between multiple studies or conditions.
                They highlight which sets of organisms are consistently found across different groups
                and which are unique to certain subsets.
              </p>
              <VennDiagram />
            </div>
          )}
        </section>

        {/* 4.4) Taxonomic Abundance */}
        <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl">
          <button
            onClick={() => toggleSection('abundance')}
            className="w-full flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Taxonomic Abundance</h2>
            </div>
            {expandedSections.abundance ? (
              <ChevronDown className="h-4 w-4 text-gray-700" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-700" />
            )}
          </button>
          {expandedSections.abundance && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>
                Understanding the composition of the gut microbiome at different taxonomic levels (from phyla down to species)
                provides insights into health and disease states. The charts below show various ways to represent taxonomic
                abundance data:
              </p>

              <h3 className="text-md font-medium mt-6">Major Phyla Composition</h3>
              <p>
                The bar chart below shows the relative abundance of major bacterial phyla in a typical healthy gut microbiome.
                These proportions can vary significantly in different health conditions.
              </p>
              <div className="max-w-lg mx-auto">
                <Bar data={abundanceData} options={abundanceOptions} />
              </div>

              <h3 className="text-md font-medium mt-6">Comparative Profiles Across Multiple Samples</h3>
              <p>
                Different individuals (or different conditions) can have distinctly patterned microbiota.
                The stacked bar chart shows how multiple phyla proportions compare across several sample groups,
                illustrating community shifts.
              </p>
              <div className="max-w-lg mx-auto">
                <Bar data={stackedAbundanceData} options={stackedAbundanceOptions} />
              </div>

              <h3 className="text-md font-medium mt-6">Abundance-Diversity Relationship</h3>
              <p>
                Microbial ecosystems can be assessed not just by raw abundance but also by diversity metrics.
                The bubble chart below plots relative abundance on one axis and a diversity measure
                (e.g., Shannon index) on the other. The size of each bubble may represent another attribute,
                such as the average cell density or another ecological parameter.
              </p>
              <div className="max-w-lg mx-auto">
                <Bubble data={bubbleData} options={bubbleOptions} />
              </div>

              <h3 className="text-md font-medium mt-6">Detailed Taxonomic Summary</h3>
              <p>
                A more detailed tabular view can complement these visualizations. Below is an extended table
                listing several taxa, their typical abundance ranges, and key ecological or host-health-related functions.
                Such tables help contextualize the roles these microbes play in the gut ecosystem.
              </p>

              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                        Taxon
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                        Level
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                        Typical Abundance (%)
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                        Key Functions / Associations
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">Bacteroidetes</td>
                      <td className="px-4 py-3">Phylum</td>
                      <td className="px-4 py-3">~30-40%</td>
                      <td className="px-4 py-3">
                        Polysaccharide metabolism, immune system modulation
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">Firmicutes</td>
                      <td className="px-4 py-3">Phylum</td>
                      <td className="px-4 py-3">~20-40%</td>
                      <td className="px-4 py-3">SCFA production, energy harvest</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">Faecalibacterium</td>
                      <td className="px-4 py-3">Genus (Firmicutes)</td>
                      <td className="px-4 py-3">~5-20%</td>
                      <td className="px-4 py-3">
                        Anti-inflammatory properties, butyrate production
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">Bifidobacterium</td>
                      <td className="px-4 py-3">Genus (Actinobacteria)</td>
                      <td className="px-4 py-3">~1-10%</td>
                      <td className="px-4 py-3">
                        Beneficial in infant gut, vitamin production
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">Akkermansia muciniphila</td>
                      <td className="px-4 py-3">Species (Verrucomicrobia)</td>
                      <td className="px-4 py-3">~1-5%</td>
                      <td className="px-4 py-3">
                        Mucus layer maintenance, metabolic health correlations
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* 4.5) Microbiome-Metabolism Effects */}
        <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl">
          <button
            onClick={() => toggleSection('metabolism')}
            className="w-full flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Microbiome & Metabolism</h2>
            </div>
            {expandedSections.metabolism ? (
              <ChevronDown className="h-4 w-4 text-gray-700" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-700" />
            )}
          </button>
          {expandedSections.metabolism && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>
                The gut microbiome significantly influences host metabolism through the production of
                metabolites like short-chain fatty acids (SCFAs). These SCFAs, including acetate,
                propionate, and butyrate, are produced via fermentation of dietary fibers and have
                various effects on host physiology.
              </p>
              <p>
                The line chart below illustrates how concentrations of SCFAs change over a period of
                dietary intervention, highlighting the dynamic nature of microbial metabolite production.
              </p>
              <div className="max-w-lg mx-auto">
                <Line data={scfaTimeData} options={scfaTimeOptions} />
              </div>
              <p>
                The pie chart presents the typical proportions of SCFAs in the gut, emphasizing acetate
                as the most abundant SCFA produced by microbial fermentation.
              </p>
              <div className="max-w-lg mx-auto">
                <Pie data={scfaPieData} options={scfaPieOptions} />
              </div>
              <p>
                Beyond SCFAs, gut microbes are involved in the transformation of bile acids. The conversion
                of primary bile acids to secondary bile acids by gut bacteria impacts lipid digestion
                and cholesterol metabolism. This interaction affects host metabolic pathways and
                energy homeostasis.
              </p>
            </div>
          )}
        </section>

        {/* ----------------------------------
            5) Suggested Reading (from first page)
        ---------------------------------- */}
        <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl">
          <button
            onClick={() => toggleSection('suggestedReading')}
            className="w-full flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-2">
              <Library className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Suggested Reading</h2>
            </div>
            {expandedSections.suggestedReading ? (
              <ChevronDown className="h-4 w-4 text-gray-700" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-700" />
            )}
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

        {/* (Optional) You could add references/glossary here in collapsible sections, too. */}
      </CardContent>
    </Card>
  );
};

export default MicrobialCompositionOverview;
