import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './Card';
import { 
  Leaf, 
  Heart,
  ChevronDown,
  ChevronUp,
  Apple,
  Shield,
  Microscope,
  FlaskConical, // Updated icon
  Info,
  ThumbsUp,
  Pill
} from 'lucide-react';

const commensalMicrobes = [
  {
    name: "Bifidobacterium",
    species: ["B. longum", "B. bifidum", "B. adolescentis"],
    description: "A key beneficial bacterium that helps in digestion and maintaining gut health. Particularly important in early life and continues to play crucial roles throughout adulthood.",
    abundance: "High",
    abundancePercentile: 85,
    detailedInfo: "Bifidobacterium species are among the first colonizers of the infant gut and remain important throughout life. They help prevent pathogen colonization, enhance barrier function, and modulate immune responses.",
    benefits: [
      "Produces vitamins B1, B2, B6, B12, and K",
      "Strengthens gut barrier function",
      "Supports immune system development",
      "Helps prevent pathogen colonization",
      "Reduces inflammation"
    ],
    dietaryPreferences: [
      "Human milk oligosaccharides",
      "Dietary fiber",
      "Resistant starch",
      "Inulin-rich foods",
      "Whole grains"
    ],
    healthImplications: [
      "May help prevent allergies",
      "Supports healthy weight management",
      "Could reduce risk of respiratory infections",
      "Associated with better mental health",
      "May improve vaccine response"
    ],
    optimizationTips: [
      "Consume prebiotic-rich foods",
      "Include fermented foods in diet",
      "Maintain regular sleep schedule",
      "Manage stress levels",
      "Exercise regularly"
    ]
  },
  {
    name: "Lactobacillus",
    species: ["L. acidophilus", "L. rhamnosus", "L. plantarum"],
    description: "A versatile probiotic genus known for its role in fermenting foods and producing lactic acid, which helps maintain gut pH balance and inhibit harmful bacteria.",
    abundance: "Moderate",
    abundancePercentile: 65,
    detailedInfo: "Lactobacilli are essential for maintaining vaginal and gut health. They produce antimicrobial compounds and help modulate the immune system while supporting nutrient absorption.",
    benefits: [
      "Produces natural antibiotics",
      "Helps maintain vaginal health",
      "Supports nutrient absorption",
      "Aids in lactose digestion",
      "Produces short-chain fatty acids"
    ],
    dietaryPreferences: [
      "Fermented dairy products",
      "Vegetables and fruits",
      "Complex carbohydrates",
      "Dietary fiber",
      "Polyphenol-rich foods"
    ],
    healthImplications: [
      "May reduce antibiotic-associated diarrhea",
      "Could help prevent urinary tract infections",
      "Supports oral health",
      "May improve iron absorption",
      "Could reduce cholesterol levels"
    ],
    optimizationTips: [
      "Include yogurt and kefir in diet",
      "Eat plenty of vegetables",
      "Stay hydrated",
      "Limit processed foods",
      "Consider probiotic supplementation"
    ]
  },
  {
    name: "Faecalibacterium prausnitzii",
    species: ["F. prausnitzii"],
    description: "One of the most abundant and important butyrate-producing bacteria in the human gut, crucial for colon health and anti-inflammatory effects.",
    abundance: "Low",
    abundancePercentile: 35,
    detailedInfo: "F. prausnitzii is a major butyrate producer that helps maintain gut barrier integrity and has anti-inflammatory properties. Low levels are associated with various inflammatory conditions.",
    benefits: [
      "Major butyrate producer",
      "Strong anti-inflammatory effects",
      "Strengthens gut barrier",
      "Regulates immune responses",
      "Supports metabolic health"
    ],
    dietaryPreferences: [
      "High-fiber foods",
      "Pectin-rich fruits",
      "Resistant starch",
      "Wheat bran",
      "Legumes"
    ],
    healthImplications: [
      "May protect against inflammatory bowel disease",
      "Could help prevent colorectal cancer",
      "Associated with better metabolic health",
      "May reduce inflammation",
      "Supports healthy aging"
    ],
    optimizationTips: [
      "Increase dietary fiber intake",
      "Eat more plant-based foods",
      "Include resistant starch",
      "Reduce processed food consumption",
      "Manage inflammatory conditions"
    ]
  },
  {
    name: "Akkermansia muciniphila",
    species: ["A. muciniphila"],
    description: "A mucin-degrading bacterium that helps maintain gut barrier integrity and is associated with metabolic health.",
    abundance: "Moderate",
    abundancePercentile: 55,
    detailedInfo: "A. muciniphila is a key member of the gut microbiota that lives in the mucus layer of the intestine. It's associated with better metabolic health and reduced inflammation.",
    benefits: [
      "Strengthens gut barrier",
      "Supports metabolic health",
      "Helps regulate glucose metabolism",
      "Reduces inflammation",
      "May aid in weight management"
    ],
    dietaryPreferences: [
      "Cranberries",
      "Pomegranate",
      "Green tea",
      "Dietary fiber",
      "Polyphenol-rich foods"
    ],
    healthImplications: [
      "Associated with better metabolic health",
      "May help prevent obesity",
      "Could reduce risk of type 2 diabetes",
      "Supports healthy aging",
      "May improve exercise capacity"
    ],
    optimizationTips: [
      "Include polyphenol-rich foods",
      "Exercise regularly",
      "Maintain healthy weight",
      "Consider intermittent fasting",
      "Reduce simple sugar intake"
    ]
  }
];

const AbundanceIndicator = ({ percentage }) => {
  const getGradientClass = (percent) => {
    if (percent >= 80) return "bg-gradient-to-r from-green-400 to-green-600";
    if (percent >= 60) return "bg-gradient-to-r from-teal-400 to-teal-600";
    if (percent >= 40) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (percent >= 20) return "bg-gradient-to-r from-orange-400 to-orange-600";
    return "bg-gradient-to-r from-red-400 to-red-600";
  };

  return (
    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`absolute left-0 top-0 h-full ${getGradientClass(percentage)} transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      />
      <div className="absolute right-2 top-0 text-xs font-medium text-gray-700 leading-4">
        {percentage}th percentile
      </div>
    </div>
  );
};

const MicrobeCard = ({ microbe }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-green-600" /> {/* Updated icon */}
            <span className="font-semibold text-green-800">{microbe.name}</span>
          </div>
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-2">{microbe.description}</p>
        <div className="mt-2">
          <AbundanceIndicator percentage={microbe.abundancePercentile} />
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="mt-4 space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Microscope className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Scientific Details</span>
              </div>
              <p className="text-sm text-blue-800">{microbe.detailedInfo}</p>
              <div className="mt-2 text-sm text-blue-800">
                <strong>Species detected: </strong>
                {microbe.species.join(", ")}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Key Benefits</span>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {microbe.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Apple className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Dietary Preferences</span>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {microbe.dietaryPreferences.map((food, idx) => (
                    <li key={idx}>{food}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Health Implications</span>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {microbe.healthImplications.map((implication, idx) => (
                    <li key={idx}>{implication}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Optimization Tips</span>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {microbe.optimizationTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CommensalMicrobeDetection = () => {
  return (
    <Card className="rounded-xl bg-gradient-to-br from-white to-emerald-50 shadow-xl border border-gray-200 border-t-4 border-t-emerald-600 shadow-xl">
      <CardHeader className="p-4">
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-gray-800 text-xl">
            Beneficial Microbe Analysis
          </span>
        </CardTitle>
        <CardDescription className="text-gray-600">
          Detailed analysis of beneficial microbes detected in your gut microbiome.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-6 space-y-6">
        <div className="bg-white p-4 rounded-lg border border-green-100 shadow-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="space-y-2">
              <p className="text-gray-700 text-sm leading-relaxed">
                Your microbiome analysis has identified several beneficial (commensal) bacteria that support your gut health. These microbes play crucial roles in digestion, immunity, and overall well-being.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Click on each microbe to learn more about its functions, benefits, and how to optimize its abundance through diet and lifestyle changes.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {commensalMicrobes.map((microbe, index) => (
            <MicrobeCard key={index} microbe={microbe} />
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Pill className="h-5 w-5 text-emerald-600" />
            <span className="font-medium text-emerald-800">Recommendations for Optimal Microbiome Health</span>
          </div>
          <div className="space-y-2 text-sm text-gray-800">
            <p>
              1. <strong>Diverse Diet:</strong> Include a wide variety of plant-based foods to support microbial diversity.
            </p>
            <p>
              2. <strong>Fermented Foods:</strong> Regularly consume fermented foods like yogurt, kefir, and sauerkraut.
            </p>
            <p>
              3. <strong>Fiber Intake:</strong> Aim for 25-35g of fiber daily from various sources.
            </p>
            <p>
              4. <strong>Lifestyle Factors:</strong> Maintain regular exercise, manage stress, and ensure quality sleep.
            </p>
            <p>
              5. <strong>Regular Monitoring:</strong> Consider periodic microbiome testing to track changes and optimize interventions.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommensalMicrobeDetection;