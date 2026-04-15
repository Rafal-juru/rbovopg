import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Header } from './components/layout/Header';
import { HeroSection } from './sections/HeroSection';
import { AboutDoctor } from './sections/AboutDoctor';
import { MissionValues } from './sections/MissionValues';
import { Specialties } from './sections/Specialties';
import { Testimonials } from './sections/Testimonials';
import { Footer } from './sections/Footer';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { BlogList } from './pages/BlogList';
import './index.css';

function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <HeroSection />
      <AboutDoctor />
      <Specialties />
      <MissionValues />
      <Testimonials />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={
            <div className="min-h-screen bg-transparent">
              <Header />
              <BlogList />
              <Footer />
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
