import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ContactFormData {
    inquiryType: string;
    organizerName: string;
    companyName: string;
    eventGenre: string;
    expectedTicketCount: string;
    email: string;
    countryCode: string;
    mobile: string;
    message: string;
}

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        inquiryType: '',
        organizerName: '',
        companyName: '',
        eventGenre: '',
        expectedTicketCount: '',
        email: '',
        countryCode: '+94',
        mobile: '',
        message: ''
    });

    const [dropdownStates, setDropdownStates] = useState({
        inquiryType: false,
        eventGenre: false,
        country: false
    });

    const inquiryTypes = [
        'I want to host my event on My Tickets',
        'General Inquiry',
        'Technical Support',
        'Partnership Opportunity',
        'Media Inquiry'
    ];

    const eventGenres = [
        'Music',
        'Theater',
        'Sports',
        'Conference',
        'Workshop',
        'Comedy',
        'Dance',
        'Festival',
        'Exhibition',
        'Other'
    ];

    const countries = [
        { code: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
        { code: '+1', name: 'United States', flag: '🇺🇸' },
        { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
        { code: '+91', name: 'India', flag: '🇮🇳' },
        { code: '+61', name: 'Australia', flag: '🇦🇺' }
    ];

    const handleInputChange = (field: keyof ContactFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleDropdown = (dropdown: keyof typeof dropdownStates) => {
        setDropdownStates(prev => ({
            ...prev,
            [dropdown]: !prev[dropdown]
        }));
    };

    const selectOption = (field: keyof ContactFormData, value: string, dropdown: keyof typeof dropdownStates) => {
        handleInputChange(field, value);
        setDropdownStates(prev => ({ ...prev, [dropdown]: false }));
    };

    const handleSubmit = () => {
        if (isFormValid()) {
            console.log('Form submitted:', formData);
            // Handle form submission logic here
            alert('Form submitted successfully!');
        }
    };

    const isFormValid = () => {
        return formData.inquiryType &&
            formData.organizerName &&
            formData.companyName &&
            formData.eventGenre &&
            formData.expectedTicketCount &&
            formData.email &&
            formData.mobile &&
            formData.message;
    };

    return (
        <div className="container max-w-screen-xl my-6 sm:my-12 flex justify-center">
            <div className="max-w-4xl w-full rounded-lg bg-gray-50 p-6 sm:p-10 flex flex-col gap-6">
                <h6 className="text-xl font-medium text-gray-900">
                    Reach out to us for any inquiries
                </h6>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 relative">
                    {/* Inquiry Type - Full Width */}
                    <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none text-gray-700">
                                <span className="text-red-500">*</span>Inquiry Type
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => toggleDropdown('inquiryType')}
                                    className="flex h-8 sm:h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                  <span className={formData.inquiryType ? 'text-gray-900' : 'text-gray-500'}>
                    {formData.inquiryType || 'Select inquiry type'}
                  </span>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </button>
                                {dropdownStates.inquiryType && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                        {inquiryTypes.map((type) => (
                                            <div
                                                key={type}
                                                onClick={() => selectOption('inquiryType', type, 'inquiryType')}
                                                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                            >
                                                {type}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Organizer Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-gray-700">
                            <span className="text-red-500">*</span>Organizer Name
                        </label>
                        <input
                            type="text"
                            value={formData.organizerName}
                            onChange={(e) => handleInputChange('organizerName', e.target.value)}
                            placeholder="Enter your organizer name"
                            className="flex h-8 sm:h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    {/* Company Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-gray-700">
                            <span className="text-red-500">*</span>Company Name
                        </label>
                        <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                            placeholder="Enter your company name"
                            className="flex h-8 sm:h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    {/* Event Genre */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-gray-700">
                            <span className="text-red-500">*</span>Event Genre
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => toggleDropdown('eventGenre')}
                                className="flex h-8 sm:h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                <span className={formData.eventGenre ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.eventGenre || 'Select event genre'}
                </span>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </button>
                            {dropdownStates.eventGenre && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                    {eventGenres.map((genre) => (
                                        <div
                                            key={genre}
                                            onClick={() => selectOption('eventGenre', genre, 'eventGenre')}
                                            className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                        >
                                            {genre}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Expected Ticket Count */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-gray-700">
                            <span className="text-red-500">*</span>Expected Ticket Count
                        </label>
                        <input
                            type="number"
                            value={formData.expectedTicketCount}
                            onChange={(e) => handleInputChange('expectedTicketCount', e.target.value)}
                            placeholder="Enter ticket count"
                            className="flex h-8 sm:h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-gray-700">
                            <span className="text-red-500">*</span>Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Enter your email address"
                            className="flex h-8 sm:h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    {/* Contact Number */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-gray-700">
                            <span className="text-red-500">*</span>Contact Number
                        </label>
                        <div className="flex">
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => toggleDropdown('country')}
                                    className="flex h-8 sm:h-10 items-center justify-between rounded-l-md border border-r-0 border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                  <span className="mr-2">
                    {countries.find(c => c.code === formData.countryCode)?.flag} {formData.countryCode}
                  </span>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </button>
                                {dropdownStates.country && (
                                    <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                        {countries.map((country) => (
                                            <div
                                                key={country.code}
                                                onClick={() => selectOption('countryCode', country.code, 'country')}
                                                className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                            >
                                                <span className="mr-2">{country.flag}</span>
                                                <span className="mr-2">{country.code}</span>
                                                <span className="text-gray-600">{country.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <input
                                type="tel"
                                value={formData.mobile}
                                onChange={(e) => handleInputChange('mobile', e.target.value)}
                                placeholder="Enter your mobile number"
                                className="flex h-8 sm:h-10 w-full rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* Message - Full Width */}
                    <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-medium leading-none text-gray-700">
                            <span className="text-red-500">*</span>Message
                        </label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            placeholder="Enter your message"
                            rows={4}
                            className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="sm:col-span-2 flex justify-end">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!isFormValid()}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-8 sm:h-10 px-3 sm:px-4 py-2 w-full sm:w-fit"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};