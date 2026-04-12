import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { About } from './components/About';
import { Impact } from './components/Impact';
import { Transparency } from './components/Transparency';
import { Media } from './components/Media';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { FloatingDonateButton } from './components/FloatingDonateButton';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <About />
        <Impact />
        <Transparency />
        <Media />
        <FAQ />
      </main>
      <Footer />
      <FloatingDonateButton />
    </div>
  );
}

export default App;
