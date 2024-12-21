import React, { useState } from 'react';
import { User, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';

const PatientInfoDropdown = ({ patientData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-200 border-t-4 border-t-gray-600">
      <CardHeader>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex justify-between items-start"
        >
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <User className="h-5 w-5 text-gray-600" />
              Patient Information
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
          <div className="mt-2 p-4 pl-6 bg-white rounded-lg shadow-md space-y-4">
            <div className="text-sm text-gray-600 grid grid-cols-2 gap-y-2">
              <p>
                <span className="font-semibold">Patient: </span>
                <br className="md:hidden" />
                {patientData.patientName}
              </p>
              <p>
                <span className="font-semibold">DOB: </span>
                <br className="md:hidden" />
                {patientData.patientDOB}
              </p>
              <p>
                <span className="font-semibold">Ordering Physician: </span>
                <br className="md:hidden" />
                {patientData.physicianName}
              </p>
              <p>
                <span className="font-semibold">Test ID: </span>
                <br className="md:hidden" />
                {patientData.testId}
              </p>
              <p>
                <span className="font-semibold">Collection Date: </span>
                <br className="md:hidden" />
                {patientData.collectionDate}
              </p>
              <p>
                <span className="font-semibold">Report Date: </span>
                <br className="md:hidden" />
                {patientData.reportDate}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-900 flex items-start gap-2">
              <User className="h-5 w-5 flex-shrink-0 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Patient Notes &amp; History:</p>
                <p className="mt-1">
                  {patientData.patientNotes} No family history of dysbiosis is reported. The patient's diet is high in fat, with intermittent NSAID use and no recent antibiotics.
                </p>
              </div>
            </div>
          </div>
        )}
    </Card>
  );
};

const patientData = {
    testId: 'MBX-2024-0472',
    patientName: 'John Doe',
    patientDOB: '1975-07-22',
    physicianName: 'Dr. Jane Smith',
    collectionDate: '2024-03-15',
    reportDate: '2024-03-18',
    resultStatus: 'POSITIVE',
    riskScore: 0.82,
    patientNotes: 'Patient reported intermittent changes in bowel habits and mild abdominal discomfort.'
  };

export default PatientInfoDropdown;