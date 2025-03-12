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
import { ParticipantInfo, SignupStep, StudyInfo } from './types';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { FormComponent } from '../FormComponent';
import { InvitationStep } from './InvitationStep';

export const ParticipantSignup: React.FC = () => {
    // State for tracking the current step in the flow
    const [currentStep, setCurrentStep] = useState<SignupStep>('isMinor');
    const [formComplete, setFormComplete] = useState<boolean>(false);
    const [participantInfo, setParticipantInfo] = useState<ParticipantInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
    });    
    const [studyInfo, setStudyInfo] = useState<StudyInfo>({
        id: '',
        name: '',
        description: '',
        config: [],
        selectedOptions: {
            enrollmentCenter: '',
            clinic: '',
            language: '',
        },
        isDataCollection: false,
    });

    function onFormComplete(participantInfo: ParticipantInfo, studyInfo: StudyInfo): void {
        console.log('Form submitted');
        setParticipantInfo(participantInfo);
        setStudyInfo(studyInfo);
        setFormComplete(true);
    }

    const onInvitationComplete = () => {
        console.log('Invitation submitted');
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary" size="md">
                    Sign Up Participant
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md p-0 overflow-clip rounded-2xl border-1">
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle>Participant Sign Up</DialogTitle>
                        <DialogDescription>
                            Register a new participant to start collecting study data.
                        </DialogDescription>
                    </DialogHeader>
                </VisuallyHidden>
                {formComplete ? (
                    <InvitationStep participantInfo={participantInfo} studyInfo={studyInfo} onComplete={onInvitationComplete} />
                ) : (
                    <FormComponent onComplete={onFormComplete} />
                )}
            </DialogContent>
        </Dialog>
    );
}; 