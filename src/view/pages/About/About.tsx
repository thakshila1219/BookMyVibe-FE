import React from 'react';

interface StatCardProps {
    value: string;
    label: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label }) => (
    <div className="flex items-center flex-col gap-2">
        <div className="w-36 h-36 flex justify-center items-center border-[1.5rem] border-blue-600 rounded-full">
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <p className="text-gray-700 text-sm font-medium text-center">{label}</p>
    </div>
);

export const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gray-800 text-white">
                <div className="container mx-auto max-w-screen-xl px-4">
                    <div className="pt-12 sm:pt-24 pb-12 sm:pb-16">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Who We Are</h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto max-w-screen-xl px-4">
                <div className="my-12 sm:my-24 flex flex-col gap-12 sm:gap-24">

                    {/* Established and Experience Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                        <div className="flex flex-col gap-4 sm:gap-6">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Established in <span className="text-blue-600">2014</span>
                            </h2>
                            <p className="text-gray-700 text-base leading-relaxed">
                                BookMyVibe, Sri Lanka's official ticket marketplace for all your entertainment
                                needs. We are dedicated to delivering an exceptional experience, ensuring the
                                highest standards in ticketing services. As your most trusted and reliable
                                online ticket partner, we strive to make every event unforgettable.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 sm:gap-6">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Industry <span className="text-blue-600">Experiences</span>
                            </h2>
                            <p className="text-gray-700 text-base leading-relaxed">
                                Our journey began in <strong>2024</strong> when we established ourselves as a
                                professional event management company. Now, with{' '}
                                <strong>over 1 years of invaluable industry experience and strong connections
                                    with industry experts,</strong> we are thrilled to unveil a fresh and exciting
                                experience for our entertainment enthusiasts through{' '}
                                <strong>BookMyVibe.</strong>
                            </p>
                        </div>
                    </div>

                    {/* Founder Quote Section */}
                    <div className="bg-gray-800 overflow-hidden rounded-2xl p-8 sm:p-16 text-center flex justify-center items-center relative">
                        {/* Diagonal stripe pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-[0_-5rem_0_60%] bg-gradient-to-r from-white/20 from-[1px] to-transparent to-[1px] bg-[length:8px] -skew-x-[26deg] hidden lg:block"></div>
                        </div>

                        <div className="max-w-4xl flex flex-col gap-4 relative z-10">
                            <blockquote className="text-white text-base sm:text-lg lg:text-xl font-medium leading-relaxed">
                                "I firmly believe that the magic of live entertainment should be{' '}
                                <span className="text-blue-400">
                  accessible to all, empowering individuals to embrace extraordinary experiences
                </span>{' '}
                                that enlighten their spirits and inspire lifelong memories".
                            </blockquote>
                            <cite className="text-gray-300 text-xs sm:text-sm font-medium not-italic">
                                - Founder / CEO
                            </cite>
                        </div>
                    </div>

                    {/* Company Highlights */}
                    <div className="flex flex-col justify-center items-center gap-6 sm:gap-10">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
                            Company <span className="text-blue-600">Highlights</span>
                        </h2>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-14 w-full max-w-6xl">
                            <StatCard value="20+" label="Years In Show Biz" />
                            <StatCard value="85%+" label="Market Penetration" />
                            <StatCard value="1.2k+" label="Local Events" />
                            <StatCard value="50+" label="International Events" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
