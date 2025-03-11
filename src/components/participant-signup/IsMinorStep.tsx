import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { FormComponent } from '@/components/FormComponent';
import { MinorInfoPage } from './MinorInfoPage';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Custom animation variants for this step
const fadeVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.7,
    },
  },
};

interface IsMinorStepProps {
  onNext: () => void;
}

export const IsMinorStep: React.FC<IsMinorStepProps> = ({ onNext }) => {
  const [showMinorInfo, setShowMinorInfo] = useState(false);

  // Create handlers for the buttons
  const handleAdultSelect = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const handleMinorSelect = () => {
    setShowMinorInfo(true);
  };

  const handleBackFromMinorInfo = () => {
    setShowMinorInfo(false);
  };

  return (
    <FormComponent
      animationKey="is-minor-step"
      customVariants={fadeVariants}
    >
      {!showMinorInfo ? (
        <div className="flex flex-col gap-6 justify-center items-center h-full">
          <div className="flex flex-col gap-2 px-12">
            <h2 className="text-2xl font-semibold text-center">Is the participant a minor?</h2>
            <p className="text-sm text-gray-500 text-center">
              A minor is defined as a participant who is less than 13 years old.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              className="w-full"
              onClick={handleAdultSelect}
            >
              Participant is over 13 years old
            </Button>

            <Button
              variant="secondary"
              className="w-full"
              onClick={handleMinorSelect}
            >
              Participant is less than 13 years old
            </Button>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-xs font-medium text-blue-600 text-center">Why does this matter?</TooltipTrigger>
              <TooltipContent className="text-center">
                <p>Participants under 13 are not able to consent to the use of their data in this study.
                  <br />
                  They require parental consent to participate.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <MinorInfoPage onBack={handleBackFromMinorInfo} />
      )}
    </FormComponent>
  );
}; 