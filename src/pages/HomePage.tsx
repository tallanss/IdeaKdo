import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Gift,
    Heart,
    Smile,
    Baby,
    Users,
    Sparkles,
    ChevronRight,
    Calculator,
    Calendar,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { gifts, trendingGiftIds, type Recipient, type Occasion, occasionLabels } from '../data/giftData';
import { useGiftGenerator } from '../hooks/useGiftGenerator';
import { useFavorites } from '../hooks/useFavorites';
import { GiftCard } from '../components/GiftCard';

const recipientOptions: { id: Recipient; label: string; icon: any }[] = [
    { id: 'partenaire', label: 'Partenaire', icon: Heart },
    { id: 'parent', label: 'Parent', icon: Users },
    { id: 'ami', label: 'Ami', icon: Smile },
    { id: 'enfant', label: 'Enfant', icon: Baby },
];

const occasionOptions: { id: Occasion; label: string }[] = Object.entries(occasionLabels).map(([id, label]) => ({
    id: id as Occasion,
    label,
}));

const budgetSteps = [10, 50, 100, 200, 500];

export function HomePage() {
    const navigate = useNavigate();
    const { filters, toggleRecipient, toggleOccasion, setBudget, generate, isGenerating } = useGiftGenerator();
    const { isFavorite, toggleFavorite } = useFavorites();

    const trendingGifts = gifts.filter((g) => trendingGiftIds.includes(g.id));

    const handleGenerate = () => {
        generate();
        setTimeout(() => {
            navigate('/results', { state: { filters } });
        }, 600);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } }
    };

    return (
        <div className="pb-32 relative bg-bg-light min-h-screen">
            {/* Background Ornaments */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10 pointer-events-none" />
            <div className="absolute top-20 -right-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full -z-10" />

            {/* Header */}
            <header className="flex items-center justify-between p-6 pt-8">
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-2.5 rounded-xl text-white shadow-premium">
                        <Gift size={22} />
                    </div>
                    <h2 className="text-xl font-black tracking-tight text-slate-800">Cadeau Parfait</h2>
                </div>
                <button className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-premium border border-slate-50 hover:bg-slate-50 transition-all cursor-pointer">
                    <Users size={20} className="text-slate-500" />
                </button>
            </header>

            <main className="px-6 mt-4">
                {/* Hero Section */}
                <section className="mb-8">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[42px] leading-[1.05] font-black tracking-tight text-slate-900"
                    >
                        Trouvez le <span className="text-primary">cadeau parfait</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 mt-4 text-lg leading-relaxed max-w-[300px]"
                    >
                        Laissez-nous vous inspirer pour chaque occasion.
                    </motion.p>
                </section>

                {/* Filter Card */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white p-8 rounded-[40px] shadow-premium border border-slate-50 space-y-9 relative overflow-hidden"
                >
                    {/* Section: Recipients */}
                    <motion.section variants={itemVariants} className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <Users size={18} fill="currentColor" fillOpacity={0.2} />
                            <h3 className="font-extrabold text-slate-900 tracking-tight">Pour qui ?</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {recipientOptions.map((r) => {
                                const isSelected = filters.recipients.includes(r.id);
                                const Icon = r.icon;
                                return (
                                    <button
                                        key={r.id}
                                        onClick={() => toggleRecipient(r.id)}
                                        className={`flex items-center justify-center gap-3 py-4 rounded-2xl border-2 transition-all duration-300 active:scale-95 cursor-pointer
                      ${isSelected
                                                ? 'border-primary bg-primary/5 text-slate-900 shadow-sm'
                                                : 'border-slate-50 bg-white text-slate-500 hover:border-primary/20 hover:bg-slate-50'}`}
                                    >
                                        <Icon size={18} className={isSelected ? 'text-primary' : 'text-slate-300'} />
                                        <span className="font-bold text-sm">{r.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.section>

                    {/* Section: Occasions */}
                    <motion.section variants={itemVariants} className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <Calendar size={18} fill="currentColor" fillOpacity={0.2} />
                            <h3 className="font-extrabold text-slate-900 tracking-tight">L'occasion ?</h3>
                        </div>
                        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1 -mx-2 px-2">
                            {occasionOptions.map((o) => {
                                const isSelected = filters.occasions.includes(o.id);
                                return (
                                    <button
                                        key={o.id}
                                        onClick={() => toggleOccasion(o.id)}
                                        className={`shrink-0 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 active:scale-95 cursor-pointer
                      ${isSelected
                                                ? 'bg-primary text-white shadow-primary-glow border border-primary'
                                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-transparent'}`}
                                    >
                                        {o.label}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.section>

                    {/* Section: Budget */}
                    <motion.section variants={itemVariants} className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <div className="flex items-center gap-2 text-primary">
                                <Calculator size={18} fill="currentColor" fillOpacity={0.2} />
                                <h3 className="font-extrabold text-slate-900 tracking-tight">Budget</h3>
                            </div>
                            <span className="text-primary font-black text-sm">
                                0€ - {filters.maxBudget === 500 ? '∞' : `${filters.maxBudget}€+`}
                            </span>
                        </div>
                        <div className="relative pt-2">
                            <input
                                type="range"
                                min={0}
                                max={budgetSteps.length - 1}
                                step={1}
                                value={budgetSteps.indexOf(filters.maxBudget)}
                                onChange={(e) => setBudget(budgetSteps[parseInt(e.target.value)])}
                                className="w-full h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6
                  [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6
                  [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-4
                  [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${(budgetSteps.indexOf(filters.maxBudget) / (budgetSteps.length - 1)) * 100
                                        }%, #f1f5f9 ${(budgetSteps.indexOf(filters.maxBudget) / (budgetSteps.length - 1)) * 100
                                        }%, #f1f5f9 100%)`,
                                }}
                            />
                            <div className="flex justify-between mt-3 text-[10px] font-black text-slate-300 uppercase tracking-widest px-1">
                                <span>10€</span>
                                <span>50€</span>
                                <span>100€</span>
                                <span>200€+</span>
                            </div>
                        </div>
                    </motion.section>

                    {/* Submit Button */}
                    <motion.button
                        variants={itemVariants}
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-black py-5 rounded-2xl
              shadow-primary-glow flex items-center justify-center gap-3 text-lg
              transition-all active:scale-95 disabled:opacity-70 cursor-pointer overflow-hidden relative group"
                    >
                        {isGenerating ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                <Sparkles size={24} />
                            </motion.div>
                        ) : (
                            <>
                                <Sparkles size={24} />
                                <span>Générer des idées</span>
                                <motion.div
                                    className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                                />
                            </>
                        )}
                    </motion.button>
                </motion.div>

                {/* Trending Section */}
                <section className="mt-14 mb-10">
                    <div className="flex justify-between items-end mb-7">
                        <div>
                            <h3 className="text-[28px] font-black tracking-tight text-slate-900">Tendances</h3>
                            <p className="text-slate-500 text-sm">Les cadeaux les plus populaires en ce moment</p>
                        </div>
                        <button
                            onClick={() => navigate('/explorer')}
                            className="text-primary font-black text-sm tracking-tight hover:underline cursor-pointer"
                        >
                            Voir tout
                        </button>
                    </div>

                    <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 -mx-6 px-6">
                        {trendingGifts.map((gift, index) => (
                            <motion.div
                                key={gift.id}
                                className="shrink-0 w-52"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-white p-3.5 rounded-[32px] shadow-premium border border-slate-50 transition-transform hover:-translate-y-2">
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
