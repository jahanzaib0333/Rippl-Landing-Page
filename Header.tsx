import React, { useState, useEffect } from 'react';
import { LogoIcon } from './icons';

interface HeaderProps {
    onScrollToHowItWorks: () => void;
    onScrollToWhyItsFun: () => void;
    onScrollToJoinTheJoy: () => void;
}

const Header: React.FC<HeaderProps> = ({ onScrollToHowItWorks, onScrollToWhyItsFun, onScrollToJoinTheJoy }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = (
      <>
        <button onClick={() => { onScrollToHowItWorks(); setIsMenuOpen(false); }} className="px-4 py-2 hover:text-cyan-500 transition-colors">How It Works</button>
        <button onClick={() => { onScrollToWhyItsFun(); setIsMenuOpen(false); }} className="px-4 py-2 hover:text-cyan-500 transition-colors">Why It's Fun</button>
        <button onClick={() => { onScrollToJoinTheJoy(); setIsMenuOpen(false); }} className="px-4 py-2 bg-fuchsia-600 text-white font-bold rounded-full hover:bg-fuchsia-500 transition-colors active:scale-95">Join the Waitlist</button>
      </>
    );

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-card' : ''}`}>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <LogoIcon />
                <div className="hidden md:flex items-center space-x-2 font-bold">
                    {navLinks}
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-800 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="md:hidden glass-card">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center font-bold">
                        {navLinks}
                    </div>
                </div>
            )}
        </header>
    );
};

// FIX: Add default export for the Header component to make it importable.
export default Header;