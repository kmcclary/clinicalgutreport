import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import {
  AlertCircle,
  Microscope,
  Timer,
  Utensils,
  ThermometerSun,
  HeartPulse,
  Pill,
  ChefHat,
  Info,
  ChevronDown,
  ChevronUp,
  Bug
} from 'lucide-react';

const expandedPathogenData = [
  {
    name: "Salmonella",
    severity: "low",
    description: "Detected at low levels. Salmonella is a common bacterial pathogen often transmitted through contaminated food or water. Even at low levels, it may cause mild to moderate gastrointestinal issues.",
    detailedInfo: "Salmonella infection (salmonellosis) is one of the most common foodborne illnesses. While healthy adults usually recover within a few days without specific treatment, certain populations may be at higher risk for severe complications.",
    commonSources: [
      "Raw or undercooked eggs",
      "Poultry and meat products",
      "Unpasteurized dairy products",
      "Raw fruits and vegetables"
    ],
    symptoms: [
      "Diarrhea",
      "Abdominal cramps",
      "Fever (38-39°C)",
      "Nausea",
      "Vomiting",
      "Headache"
    ],
    preventionTips: [
      "Cook foods thoroughly",
      "Avoid cross-contamination",
      "Practice proper hand hygiene",
      "Keep perishables refrigerated"
    ],
    incubationPeriod: "6-72 hours",
    duration: "4-7 days",
    riskLevel: "Moderate"
  },
  {
    name: "E. coli",
    severity: "moderate",
    description: "Detected at moderate levels. While some E. coli strains are normal gut inhabitants, elevated levels may indicate potential issues requiring attention.",
    detailedInfo: "Escherichia coli (E. coli) encompasses various strains, some beneficial and others harmful. Pathogenic strains can cause significant gastrointestinal distress and other complications.",
    commonSources: [
      "Undercooked ground beef",
      "Contaminated water",
      "Raw vegetables",
      "Unpasteurized milk"
    ],
    symptoms: [
      "Severe abdominal cramping",
      "Bloody diarrhea",
      "Vomiting",
      "Mild fever",
      "Fatigue",
      "Loss of appetite"
    ],
    preventionTips: [
      "Cook ground beef to 71°C (160°F)",
      "Wash fruits and vegetables thoroughly",
      "Avoid unpasteurized dairy products",
      "Use separate cutting boards"
    ],
    incubationPeriod: "3-4 days",
    duration: "5-10 days",
    riskLevel: "High"
  },
  {
    name: "Candida",
    severity: "low",
    description: "Detected at low levels. Candida is a type of yeast naturally present in the gut, but elevated levels may indicate an imbalance in the microbiome.",
    detailedInfo: "While Candida is a normal part of gut flora, overgrowth can lead to various health issues. Managing diet and lifestyle factors can help maintain proper balance.",
    commonSources: [
      "High-sugar diet",
      "Frequent antibiotic use",
      "Weakened immune system",
      "Hormonal imbalances"
    ],
    symptoms: [
      "Digestive issues",
      "Fatigue",
      "Brain fog",
      "Sugar cravings",
      "Oral thrush",
      "Skin issues"
    ],
    preventionTips: [
      "Limit refined sugars and carbs",
      "Take probiotics",
      "Manage stress levels",
      "Support immune function"
    ],
    incubationPeriod: "Variable",
    duration: "Depends on treatment",
    riskLevel: "Low"
  }
];

// Color-coded badge for pathogen severity
const SeverityBadge = ({ severity }) => {
  const colors = {
    low: "bg-yellow-100 text-yellow-800 border-yellow-200",
    moderate: "bg-orange-100 text-orange-800 border-orange-200",
    high: "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[severity]}`}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)} Risk
    </span>
  );
};

const PathogenCard = ({ pathogen }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl">
      {/* Card Header (clickable) */}
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-red-600" />
            <span className="text-red-700 font-semibold">
              {pathogen.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <SeverityBadge severity={pathogen.severity} />
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>
        <p className="text-sm text-gray-700">
          {pathogen.description}
        </p>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="mt-4 space-y-4">
            {/* Detailed Information */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Microscope className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">
                  Detailed Information
                </span>
              </div>
              <p className="text-sm text-blue-800">
                {pathogen.detailedInfo}
              </p>
            </div>

            {/* Common Sources & Symptoms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Common Sources */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Common Sources</span>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {pathogen.commonSources.map((source, idx) => (
                    <li key={idx}>{source}</li>
                  ))}
                </ul>
              </div>

              {/* Symptoms */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Symptoms</span>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {pathogen.symptoms.map((symptom, idx) => (
                    <li key={idx}>{symptom}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Prevention Tips */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <ChefHat className="h-4 w-4 text-gray-600" />
                <span className="font-medium">Prevention Tips</span>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {pathogen.preventionTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Incubation, Duration, Risk Level */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              {/* Incubation Period */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-gray-700">
                  <Timer className="h-4 w-4" />
                  <span>Incubation Period</span>
                </div>
                <p className="mt-1 font-medium">
                  {pathogen.incubationPeriod}
                </p>
              </div>

              {/* Duration */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-gray-700">
                  <ThermometerSun className="h-4 w-4" />
                  <span>Duration</span>
                </div>
                <p className="mt-1 font-medium">{pathogen.duration}</p>
              </div>

              {/* Risk Level */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-gray-700">
                  <AlertCircle className="h-4 w-4" />
                  <span>Risk Level</span>
                </div>
                <p className="mt-1 font-medium">{pathogen.riskLevel}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PathogenDetection = () => {
  if (!expandedPathogenData || expandedPathogenData.length === 0) {
    return null;
  }

  return (
    <Card className="rounded-xl bg-gradient-to-br from-white to-red-50 shadow-xl border border-gray-200 border-t-4 border-t-red-600 shadow-xl">
      <CardHeader className="p-4">
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-red-600" />
          <span className="text-gray-800 text-xl">
            Potential Pathogens Detected
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-6 space-y-6">
        {/* Intro Box */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="space-y-2">
              <p className="text-gray-700 text-sm leading-relaxed">
                Your gut microbiome analysis has identified potential pathogens 
                that may affect your digestive health. While their presence 
                doesn't always indicate active infection, understanding these 
                findings can help maintain optimal gut health.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Click on each pathogen below to learn more about its potential 
                impact, prevention strategies, and recommended actions.
              </p>
            </div>
          </div>
        </div>

        {/* Pathogen Cards */}
        <div className="space-y-4">
          {expandedPathogenData.map((pathogen, index) => (
            <PathogenCard key={index} pathogen={pathogen} />
          ))}
        </div>

        {/* General Recommended Actions */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Pill className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">
              Recommended Actions
            </span>
          </div>
          <div className="space-y-2 text-sm text-gray-800">
            <p>
              1. <strong>Monitor Symptoms:</strong> Keep track of any digestive
              issues or changes in your health.
            </p>
            <p>
              2. <strong>Dietary Adjustments:</strong> Focus on whole foods,
              fermented products, and proper food handling.
            </p>
            <p>
              3. <strong>Seek Professional Guidance:</strong> Consider
              consulting a healthcare provider for personalized advice.
            </p>
            <p>
              4. <strong>Follow-up Testing:</strong> Regular monitoring can help
              track improvements in your gut health.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PathogenDetection;
