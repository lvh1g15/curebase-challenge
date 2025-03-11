import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import { ParticipantInfo } from './types';

interface MinorInfoStepProps {
  onNext: () => void;
  onBack: () => void;
  updateParticipantInfo: (info: Partial<ParticipantInfo>) => void;
  participantInfo: ParticipantInfo;
}

export const MinorInfoStep: React.FC<MinorInfoStepProps> = ({ 
  onNext, 
  onBack,
  updateParticipantInfo,
  participantInfo
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateParticipantInfo({ [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!participantInfo.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!participantInfo.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!participantInfo.guardianName?.trim()) {
      newErrors.guardianName = 'Guardian name is required';
    }
    
    if (!participantInfo.guardianEmail?.trim()) {
      newErrors.guardianEmail = 'Guardian email is required';
    } else if (!/\S+@\S+\.\S+/.test(participantInfo.guardianEmail)) {
      newErrors.guardianEmail = 'Please enter a valid email';
    }
    
    if (!participantInfo.guardianPhone?.trim()) {
      newErrors.guardianPhone = 'Guardian phone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Minor Participant Information</h2>
      <p className="text-sm text-gray-500 mb-4">
        Please provide information about the minor participant and their guardian.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
            First Name
          </label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={participantInfo.firstName || ''}
            onChange={handleChange}
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-1">
            Last Name
          </label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={participantInfo.lastName || ''}
            onChange={handleChange}
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
        
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-1">
            Date of Birth
          </label>
          <Input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={participantInfo.dateOfBirth || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="border-t border-gray-200 my-4 pt-4">
          <h3 className="text-lg font-medium mb-3">Guardian Information</h3>
        </div>
        
        <div>
          <label htmlFor="guardianName" className="block text-sm font-medium mb-1">
            Guardian Name
          </label>
          <Input
            type="text"
            id="guardianName"
            name="guardianName"
            value={participantInfo.guardianName || ''}
            onChange={handleChange}
            className={errors.guardianName ? 'border-red-500' : ''}
          />
          {errors.guardianName && <p className="text-red-500 text-xs mt-1">{errors.guardianName}</p>}
        </div>
        
        <div>
          <label htmlFor="guardianEmail" className="block text-sm font-medium mb-1">
            Guardian Email
          </label>
          <Input
            type="email"
            id="guardianEmail"
            name="guardianEmail"
            value={participantInfo.guardianEmail || ''}
            onChange={handleChange}
            className={errors.guardianEmail ? 'border-red-500' : ''}
          />
          {errors.guardianEmail && <p className="text-red-500 text-xs mt-1">{errors.guardianEmail}</p>}
        </div>
        
        <div>
          <label htmlFor="guardianPhone" className="block text-sm font-medium mb-1">
            Guardian Phone
          </label>
          <Input
            type="tel"
            id="guardianPhone"
            name="guardianPhone"
            value={participantInfo.guardianPhone || ''}
            onChange={handleChange}
            className={errors.guardianPhone ? 'border-red-500' : ''}
          />
          {errors.guardianPhone && <p className="text-red-500 text-xs mt-1">{errors.guardianPhone}</p>}
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
            type="submit" 
            variant="primary"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}; 