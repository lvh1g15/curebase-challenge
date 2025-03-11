import React, { useState } from 'react';
import { DropdownType, StudyInfo } from './types';
import { mockStudies, mockEnrollmentCenters, mockClinics, mockLanguages } from './mockData';
import { motion } from 'framer-motion';
import { FormComponent } from '@/components/FormComponent';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Animation variants
const contentVariants = {
  enter: {
    x: 100,
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// Dropdown animation variants
const dropdownVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    height: 0
  },
  visible: { 
    opacity: 1,
    y: 0,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.3,
      delay: 0.2
    }
  }
};

// Individual dropdown item animation
const dropdownItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

interface StudyInfoStepProps {
  onNext: () => void;
  onBack: () => void;
  setSelectedStudy: (study: StudyInfo) => void;
}

export const StudyInfoStep: React.FC<StudyInfoStepProps> = ({ onNext, onBack, setSelectedStudy }) => {
  const [selectedStudyId, setSelectedStudyId] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Record<DropdownType, string>>({
    enrollmentCenter: '',
    clinic: '',
    language: '',
  });
  const [error, setError] = useState<string>('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudyId) {
      setError('Please select a study to continue');
      return;
    }
    
    const study = mockStudies.find(study => study.id === selectedStudyId);
    if (!study) return;
    
    // Check if all required dropdowns have been selected
    const missingSelections = study.config.filter(
      type => !selectedOptions[type]
    );
    
    if (missingSelections.length > 0) {
      setError(`Please select ${missingSelections.join(', ')} to continue`);
      return;
    }
    
    // Create a complete study info object with selected options
    const completeStudyInfo: StudyInfo = {
      ...study,
      selectedOptions: { ...selectedOptions }
    };
    
    // Update the parent component with the selected study
    setSelectedStudy(completeStudyInfo);
    
    onNext();
  };

  // Get the currently selected study
  const selectedStudy = selectedStudyId 
    ? mockStudies.find(s => s.id === selectedStudyId) 
    : null;

  // Render a specific dropdown based on type
  const renderDropdown = (type: DropdownType) => {
    let options: { id: string; name: string }[] = [];
    let label = '';
    
    switch (type) {
      case 'enrollmentCenter':
        options = mockEnrollmentCenters;
        label = 'Enrollment Center';
        break;
      case 'clinic':
        options = mockClinics;
        label = 'Clinic';
        break;
      case 'language':
        options = mockLanguages;
        label = 'Preferred Language';
        break;
    }
    
    return (
      <motion.div 
        className="form-control w-full mt-4" 
        key={type}
        variants={dropdownItemVariants}
      >
        <label className="block text-sm font-medium mb-1" htmlFor={`${type}-select`}>
          {label}
        </label>
        <Select 
          value={selectedOptions[type]} 
          onValueChange={(value) => handleOptionSelect(type, value)}
        >
          <SelectTrigger id={`${type}-select`} className="w-full">
            <SelectValue placeholder={`Select a ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    );
  };

  const renderContent = () => {
    return (
      <motion.div
        className="flex flex-col gap-4"
        initial="enter"
        animate="center"
        exit="exit"
        variants={contentVariants}
        key="study-info-step"
      >
        <div className="flex flex-col gap-2 px-12 mb-4">
          <h2 className="text-2xl font-semibold text-center">Select a Study</h2>
          <p className="text-sm text-gray-500 text-center">
            Please select a study you would like to participate in.
          </p>
        </div>
        
        <div>
          <div className="form-control w-full">
            <label className="block text-sm font-medium mb-1" htmlFor="study-select">
              Study
            </label>
            <Select value={selectedStudyId} onValueChange={(value) => handleStudySelect(value)}>
              <SelectTrigger id="study-select" className="w-full">
                <SelectValue placeholder="Select a study" />
              </SelectTrigger>
              <SelectContent>
                {mockStudies.map(study => (
                  <SelectItem key={study.id} value={study.id}>
                    {study.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        
          
          {/* Render dynamic dropdowns based on selected study config */}
          {selectedStudy && (
            <motion.div 
              className="mt-4"
              initial="hidden"
              animate="visible"
              variants={dropdownVariants}
            >
              {selectedStudy.config.map(dropdownType => 
                renderDropdown(dropdownType)
              )}
            </motion.div>
          )}
        </div>
        
        {error && (
          <p className="text-red-500 text-sm mt-1 px-4">{error}</p>
        )}
      </motion.div>
    );
  };

  return (
    <FormComponent onSubmit={handleSubmit} onBack={onBack}>
      <div className='mb-20 mt-10'>
        {renderContent()}
      </div>
      {/* {renderContent()} */}
    </FormComponent>
  );
}; 