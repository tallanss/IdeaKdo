import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, Heart, Settings } from 'lucide-react';
import { HomePage } from './pages/HomePage';
import { ResultsPage } from './pages/ResultsPage';
import { ExplorePage } from './pages/ExplorePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProfilePage } from './pages/ProfilePage';

const navItems = [
  { path: '/', icon: Home, label: 'Accueil' },
  { path: '/explorer', icon: Compass, label: 'Explorer' },
  { path: '/favoris', icon: Heart, label: 'Favoris' },
  { path: '/profil', icon: Settings, label: 'Profil' },
];

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on results page
  if (location.pathname === '/results') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-3 pb-6 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === '/' && location.pathname === '/');
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-colors cursor-pointer
                ${isActive ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
            >
              <Icon size={22} fill={isActive ? 'currentColor' : 'none'} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-bg-light max-w-lg mx-auto relative">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/explorer" element={<ExplorePage />} />
        <Route path="/favoris" element={<FavoritesPage />} />
        <Route path="/profil" element={<ProfilePage />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
