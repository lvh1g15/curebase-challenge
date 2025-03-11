import React, { ReactNode, useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Stepper } from '@/components/ui/stepper';

// Animation variants
const onExitDuration = 0.3;

const contentVariants = {
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

interface FormComponentProps {
    onSubmit?: (e: React.FormEvent) => void;
    onBack?: () => void;
    children: ReactNode;
    className?: string;
    animationKey?: string; // Unique key for the animation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customVariants?: Record<string, any>; // Allow custom animation variants of any type
    validateForm?: () => boolean; // Optional validation function
    currentStep?: number; // Current step in the form process
}

export const FormComponent: React.FC<FormComponentProps> = ({
    onSubmit,
    onBack,
    children,
    className,
    animationKey = "form-content",
    customVariants = contentVariants,
    validateForm,
    currentStep = 0
}) => {
    // Animation states
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const steps = ["Minor Info", "Personal Info", "Study Info"];
    const stepsForStepper = ["Personal Info", "Study Info"];
    
    // Check if we should show the footer
    const showFooter = onSubmit !== undefined || onBack !== undefined;
    
    // Component mount effect
    useEffect(() => {
        // Ensure component is visible when mounted
        setIsVisible(true);
        return () => {
            // Clean up on unmount
            setIsVisible(false);
        };
    }, []);
    
    // Handle form submission with optional onSubmit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (onSubmit) {
            // If validateForm is provided, use it, otherwise default to true
            const isValid = validateForm ? validateForm() : true;
            
            if (isValid) {
                // Set exiting state to trigger exit animation
                setIsExiting(true);
                
                // Wait for exit animation to complete before calling onNext
                const animationDuration = customVariants.exit.transition.duration * 1000; // 300ms from exit transition
                setTimeout(() => {
                    setIsVisible(false);
                    onSubmit(e);
                }, animationDuration);
            }
        }
    };

    // Use provided variants or default
    const variants = customVariants || contentVariants;

    return (
        <div className={cn("flex flex-col h-[600px] relative p-4", className)}>
            {/* Stepper component at the top */}
            {currentStep > 0 && (
              <div className="mt-2 mb-2">
                <Stepper 
                    steps={stepsForStepper} 
                    currentStep={currentStep - 1} 
                    className="mb-2"
                />
              </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {/* Scrollable content area with animation */}
                <AnimatePresence mode="wait">
                    {isVisible && !isExiting && (
                        <motion.div 
                            className="flex-1"
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={variants}
                            key={animationKey}
                        >
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Fixed footer with buttons - only shown when needed */}
                {showFooter && (
                    <div className="absolute bottom-0 p-4 left-0 right-0 flex justify-between w-full bg-white/20 backdrop-blur-sm border-t border-gray-100">
                        {onBack && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onBack}
                            >
                                Back
                            </Button>
                        )}
                        {onSubmit && (
                            <Button
                                type="submit"
                                variant="primary"
                            >
                                {currentStep === steps.length - 1 ? "Submit" : "Next"}
                            </Button>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};