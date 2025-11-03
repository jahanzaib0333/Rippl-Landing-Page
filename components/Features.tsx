import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { HowItWorksStep1Icon, HowItWorksStep2Icon, HowItWorksStep3Icon } from './icons';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(cardRef.current!);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`transition-all duration-1000 ease-in-out ${className} ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
        >
            {children}
        </div>
    );
};

const SectionTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
    <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">{children}</h2>
);

const HowItWorksSection: React.FC<{ howItWorksRef: React.RefObject<HTMLElement> }> = ({ howItWorksRef }) => {
    const steps = [
        { icon: <HowItWorksStep1Icon />, text: "Get your 3 fun daily missions." },
        { icon: <HowItWorksStep2Icon />, text: "Pick your favorite and make someone's day." },
        { icon: <HowItWorksStep3Icon />, text: "Feel the happiness ripple back to you!" }
    ];

    return (
        <section ref={howItWorksRef} className="py-20 px-6 container mx-auto">
            <SectionTitle>Spread Joy in 3 Easy Steps</SectionTitle>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                {steps.map((step, index) => (
                    <AnimatedCard key={index}>
                        <div className="p-8 h-full">
                            <div className="flex justify-center items-center h-32 mb-6">
                                {step.icon}
                            </div>
                            <p className="text-xl font-bold text-slate-700">{step.text}</p>
                        </div>
                    </AnimatedCard>
                ))}
            </div>
        </section>
    );
};

const PhoneMockup: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="relative mx-auto border-black bg-black border-[10px] rounded-[2rem] h-[450px] w-[225px] shadow-xl">
        <div className="w-[80px] h-[18px] bg-black top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[32px] w-[2px] bg-black absolute -start-[12px] top-[94px] rounded-s-lg"></div>
        <div className="h-[32px] w-[2px] bg-black absolute -start-[12px] top-[140px] rounded-s-lg"></div>
        <div className="h-[48px] w-[2px] bg-black absolute -end-[12px] top-[112px] rounded-e-lg"></div>
        <div className="rounded-[1.5rem] overflow-hidden w-full h-full bg-gradient-to-b from-slate-50 via-white to-sky-50">{children}</div>
    </div>
);


const SeeTheMagicSection: React.FC = () => {
    return (
        <section className="py-20 px-6 container mx-auto">
            <SectionTitle>A Peek Inside Rippl</SectionTitle>
            <div className="grid md:grid-cols-3 gap-12">
                <AnimatedCard>
                    <div className="text-center">
                        <PhoneMockup>
                             <div className="p-4 pt-8 text-slate-900">
                                <h3 className="font-bold text-lg mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-fuchsia-500">Today's Missions</h3>
                                <div className="space-y-2">
                                    <div className="p-3 rounded-xl bg-yellow-100 border border-yellow-200 shadow-sm">
                                        <p className="font-semibold text-sm text-slate-800">🐦 Leave water for birds</p>
                                        <p className="text-xs text-yellow-600 font-bold">#AnimalKindness</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-fuchsia-100 border border-fuchsia-200 shadow-sm">
                                        <p className="font-semibold text-sm text-slate-800">💬 Text a friend 'hi'</p>
                                        <p className="text-xs text-fuchsia-600 font-bold">#SocialVibes</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-green-100 border border-green-200 shadow-sm">
                                        <p className="font-semibold text-sm text-slate-800">🌱 Water a public plant</p>
                                        <p className="text-xs text-green-600 font-bold">#GreenThumbs</p>
                                    </div>
                                </div>
                            </div>
                        </PhoneMockup>
                        <h3 className="font-bold text-lg mt-4">Fun Mission Stack</h3>
                    </div>
                </AnimatedCard>
                 <AnimatedCard className="transition-delay-200">
                    <div className="text-center">
                        <PhoneMockup>
                           <div className="flex flex-col items-center justify-center h-full text-slate-800 text-center p-4 pt-8 bg-gradient-to-br from-yellow-100 via-rose-100 to-fuchsia-100">
                                <div className="text-6xl mb-4">✨</div>
                                <h3 className="font-bold text-2xl">Mission Complete!</h3>
                                <p className="text-cyan-600 text-lg font-bold">+15 🌊 Ripples Earned</p>
                                <div className="mt-8 w-full px-4">
                                    <div className="relative w-full h-24 rounded-2xl bg-slate-200/50 border-2 border-dashed border-slate-400 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
                                        <svg className="w-8 h-8 text-slate-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        <p className="text-sm font-semibold text-slate-500">Capture your kindness</p>
                                    </div>
                                </div>
                            </div>
                        </PhoneMockup>
                        <h3 className="font-bold text-lg mt-4">Celebration Screen</h3>
                    </div>
                </AnimatedCard>
                 <AnimatedCard className="transition-delay-[400ms]">
                    <div className="text-center">
                         <PhoneMockup>
                           <div className="p-4 pt-8 text-slate-900 h-full flex flex-col">
                                <div className="flex-shrink-0 flex items-center space-x-3 mb-6">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 to-fuchsia-500 flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl">Alex Doe</h3>
                                        <p className="text-sm text-slate-500">Level 12 Kindness Ninja</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-cyan-100 border border-cyan-200 rounded-2xl p-3 text-center">
                                        <p className="text-4xl font-extrabold text-cyan-600">🌊</p>
                                        <p className="text-lg font-bold text-slate-800">1,240</p>
                                        <p className="text-xs font-semibold text-slate-600">Ripples</p>
                                    </div>
                                     <div className="bg-orange-100 border border-orange-200 rounded-2xl p-3 text-center">
                                        <p className="text-4xl font-extrabold text-orange-500">🔥</p>
                                         <p className="text-lg font-bold text-slate-800">42</p>
                                        <p className="text-xs font-semibold text-slate-600">Day Streak</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-emerald-500">Kindness Stats</h4>
                                    <div className="space-y-2 text-sm">
                                         <div className="flex justify-between items-center p-3 rounded-xl bg-violet-100">
                                            <p className="font-semibold text-slate-700">Missions Completed</p>
                                            <p className="font-bold text-slate-900">156</p>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-100">
                                            <p className="font-semibold text-slate-700">Lives Touched</p>
                                            <p className="font-bold text-slate-900">~450</p>
                                        </div>
                                         <div className="flex justify-between items-center p-3 rounded-xl bg-rose-100">
                                            <p className="font-semibold text-slate-700">Friends Inspired</p>
                                            <p className="font-bold text-slate-900">7</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PhoneMockup>
                        <h3 className="font-bold text-lg mt-4">Track Your Progress</h3>
                    </div>
                </AnimatedCard>
            </div>
        </section>
    );
};

const EmotionalConnectionSection: React.FC<{ whyItsFunRef: React.RefObject<HTMLElement> }> = ({ whyItsFunRef }) => {
    return (
        <section ref={whyItsFunRef} className="py-20 px-6">
            <div className="container mx-auto">
                <AnimatedCard>
                    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl p-8 md:p-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-extrabold mb-6">More Than an App. <br />It's a Feeling.</h2>
                            <ul className="space-y-4 text-xl text-slate-700">
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">😊</span>
                                    <span>That warm, fuzzy feeling after making someone smile.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">🎮</span>
                                    <span>The fun of playing a game that makes the world better.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">🌱</span>
                                    <span>The joy of watching your kindness grow every day.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-12 lg:mt-0 lg:relative h-full flex items-center justify-center">
                             <img 
                                src="https://lh3.googleusercontent.com/d/1TWYHsmMWnW_HeCcW_kgj2quimAFQ_Jh6" 
                                alt="A preview of the Rippl app, showing a kindness mission." 
                                className="rounded-2xl shadow-xl w-full max-w-[280px] lg:absolute lg:right-0 lg:max-w-none lg:w-auto lg:h-full lg:-translate-x-[5%]" 
                            />
                        </div>
                    </div>
                </AnimatedCard>
            </div>
        </section>
    );
}

interface PageSectionsProps {
    howItWorksRef: React.RefObject<HTMLElement>;
    whyItsFunRef: React.RefObject<HTMLElement>;
}

const PageSections: React.FC<PageSectionsProps> = ({ howItWorksRef, whyItsFunRef }) => {
    return (
        <>
            <HowItWorksSection howItWorksRef={howItWorksRef} />
            <SeeTheMagicSection />
            <EmotionalConnectionSection whyItsFunRef={whyItsFunRef} />
        </>
    );
};

export default PageSections;
