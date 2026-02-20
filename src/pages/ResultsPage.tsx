import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, RefreshCw, SlidersHorizontal } from 'lucide-react';
import { gifts, filterGifts, type Recipient, type Occasion } from '../data/giftData';
import { useFavorites } from '../hooks/useFavorites';
import { GiftCardFull } from '../components/GiftCardFull';
import { GiftDetailModal } from '../components/GiftDetailModal';
import type { Gift } from '../data/giftData';

interface LocationState {
    filters?: {
        recipients: Recipient[];
        occasions: Occasion[];
        minBudget: number;
        maxBudget: number;
    };
}

export function ResultsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorites();
    const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
    const [shuffleKey, setShuffleKey] = useState(0);

    const state = location.state as LocationState | null;
    const filters = state?.filters;

    const results = useMemo(() => {
        if (!filters) return [...gifts].sort(() => Math.random() - 0.5);
        const filtered = filterGifts(
            gifts,
            filters.recipients,
            filters.occasions,
            filters.minBudget,
            filters.maxBudget
        );
        return [...filtered].sort(() => Math.random() - 0.5);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, shuffleKey]);

    return (
        <div className="animate-fade-in-up">
            {/* Header */}
            <header className="flex items-center gap-4 p-6 pt-8">
                <button
                    onClick={() => navigate('/')}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm
            border border-slate-100 hover:shadow-md transition-shadow cursor-pointer"
                >
                    <ArrowLeft size={18} className="text-slate-600" />
                </button>
                <div className="flex-1">
                    <h2 className="text-xl font-extrabold tracking-tight">Résultats</h2>
                    <p className="text-slate-500 text-sm">{results.length} idées trouvées</p>
                </div>
                <button
                    onClick={() => setShuffleKey((k) => k + 1)}
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center
            hover:bg-primary/20 transition-colors cursor-pointer"
                >
                    <RefreshCw size={18} className="text-primary" />
                </button>
            </header>

            <main className="px-6 pb-28">
                {/* Active filters display */}
                {filters && (filters.recipients.length > 0 || filters.occasions.length > 0) && (
                    <div className="flex items-center gap-2 mb-6 overflow-x-auto hide-scrollbar">
                        <SlidersHorizontal size={14} className="text-slate-400 shrink-0" />
                        {filters.recipients.map((r) => (
                            <span key={r} className="shrink-0 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                {r}
                            </span>
                        ))}
                        {filters.occasions.map((o) => (
                            <span key={o} className="shrink-0 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                                {o}
                            </span>
                        ))}
                    </div>
                )}

                {results.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                            <Sparkles size={32} className="text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Aucun résultat</h3>
                        <p className="text-slate-500 mb-6">Essayez d'élargir vos critères de recherche</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30
                hover:bg-primary-dark transition-all cursor-pointer"
                        >
                            Modifier les filtres
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {results.map((gift, index) => (
                            <div
                                key={gift.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s`, opacity: 0 }}
                            >
                                <GiftCardFull
                                    gift={gift}
                                    isFavorite={isFavorite(gift.id)}
                                    onToggleFavorite={toggleFavorite}
                                    onClick={() => setSelectedGift(gift)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Detail Modal */}
            <GiftDetailModal
                gift={selectedGift}
                isFavorite={selectedGift ? isFavorite(selectedGift.id) : false}
                onToggleFavorite={toggleFavorite}
                onClose={() => setSelectedGift(null)}
            />
        </div>
    );
}
