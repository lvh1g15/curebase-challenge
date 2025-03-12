'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/Button';
import { IsMinorStep } from './IsMinorStep';
import { AdultInfoStep } from './AdultInfoStep';
import { StudyInfoStep } from './StudyInfoStep';
import { InvitationStep } from './InvitationStep';
import { ParticipantInfo, ParticipantType, SignupStep, StudyInfo } from './types';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export const ParticipantSignup: React.FC = () => {
    // State for tracking the current step in the flow
    const [currentStep, setCurrentStep] = useState<SignupStep>('isMinor');

    // State for participant type (minor or adult)
    const [participantType, setParticipantType] = useState<ParticipantType | null>(null);

    // State for participant information
    const [participantInfo, setParticipantInfo] = useState<ParticipantInfo>({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        guardianName: '',
        guardianEmail: '',
        guardianPhone: '',
    });

    // State for selected study
    const [selectedStudy, setSelectedStudy] = useState<StudyInfo | null>(null);

    // Handler for updating participant information
    const updateParticipantInfo = (info: Partial<ParticipantInfo>) => {
        setParticipantInfo(prev => ({ ...prev, ...info }));
    };

    // Handler for completing the flow
    const handleComplete = () => {
        // In a real application, you would submit the data to your backend here
        console.log('Participant signup completed:', {
            participantType,
            participantInfo,
            selectedStudy
        });

        // Reset the form and close the dialog
        setCurrentStep('isMinor');
        setParticipantType(null);
        setParticipantInfo({
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: '',
            guardianName: '',
            guardianEmail: '',
            guardianPhone: '',
        });
        setSelectedStudy(null);
    };

    // Navigation handlers
    const goBack = () => {
        switch (currentStep) {
            case 'minorInfo':
                setCurrentStep('isMinor');
                break;
            case 'adultInfo':
                setCurrentStep('isMinor');
                break;
            case 'studyInfo':
                if (participantType === 'minor') {
                    setCurrentStep('minorInfo');
                } else {
                    setCurrentStep('adultInfo');
                }
                break;
            case 'invitation':
                setCurrentStep('studyInfo');
                break;
            default:
                setCurrentStep('isMinor');
        }
    };

    const goToNextStep = (step: SignupStep) => {
        setCurrentStep(step);
    };

    // Render the current step
    const renderStep = () => {
        switch (currentStep) {

            case 'adultInfo':
                return (
                    <AdultInfoStep
                        onNext={() => goToNextStep('studyInfo')}
                        onBack={goBack}
                        updateParticipantInfo={updateParticipantInfo}
                        participantInfo={participantInfo}
                    />
                );

            case 'studyInfo':
                return (
                    <StudyInfoStep
                        onNext={() => goToNextStep('invitation')}
                        onBack={goBack}
                        setSelectedStudy={setSelectedStudy}
                    />
                );

            case 'invitation':
                return (
                    <InvitationStep
                        onComplete={handleComplete}
                        onBack={goBack}
                        participantInfo={participantInfo}
                        studyInfo={selectedStudy!}
                    />
                );

            default:
                return (
                    <IsMinorStep 
                        onNext={() => goToNextStep('adultInfo')}
                    />
                );
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary" size="md">
                    Sign Up Participant
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md p-0 overflow-clip rounded-3xl">
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle>Participant Sign Up</DialogTitle>
                        <DialogDescription>
                            Register a new participant to start collecting study data.
                        </DialogDescription>
                    </DialogHeader>
                </VisuallyHidden>
                <div className="relative">
                    {/* Step content */}
                    <div className="mt-6">
                        {renderStep()}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}; 