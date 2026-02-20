import { User, Gift, Bell, Moon, ChevronRight, Info, Shield, Star } from 'lucide-react';

export function ProfilePage() {
    return (
        <div className="animate-fade-in-up">
            {/* Header */}
            <header className="p-6 pt-8">
                <h2 className="text-2xl font-extrabold tracking-tight">Profil</h2>
            </header>

            <main className="px-6 pb-28 space-y-6">
                {/* User Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg shadow-primary/30">
                        <User size={28} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Utilisateur</h3>
                        <p className="text-slate-500 text-sm">Bienvenue sur Cadeau Parfait</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { icon: <Gift size={20} />, value: '40+', label: 'Cadeaux' },
                        { icon: <Star size={20} />, value: '6', label: 'Catégories' },
                        { icon: <Bell size={20} />, value: '∞', label: 'Idées' },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white rounded-xl p-4 text-center border border-slate-100 shadow-sm"
                        >
                            <div className="text-primary mx-auto mb-1.5 flex justify-center">{stat.icon}</div>
                            <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                            <p className="text-xs text-slate-500">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Settings */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                    <h3 className="px-5 pt-5 pb-2 font-bold text-slate-800 text-sm uppercase tracking-wider">
                        Paramètres
                    </h3>
                    {[
                        { icon: <Bell size={18} />, label: 'Notifications', desc: 'Gérer les alertes' },
                        { icon: <Moon size={18} />, label: 'Apparence', desc: 'Mode clair / sombre' },
                        { icon: <Shield size={18} />, label: 'Confidentialité', desc: 'Gérer les données' },
                        { icon: <Info size={18} />, label: 'À propos', desc: 'Version 1.0.0' },
                    ].map((item, i) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer
                ${i > 0 ? 'border-t border-slate-50' : ''}`}
                        >
                            <span className="text-primary">{item.icon}</span>
                            <div className="flex-1 text-left">
                                <p className="font-medium text-slate-800 text-sm">{item.label}</p>
                                <p className="text-xs text-slate-500">{item.desc}</p>
                            </div>
                            <ChevronRight size={16} className="text-slate-300" />
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-slate-400 pt-4">
                    Cadeau Parfait v1.0 — Fait avec ❤️
                </p>
            </main>
        </div>
    );
}
