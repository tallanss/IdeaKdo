import { useNavigate } from 'react-router-dom';
import { Gift, ChevronRight, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { gifts, trendingGiftIds } from '../data/giftData';
import { useFavorites } from '../hooks/useFavorites';
import { GiftCard } from '../components/GiftCard';
import { WizardFlow } from '../components/WizardFlow';

export function HomePage() {
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorites();

    const trendingGifts = gifts.filter((g) => trendingGiftIds.includes(g.id));

    return (
        <div className="pb-28 relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent -z-10 pointer-events-none" />
            <div className="absolute top-20 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10" />
            <div className="absolute top-80 -left-20 w-72 h-72 bg-blue-100/30 blur-[120px] rounded-full -z-10" />

            {/* Header */}
            <header className="flex items-center justify-between p-6 pt-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2.5"
                >
                    <div className="bg-primary p-2.5 rounded-xl text-white shadow-premium">
                        <Gift size={22} />
                    </div>
                    <h2 className="text-xl font-black tracking-tight text-slate-900">Cadeau Parfait</h2>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-11 h-11 rounded-2xl bg-white/70 backdrop-blur-md flex items-center justify-center shadow-premium border border-white hover:bg-white transition-all cursor-pointer"
                >
                    <Users size={20} className="text-slate-600" />
                </motion.button>
            </header>

            <main className="px-6">
                {/* Hero */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-6 mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                        <Sparkles size={12} />
                        <span>Mode Guidé Activé</span>
                    </div>
                    <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-slate-900">
                        Trouvez le <span className="text-primary italic">cadeau idéal</span> en 3 questions.
                    </h1>
                    <p className="text-slate-500 mt-4 text-lg leading-relaxed max-w-[320px]">
                        L'assistant intelligent qui déniche les meilleures pépites pour vous.
                    </p>
                </motion.section>

                {/* Wizard Component */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', damping: 20 }}
                >
                    <WizardFlow />
                </motion.div>

                {/* Trending Section */}
                <section className="mt-16">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h3 className="text-2xl font-black tracking-tight text-slate-900">Populaires</h3>
                            <p className="text-slate-500 text-sm">Ce que tout le monde adore</p>
                        </div>
                        <button
                            onClick={() => navigate('/explorer')}
                            className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all cursor-pointer bg-primary/5 px-4 py-2 rounded-xl"
                        >
                            Voir tout
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-6 -mx-6 px-6">
                        {trendingGifts.map((gift, index) => (
                            <motion.div
                                key={gift.id}
                                className="shrink-0 w-48"
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                <div className="bg-white p-3 rounded-2xl shadow-premium border border-slate-50">
                                    <GiftCard
                                        gift={gift}
                                        isFavorite={isFavorite(gift.id)}
                                        onToggleFavorite={toggleFavorite}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
