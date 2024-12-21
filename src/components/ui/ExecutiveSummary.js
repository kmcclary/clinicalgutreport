import React, { useState } from 'react';
import { FileText, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';

const ExecutiveSummary = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="w-full bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 border-t-4 border-t-blue-600 shadow-xl hover:shadow-lg transition-shadow">
      <CardHeader>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex justify-between items-start"
        >
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileText className="h-5 w-5 text-blue-600" />
              Executive Summary
            </CardTitle>

          </div>
          <ChevronDown 
            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="prose max-w-none text-gray-600 leading-relaxed">
          <p className="text-justify text-xs sm:text-md">
            This report provides an analysis of the patient's gut microbiota using Next-Generation Sequencing (NGS)
            technology. Our comprehensive analysis identifies the presence of potential pathogens, assesses the balance
            of gut microbiota (dysbiosis), and offers personalized recommendations to improve gut health through diet,
            lifestyle, and probiotics.
          </p>
          <h3 className="text-md font-semibold mt-4">Outline</h3>
          <ul className="list-disc list-inside pl-2 text-xs sm:text-md">
            <li>Introduction to Gut Microbiota Analysis</li>
            <li>Key Findings</li>
            <li>Pathogen Detection</li>
            <li>Personalized Recommendations</li>
            <li>Microbial Diversity and Composition</li>
            <li>Conclusion</li>
          </ul>
          <h3 className="text-md font-semibold mt-4">Overview of Results</h3>
          <p className="text-justify text-xs sm:text-md">
            The analysis revealed a balanced gut microbiota with a moderate level of dysbiosis. Key beneficial microbes
            such as <em>Bifidobacterium longum</em> and <em>Lactobacillus acidophilus</em> were present in healthy
            abundances. However, opportunistic microbes like <em>Escherichia coli O157:H7</em> and <em>Clostridioides difficile</em>
            were also detected at low levels.
          </p>
          <p className="text-justify text-xs sm:text-md">
            Personalized recommendations include dietary adjustments to increase fiber intake, probiotic supplementation,
            and lifestyle changes to reduce stress and improve sleep quality. These recommendations aim to enhance the
            abundance of beneficial microbes and reduce the presence of opportunistic pathogens.
          </p>
        </CardContent>
      )}
    </Card>
  );
};

export default ExecutiveSummary;
