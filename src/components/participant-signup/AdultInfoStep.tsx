'use client';
// import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import { ParticipantInfo } from './types';
// import { FormComponent } from '@/components/FormComponent';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface AdultInfoStepProps {
    updateParticipantInfo: (info: Partial<ParticipantInfo>) => void;
    participantInfo: ParticipantInfo;
    errors: Record<string, string>;
}

export const AdultInfoStep: React.FC<AdultInfoStepProps> = ({
    updateParticipantInfo,
    participantInfo,
    errors
}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateParticipantInfo({ [name]: value });
    };

    const handleSelectChange = (value: string, name: string) => {
        updateParticipantInfo({ [name]: value });
    };

    return (
        <div className="flex flex-col gap-8 mt-10 mb-20">
            <div className="flex flex-col gap-2 px-12">
                <h2 className="text-2xl font-semibold text-center">Participant Information</h2>
                <p className="text-sm text-gray-500 text-center">
                    A minor is defined as a participant who is less than 13 years old.
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className="flex-1">
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

                    <div className="flex-1">
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
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={participantInfo.email || ''}
                        onChange={handleChange}
                        className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number
                    </label>
                    <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={participantInfo.phone || ''}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                        className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="flex gap-4">
                    <div className="flex-grow">
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

                    <div className="flex-1">
                        <label htmlFor="status" className="block text-sm font-medium mb-1">
                            Status
                        </label>
                        <Select
                            value={participantInfo.status || ''}
                            onValueChange={(value) => handleSelectChange(value, 'status')}
                        >
                            <SelectTrigger id="status" className={errors.status ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="alive">Alive</SelectItem>
                                <SelectItem value="deceased">Deceased</SelectItem>
                                <SelectItem value="unknown">Unknown</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label htmlFor="zipcode" className="block text-sm font-medium mb-1">
                            ZIP Code
                        </label>
                        <Input
                            type="text"
                            id="zipcode"
                            name="zipcode"
                            value={participantInfo.zipcode || ''}
                            onChange={handleChange}
                            placeholder="12345"
                            className={errors.zipcode ? 'border-red-500' : ''}
                        />
                        {errors.zipcode && <p className="text-red-500 text-xs mt-1">{errors.zipcode}</p>}
                    </div>

                    <div className="flex-1">
                        <label htmlFor="timezone" className="block text-sm font-medium mb-1">
                            Timezone
                        </label>
                        <Select
                            value={participantInfo.timezone || ''}
                            onValueChange={(value) => handleSelectChange(value, 'timezone')}
                        >
                            <SelectTrigger id="timezone" className="w-full"> 
                                <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                                <SelectItem value="America/Anchorage">Alaska Time (AKT)</SelectItem>
                                <SelectItem value="Pacific/Honolulu">Hawaii Time (HT)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
}; 