import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Header } from './components/layout/Header';
import { HeroSection } from './sections/HeroSection';
import { AboutDoctor } from './sections/AboutDoctor';
import { Specialties } from './sections/Specialties';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import './index.css';

function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-light">
      <Header />
      <HeroSection />
      <AboutDoctor />
      <Specialties />
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
            <div className="min-h-screen bg-bg-light">
              <Header />
              <BlogList />
            </div>
          } />
          <Route path="/blog/:id" element={
            <div className="min-h-screen bg-bg-light">
              <Header />
              <BlogPost />
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