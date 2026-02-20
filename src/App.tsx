import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ResultsPage } from './pages/ResultsPage';
import { ExplorePage } from './pages/ExplorePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProfilePage } from './pages/ProfilePage';
import { BottomNav } from './components/BottomNav';

function AppContent() {
  return (
    <div className="min-h-screen bg-bg-light max-w-lg mx-auto relative overflow-hidden">
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
