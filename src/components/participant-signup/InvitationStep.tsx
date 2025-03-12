import React, { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { ParticipantInfo, StudyInfo } from './types';
import { Check, Send } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
  const [showContent, setShowContent] = useState(false);
  const [heightAnimationComplete, setHeightAnimationComplete] = useState(false);
  const [gradientImage, setGradientImage] = useState<number>(1);
  const [imageAnimationReady, setImageAnimationReady] = useState(false);
  
  // Select a random gradient image on component mount
  useEffect(() => {
    const randomGradient = Math.floor(Math.random() * 3) + 1;
    setGradientImage(randomGradient);
  }, []);
  
  // Show content after a short delay for the animation to be visible
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Trigger image animation after height animation completes
  useEffect(() => {
    if (heightAnimationComplete) {
      const timer = setTimeout(() => {
        setImageAnimationReady(true);
      }, 200); // Small delay before starting image animation
      
      return () => clearTimeout(timer);
    }
  }, [heightAnimationComplete]);

  // Container variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  // Child variants for the cascading effect
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Gradient image animation variants
  const gradientVariants = {
    hidden: { opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 2.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative">
      {/* Gradient background */}
      <div className="absolute -top-20 left-0 w-full h-[60%] overflow-hidden -z-10">
        <motion.div 
          className="relative w-full aspect-[1.84/1]"
          variants={gradientVariants}
          initial="hidden"
          animate={imageAnimationReady ? "visible" : "hidden"}
        >
          <Image 
            src={`/gradients/${gradientImage}.jpg`}
            width={1000}
            height={1000}
            alt="Background gradient"
            priority
            className="object-fill"
          />
        </motion.div>
      </div>
      
      <motion.div 
        className="overflow-hidden w-full relative z-10"
        initial={{ height: "600px" }}
        animate={{ height: showContent ? "auto" : "600px" }}
        transition={{ 
          duration: 0.5,
          ease: "easeInOut"
        }}
        onAnimationComplete={() => setHeightAnimationComplete(true)}
      >
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div 
              className="flex flex-col items-center p-4 gap-8 mt-10"
              variants={containerVariants}
              initial="hidden"
              animate={heightAnimationComplete ? "visible" : "hidden"}
            >
              {/* Header with success message */}
              <motion.div variants={childVariants} className="flex flex-col w-full text-center gap-8">
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl font-semibold">Participant Added</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {studyInfo.isDataCollection 
                      ? "You're one step closer to collecting results."
                      : "Participant information has now been stored"}
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                </div>
              </motion.div>

              {/* Participant card */}
              <motion.div variants={childVariants} className="flex flex-col gap-4 w-full bg-primary dark:bg-gray-800 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-800 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">{participantInfo.firstName} {participantInfo.lastName}</p>
                    <p className="text-sm text-primary-300 dark:text-gray-400">{participantInfo.email}</p>
                  </div>
                </div>
                <Separator orientation="horizontal" className="bg-primary-700 dark:bg-gray-700" />

                <div className="flex items-center gap-2">
                  <div className="size-6 flex-shrink-0">
                    <svg className="w-full h-full text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-primary-300 dark:text-gray-300">{studyInfo.name}</p>
                </div>
              </motion.div>

              {/* Status section - Only show for data collection studies */}
              {studyInfo.isDataCollection && (
                <motion.div variants={childVariants} className="w-full space-y-4">
                  <h3 className="text-lg font-medium">Next steps</h3>
                  
                  {/* Completed step with strikethrough */}
                  <div className="flex items-center gap-4">
                    <div className="size-6 bg-primary-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="size-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-normal text-sm line-through text-primary-400">Participant added to study</p>
                    </div>
                  </div>

                  {/* Next step highlighted */}
                  <div className="flex items-center gap-4 relative">
                    <div className="size-6 bg-secondary-900 rounded-full flex items-center justify-center flex-shrink-0 ring-4 ring-secondary-100 dark:ring-secondary-900">
                      <Send className="size-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm dark:text-gray-300">Invite participant to create an account to start collecting results</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action buttons */}
              <motion.div variants={childVariants} className="flex flex-col gap-2 w-full">
                <div className="w-full">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={onComplete}
                    className="w-full py-3 rounded-full hover:bg-black-700 text-white font-medium cursor-pointer"
                  >
                    {studyInfo.isDataCollection ? (
                      <>
                        <Send className="size-3.5 mr-2 text-white" />
                        Invite to create account
                      </>
                    ) : (
                      "Great"
                    )}
                  </Button>
                </div>

                {studyInfo.isDataCollection && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onComplete}
                      className="w-full py-3 rounded-full text-gray-500 hover:bg-gray-50 font-medium cursor-pointer"
                    >
                      Maybe later
                    </Button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
