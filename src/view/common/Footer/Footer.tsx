import React from 'react';
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    Phone,
    Ticket
} from 'lucide-react';

interface FooterLink {
    name: string;
    href: string;
}

interface SocialLink {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    color: string;
}

interface FooterLinks {
    [key: string]: FooterLink[];
}

export function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks: FooterLinks = {
        'Quick Links': [
            { name: 'Home', href: '#' },
            { name: 'Events', href: '#events' },
            { name: 'About Us', href: '#about' },
            { name: 'Contact', href: '#contact' },
            { name: 'Help Center', href: '#help' }
        ],
        'Categories': [
            { name: 'Concerts', href: '#concerts' },
            { name: 'Sports', href: '#sports' },
            { name: 'Theater', href: '#theater' },
            { name: 'Festivals', href: '#festivals' },
            { name: 'Comedy', href: '#comedy' }
        ],
        'Support': [
            { name: 'Customer Service', href: '#support' },
            { name: 'Refund Policy', href: '#refund' },
            { name: 'Terms of Service', href: '#terms' },
            { name: 'Privacy Policy', href: '#privacy' },
            { name: 'Cookie Policy', href: '#cookies' }
        ]
    }

    const socialLinks: SocialLink[] = [
        { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
        { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
        { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
        { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' }
    ]

    return (
        <footer className="bg-gray-800 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12 lg:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        <div className="lg:col-span-1">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                    <Ticket className="h-5 w-5 text-white" />
                                </div>
                                <span className="font-bold text-xl text-gray-100">BookMyVibe</span>
                            </div>
                            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                                Your ultimate destination for discovering and booking tickets to the most exciting events.
                                From concerts to sports, theater to festivals - we've got your entertainment covered.
                            </p>

                            <div className="flex space-x-4">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            className={`text-gray-400 ${social.color} transition-colors duration-200`}
                                            aria-label={social.name}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>

                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h3 className="font-semibold text-gray-100 mb-4">{category}</h3>
                                <ul className="space-y-3">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                className="text-sm text-gray-100 hover:text-gray-300 transition-colors duration-200"
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="max-w-md">
                            <h3 className="font-semibold text-gray-100 mb-2">Stay Updated</h3>
                            <p className="text-sm text-gray-300 mb-4">
                                Subscribe to our newsletter for the latest events and exclusive offers.
                            </p>
                            <div className="flex space-x-2">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="text-gray-300 flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200"></div>

                <div className="py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="text-sm text-gray-400">
                            © {currentYear} BookMyVibe. All rights reserved.
                        </div>
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>support@bookmyvibe.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>0771234567</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
