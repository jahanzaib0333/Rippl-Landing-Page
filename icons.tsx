import React from 'react';

export const LogoIcon: React.FC = () => (
    <div className="flex items-center space-x-2 cursor-pointer group">
        <span className="text-3xl" role="img" aria-label="ripple emoji">🌊</span>
        <span className="text-3xl font-extrabold">Rippl</span>
    </div>
);

export const HowItWorksStep1Icon: React.FC = () => (
     <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-lg">
        <rect x="20" y="20" width="60" height="70" rx="10" fill="#a78bfa" transform="rotate(-5 50 50)"/>
        <rect x="25" y="15" width="60" height="70" rx="10" fill="#c084fc" transform="rotate(5 50 50)"/>
        <rect x="30" y="10" width="60" height="70" rx="10" fill="#f472b6" />
        <circle cx="50" cy="30" r="5" fill="white" />
        <rect x="40" y="40" width="40" height="5" rx="2.5" fill="white" opacity="0.7"/>
        <rect x="40" y="50" width="30" height="5" rx="2.5" fill="white" opacity="0.7"/>
    </svg>
);


export const HowItWorksStep2Icon: React.FC = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-lg">
        <path d="M72,50 C72,50 80,40 85,45 C90,50 85,60 80,65 L60,85 C55,90 45,90 40,85 L20,65 C15,60 15,50 20,45 L40,25 C45,20 55,20 60,25 L65,30" stroke="#fbbf24" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M70,5 L70,25 L90,25" stroke="#fbbf24" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="30" y="45" width="40" height="20" rx="10" fill="#10b981"/>
        <text x="50" y="60" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Do It!</text>
    </svg>
);


export const HowItWorksStep3Icon: React.FC = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-lg">
        <circle cx="50" cy="50" r="30" fill="#67e8f9"/>
        <circle cx="42" cy="45" r="4" fill="black"/>
        <circle cx="58" cy="45" r="4" fill="black"/>
        <path d="M40 60 Q50 70, 60 60" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M50,15 Q60,25 70,20" stroke="#f472b6" strokeWidth="4" fill="none" opacity="0" style={{ animation: 'ripple-out 2s ease-out infinite' }} />
        <path d="M50,15 Q60,25 70,20" stroke="#c084fc" strokeWidth="4" fill="none" opacity="0" style={{ animation: 'ripple-out 2s ease-out infinite', animationDelay: '0.5s' }} />
        <path d="M50,15 Q60,25 70,20" stroke="#818cf8" strokeWidth="4" fill="none" opacity="0" style={{ animation: 'ripple-out 2s ease-out infinite', animationDelay: '1s' }} />
        <style>{`
            @keyframes ripple-out {
                0% { transform: scale(0.5); opacity: 1; }
                100% { transform: scale(2); opacity: 0; }
            }
        `}</style>
    </svg>
);


export const CheckmarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);

const SocialIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">{children}</svg>
);

export const TwitterIcon: React.FC = () => (
    <SocialIcon>
        <path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.55v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
    </SocialIcon>
);

export const InstagramIcon: React.FC = () => (
    <SocialIcon>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.11 0-3.47.01-4.68.06-2.5.11-3.45 1.06-3.56 3.56-.05 1.21-.06 1.57-.06 4.68s.01 3.47.06 4.68c.11 2.5 1.06 3.45 3.56 3.56 1.21.05 1.57.06 4.68.06s3.47-.01 4.68-.06c2.5-.11 3.45-1.06 3.56-3.56.05-1.21.06-1.57.06-4.68s-.01-3.47-.06-4.68c-.11-2.5-1.06-3.45-3.56-3.56-1.21-.05-1.57-.06-4.68-.06zM12 6.837a5.163 5.163 0 100 10.326 5.163 5.163 0 000-10.326zm0 8.526a3.363 3.363 0 110-6.726 3.363 3.363 0 010 6.726zM17.636 5.82a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"></path>
    </SocialIcon>
);

export const FacebookIcon: React.FC = () => (
    <SocialIcon>
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89H8.707v-2.98h1.731V9.61c0-1.722 1.036-2.67 2.603-2.67.738 0 1.522.131 1.522.131v2.53h-1.27c-.846 0-1.118.528-1.118 1.069v1.278h2.825l-.44 2.98h-2.385v6.988C18.343 21.128 22 16.991 22 12z"></path>
    </SocialIcon>
);
