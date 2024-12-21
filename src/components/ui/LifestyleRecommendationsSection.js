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
  BookOpen 
} from 'lucide-react';

const LifestyleRecommendationsSection = () => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [priorityFilter, /* setPriorityFilter */] = useState('all');
  const [showAll, setShowAll] = useState(false);

  // A list of lifestyle recommendations that address dysbiosis, eubiosis, and pathogen considerations
  const lifestyleData = {
    recommendations: [
      {
        id: 1,
        name: "Get Adequate Sleep",
        points: 3,
        priority: "High",
        impact: [
          "Regulates cortisol levels that affect gut lining integrity",
          "Promotes beneficial microbe stability through circadian rhythm alignment"
        ],
        impactOnDysbiosis:
          "Chronic sleep deprivation correlates with microbiome imbalance; improving sleep helps restore microbial diversity.",
        impactOnEubiosis:
          "Consistent, quality sleep supports eubiotic conditions by reducing stress hormones and systemic inflammation.",
        potentialPathogenReduction: ["Opportunistic bacteria linked to stress-related dysbiosis"],
        description:
          "Ensuring 7-9 hours of restful sleep helps harmonize the gut-brain axis, reduce stress, and maintain a balanced microbiome.",
        scientificContext: {
          keyFindings: [
            "Lack of sleep can shift gut composition toward inflammatory profiles",
            "Improved sleep quality increases abundance of beneficial SCFA producers"
          ],
          impactFactor: 5,
          references: [
            {
              doi: "10.1016/j.smrv.2015.12.008",
              key_point: "Sleep deprivation is associated with gut dysbiosis and metabolic dysregulation"
            }
          ]
        },
        implementation: [
          "Maintain a consistent bedtime and wake-up time",
          "Limit screen use an hour before bed",
          "Keep bedroom dark, quiet, and cool",
          "Avoid heavy meals or caffeine close to bedtime"
        ],
        timeframe: "1-2 weeks for noticeable improvement in energy and digestion"
      },
      {
        id: 2,
        name: "Engage in Stress Management",
        points: 2,
        priority: "High",
        impact: [
          "Reduces cortisol spikes that compromise gut barrier function",
          "Supports beneficial microbes by modulating the gut-brain axis"
        ],
        impactOnDysbiosis:
          "Excessive stress can cause harmful bacterial overgrowth; managing stress can reverse or prevent dysbiosis.",
        impactOnEubiosis:
          "Mindfulness, meditation, or other relaxation techniques help sustain a stable, eubiotic gut environment.",
        potentialPathogenReduction: [],
        description:
          "Chronic stress alters gut motility and microbiota composition. Techniques like meditation, yoga, or breathing exercises help offset negative changes.",
        scientificContext: {
          keyFindings: [
            "Lower perceived stress correlates with higher microbial diversity",
            "Mind-body interventions support gut-brain axis equilibrium"
          ],
          impactFactor: 4,
          references: [
            {
              doi: "10.1038/s41564-018-0307-3",
              key_point: "Psychological stress can shift gut microbes toward pathogenic states"
            }
          ]
        },
        implementation: [
          "Set aside 10-15 minutes daily for relaxation/meditation",
          "Try yoga, tai chi, or guided imagery",
          "Seek professional help if stress is overwhelming",
          "Integrate short breathing breaks throughout the workday"
        ],
        timeframe: "2-4 weeks for reduced GI issues and better emotional well-being"
      },
      {
        id: 3,
        name: "Regular Physical Activity",
        points: 2,
        priority: "Medium",
        impact: [
          "Stimulates intestinal transit and nutrient absorption",
          "Enhances immune function, supporting beneficial bacteria"
        ],
        impactOnDysbiosis:
          "Exercise can reduce harmful microbial overgrowth by improving metabolic and inflammatory markers.",
        impactOnEubiosis:
          "Promotes a favorable gut environment via improved blood flow and reduced inflammation.",
        potentialPathogenReduction: [],
        description:
          "Moderate exercise (e.g., brisk walking, cycling) has been linked to increased microbial diversity and better gut health outcomes.",
        scientificContext: {
          keyFindings: [
            "Athletes often show higher diversity in gut microbes",
            "Exercise-induced anti-inflammatory effects can benefit the gut"
          ],
          impactFactor: 3,
          references: [
            {
              doi: "10.1007/s00394-018-1830-2",
              key_point: "Physical activity is associated with beneficial shifts in gut microbiota composition"
            }
          ]
        },
        implementation: [
          "Aim for at least 150 minutes of moderate exercise weekly",
          "Include strength training 2-3 times per week",
          "Incorporate walks or light stretching breaks if sedentary",
          "Stay hydrated before, during, and after workouts"
        ],
        timeframe: "3-6 weeks for gut microbiome shifts"
      },
      {
        id: 4,
        name: "Limit Alcohol Intake",
        points: 1,
        priority: "Medium",
        impact: [
          "Prevents direct mucosal irritation in the gut",
          "Reduces overgrowth of opportunistic bacteria"
        ],
        impactOnDysbiosis:
          "Excessive alcohol consumption is a frequent cause of microbiome disruption; moderation can help restore balance.",
        impactOnEubiosis:
          "Maintaining low alcohol levels supports beneficial species and healthy gut barrier function.",
        potentialPathogenReduction: ["Candida albicans"],
        description:
          "High alcohol intake can shift the microbiome, favoring pathogens and increasing gut permeability. Moderation is key.",
        scientificContext: {
          keyFindings: [
            "Chronic alcohol consumption depletes beneficial microbes",
            "Moderate intake may be less disruptive but still poses risks"
          ],
          impactFactor: 2,
          references: [
            {
              doi: "10.1055/s-0034-1397349",
              key_point: "Alcohol use can significantly alter the intestinal microbiome, exacerbating liver and metabolic issues"
            }
          ]
        },
        implementation: [
          "Limit intake to recommended guidelines (1-2 drinks max/day)",
          "Alternate alcoholic beverages with water",
          "Opt for lower-alcohol content drinks",
          "Consider alcohol-free days each week"
        ],
        timeframe: "2-4 weeks to note gut health improvements and reduced GI symptoms"
      },
      {
        id: 5,
        name: "Practice Mindful Eating",
        points: 1,
        priority: "Medium",
        impact: [
          "Encourages better chewing and digestion",
          "Reduces overeating and stress-related GI issues"
        ],
        impactOnDysbiosis:
          "Less rushed eating means fewer undigested particles for harmful bacteria to thrive on.",
        impactOnEubiosis:
          "Slow, intentional meals can boost beneficial strains that depend on well-digested nutrients.",
        potentialPathogenReduction: [],
        description:
          "Mindful eating involves paying full attention to the experience of eating and drinking. It helps regulate appetite and supports optimal digestion.",
        scientificContext: {
          keyFindings: [
            "Mindful eaters often report better GI comfort and lower body mass index",
            "Reduced meal-time stress fosters a healthier gut-brain axis"
          ],
          impactFactor: 2,
          references: [
            {
              doi: "10.1007/s12160-018-9984-z",
              key_point: "Mindful eating interventions improve dietary habits and can positively influence gut health"
            }
          ]
        },
        implementation: [
          "Eliminate distractions (TV, phone) during meals",
          "Savor flavors and textures; chew thoroughly",
          "Pause between bites and breathe deeply",
          "Focus on hunger and fullness cues"
        ],
        timeframe: "1-2 weeks to feel more satisfied and notice digestive benefits"
      },
      {
        id: 6,
        name: "Time-Restricted Eating",
        points: 1,
        priority: "Low",
        impact: [
          "Aligns feeding times with circadian rhythms",
          "May promote beneficial microbial fluctuations"
        ],
        impactOnDysbiosis:
          "Consolidating meal windows can give the gut microbiome time to reset, limiting dysbiosis.",
        impactOnEubiosis:
          "Fasting intervals may foster conditions supportive of beneficial species like Akkermansia.",
        potentialPathogenReduction: [],
        description:
          "Limiting daily eating to a 8-10 hour window (e.g., 10 AM–6 PM) can support metabolic health and microbial balance.",
        scientificContext: {
          keyFindings: [
            "Intermittent fasting can modulate gut microbiota, improving metabolic markers",
            "May reduce intestinal inflammation in animal studies"
          ],
          impactFactor: 3,
          references: [
            {
              doi: "10.1016/j.cell.2014.03.052",
              key_point: "Time-restricted feeding aligns with circadian biology and benefits the gut-liver axis"
            }
          ]
        },
        implementation: [
          "Select a consistent 8- or 10-hour window for meals",
          "Avoid late-night snacking",
          "Stay hydrated during fasting periods",
          "Consult with a professional if you have any medical conditions"
        ],
        timeframe: "2-3 weeks for metabolic and gut changes"
      },
      {
        id: 7,
        name: "Avoid Smoking",
        points: 3,
        priority: "High",
        impact: [
          "Eliminates tobacco-related toxins that impair gut lining",
          "Reduces inflammation and oxidative stress"
        ],
        impactOnDysbiosis:
          "Smoking drastically disrupts gut flora; cessation can restore a healthier microbial community.",
        impactOnEubiosis:
          "Cessation supports beneficial bacteria and reduces disease-promoting species.",
        potentialPathogenReduction: ["Opportunistic gram-negative bacteria"],
        description:
          "Smoking introduces thousands of chemicals affecting gut integrity and immune function. Quitting can significantly improve the microbiome.",
        scientificContext: {
          keyFindings: [
            "Smokers often have depleted Lactobacilli and Bifidobacteria levels",
            "Marked improvements in gut flora noted upon smoking cessation"
          ],
          impactFactor: 5,
          references: [
            {
              doi: "10.1038/ismej.2015.13",
              key_point: "Smoking is a major environmental factor altering gut microbiota composition and function"
            }
          ]
        },
        implementation: [
          "Seek professional cessation programs",
          "Use nicotine replacement therapy if needed",
          "Identify triggers and plan alternatives",
          "Monitor improvements in respiratory and GI health"
        ],
        timeframe: "4-8 weeks for significant gut flora recovery after quitting"
      },
      {
        id: 8,
        name: "Increase Sunlight Exposure",
        points: 0.5,
        priority: "Low",
        impact: [
          "Boosts vitamin D synthesis, correlated with stronger immune function",
          "May help beneficial microbes flourish by improving host resilience"
        ],
        impactOnDysbiosis:
          "Low vitamin D is linked to higher dysbiosis risk; moderate sunlight can mitigate this imbalance.",
        impactOnEubiosis:
          "A well-regulated immune system supports eubiosis by containing harmful species.",
        potentialPathogenReduction: [],
        description:
          "Regular, safe sunlight exposure supports vitamin D levels and a robust immune system, indirectly helping maintain a balanced gut microbiome.",
        scientificContext: {
          keyFindings: [
            "Vitamin D deficiency correlates with intestinal dysbiosis",
            "Sunlight exposure has been linked to improved microbial diversity"
          ],
          impactFactor: 1,
          references: [
            {
              doi: "10.1016/j.tem.2018.03.009",
              key_point: "Vitamin D plays a critical role in modulating immune and microbial homeostasis"
            }
          ]
        },
        implementation: [
          "Aim for ~10-15 minutes of midday sun (depending on skin type)",
          "Use sunscreen responsibly to prevent burns",
          "Consider vitamin D supplementation if sunlight is limited",
          "Monitor vitamin D levels via blood tests if concerned"
        ],
        timeframe: "4-6 weeks to observe immune and gut health benefits"
      }
    ]
  };

  // Filter by priority if needed
  const filteredRecommendations =
    priorityFilter === 'all'
      ? lifestyleData.recommendations
      : lifestyleData.recommendations.filter(
          (rec) => rec.priority.toLowerCase() === priorityFilter.toLowerCase()
        );

  // Decide whether to show all or just the first few
  const displayedRecommendations = showAll
    ? filteredRecommendations
    : filteredRecommendations.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Lifestyle Recommendations Card */}
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-white to-indigo-50 border-t-4 border-t-blue-600 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-indigo-500" />
              <span className="text-gray-800 text-xl">
                Lifestyle Recommendations
              </span>
            </CardTitle>
            <CardDescription>
              Actions to improve gut health by addressing dysbiosis, supporting eubiosis, and limiting pathogens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {displayedRecommendations.map((rec) => (
                <div key={rec.id}>
                  <div
                    className={`p-4 rounded-lg border transition-all cursor-pointer shadow-sm hover:shadow-md
                      ${
                        selectedAction === rec.id
                          ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
                          : 'bg-gradient-to-br from-gray-50 to-white border-indigo-200 hover:from-gray-100 hover:to-white'
                      }`}
                    onClick={() =>
                      setSelectedAction(selectedAction === rec.id ? null : rec.id)
                    }
                  >
                    {/* Action Header */}
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium flex items-center gap-2">
                          {rec.name}
                          <span
                            className={`px-2 py-1 rounded-full text-xs
                            ${
                              rec.priority === 'High'
                                ? 'bg-red-100 text-red-700'
                                : rec.priority === 'Medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {rec.priority}
                          </span>
                        </h3>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-indigo-700">
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{rec.description}</p>

                    {/* Expanded Content */}
                    {selectedAction === rec.id && (
                      <div className="mt-4 space-y-4 border-t pt-4">
                        {/* Dysbiosis, Eubiosis, Pathogen Info */}
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                            Microbial Balance
                          </h4>
                          <div className="ml-6 text-sm space-y-2 text-gray-700">
                            <p>
                              <strong>Impact on Dysbiosis:</strong>{" "}
                              {rec.impactOnDysbiosis || "—"}
                            </p>
                            <p>
                              <strong>Impact on Eubiosis:</strong>{" "}
                              {rec.impactOnEubiosis || "—"}
                            </p>
                            {rec.potentialPathogenReduction &&
                              rec.potentialPathogenReduction.length > 0 && (
                                <p>
                                  <strong>Potential Pathogen Reduction:</strong>{" "}
                                  {rec.potentialPathogenReduction.join(", ")}
                                </p>
                              )}
                          </div>
                        </div>

                        {/* Specific Microbiome Impact */}
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                            Specific Microbiome Impact
                          </h4>
                          <ul className="ml-6 space-y-1">
                            {rec.impact.map((impactItem, idx) => (
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
                              {rec.scientificContext.keyFindings.map((finding, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <Check className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                                  <span>{finding}</span>
                                </div>
                              ))}
                            </div>
                            <div className="text-sm text-gray-600">
                              Impact Factor: {rec.scientificContext.impactFactor}/5
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
                            {rec.implementation.map((step, idx) => (
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
                          <p className="ml-6 text-sm">{rec.timeframe}</p>
                        </div>

                        {/* References */}
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-gray-500" />
                            Scientific References
                          </h4>
                          <div className="ml-6 space-y-2">
                            {rec.scientificContext.references.map((ref, idx) => (
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
                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
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

export default LifestyleRecommendationsSection;
