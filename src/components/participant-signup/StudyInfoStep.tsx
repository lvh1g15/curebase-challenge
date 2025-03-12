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
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

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
  handleStudySelect: (studyId: string) => void;
  handleOptionSelect: (type: DropdownType, value: string) => void;
  selectedStudyId: string;
  selectedOptions: Record<DropdownType, string>;
  error: string;
}

export const StudyInfoStep: React.FC<StudyInfoStepProps> = ({ handleStudySelect, handleOptionSelect, selectedStudyId, selectedOptions, error }) => {


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
          <h2 className="text-2xl font-semibold text-center">Study information</h2>
          <p className="text-sm text-gray-500 text-center">
            This will tell us which study to add the participant to.
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
              {selectedStudy && selectedStudy.isDataCollection && (
                <Alert className="mb-4" variant={"primary"}>
                  <svg width="32px" height="32px" stroke-width="1.6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ff6237"><path d="M11.9996 14.9995C13.6565 14.9995 14.9996 13.6564 14.9996 11.9995C14.9996 10.3427 13.6565 8.99951 11.9996 8.99951C10.3428 8.99951 8.99963 10.3427 8.99963 11.9995C8.99963 13.6564 10.3428 14.9995 11.9996 14.9995Z" stroke="#ff6237" stroke-width="1.6" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13 9C13 9 14 7 14 5C14 3 12 1 12 1C12 1 10 3 10 5C10 7 11 9 11 9" stroke="#ff6237" stroke-width="1.6" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 11C9 11 7 10 5 10C3 10 1 12 1 12C1 12 3 14 5 14C7 14 9 13 9 13" stroke="#ff6237" stroke-width="1.6" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13 15C13 15 14 17 14 19C14 21 12 23 12 23C12 23 10 21 10 19C10 17 11 15 11 15" stroke="#ff6237" stroke-width="1.6" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 11C15 11 17 10 19 10C21 10 23 12 23 12C23 12 21 14 19 14C17 14 15 13 15 13" stroke="#ff6237" stroke-width="1.6" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.5858 9.17176C10.5858 9.17176 9.87868 7.05044 8.46447 5.63623C7.05026 4.22202 4.22183 4.22202 4.22183 4.22202C4.22183 4.22202 4.22183 7.05044 5.63604 8.46466C7.05026 9.87887 9.17158 10.586 9.17158 10.586" stroke="#ff6237" stroke-width="1.6" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.17152 13.4142C9.17152 13.4142 7.0502 14.1213 5.63599 15.5355C4.22177 16.9497 4.22177 19.7782 4.22177 19.7782C4.22177 19.7782 7.0502 19.7782 8.46441 18.364C9.87863 16.9497 10.5857 14.8284 10.5857 14.8284" stroke="#ff6237" stroke-width="1.6" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.8285 13.4142C14.8285 13.4142 16.9498 14.1213 18.364 15.5355C19.7782 16.9497 19.7782 19.7782 19.7782 19.7782C19.7782 19.7782 16.9498 19.7782 15.5356 18.364C14.1214 16.9497 13.4143 14.8284 13.4143 14.8284" stroke="#ff6237" stroke-width="1.6" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.4142 9.17176C13.4142 9.17176 14.1213 7.05044 15.5355 5.63623C16.9497 4.22202 19.7782 4.22202 19.7782 4.22202C19.7782 4.22202 19.7782 7.05044 18.364 8.46466C16.9497 9.87887 14.8284 10.586 14.8284 10.586" stroke="#ff6237" stroke-width="1.6" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  <AlertTitle>Data Collection Study</AlertTitle>
                  <AlertDescription>
                    You&apos;ll have the option to invite this user to create an account in the next step so you can start collecting data.
                  </AlertDescription>
                </Alert>
              )}
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
    <div className='mb-20 mt-10'>
      {renderContent()}
    </div>
  );
}; 