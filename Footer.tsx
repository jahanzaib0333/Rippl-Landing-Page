import React from 'react';
import { LogoIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-slate-200">
      <div className="container mx-auto px-6 text-center text-slate-500">
        <div className="flex justify-center mb-4">
            <LogoIcon />
        </div>
        <p className="font-bold text-slate-700 text-lg mb-6">Spreading Joy, One Rippl at a Time.</p>
        <p>Coming soon to iOS and Android</p>
        <p>&copy; {new Date().getFullYear()} Rippl. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;