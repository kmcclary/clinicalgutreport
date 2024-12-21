import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './Card';
import {
  Flame,
  TrendingUp,
  Beaker,
  Check,
  AlertCircle,
  ArrowRight,
  Clock,
  BookOpen,
  TreePine
} from 'lucide-react';

const RecommendedProbioticsSection = () => {
  const [selectedProbiotic, setSelectedProbiotic] = useState(null);
  const [priorityFilter, /* setPriorityFilter */] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [selectedRecentProbiotic, setSelectedRecentProbiotic] = useState(null);

  /**
   * Example data for recommended probiotic strains, each including
   * - impactOnDysbiosis
   * - impactOnEubiosis
   * - potentialPathogenReduction
   * ...plus all the usual fields (description, references, etc.)
   */
  const probioticData = {
    recommendedProbiotics: [
      {
        id: 1,
        name: "Lactobacillus rhamnosus GG",
        points: 2,
        priority: "High",
        impact: [
          "Helps maintain a stable gut lining",
          "Produces lactic acid to inhibit harmful bacteria"
        ],
        impactOnDysbiosis:
          "Can significantly lower dysbiosis by reducing intestinal pH, discouraging opportunistic microbes.",
        impactOnEubiosis:
          "Promotes a balanced ecosystem by supporting other beneficial bacteria like Bifidobacteria.",
        potentialPathogenReduction: ["E. coli", "Salmonella"],
        description:
          "L. rhamnosus GG is one of the most studied probiotic strains for GI health, known to reduce diarrhea and enhance the gut barrier.",
        scientificContext: {
          keyFindings: [
            "Improves gut barrier integrity",
            "Shown to alleviate antibiotic-associated diarrhea"
          ],
          impactFactor: 5,
          references: [
            {
              doi: "10.1038/ajg.2016.304",
              key_point: "Demonstrated efficacy for gastrointestinal symptoms and dysbiosis prevention"
            }
          ]
        },
        implementation: [
          "Take 1-2 capsules (≥10^9 CFU each) daily or as directed",
          "Consider combining with prebiotic fiber for synergy",
          "Store in a cool, dry place to maintain viability",
          "Continue use for at least 4-6 weeks"
        ],
        timeframe: "2-4 weeks for initial noticeable improvements"
      },
      {
        id: 2,
        name: "Bifidobacterium longum",
        points: 1,
        priority: "Medium",
        impact: [
          "Produces short-chain fatty acids (SCFAs)",
          "Supports healthy bowel movements"
        ],
        impactOnDysbiosis:
          "Moderate dysbiosis reduction by helping crowd out gas-producing, harmful microbes.",
        impactOnEubiosis:
          "A key component in healthy infant and adult guts, it fosters a stable, well-balanced microbiome.",
        potentialPathogenReduction: ["Clostridium perfringens"],
        description:
          "B. longum is known for its ability to ferment complex carbohydrates into SCFAs, improving gut pH and limiting pathogenic overgrowth.",
        scientificContext: {
          keyFindings: [
            "Associated with reduced intestinal inflammation",
            "May assist in alleviating IBS symptoms"
          ],
          impactFactor: 4,
          references: [
            {
              doi: "10.1128/AEM.03055-09",
              key_point: "B. longum shows strong colonization and immunomodulatory effects"
            }
          ]
        },
        implementation: [
          "Take 1 capsule (≥10^8–10^9 CFU) daily with a meal",
          "Combine with other Bifidobacterium strains for broader coverage",
          "Aim to include dietary fibers to enhance colonization",
          "Track GI symptoms for best dosing"
        ],
        timeframe: "3-4 weeks for sustained benefits"
      },
      {
        id: 3,
        name: "Saccharomyces boulardii",
        points: 1,
        priority: "Medium",
        impact: [
          "Reduces toxin impact from certain pathogens",
          "Balances gut microflora after antibiotic use"
        ],
        impactOnDysbiosis:
          "Helps prevent or correct microbiome disruption, especially in antibiotic-associated scenarios.",
        impactOnEubiosis:
          "Promotes a faster return to baseline healthy gut flora after stress or infection.",
        potentialPathogenReduction: ["Clostridioides difficile"],
        description:
          "A probiotic yeast effective against diarrhea, often recommended to mitigate antibiotic or travel-induced gut imbalances.",
        scientificContext: {
          keyFindings: [
            "Shown to prevent C. difficile-associated diarrhea",
            "May reduce inflammation in the gut lining"
          ],
          impactFactor: 3,
          references: [
            {
              doi: "10.1007/s00384-021-03924-7",
              key_point:
                "S. boulardii is widely used for its anti-toxin and immune-modulating properties"
            }
          ]
        },
        implementation: [
          "Take 1-2 capsules (≥5x10^9 CFU) daily, especially during/after antibiotics",
          "Stable at room temperature, but avoid extreme heat",
          "Hydrate adequately to support gut function",
          "Consider short-term use (2-4 weeks) or longer if recurrent issues"
        ],
        timeframe: "1-2 weeks for acute changes; longer for full rebalancing"
      },
      {
        id: 4,
        name: "Lactobacillus plantarum",
        points: 0.5,
        priority: "Low",
        impact: [
          "Produces antimicrobial substances targeting pathogens",
          "Supports intestinal barrier function"
        ],
        impactOnDysbiosis:
          "Offers a minor but notable improvement against harmful bacterial overgrowth when used consistently.",
        impactOnEubiosis:
          "Assists in achieving a balanced microbial community via lactic acid production.",
        potentialPathogenReduction: ["Staphylococcus aureus"],
        description:
          "L. plantarum is found in many fermented foods (e.g., sauerkraut) and helps maintain gut pH and mucosal integrity.",
        scientificContext: {
          keyFindings: [
            "Shown to reduce GI infection rates in some studies",
            "Can produce bacteriocins that inhibit specific pathogens"
          ],
          impactFactor: 2,
          references: [
            {
              doi: "10.1093/femsre/fuy034",
              key_point: "L. plantarum demonstrates broad-spectrum antimicrobial activity in vitro"
            }
          ]
        },
        implementation: [
          "Consume 1 capsule (≥10^8 CFU) daily or consume fermented veggies",
          "Store probiotics in the fridge if possible",
          "Combine with a balanced diet for best outcomes",
          "Track improvements in GI comfort"
        ],
        timeframe: "2-3 weeks for moderate benefits"
      }
    ],
    past_probiotic_use: [
      {
        action: "Lactobacillus acidophilus supplement",
        points: 12,
        completions: 6,
        impact: "Helped curb mild dysbiosis; moderate eubiosis improvements",
        timeframe: "Used consistently for 4 weeks",
        details: {
          overview:
            "Took one daily capsule of L. acidophilus (1x10^9 CFU) to address post-antibiotic gut imbalance.",
          improvements: [
            "Reduced bloating and flatulence",
            "Noticed more regular bowel movements",
            "Less GI discomfort"
          ],
          references: [
            {
              doi: "10.1016/j.ijfoodmicro.2018.05.015",
              note:
                "L. acidophilus widely recognized for supporting gut balance and relieving common GI issues"
            }
          ],
          completionTimeline: [
            { week: 1, completions: 2 },
            { week: 2, completions: 1 },
            { week: 3, completions: 1 },
            { week: 4, completions: 2 }
          ]
        }
      },
      {
        action: "Multi-strain probiotic blend",
        points: 16,
        completions: 8,
        impact: "Strong eubiosis support; reduced IBS-like symptoms",
        timeframe: "Maintained over 6 weeks",
        details: {
          overview:
            "Blend included Bifidobacterium, Lactobacillus, and Streptococcus thermophilus. Noticed significant improvements in GI regularity.",
          improvements: [
            "Fewer IBS-related complaints",
            "Enhanced stool consistency",
            "Less urgent bowel movements"
          ],
          references: [
            {
              doi: "10.1007/s00394-020-02417-y",
              note:
                "Multi-strain probiotics can offer synergistic benefits, improving GI outcomes in IBS patients."
            }
          ],
          completionTimeline: [
            { week: 1, completions: 2 },
            { week: 2, completions: 2 },
            { week: 3, completions: 1 },
            { week: 4, completions: 1 },
            { week: 5, completions: 1 },
            { week: 6, completions: 1 }
          ]
        }
      }
    ]
  };

  // Filter by priority if needed
  const filteredProbiotics =
    priorityFilter === 'all'
      ? probioticData.recommendedProbiotics
      : probioticData.recommendedProbiotics.filter(
          (rec) => rec.priority.toLowerCase() === priorityFilter.toLowerCase()
        );

  // Decide whether to show all or just a subset
  const displayedProbiotics = showAll
    ? filteredProbiotics
    : filteredProbiotics.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Recommended Probiotics Card */}
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-white to-purple-50 border-t-4 border-t-purple-600 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TreePine className="h-5 w-5 text-purple-500" />
              <span className="text-gray-800 text-xl">
                Probiotics Recommendations
              </span>
            </CardTitle>
            <CardDescription>
              Strains chosen to address dysbiosis, bolster eubiosis, and reduce pathogens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {displayedProbiotics.map((probiotic) => (
                <div key={probiotic.id}>
                  <div
                    className={`p-4 rounded-lg border transition-all cursor-pointer shadow-sm hover:shadow-md
                      ${
                        selectedProbiotic === probiotic.id
                          ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
                          : 'bg-gradient-to-br from-gray-50 to-white border-purple-200 hover:from-gray-100 hover:to-white'
                      }`}
                    onClick={() =>
                      setSelectedProbiotic(
                        selectedProbiotic === probiotic.id ? null : probiotic.id
                      )
                    }
                  >
                    {/* Probiotic Header */}
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium flex items-center gap-2">
                          {probiotic.name}
                          <span
                            className={`px-2 py-1 rounded-full text-xs
                            ${
                              probiotic.priority === 'High'
                                ? 'bg-red-100 text-red-700'
                                : probiotic.priority === 'Medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {probiotic.priority}
                          </span>
                        </h3>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-purple-700">
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {probiotic.description}
                    </p>

                    {/* Expanded Content */}
                    {selectedProbiotic === probiotic.id && (
                      <div className="mt-4 space-y-4 border-t pt-4">
                        {/* Dysbiosis, Eubiosis, and Pathogens */}
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                            Microbial Balance
                          </h4>
                          <div className="ml-6 text-sm space-y-2 text-gray-700">
                            <p>
                              <strong>Impact on Dysbiosis:</strong>{" "}
                              {probiotic.impactOnDysbiosis || "—"}
                            </p>
                            <p>
                              <strong>Impact on Eubiosis:</strong>{" "}
                              {probiotic.impactOnEubiosis || "—"}
                            </p>
                            {probiotic.potentialPathogenReduction &&
                              probiotic.potentialPathogenReduction.length > 0 && (
                                <p>
                                  <strong>Potential Pathogen Reduction:</strong>{" "}
                                  {probiotic.potentialPathogenReduction.join(", ")}
                                </p>
                              )}
                          </div>
                        </div>

                        {/* Specific Probiotic Impact */}
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                            Specific Effects
                          </h4>
                          <ul className="ml-6 space-y-1">
                            {probiotic.impact.map((impactItem, idx) => (
                              <li key={idx} className="text-sm flex items-center gap-2">
                                <ArrowRight className="h-3 w-3 text-gray-400" />
                                {impactItem}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Scientific Context */}
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <Beaker className="h-4 w-4 text-purple-500" />
                            Scientific Evidence
                          </h4>
                          <div className="ml-6 space-y-2">
                            <div className="text-sm space-y-1">
                              {probiotic.scientificContext.keyFindings.map(
                                (finding, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <Check className="h-3 w-3 text-purple-500 mt-1 flex-shrink-0" />
                                    <span>{finding}</span>
                                  </div>
                                )
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              Impact Factor: {probiotic.scientificContext.impactFactor}/5
                            </div>
                          </div>
                        </div>

                        {/* Implementation Steps */}
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                            Implementation Guide
                          </h4>
                          <ul className="ml-6 space-y-1">
                            {probiotic.implementation.map((step, idx) => (
                              <li key={idx} className="text-sm flex items-center gap-2">
                                <ArrowRight className="h-3 w-3 text-gray-400" />
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Timeframe */}
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            Expected Timeframe
                          </h4>
                          <p className="ml-6 text-sm">{probiotic.timeframe}</p>
                        </div>

                        {/* References */}
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-gray-500" />
                            Scientific References
                          </h4>
                          <div className="ml-6 space-y-2">
                            {probiotic.scientificContext.references.map((ref, idx) => (
                              <div key={idx} className="text-sm space-y-1">
                                <div className="font-medium">DOI: {ref.doi}</div>
                                <div className="text-gray-600">{ref.key_point}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Show More/Less Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-purple-800 text-white rounded-md hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
              >
                {showAll ? 'Show Less' : 'Show More'}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default RecommendedProbioticsSection;
