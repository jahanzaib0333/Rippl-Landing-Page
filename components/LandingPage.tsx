import React, { useRef } from 'react';
import Header from './Header';
import Hero from './Hero';
import PageSections from './Features';
import CTA from './CTA';
import Footer from './Footer';

interface LandingPageProps {
  onSignupSuccess: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSignupSuccess }) => {
  const howItWorksRef = useRef<HTMLElement>(null);
  const whyItsFunRef = useRef<HTMLElement>(null);
  const joinTheJoyRef = useRef<HTMLElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onScrollToHowItWorks={() => scrollTo(howItWorksRef)}
        onScrollToWhyItsFun={() => scrollTo(whyItsFunRef)}
        onScrollToJoinTheJoy={() => scrollTo(joinTheJoyRef)}
      />
      <main className="flex-grow">
        <Hero onSignupSuccess={onSignupSuccess} />
        <PageSections howItWorksRef={howItWorksRef} whyItsFunRef={whyItsFunRef} />
        <CTA onSignupSuccess={onSignupSuccess} joinTheJoyRef={joinTheJoyRef} />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
