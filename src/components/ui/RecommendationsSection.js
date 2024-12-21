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
} from 'lucide-react';

const RecommendationsSection = () => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [priorityFilter, /* setPriorityFilter */] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [selectedRecentAction, setSelectedRecentAction] = useState(null);

  const recommendationsData = {
    recommendations: [
      {
        id: 1,
        name: 'Increase Fiber-Rich Diet',
        points: 2,
        priority: 'High',
        impact: [
          'Promotes SCFA-producing microbes (e.g., Bifidobacterium, Prevotella)',
          'Helps crowd out pro-inflammatory species (e.g., certain Ruminococcus)',
        ],
        impactOnDysbiosis:
          'High-fiber intake can significantly reduce dysbiosis by favoring beneficial bacteria over harmful ones.',
        impactOnEubiosis:
          'Supports a healthy, balanced microbiome environment through diverse fermentation substrates.',
        potentialPathogenReduction: ['E. coli', 'Salmonella'],
        description:
          'A fiber-rich diet bolsters beneficial microbes, enhancing eubiosis and reducing unwanted strains that contribute to dysbiosis. It also helps limit pathogens like E. coli.',
        scientificContext: {
          keyFindings: [
            'Increases Bacteroides, Bifidobacterium, and Roseburia',
            'Decreases inflammation markers in the gut',
          ],
          impactFactor: 5,
          references: [
            {
              doi: '10.1038/nature12820',
              key_point:
                'High-fiber diets can boost microbiome diversity and guard against metabolic disease',
            },
          ],
        },
        implementation: [
          'Target 25-30g of fiber daily',
          'Focus on whole grains, legumes, fruits, and vegetables',
          'Increase intake gradually to reduce digestive discomfort',
          'Pair with adequate hydration',
        ],
        timeframe: '2-4 weeks for initial gut flora shifts',
      },
      {
        id: 2,
        name: 'Drink Oolong Tea',
        points: 1,
        priority: 'Medium',
        impact: [
          'Improves the Bacteroidetes-to-Firmicutes ratio',
          'Bolsters metabolic and antioxidant capacity',
        ],
        impactOnDysbiosis:
          'Moderate effect in lowering dysbiosis by preventing overgrowth of certain Firmicutes.',
        impactOnEubiosis:
          'Polyphenols can enhance beneficial species, aiding a more balanced microbiome.',
        potentialPathogenReduction: [],
        description:
          'Oolong tea is rich in polyphenols that can beneficially modulate the microbiome. Great if you want to maintain eubiosis and keep dysbiosis in check.',
        scientificContext: {
          keyFindings: [
            'Notable rise in Bacteroidetes',
            'Reduced Firmicutes in overweight individuals',
          ],
          impactFactor: 2,
          references: [
            {
              doi: '10.1039/C7FO01570D',
              key_point:
                'Oolong tea polyphenols influence gut microbiota composition and may aid metabolic health',
            },
          ],
        },
        implementation: [
          'Drink 1-2 cups daily',
          'Steep properly for best polyphenol release',
          'Consume between meals',
          'Limit sweeteners',
        ],
        timeframe: '3-4 weeks to observe noticeable changes',
      },
      {
        id: 3,
        name: 'Eat Allium Products',
        points: 1,
        priority: 'Medium',
        impact: [
          'Fosters beneficial genera like Bifidobacterium',
          'Helps inhibit certain pathogens (e.g., Salmonella)',
        ],
        impactOnDysbiosis:
          'May rebalance the gut by boosting beneficial flora, reducing dysbiosis factors.',
        impactOnEubiosis:
          'Allium’s prebiotic compounds promote a stable, eubiotic environment.',
        potentialPathogenReduction: ['E. coli', 'Salmonella'],
        description:
          'Garlic, onions, and other allium vegetables enhance beneficial gut bacteria and deter pathogenic species, improving both eubiosis and dysbiosis markers.',
        scientificContext: {
          keyFindings: [
            'Increases Lachnospiraceae, Faecalibacterium',
            'Reduces opportunistic bacteria like E. coli',
          ],
          impactFactor: 3,
          references: [
            {
              doi: '10.1016/j.vetmic.2009.12.025',
              key_point:
                'Allium compounds have demonstrated robust prebiotic effects and pathogen inhibition',
            },
          ],
        },
        implementation: [
          'Include 1-2 cloves of garlic or half an onion per day',
          'Cook to reduce pungency; raw can be potent',
          'Try fermented alliums (like black garlic)',
          'Pair with other high-fiber foods',
        ],
        timeframe: '2-3 weeks for noticeable microbiome benefits',
      },
      {
        id: 4,
        name: 'Drink Rice Wine',
        points: 0.5,
        priority: 'Low',
        impact: [
          'Mildly increases Lactobacillus and Bifidobacterium',
          'Helps reduce Clostridium and Enterococcus',
        ],
        impactOnDysbiosis:
          'Offers a light prebiotic effect but must be consumed moderately to avoid worsening dysbiosis.',
        impactOnEubiosis:
          'Minor support for beneficial microbes, helping maintain a balanced microbiome.',
        potentialPathogenReduction: [],
        description:
          'Traditional rice wine contains compounds that favor beneficial microbes. Helpful in small amounts for eubiosis, but excessive intake can undo benefits.',
        scientificContext: {
          keyFindings: [
            'Boosts some probiotic strains in moderate consumption',
            'Can reduce certain harmful bacteria',
          ],
          impactFactor: 1,
          references: [
            {
              doi: '10.1016/j.jff.2015.11.005',
              key_point:
                'Rice wine consumption alters gut microbiota composition positively if intake is controlled',
            },
          ],
        },
        implementation: [
          '1-2 small glasses per week',
          'Opt for high-quality, traditionally brewed varieties',
          'Avoid frequent overconsumption',
          'Pair with meals to reduce GI irritation',
        ],
        timeframe: '4-6 weeks for subtle effects',
      },
      {
        id: 5,
        name: 'Eat Black Currant',
        points: 0.5,
        priority: 'Low',
        impact: [
          'Provides antioxidants aiding beneficial bacteria',
          'Supports a balanced gut flora with mild prebiotic compounds',
        ],
        impactOnDysbiosis:
          'May slightly reduce dysbiosis by providing polyphenols that nourish good microbes.',
        impactOnEubiosis:
          'Promotes eubiosis through antioxidant and prebiotic synergy.',
        potentialPathogenReduction: [],
        description:
          'Black currants contain antioxidants and micronutrients that can help sustain a healthy, balanced gut ecosystem.',
        scientificContext: {
          keyFindings: [
            'Increases Lactobacillus and Bifidobacterium',
            'Potentially lowers Clostridium counts',
          ],
          impactFactor: 1,
          references: [
            {
              doi: '10.1016/j.jff.2015.11.005',
              key_point:
                'Black currant consumption shows positive shifts in microbiota composition',
            },
          ],
        },
        implementation: [
          'Consume a small handful daily (fresh or frozen)',
          'Combine with other fruits in smoothies',
          'Avoid added sugars or sweeteners',
          'Consider freeze-dried powder if fresh unavailable',
        ],
        timeframe: '3-4 weeks for appreciable changes',
      },
      {
        id: 6,
        name: 'Chew Thoroughly',
        points: 0.5,
        priority: 'Low',
        impact: [
          'Improves digestion and nutrient absorption',
          'Helps minimize fermentable residue that opportunistic microbes use',
        ],
        impactOnDysbiosis:
          'Better digestion can reduce the fermentative environment that fuels dysbiosis.',
        impactOnEubiosis:
          'Promotes overall gut harmony by ensuring food is well-processed for beneficial bacteria.',
        potentialPathogenReduction: ['Candida'],
        description:
          'Thorough chewing helps break down food more effectively, lessening the substrate for harmful microbes and supporting a eubiotic gut.',
        scientificContext: {
          keyFindings: [
            'More thorough mastication correlates with increased beneficial microbes (e.g., Bacteroides)',
            'Less unprocessed food residue means fewer fermentation pockets for pathogens',
          ],
          impactFactor: 2,
          references: [
            {
              doi: '10.1038/S41598-022-18095-X',
              key_point:
                'Chewing behavior exerts a significant influence on gut microbiota profiles',
            },
          ],
        },
        implementation: [
          'Chew each bite 20-30 times',
          'Pause between bites to slow overall intake',
          'Focus on texture changes while chewing',
          'Stay mindful of portion sizes',
        ],
        timeframe: '2-3 weeks for noticeable digestive improvements',
      },
    ],
    past_recommendations: [
      {
        action: 'Drink herbal/flavonoid teas',
        points: 24,
        completions: 12,
        impact: 'Improved eubiosis; reduced dysbiosis markers',
        timeframe: 'Implemented over 6 weeks',
        details: {
          overview:
            'Consumed 2-3 cups daily of various herbal/flavonoid-rich teas. Experienced improved digestion and reduced bloating.',
          improvements: [
            'Lowered ratio of Firmicutes to Bacteroidetes',
            'Enhanced beneficial Akkermansia presence',
            'Less GI discomfort overall',
          ],
          references: [
            {
              doi: '10.1016/j.jfda.2019.09.003',
              note: 'Herbal teas have been shown to positively modulate gut flora and metabolic pathways.',
            },
          ],
          completionTimeline: [
            { week: 1, completions: 2 },
            { week: 2, completions: 3 },
            { week: 3, completions: 2 },
            { week: 4, completions: 2 },
            { week: 5, completions: 1 },
            { week: 6, completions: 2 },
          ],
        },
      },
      {
        action: 'Fiber-rich diet',
        points: 14,
        completions: 7,
        impact: 'Heightened eubiosis; markedly lowered dysbiosis index',
        timeframe: 'Adopted over 4 weeks',
        details: {
          overview:
            'Increased daily fiber to ~30g from fruits, veggies, whole grains, and legumes. Saw improved bowel regularity.',
          improvements: [
            'Reduced inflammatory markers in the gut',
            'Increased Bifidobacterium and Faecalibacterium prausnitzii',
            'Better stool consistency and frequency',
          ],
          references: [
            {
              doi: '10.1111/nyas.13153',
              note: 'Dietary fiber is key to a healthier gut microbial community and improved metabolic health.',
            },
          ],
          completionTimeline: [
            { week: 1, completions: 2 },
            { week: 2, completions: 2 },
            { week: 3, completions: 1 },
            { week: 4, completions: 2 },
          ],
        },
      },
      {
        action: 'Avoid artificial sweeteners',
        points: 8,
        completions: 8,
        impact: 'Balanced out dysbiosis triggers; less potential for pathogenic growth',
        timeframe: 'Maintained for 3 weeks',
        details: {
          overview:
            'Eliminated artificial sweeteners (aspartame, sucralose, saccharin) and switched to whole-food or naturally sweetened alternatives.',
          improvements: [
            'Stabilized daily gut flora fluctuations',
            'More controlled blood glucose levels',
            'Reduced sugar cravings',
          ],
          references: [
            {
              doi: '10.1038/nature13793',
              note: 'Studies reveal that artificial sweeteners can disrupt gut microbial communities and glucose tolerance.',
            },
          ],
          completionTimeline: [
            { week: 1, completions: 3 },
            { week: 2, completions: 3 },
            { week: 3, completions: 2 },
          ],
        },
      },
    ],
  };

  // Filter by priority if needed
  const filteredRecommendations =
    priorityFilter === 'all'
      ? recommendationsData.recommendations
      : recommendationsData.recommendations.filter(
          (rec) => rec.priority.toLowerCase() === priorityFilter.toLowerCase()
        );

  // Show either all or just the first few
  const displayedRecommendations = showAll
    ? filteredRecommendations
    : filteredRecommendations.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Recommendations Card */}
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-white to-rose-50  border-t-4 border-t-rose-600 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-rose-500" />
              <span className="text-gray-800 text-xl">
                Diet Recommendations
              </span>
            </CardTitle>
            <CardDescription>
              Strategies to address dysbiosis, encourage eubiosis, and reduce pathogens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {displayedRecommendations.map((rec) => {
                const isSelected = selectedAction === rec.id;
                return (
                  <div key={rec.id}>
                    <div
                      className={`p-4 rounded-lg border transition-all cursor-pointer shadow-sm hover:shadow-md ${
                        isSelected
                          ? // Subtle gray highlight when clicked
                            'bg-gray-50 border-gray-200'
                          : // Default style
                            'bg-white border-rose-200 hover:bg-gray-50'
                      }`}
                      onClick={() =>
                        setSelectedAction(isSelected ? null : rec.id)
                      }
                    >
                      {/* Action Header */}
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium flex items-center gap-2">
                            {rec.name}
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
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
                          <div className="font-bold text-green-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{rec.description}</p>

                      {/* Expanded Content */}
                      {isSelected && (
                        <div className="mt-4 space-y-4 border-t pt-4">
                          {/* Dysbiosis, Eubiosis, Pathogen Info */}
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-blue-500" />
                              Microbial Balance
                            </h4>
                            <div className="ml-6 text-sm space-y-2 text-gray-700">
                              <p>
                                <strong>Impact on Dysbiosis:</strong>{' '}
                                {rec.impactOnDysbiosis || '—'}
                              </p>
                              <p>
                                <strong>Impact on Eubiosis:</strong>{' '}
                                {rec.impactOnEubiosis || '—'}
                              </p>
                              {rec.potentialPathogenReduction &&
                                rec.potentialPathogenReduction.length > 0 && (
                                  <p>
                                    <strong>Potential Pathogen Reduction:</strong>{' '}
                                    {rec.potentialPathogenReduction.join(', ')}
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
                                <li
                                  key={idx}
                                  className="text-sm flex items-center gap-2"
                                >
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
                                {rec.scientificContext.keyFindings.map(
                                  (finding, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-start gap-2"
                                    >
                                      <Check className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                                      <span>{finding}</span>
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="text-sm text-gray-600">
                                Impact Factor:{' '}
                                {rec.scientificContext.impactFactor}/5
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
                                <li
                                  key={idx}
                                  className="text-sm flex items-center gap-2"
                                >
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
                              {rec.scientificContext.references.map(
                                (ref, idx) => (
                                  <div
                                    key={idx}
                                    className="text-sm space-y-1"
                                  >
                                    <div className="font-medium">
                                      DOI: {ref.doi}
                                    </div>
                                    <div className="text-gray-600">
                                      {ref.key_point}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Show More/Less Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-md hover:from-rose-600 hover:to-pink-700 transition-all duration-200"
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

export default RecommendationsSection;
