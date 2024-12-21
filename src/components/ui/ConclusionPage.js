import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import {
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Activity,
  BookOpen,
  List
} from 'lucide-react';

const ConclusionPage = () => {
  return (
    <Card className="rounded-xl bg-gradient-to-br from-white via-cyan-50 to-green-100 shadow-xl border border-gray-200 border-t-4 border-t-cyan-600 shadow-md ">
      <CardHeader className="p-4">
        <CardTitle className="flex items-center gap-2">
          <List className="h-6 w-6 text-gray-600" />
          <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent text-lg font-semibold">
            Conclusion & Next Steps
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-6 space-y-6">
        {/* Overall Summary */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-md">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-6 w-12 text-green-600" />
            <div className="space-y-2">
              <h3 className="text-gray-800 font-medium text-base">
                Key Takeaways
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Your gut microbiome analysis has provided insights into:
              </p>
              <ul className="list-disc list-inside pl-2 text-sm text-gray-700 space-y-1">
                <li>
                  Current microbial health and any signs of imbalance or
                  a supportive, balanced gut environment
                </li>
                <li>
                  Potential pathogens or overgrowth that may require
                  additional attention
                </li>
                <li>
                  Recommended actions for diet, probiotics, and lifestyle
                  that can strengthen beneficial species and minimize
                  harmful ones
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-md">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-6 w-12 text-blue-600" />
            <div className="space-y-2">
              <h3 className="text-gray-800 font-medium text-base">
                Next Steps
              </h3>
              <ul className="list-decimal list-inside pl-2 text-sm text-gray-700 space-y-2">
                <li>
                  Implement recommendations gradually. Incorporate suggested
                  diet, probiotics, and lifestyle changes, and observe how your
                  body responds.
                </li>
                <li>
                  Monitor any pathogens that were flagged. Watch for new or
                  worsening symptoms and practice good hygiene and food safety.
                  Seek professional care if concerns persist.
                </li>
                <li>
                  Consider follow-up testing in a few weeks or months to gauge
                  progress in your microbiome health.
                </li>
                <li>
                  Consult healthcare providers if you have chronic conditions or
                  suspect infections. They can offer personalized guidance.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        {/* <div className="bg-white p-4 rounded-lg border border-gray-100">
          <div className="flex items-start gap-3">
            <BookOpen className="h-6 w-10 text-purple-600" />
            <div className="space-y-2">
              <h3 className="text-gray-800 font-medium text-base">
                Additional Resources
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                For more information on gut microbiome health, consider:
              </p>
              <ul className="list-disc list-inside pl-2 text-sm text-gray-700 space-y-1">
                <li>
                  Articles in peer-reviewed journals discussing dietary
                  fiber, probiotics, and microbiome diversity
                </li>
                <li>
                  Reputable health organizations (CDC, WHO) or integrative
                  medicine websites for diet and lifestyle tips
                </li>
                <li>
                  Consultations with registered dietitians, integrative
                  doctors, or gastroenterologists for personalized plans
                </li>
              </ul>
            </div>
          </div>
        </div> */}

        {/* Disclaimer */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-md">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-12 text-orange-500" />
            <div className="space-y-2">
              <h3 className="text-gray-800 font-medium text-base">
                Important Note
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                These findings and recommendations are for informational
                purposes only and do not replace medical advice. Always
                consult a healthcare professional if you have concerns or
                require personalized support.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConclusionPage;
