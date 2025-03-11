import React from 'react';
import { cn } from '@/lib/utils';

export interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep, className }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn("w-full flex flex-col", className)}
      >
        {/* Progress bars */}
        <div className="flex gap-2 w-full mb-2">
          {steps.map((_, index) => {
            // For the progress bars, we consider a step active if it's the current step or before
            const isPast = index < currentStep;
            const isActive = index === currentStep;
            const isFuture = index > currentStep;
            
            return (
              <div 
                key={`progress-${index}`}
                className={cn(
                  "h-1 flex-1",
                  index === 0 ? "rounded-full" : "",
                  index === steps.length - 1 ? "rounded-full" : "",
                  isActive && "bg-blue-600",
                  isPast && "bg-blue-600",
                  isFuture && "bg-gray-200"
                )}
              />
            );
          })}
        </div>
        
        {/* Step labels */}
        <div className="flex w-full gap-2">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isPast = index < currentStep;
            const isFuture = index > currentStep;
            
            // Calculate width to ensure labels are properly aligned with progress bars
            const width = `${100 / steps.length}%`;
            
            return (
              <div 
                key={`label-${step}`}
                className="flex flex-col items-start"
                style={{ width }}
              >
                <span 
                  className={cn(
                    "text-sm font-normal",
                    isActive && "text-blue-600",
                    isPast && "text-blue-600",
                    isFuture && "text-gray-400"
                  )}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

Stepper.displayName = "Stepper"; 