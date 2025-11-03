import React, { useState, MouseEvent } from 'react';

interface EmailFormProps {
    onSignupSuccess: () => void;
}

const validateEmail = (email: string): string | null => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
        return 'Please enter your email address.';
    }
    if (/\s/.test(trimmedEmail)) {
        return 'Email addresses cannot contain spaces.';
    }
    if (!trimmedEmail.includes('@')) {
        return "Oops! Your email is missing the '@' symbol.";
    }
    
    const parts = trimmedEmail.split('@');
    if (parts.length > 2) {
        return "An email should only contain one '@' symbol.";
    }

    const [localPart, domainPart] = parts;
    if (!localPart || !domainPart) {
        return 'Please check your email format (e.g., name@example.com).';
    }

    if (!domainPart.includes('.')) {
        return "Your email's domain appears to be missing a '.' (e.g., .com).";
    }
    if (domainPart.startsWith('.') || domainPart.endsWith('.')) {
        return "Your email's domain is formatted incorrectly.";
    }
    if (domainPart.includes('..')) {
        return "The domain part of your email cannot have consecutive dots.";
    }
    
    const tld = domainPart.split('.').pop() || '';
    if (tld.length < 2) {
        return 'Please enter a valid top-level domain (e.g., .com, .org).';
    }
    
    const generalRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!generalRegex.test(trimmedEmail)) {
        return 'Please enter a valid email address.';
    }

    return null; 
};

const CTAEmailForm: React.FC<EmailFormProps> = ({ onSignupSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [inspirationOptIn, setInspirationOptIn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const errorMessage = validateEmail(email);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }
        setError('');

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            const newEntry = {
                name: name.trim() || 'N/A',
                email: email.trim(),
                inspirationOptIn,
                date: new Date().toLocaleString(),
            };
            try {
                const signups = JSON.parse(localStorage.getItem('rippl_signups') || '[]');
                signups.push(newEntry);
                localStorage.setItem('rippl_signups', JSON.stringify(signups));
            } catch (e) {
                console.error("Could not save to local storage", e);
            }
            onSignupSuccess();
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First Name (optional)"
                    className="w-full px-5 py-3 rounded-full bg-white/20 border-2 border-white/40 text-white placeholder-slate-200 focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white transition-all"
                    disabled={loading}
                    aria-label="First Name"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                    }}
                    placeholder="Your email address..."
                    className="w-full px-5 py-3 rounded-full bg-white/20 border-2 border-white/40 text-white placeholder-slate-200 focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white transition-all"
                    disabled={loading}
                    aria-label="Email Address"
                    required
                />
            </div>
            <div className="flex items-center justify-center">
                 <input
                    type="checkbox"
                    id="inspiration-cta"
                    checked={inspirationOptIn}
                    onChange={(e) => setInspirationOptIn(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 bg-white/30 text-fuchsia-500 focus:ring-fuchsia-500 cursor-pointer"
                />
                <label htmlFor="inspiration-cta" className="ml-2 block text-sm text-slate-100 cursor-pointer">
                    Send me kindness inspiration while I wait!
                </label>
            </div>
            <div>
                 <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 rounded-full bg-white text-fuchsia-600 font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:bg-gray-500 disabled:animate-pulse"
                >
                    {loading ? 'Submitting...' : 'Join the Waitlist'}
                </button>
            </div>
             {error && <p className="text-yellow-300 mt-2 text-sm">{error}</p>}
        </form>
    );
};


interface CTAProps {
    onSignupSuccess: () => void;
    joinTheJoyRef: React.RefObject<HTMLElement>;
}

const CTA: React.FC<CTAProps> = ({ onSignupSuccess, joinTheJoyRef }) => {
    return (
        <section ref={joinTheJoyRef} className="py-20 sm:py-24">
            <div className="container mx-auto px-6">
                <div className="bg-gradient-to-r from-fuchsia-600 to-orange-500 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Ready to Create Your Ripple Effect?
                    </h2>
                    <p className="text-lg text-slate-200 max-w-2xl mx-auto">
                        Join our community of kind-hearted people and be the first to experience Rippl.
                    </p>
                    <CTAEmailForm onSignupSuccess={onSignupSuccess} />
                </div>
            </div>
        </section>
    );
};

export default CTA;