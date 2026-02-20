import { useNavigate } from 'react-router-dom';
import { Home, Compass, Heart, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
    { path: '/', icon: Home, label: 'Accueil' },
    { path: '/explorer', icon: Compass, label: 'Explorer' },
    { path: '/favoris', icon: Heart, label: 'Favoris' },
    { path: '/profil', icon: Settings, label: 'Profil' },
];

export function BottomNav() {
    const navigate = useNavigate();
    const currentPath = window.location.pathname;

    // Hide on results page for cleaner focus
    if (currentPath === '/results') return null;

    return (
        <nav className="fixed bottom-0 left-0 right-0 p-6 z-50 pointer-events-none">
            <div className="max-w-md mx-auto pointer-events-auto">
                <div className="bg-slate-900/90 backdrop-blur-2xl rounded-[32px] p-2 flex justify-between items-center shadow-2xl border border-white/10">
                    {navItems.map((item) => {
                        const isActive = currentPath === item.path;
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`relative flex flex-1 flex-col items-center justify-center py-3 px-2 transition-all cursor-pointer rounded-2xl
                  ${isActive ? 'text-primary' : 'text-slate-400 hover:text-white'}`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white/10 rounded-2xl"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <Icon
                                    size={22}
                                    className="relative"
                                    strokeWidth={isActive ? 2.5 : 2}
                                    fill={isActive ? 'currentColor' : 'none'}
                                />
                                <span className="text-[10px] font-black uppercase tracking-[0.1em] mt-1 relative">
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
