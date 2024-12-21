import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './Card';
import { 
  Info, 
  Smile, 
  AlertTriangle, 
  CheckCircle2,
  ChevronDown, 
  ChevronRight,
  FlaskConical, // Replace Bacteria with FlaskConical
  TrendingUp,
  TrendingDown,
  ArrowUpCircle,
  ArrowDownCircle,
  HeartPulse,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';

/**
 * Props:
 *   beneficialMicrobes: array of objects { name: string, abundance: number } 
 *   opportunisticMicrobes: array of objects { name: string, abundance: number }
 *   dysbiosisIndex: number
 * 
 * Example usage:
 * <GutMicrobiotaComposition 
 *    beneficialMicrobes={[
 *      { name: 'Bifidobacterium longum', abundance: 15 },
 *      { name: 'Lactobacillus acidophilus', abundance: 12 },
 *    ]}
 *    opportunisticMicrobes={[
 *      { name: 'Escherichia coli (pathogenic strain)', abundance: 5 },
 *      { name: 'Clostridioides difficile', abundance: 3 },
 *    ]}
 *    dysbiosisIndex={2.5}
 * />
 */

const GutMicrobiotaComposition = ({
  beneficialMicrobes = [],
  opportunisticMicrobes = [],
  dysbiosisIndex = 0
}) => {

  /**
   * For demonstration, you may want to categorize
   * dysbiosis severity based on the index value:
   *   - 0 to 1: Low Dysbiosis (balanced)
   *   - 1.1 to 2: Moderate Dysbiosis
   *   - 2.1+: High Dysbiosis
   */
  const getDysbiosisCategory = (index) => {
    if (index <= 1) return { label: 'Low Dysbiosis', color: 'text-green-600', icon: CheckCircle2 };
    if (index <= 2) return { label: 'Moderate Dysbiosis', color: 'text-yellow-600', icon: AlertTriangle };
    return { label: 'High Dysbiosis', color: 'text-red-600', icon: ShieldAlert };
  };

  const dysbiosisCategory = getDysbiosisCategory(dysbiosisIndex);

  // A helper to render a relative abundance bar
  const renderAbundanceBar = (abundance) => {
    const maxAbundance = 30;
    const percentage = Math.min((abundance / maxAbundance) * 100, 100);

    const gradientClass = 
      percentage < 33 
        ? 'bg-gradient-to-r from-orange-400 to-rose-600' 
        : percentage < 67 
            ? 'bg-gradient-to-r from-teal-400 to-teal-600'
            : 'bg-gradient-to-r from-red-400 to-red-600'; 



    return (
      <div className="relative w-full h-3 rounded-full overflow-hidden bg-gray-200">
        <div 
          className={`${gradientClass} h-full absolute left-0 top-0`} 
          style={{width: `${percentage}%`}}
        />
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 font-semibold">
        </span>
      </div>
    );
  };

  const renderDysbiosisMeter = (label, value, gradientClass) => {
    const percentage = Math.min((value / 10) * 100, 100);

    return (
      <div className="space-y-1">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-800 font-medium">{label}</span>
          <span className="text-xs text-gray-500">{value.toFixed(1)}</span>
        </div>
        <div className="relative w-full h-3 rounded-full overflow-hidden bg-gray-200">
          <div 
            className={`${gradientClass} h-full absolute left-0 top-0`} 
            style={{width: `${percentage}%`}}
          />
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-white via-white to-teal-50 border-t-4 border-t-teal-600 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <FlaskConical className="h-5 w-5 text-teal-500" /> {/* Replace Bacteria with FlaskConical */}
          Key Findings
        </CardTitle>
        <CardDescription>
          Overview of Beneficial vs. Opportunistic Bacteria and Dysbiosis Level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">

          {/* Beneficial Microbes */}
          <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Smile className="h-5 w-5 text-teal-500" />
              <h3 className="font-semibold text-gray-800 text-base">
                Beneficial Microbes
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              These microbes often contribute to short-chain fatty acid production, 
              support gut barrier function, and help regulate the immune system.
            </p>

            <div className="space-y-4">
              {beneficialMicrobes.length === 0 && (
                <p className="text-gray-500 text-sm italic">
                  No beneficial microbes listed.
                </p>
              )}

              {beneficialMicrobes.map((microbe, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-800 font-medium">
                      {microbe.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {microbe.abundance}% of sample
                    </span>
                  </div>
                  <div className="mt-1">
                    {renderAbundanceBar(microbe.abundance)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunistic Microbes */}
          <div className="bg-white p-4 border border-gray-100 rounded-md shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-rose-500" />
              <h3 className="font-semibold text-gray-800 text-base">
                Opportunistic Microbes
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              These species can become harmful under certain conditions (e.g., stress, 
              antibiotics usage, low beneficial competitors). In elevated amounts, they 
              may contribute to gut inflammation and dysbiosis.
            </p>

            <div className="space-y-4">
              {opportunisticMicrobes.length === 0 && (
                <p className="text-gray-500 text-sm italic">
                  No opportunistic microbes listed.
                </p>
              )}

              {opportunisticMicrobes.map((microbe, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-800 font-medium">
                      {microbe.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {microbe.abundance}% of sample
                    </span>
                  </div>
                  <div className="mt-1">
                    {renderAbundanceBar(microbe.abundance)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dysbiosis Index */}
          <div className="bg-white p-4 border border-gray-100 rounded-md shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <HeartPulse className="h-5 w-5 text-purple-800" />
              <h3 className="font-semibold text-gray-800 text-base">
                Dysbiosis Index
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              This index indicates the balance of beneficial vs. opportunistic microbes.
              A higher value can suggest a greater degree of imbalance in your gut ecosystem.
            </p>

            <div className="flex items-center justify-center my-4">
              {/* Circle & label wrapper */}
              <div className="flex flex-col items-center">
                {/* Show a big, stylized number or gauge */}
                <div className="rounded-full bg-gray-50 border border-gray-300 p-6 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-800">
                    {dysbiosisIndex.toFixed(2)}
                  </span>
                </div>
                {/* Category Label & Icon (now below the circle) */}
                <div className="mt-2 flex items-center gap-1">
                  {React.createElement(dysbiosisCategory.icon, {
                    className: `h-5 w-5 ${dysbiosisCategory.color}`
                  })}
                  <span className={`text-sm font-semibold ${dysbiosisCategory.color}`}>
                    {dysbiosisCategory.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Meters */}
            <div className="space-y-4">
              {renderDysbiosisMeter('Beneficial Microbes', 3.0, 'bg-gradient-to-r from-teal-400 to-green-600')}
              {renderDysbiosisMeter('Opportunistic Microbes', 6.5, 'bg-gradient-to-r from-orange-400 to-red-600')}
              {renderDysbiosisMeter('Overall Balance', dysbiosisIndex, 'bg-gradient-to-r from-orange-200 to-yellow-600')}
            </div>

            <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-800 border border-gray-200 shadow-lg mt-4">
              <strong>Interpretation Tip:</strong> 
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <span className="font-medium">Low Dysbiosis (0 - 1)</span>: Suggests a mostly balanced microbiome.
                </li>
                <li>
                  <span className="font-medium">Moderate Dysbiosis (1 - 2)</span>: Some imbalance in microbial populations.
                </li>
                <li>
                  <span className="font-medium">High Dysbiosis (2+)</span>: Strong imbalance, potential for inflammatory issues or compromised gut function.
                </li>
              </ul>
            </div>
          </div>

          {/* Intro / Explanation */}
          <div className="bg-white p-4 border border-gray-100 rounded-md shadow-lg text-sm text-gray-700 space-y-2">
            <div className="flex items-start gap-2 mb-2">
              <Info className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-0.5" />
              <p>
                The gut microbiota is a complex ecosystem comprising both{" "}
                <strong>beneficial</strong> and <strong>opportunistic</strong> organisms.
                A balanced microbiota (low dysbiosis) generally supports digestion, nutrient
                synthesis, immune function, and overall health. An imbalance (high dysbiosis)
                may contribute to various health issues, including inflammation and metabolic
                disturbances.
              </p>
            </div>
            <p>
              The dysbiosis index is a simple metric to gauge the relative abundance of
              beneficial vs. opportunistic microbes. It can help guide dietary, lifestyle,
              and probiotic choices to restore balance and promote gut health.
            </p>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default GutMicrobiotaComposition;
