import React from 'react';
import { Button } from '@/components/Button';

interface MinorInfoPageProps {
  onBack: () => void;
}

export const MinorInfoPage: React.FC<MinorInfoPageProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Adding a Minor Participant</h2>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800 mb-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <span className="font-medium">Important:</span> For participants under 18 years of age, a parent or guardian must provide consent.
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Instructions</h3>
        
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
              1
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Contact the minor&apos;s parent or legal guardian to obtain permission.
            </p>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
              2
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Have the parent or guardian complete the consent form available on our website.
            </p>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
              3
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Once consent is provided, you can register the minor participant through our system.
            </p>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
              4
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Both the minor and the guardian will receive confirmation emails with further instructions.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md mt-4">
        <h3 className="text-md font-medium mb-2">Need Help?</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          If you have any questions about adding a minor participant, please contact our support team at support@example.com or call (123) 456-7890.
        </p>
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
          onClick={() => window.open('/consent-form', '_blank')}
        >
          Download Consent Form
        </Button>
      </div>
    </div>
  );
}; 