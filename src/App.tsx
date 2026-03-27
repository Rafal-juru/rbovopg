import { Header } from './components/layout/Header';
import { HeroSection } from './sections/HeroSection';
import { AboutDoctor } from './sections/AboutDoctor';
import { Specialties } from './sections/Specialties';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-bg-light">
      <Header />
      <HeroSection />
      <AboutDoctor />
      <Specialties />
    </div>
  );
}

export default App;