import React, { useState, useCallback, useEffect } from 'react';

// TEMPORARY COMPONENTS - Replace these with your actual component files later
const LandingPage: React.FC<{ onSignupSuccess: () => void }> = ({ onSignupSuccess }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Landing Page Placeholder</h1>
        <p className="mb-4">Your LandingPage component will appear here once you create the file.</p>
        <button 
          onClick={onSignupSuccess}
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          Continue to Thank You Page
        </button>
      </div>
    </div>
  );
};

const AdminPage: React.FC<{ onGoHome: () => void }> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Panel Placeholder</h1>
        <p className="mb-4">Your AdminPage component will appear here once you create the file.</p>
        <button 
          onClick={onGoHome}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

const CheckmarkIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
// END TEMPORARY COMPONENTS

// YOUR ORIGINAL CODE BELOW - UNCHANGED
const Confetti: React.FC = () => {
    const confettiColors = ['#fde047', '#86efac', '#818cf8', '#f472b6'];
    const confettiCount = 50;

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {Array.from({ length: confettiCount }).map((_, i) => (
                <div
                    key={i}
                    className="confetti"
                    style={{
                        left: `${Math.random() * 100}%`,
                        backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                        animationDelay: `${Math.random() * 2}s`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                        width: `${Math.floor(Math.random() * 10 + 5)}px`,
                        height: `${Math.floor(Math.random() * 10 + 5)}px`,
                    }}
                />
            ))}
        </div>
    );
};

const HighFiveIllustration = () => (
     <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
        <path d="M42,10 C42,10 60,0 70,10 C80,20 85,40 80,50 C75,60 60,70 50,70 C40,70 30,60 30,50 C30,40 30,25 42,10 Z" fill="#facc15" transform="rotate(-30, 55, 40)" />
        <path d="M78,10 C78,10 60,0 50,10 C40,20 35,40 40,50 C45,60 60,70 70,70 C80,70 90,60 90,50 C90,40 90,25 78,10 Z" fill="#c084fc" transform="rotate(30, 65, 40) translate(0, 20)" />
        <text x="50%" y="95%" textAnchor="middle" fontSize="24" fill="#475569">🙌</text>
    </svg>
)

const ThankYouPage: React.FC<{ onGoHome: () => void }> = ({ onGoHome }) => {
    const [copied, setCopied] = useState(false);
    const referralLink = `${window.location.origin}${window.location.pathname}?ref=KIND123`;

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Join me on the Rippl waitlist!',
                text: `I just joined the waitlist for Rippl, an app for spreading kindness! Join with my link to move me up the list! 😊`,
                url: referralLink,
            }).catch(console.error);
        } else {
            alert("Sharing is not supported on this browser. Please copy the link manually.");
        }
    };

    const handleCopy = () => {
        if (!navigator.clipboard) {
            alert("Clipboard API not available. Please copy the link manually.");
            return;
        }
        navigator.clipboard.writeText(referralLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert("Failed to copy link.");
        });
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-100 via-rose-100 to-fuchsia-100 relative">
            <Confetti />
             <div className="text-center bg-white/60 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl max-w-xl w-full z-10">
                <div className="mb-6">
                    <HighFiveIllustration />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-800">🎉 Welcome to the Rippl Family!</h1>
                <p className="text-lg text-slate-600 mb-8">
                    Check your email for a welcome message from us.
                </p>

                <div className="bg-slate-900/5 rounded-2xl p-6 my-8 text-left">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Spread Kindness & Move Up!</h2>
                    <p className="text-slate-600 mb-4 text-center">Share with friends. When 3 friends join using your link, you get early access!</p>
                    <div className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-full shadow-inner">
                        <input type="text" readOnly value={referralLink} className="w-full flex-grow bg-transparent text-slate-600 px-3 py-1 sm:py-0 focus:outline-none text-center sm:text-left" aria-label="Referral Link" />
                        <button 
                            onClick={handleCopy} 
                            className={`w-full sm:w-auto px-6 py-2 rounded-full font-bold transition-all duration-200 text-white ${copied ? 'bg-green-500' : 'bg-fuchsia-600 hover:bg-fuchsia-700'}`}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={handleShare} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-6 rounded-full transition-transform duration-300 hover:scale-105 active:scale-95">
                        Share Your Link
                    </button>
                    <button onClick={onGoHome} className="bg-slate-900/10 hover:bg-slate-900/20 text-slate-700 font-semibold py-3 px-6 rounded-full transition-transform duration-300 hover:scale-105 active:scale-95">
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

const FloatingShapes: React.FC = () => (
    <>
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-cyan-500/20 rounded-full float -z-10"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-fuchsia-500/20 rounded-3xl float -z-10" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-indigo-500/20 rounded-full float -z-10" style={{ animationDelay: '4s' }}></div>
    </>
);


const App: React.FC = () => {
    const [page, setPage] = useState<'landing' | 'thankyou' | 'admin'>('landing');

    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash === '#/admin') {
                setPage('admin');
            } else if (page === 'admin') {
                setPage('landing');
            }
        };
        window.addEventListener('hashchange', handleHashChange, false);
        handleHashChange();

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [page]);


    const handleSignupSuccess = useCallback(() => {
        window.scrollTo(0, 0);
        setPage('thankyou');
    }, []);

    const handleGoHome = useCallback(() => {
        window.location.hash = '';
        setPage('landing');
    }, []);

    if (page === 'admin') {
        return <AdminPage onGoHome={handleGoHome} />;
    }

    return (
        <div className="relative overflow-x-hidden">
            <FloatingShapes />
            {page === 'landing' ? (
                <LandingPage onSignupSuccess={handleSignupSuccess} />
            ) : (
                <ThankYouPage onGoHome={handleGoHome} />
            )}
        </div>
    );
};

export default App;
