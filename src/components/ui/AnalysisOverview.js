import React, { useState } from 'react';
import { BarChart2, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';

const AnalysisOverview = ({ analysisData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-200 border-t-4 border-t-purple-600">
      <CardHeader>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex justify-between items-start"
        >
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BarChart2 className="h-5 w-5 text-purple-600" />
              Technical Overview
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
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-md shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">Total Sequences</p>
              <p className="text-base font-semibold text-gray-900">{analysisData.totalSequences.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">Unique Species</p>
              <p className="text-base font-semibold text-gray-900">{analysisData.uniqueSpecies}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-md shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600 mb-2">Dominant Phyla</p>
            <div className="flex flex-wrap gap-2">
              {analysisData.dominantPhyla.map((phylum, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                >
                  {phylum}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default AnalysisOverview;
