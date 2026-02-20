import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Heart, Smile, Baby, Users, Sparkles, ChevronRight } from 'lucide-react';
import { gifts, trendingGiftIds, type Recipient, type Occasion, occasionLabels } from '../data/giftData';
import { useGiftGenerator } from '../hooks/useGiftGenerator';
import { useFavorites } from '../hooks/useFavorites';
import { GiftCard } from '../components/GiftCard';

const recipientOptions: { id: Recipient; label: string; icon: React.ReactNode }[] = [
    { id: 'partenaire', label: 'Partenaire', icon: <Heart size={20} /> },
    { id: 'parent', label: 'Parent', icon: <Users size={20} /> },
    { id: 'ami', label: 'Ami', icon: <Smile size={20} /> },
    { id: 'enfant', label: 'Enfant', icon: <Baby size={20} /> },
];

const occasionOptions: { id: Occasion; label: string }[] = (
    Object.entries(occasionLabels) as [Occasion, string][]
).map(([id, label]) => ({ id, label }));

const budgetSteps = [10, 50, 100, 150, 200, 300];

export function HomePage() {
    const navigate = useNavigate();
    const { filters, toggleRecipient, toggleOccasion, setBudget, generate, isGenerating } = useGiftGenerator();
    const { isFavorite, toggleFavorite } = useFavorites();
    const [budgetIndex, setBudgetIndex] = useState(4); // default 200

    const trendingGifts = gifts.filter((g) => trendingGiftIds.includes(g.id));

    const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const idx = parseInt(e.target.value);
        setBudgetIndex(idx);
        setBudget(budgetSteps[idx]);
    };

    const handleGenerate = () => {
        generate();
        // Navigate to results after a short delay to show loading
        setTimeout(() => {
            navigate('/results', {
                state: { filters },
            });
        }, 300);
    };

    return (
        <div className="animate-fade-in-up">
            {/* Header */}
            <header className="flex items-center justify-between p-6 pt-8">
                <div className="flex items-center gap-2.5">
                    <div className="bg-primary p-2.5 rounded-xl text-white shadow-lg shadow-primary/30">
                        <Gift size={22} />
                    </div>
                    <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Cadeau Parfait</h2>
                </div>
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer">
                    <Users size={18} className="text-slate-500" />
                </button>
            </header>

            <main className="px-6 pb-28">
                {/* Hero */}
                <section className="mt-4 mb-8">
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900">
                        Trouvez le <span className="text-primary">cadeau parfait</span>
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg">
                        Laissez-nous vous inspirer pour chaque occasion.
                    </p>
                </section>

                {/* Filter Form */}
                <div className="space-y-8 bg-white p-6 rounded-2xl shadow-xl shadow-primary/5 border border-slate-100">
                    {/* Recipients */}
                    <section>
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Users size={18} className="text-primary" />
                            Pour qui ?
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {recipientOptions.map((r) => {
                                const isSelected = filters.recipients.includes(r.id);
                                return (
                                    <button
                                        key={r.id}
                                        onClick={() => toggleRecipient(r.id)}
                                        className={`flex items-center gap-3 p-3.5 rounded-xl border-2 font-medium transition-all
                      active:scale-95 cursor-pointer
                      ${isSelected
                                                ? 'border-primary bg-primary/5 text-slate-900'
                                                : 'border-slate-100 text-slate-500 hover:border-primary/40'
                                            }`}
                                    >
                                        <span className={isSelected ? 'text-primary' : 'text-slate-400'}>
                                            {r.icon}
                                        </span>
                                        <span>{r.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* Occasions */}
                    <section>
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Sparkles size={18} className="text-primary" />
                            L'occasion ?
                        </h3>
                        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-2">
                            {occasionOptions.map((o) => {
                                const isSelected = filters.occasions.includes(o.id);
                                return (
                                    <button
                                        key={o.id}
                                        onClick={() => toggleOccasion(o.id)}
                                        className={`shrink-0 px-5 py-2.5 rounded-full font-medium transition-all
                      active:scale-95 cursor-pointer text-sm
                      ${isSelected
                                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                : 'bg-slate-100 text-slate-600 hover:bg-primary/20'
                                            }`}
                                    >
                                        {o.label}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* Budget */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <span className="text-primary text-xl">💰</span>
                                Budget
                            </h3>
                            <span className="text-primary font-bold">
                                0€ - {budgetSteps[budgetIndex]}€{budgetIndex === budgetSteps.length - 1 ? '+' : ''}
                            </span>
                        </div>
                        <div className="relative w-full">
                            <input
                                type="range"
                                min={0}
                                max={budgetSteps.length - 1}
                                value={budgetIndex}
                                onChange={handleBudgetChange}
                                className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6
                  [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6
                  [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-4
                  [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #eebd2b 0%, #eebd2b ${(budgetIndex / (budgetSteps.length - 1)) * 100
                                        }%, #f1f5f9 ${(budgetIndex / (budgetSteps.length - 1)) * 100}%, #f1f5f9 100%)`,
                                }}
                            />
                            <div className="flex justify-between mt-2.5 text-xs text-slate-400 font-medium">
                                <span>10€</span>
                                <span>50€</span>
                                <span>100€</span>
                                <span>200€+</span>
                            </div>
                        </div>
                    </section>

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl
              shadow-lg shadow-primary/30 flex items-center justify-center gap-3 text-lg
              transition-all active:scale-95 disabled:opacity-70 cursor-pointer animate-pulse-glow"
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Génération en cours...
                            </>
                        ) : (
                            <>
                                <Sparkles size={22} />
                                Générer des idées
                            </>
                        )}
                    </button>
                </div>

                {/* Trending Section */}
                <section className="mt-12">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h3 className="text-2xl font-extrabold tracking-tight">Tendances</h3>
                            <p className="text-slate-500 text-sm">Les cadeaux les plus populaires</p>
                        </div>
                        <button
                            onClick={() => navigate('/explorer')}
                            className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
                        >
                            Voir tout
                            <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-6 px-6">
                        {trendingGifts.map((gift, index) => (
                            <div key={gift.id} className="shrink-0 w-44 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <GiftCard
                                    gift={gift}
                                    isFavorite={isFavorite(gift.id)}
                                    onToggleFavorite={toggleFavorite}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
