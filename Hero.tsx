import React, { useState } from 'react';

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


const EmailForm: React.FC<EmailFormProps> = ({ onSignupSuccess }) => {
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
        // Simulate API call
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
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto lg:mx-0 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First Name (optional)"
                    className="w-full px-5 py-3 rounded-full bg-white border-2 border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-all"
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
                    className="w-full px-5 py-3 rounded-full bg-white border-2 border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-all"
                    disabled={loading}
                    aria-label="Email Address"
                    required
                />
            </div>

            <div className="flex items-center justify-center lg:justify-start">
                <input
                    type="checkbox"
                    id="inspiration-hero"
                    checked={inspirationOptIn}
                    onChange={(e) => setInspirationOptIn(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                />
                <label htmlFor="inspiration-hero" className="ml-2 block text-sm text-slate-600 cursor-pointer">
                    Send me kindness inspiration while I wait!
                </label>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 rounded-full bg-cyan-400 text-slate-900 font-bold hover:bg-cyan-300 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:bg-gray-500 disabled:animate-pulse"
                >
                    {loading ? 'Joining...' : 'Join the Waitlist'}
                </button>
            </div>
            {error && <p className="text-red-500 text-sm text-center lg:text-left">{error}</p>}
            <p className="text-sm text-slate-500 mt-3 text-center lg:text-left">
                Get on the list for early access + a special thank you gift!
            </p>
        </form>
    );
};

const MissionCard: React.FC<{ icon: string; title: string; description: string; className: string; rotation: number; zIndex: number; topOffset: number; }> = ({ icon, title, description, className, rotation, zIndex, topOffset }) => (
    <div 
        className={`absolute w-[90%] left-[5%] p-4 rounded-2xl shadow-lg transition-all duration-300 ease-in-out ${className}`}
        style={{ 
            transform: `rotate(${rotation}deg)`, 
            zIndex: zIndex,
            top: `${topOffset}px`,
        }}
    >
        <div className="flex items-center mb-2">
            <span className="text-2xl mr-3">{icon}</span>
            <h3 className="font-bold text-slate-800 text-base">{title}</h3>
        </div>
        <p className="text-sm text-slate-600 leading-tight">{description}</p>
    </div>
);

const AppScreenMockup: React.FC = () => (
    <div className="w-full h-full bg-slate-50 relative flex flex-col overflow-hidden">
        <header className="flex-shrink-0 flex justify-between items-center p-4 pt-8 border-b border-slate-200">
            <div className="flex items-center space-x-2">
                <span className="text-xl" role="img" aria-label="ripple emoji">🌊</span>
                <span className="text-xl font-extrabold text-slate-800">Rippl</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-fuchsia-500"></div>
        </header>
        
        <main className="flex-grow p-4">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Your Daily Missions</h2>
            <div className="relative h-64 mt-4 group">
                 <MissionCard 
                    icon="😄"
                    title="Compliment Ninja"
                    description="Give a genuine compliment to a stranger."
                    className="bg-amber-100 border border-amber-200 group-hover:rotate-[-6deg] group-hover:translate-x-[-10px]"
                    rotation={-4}
                    zIndex={10}
                    topOffset={40}
                 />
                 <MissionCard 
                    icon="📝"
                    title="Post-it Praises"
                    description="Leave a positive note on a coworker's desk."
                    className="bg-rose-100 border border-rose-200"
                    rotation={2}
                    zIndex={20}
                    topOffset={20}
                 />
                 <MissionCard 
                    icon="☕️"
                    title="The Coffee Angel"
                    description="Buy a coffee for the person behind you."
                    className="bg-white border border-slate-200 group-hover:rotate-[4deg] group-hover:translate-x-[10px]"
                    rotation={-1}
                    zIndex={30}
                    topOffset={0}
                 />
            </div>
        </main>

        <footer className="flex-shrink-0 w-full h-14 mt-auto flex justify-around items-center border-t border-slate-200 bg-white/50 backdrop-blur-sm">
            <div className="w-6 h-6 bg-slate-300 rounded-md opacity-50"></div>
            <div className="w-10 h-10 flex items-center justify-center bg-fuchsia-500 text-white rounded-full text-2xl -mt-8 shadow-lg shadow-fuchsia-500/50">+</div>
            <div className="w-6 h-6 bg-slate-300 rounded-md opacity-50"></div>
        </footer>
    </div>
);

const RealisticPhoneMockup: React.FC = () => {
    return (
        <div className="relative mx-auto border-black bg-black border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl float">
            <div className="w-[148px] h-[18px] bg-black top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="h-[46px] w-[3px] bg-black absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-black absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-black absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-slate-50">
                <AppScreenMockup />
            </div>
        </div>
    );
};


interface HeroProps {
  onSignupSuccess: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSignupSuccess }) => {
  return (
    <section className="container mx-auto px-6 py-16 md:py-24 text-center lg:text-left">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
            Get Addictive to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Kindness</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl">
            Turn your small acts of kindness into fun and satisfaction
          </p>
          <EmailForm onSignupSuccess={onSignupSuccess} />
        </div>
        <div className="hidden lg:flex justify-center">
            <RealisticPhoneMockup />
        </div>
      </div>
    </section>
  );
};

export default Hero;