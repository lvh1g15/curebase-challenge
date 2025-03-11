import React from 'react';
import { Button } from '@/components/Button';
import { ParticipantInfo, StudyInfo } from './types';
import { mockEnrollmentCenters, mockClinics, mockLanguages } from './mockData';

interface InvitationStepProps {
  onComplete: () => void;
  onBack: () => void;
  participantInfo: ParticipantInfo;
  studyInfo: StudyInfo;
}

export const InvitationStep: React.FC<InvitationStepProps> = ({ 
  onComplete, 
  onBack,
  participantInfo,
  studyInfo
}) => {
  // Helper function to get the name of a selected option
  const getOptionName = (type: string, id: string): string => {
    switch (type) {
      case 'enrollmentCenter':
        return mockEnrollmentCenters.find(center => center.id === id)?.name || '';
      case 'clinic':
        return mockClinics.find(clinic => clinic.id === id)?.name || '';
      case 'language':
        return mockLanguages.find(lang => lang.id === id)?.name || '';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Invitation to Data Collection Study</h2>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800 mb-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <span className="font-medium">Important:</span> You have been invited to participate in a data collection study.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Study Details</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            <span className="font-medium">Study:</span> {studyInfo.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            <span className="font-medium">Description:</span> {studyInfo.description}
          </p>
          
          {/* Display selected options */}
          {studyInfo.selectedOptions && (
            <div className="mt-2">
              {Object.entries(studyInfo.selectedOptions).map(([type, id]) => (
                id && (
                  <p key={type} className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    <span className="font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}:</span> {getOptionName(type, id)}
                  </p>
                )
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-medium">Participant Information</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            <span className="font-medium">Name:</span> {participantInfo.firstName} {participantInfo.lastName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            <span className="font-medium">Email:</span> {participantInfo.email}
          </p>
          {participantInfo.phone && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              <span className="font-medium">Phone:</span> {participantInfo.phone}
            </p>
          )}
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
          <h3 className="text-md font-medium mb-2">What happens next?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            You will receive an email with further instructions on how to participate in this study. 
            Please check your inbox for an invitation from our research team.
          </p>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          type="button" 
          variant="primary"
          onClick={onComplete}
        >
          Complete Registration
        </Button>
      </div>
    </div>
  );
};
