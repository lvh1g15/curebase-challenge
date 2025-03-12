import React, { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Stepper } from '@/components/ui/stepper';
import { IsMinorStep } from './participant-signup/IsMinorStep';
import { AdultInfoStep } from './participant-signup/AdultInfoStep';
import { StudyInfoStep } from './participant-signup/StudyInfoStep';
import { mockStudies } from './participant-signup/mockData';
import { DropdownType, ParticipantInfo, StudyInfo } from './participant-signup/types';

// Animation variants
const onExitDuration = 0.5;
const formExitDuration = 0.5;

const slideVariants = {
    enter: {
        x: 50,
        opacity: 0,
    },
    center: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.3,
            delay: 0.3,
            ease: "easeOut",
        },
    },
    exit: {
        x: -50,
        opacity: 0,
        transition: {
            duration: onExitDuration,
            ease: "easeIn",
        },
    },
};

// Fade animation variants
const fadeVariants = {
    enter: {
        opacity: 0,
    },
    center: {
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 0.3,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
};

// Footer animation variants
const footerVariants = {
    hidden: {
        y: 100,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
    exit: {
        y: 100,
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: "easeIn",
        },
    },
};

interface FormComponentProps {
    onSubmit?: (e: React.FormEvent) => void;
    onBack?: () => void;
    className?: string;
    animationKey?: string; // Unique key for the animation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customVariants?: Record<string, any>; // Allow custom animation variants of any type
    currentStep?: number; // Optional prop to set the initial step
    onComplete: (participantInfo: ParticipantInfo, studyInfo: StudyInfo) => void;
}

export const FormComponent: React.FC<FormComponentProps> = ({
    className,
    animationKey = "form-content",
    currentStep: initialStep,
    onComplete,
}) => {
    // Animation states
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [hasAnimatedFooter, setHasAnimatedFooter] = useState(false);
    const [footerAnimationKey, setFooterAnimationKey] = useState("footer-initial");
    const [currentStep, setCurrentStep] = useState(initialStep || 0);

    const steps = ["Minor Info", "Personal Info", "Study Info"];
    const stepsForStepper = ["Personal Info", "Study Info"];

    // State for selected study
    const [selectedStudy, setSelectedStudy] = useState<StudyInfo | null>(null);

    // State for participant information
    const [participantInfo, setParticipantInfo] = useState<ParticipantInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        guardianName: '',
        guardianEmail: '',
        guardianPhone: '',
    });

    const [selectedStudyId, setSelectedStudyId] = useState<string>('');
    const [selectedOptions, setSelectedOptions] = useState<Record<DropdownType, string>>({
        enrollmentCenter: '',
        clinic: '',
        language: '',
    });
    const [error, setError] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formComplete, setFormComplete] = useState<boolean>(false);
    // Handler for updating participant information
    const updateParticipantInfo = (info: Partial<ParticipantInfo>) => {
        setParticipantInfo(prev => ({ ...prev, ...info }));
    };

    const handleStudySelect = (studyId: string) => {
        setSelectedStudyId(studyId);
        // Reset all dropdown selections when study changes
        setSelectedOptions({
            enrollmentCenter: '',
            clinic: '',
            language: '',
        });
        setError('');
    };

    const handleOptionSelect = (type: DropdownType, value: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            [type]: value
        }));
    };

    // Check if we should show the footer
    const showFooter = currentStep !== 0;

    // Track when currentStep changes to 1 to animate footer only once
    useEffect(() => {
        if (currentStep === 1 && !hasAnimatedFooter) {
            setHasAnimatedFooter(true);
            // Set a unique key for the initial animation
            setFooterAnimationKey("footer-animated");
        }
    }, [currentStep, hasAnimatedFooter]);

    // Component mount effect
    useEffect(() => {
        // Ensure component is visible when mounted
        setIsVisible(true);
        return () => {
            // Clean up on unmount
            setIsVisible(false);
        };
    }, []);

    useEffect(() => {
        if (formComplete) {
            const timer = setTimeout(() => {
                onComplete(participantInfo, selectedStudy!);
            }, formExitDuration * 1000);
            
            return () => clearTimeout(timer);
        }
    }, [formComplete]);


    const validatePersonalInfoForm = () => {
        const newErrors: Record<string, string> = {};

        if (!participantInfo.firstName?.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!participantInfo.lastName?.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!participantInfo.email?.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(participantInfo.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (participantInfo.phone && !/^\d{10}$/.test(participantInfo.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (participantInfo.zipcode && !/^\d{5}(-\d{4})?$/.test(participantInfo.zipcode)) {
            newErrors.zipcode = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStudyInfoForm = () => {
        console.log("Validating study info form");
        const newErrors: Record<string, string> = {};
        
        if (!selectedStudyId) { 
            newErrors.study = 'Please select a study to continue';
            setErrors(newErrors);
            return false;
        }

        const study = mockStudies.find(study => study.id === selectedStudyId);
        if (!study) {
            newErrors.study = 'Please select a study to continue';
            setErrors(newErrors);
            return false;
        }

        // Check if all required dropdowns have been selected
        const missingSelections = study.config.filter(
            type => !selectedOptions[type]
        );

        if (missingSelections.length > 0) {
            
            missingSelections.forEach(type => {
                let label = '';
                switch (type) {
                    case 'enrollmentCenter':
                        label = 'Enrollment Center';
                        break;
                    case 'clinic':
                        label = 'Clinic';
                        break;
                    case 'language':
                        label = 'Preferred Language';
                        break;
                    default:
                        label = type;
                }
                newErrors[type] = `Please select a ${label}`;
            });
            
            setErrors(newErrors);
            return false;
        }

        // Create a complete study info object with selected options
        const completeStudyInfo: StudyInfo = {
            ...study,
            selectedOptions: { ...selectedOptions }
        };

        // Update the parent component with the selected study
        setSelectedStudy(completeStudyInfo);
        console.log(completeStudyInfo);
        return true;
    };

    // Handle form submission with optional onSubmit
    const handleSubmit = () => {

        setIsExiting(true);

        // Wait for exit animation to complete before calling onNext
        const animationDuration = slideVariants.exit.transition.duration * 1000; // 300ms from exit transition
        setTimeout(() => {
            setIsVisible(false);
            // onSubmit(e);
        }, animationDuration);
    };

    const goToNextStep = () => {
        console.log("Going to next step", currentStep);
        switch (currentStep) {
            case 1:
                // validate form
                const isValidPersonalInfo = validatePersonalInfoForm();
                if (!isValidPersonalInfo) {
                    return;
                }
                break;
            case 2:
                // validate form
                const isValidStudyInfo = validateStudyInfoForm();
                if (!isValidStudyInfo) {
                    return;
                }
                break;
        }

        const tempStep = currentStep + 1;
        if (tempStep === 3) {
            handleSubmit();
            setFormComplete(true);
            return;
        }
        setCurrentStep(tempStep);
    };

    const goBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const renderStep = () => {
        console.log(currentStep, selectedStudy);

        switch (currentStep) {
            case 1:
                return (
                    <AdultInfoStep
                        updateParticipantInfo={updateParticipantInfo}
                        participantInfo={participantInfo}
                        errors={errors}
                    />
                );

            case 2:
                return (
                    <StudyInfoStep
                        selectedStudyId={selectedStudyId}
                        selectedOptions={selectedOptions}
                        handleStudySelect={handleStudySelect}
                        handleOptionSelect={handleOptionSelect}
                        errors={errors}
                    />
                );

            default:
                return (
                    <IsMinorStep
                        onNext={() => goToNextStep()}
                    />
                );
        }
    };

    // Get the appropriate animation variants based on the current step
    const getVariantsForStep = () => {
        // Use fade animation for the first step (IsMinorStep)
        if (currentStep === 0) {
            return fadeVariants;
        }

        if (currentStep === 1) {
            return slideVariants;
        }

        if (currentStep === 2) {
            return slideVariants;
        }
    };

    return (
        <div className={cn("flex flex-col h-[600px] relative p-4 pt-16", className)}>
            {currentStep > 0 && (
                <AnimatePresence>
                    {(!formComplete) && (
                        <motion.div
                            className="absolute top-0 left-0 p-4 pt-12 w-full"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                    >
                        <Stepper
                            steps={stepsForStepper}
                            currentStep={currentStep - 1}
                            className="mb-2"
                        />
                    </motion.div>)}
                </AnimatePresence>
            )}
            <AnimatePresence mode="wait">
                {!formComplete ? (
                    <motion.form
                        className="px-1 flex flex-col h-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: formExitDuration, ease: "easeInOut" }}
                    >
                        {/* Scrollable content area with animation */}
                        <AnimatePresence mode="wait">
                            {isVisible && !isExiting && (
                                <motion.div
                                    className="flex-1"
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={getVariantsForStep()}
                                    key={`${animationKey}-${currentStep}`}
                                >
                                    {renderStep()}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Fixed footer with buttons - only shown when needed */}
                        <AnimatePresence mode="wait">
                            {showFooter && (
                                <motion.div
                                    className="absolute bottom-0 p-4 left-0 right-0 flex justify-between w-full bg-primary/80 backdrop-blur-xs"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={footerVariants}
                                    key={footerAnimationKey}
                                >
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => goBack()}
                                        className="cursor-pointer bg-primary/70 hover:bg-primary/50 text-white"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="primary"
                                        className="cursor-pointer bg-secondary hover:bg-secondary/70"
                                        onClick={() => goToNextStep()}
                                    >
                                        {currentStep === steps.length - 1 ? "Submit" : "Next"}
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.form>
                ) : null}
            </AnimatePresence>
        </div>
    );
};