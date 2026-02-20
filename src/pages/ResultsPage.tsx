import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, RefreshCw, SlidersHorizontal, Gift as GiftIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <div className="pb-24 min-h-screen bg-bg-light">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent -z-10" />

            {/* Header */}
            <header className="flex items-center gap-4 p-6 pt-8">
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => navigate('/')}
                    className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-premium
            border border-slate-50 hover:bg-slate-50 transition-all cursor-pointer active:scale-90"
                >
                    <ArrowLeft size={20} className="text-slate-800" />
                </motion.button>
                <div className="flex-1">
                    <motion.h2
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-black tracking-tight text-slate-900"
                    >
                        Résultats
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-sm font-bold"
                    >
                        {results.length} idées pépites trouvées
                    </motion.p>
                </div>
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setShuffleKey((k) => k + 1)}
                    className="w-12 h-12 rounded-2xl bg-white border border-slate-50 flex items-center justify-center
            hover:shadow-premium transition-all cursor-pointer active:rotate-180 duration-500"
                >
                    <RefreshCw size={20} className="text-primary" />
                </motion.button>
            </header>

            <main className="px-6">
                {/* Active filters display */}
                {filters && (filters.recipients.length > 0 || filters.occasions.length > 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-8 overflow-x-auto hide-scrollbar"
                    >
                        <div className="bg-slate-900 text-white p-2 rounded-xl shrink-0">
                            <SlidersHorizontal size={14} />
                        </div>
                        <div className="flex gap-2 shrink-0">
                            {filters.recipients.map((r) => (
                                <span key={r} className="shrink-0 px-4 py-2 bg-primary/10 text-primary text-[10px] uppercase font-black tracking-widest rounded-xl border border-primary/20">
                                    {r}
                                </span>
                            ))}
                            {filters.occasions.map((o) => (
                                <span key={o} className="shrink-0 px-4 py-2 bg-white text-slate-500 text-[10px] uppercase font-black tracking-widest rounded-xl border border-slate-100 shadow-sm">
                                    {o}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}

                <AnimatePresence mode="popLayout">
                    {results.length === 0 ? (
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center py-24 bg-white rounded-[40px] shadow-premium border border-slate-50 px-8"
                        >
                            <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-6">
                                <Sparkles size={40} className="text-primary" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Aucune pépite trouvée...</h3>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                Nos lutins n'ont rien trouvé avec ces critères précis. On élargit un peu ?
                            </p>
                            <button
                                onClick={() => navigate('/')}
                                className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-premium
                    hover:bg-slate-800 transition-all cursor-pointer active:scale-95"
                            >
                                Modifier ma recherche
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`results-${shuffleKey}`}
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.05 } }
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                        >
                            {results.map((gift) => (
                                <motion.div
                                    key={gift.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                >
                                    <div className="bg-white p-4 rounded-[32px] shadow-premium border border-slate-50 hover:-translate-y-2 transition-transform duration-300 h-full">
                                        <GiftCardFull
                                            gift={gift}
                                            isFavorite={isFavorite(gift.id)}
                                            onToggleFavorite={toggleFavorite}
                                            onClick={() => setSelectedGift(gift)}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
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
