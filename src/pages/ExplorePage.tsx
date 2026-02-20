import { useState, useMemo } from 'react';
import { Search, Compass, SlidersHorizontal } from 'lucide-react';
import { gifts, type Recipient, type Occasion, recipientLabels, occasionLabels } from '../data/giftData';
import { useFavorites } from '../hooks/useFavorites';
import { GiftCardFull } from '../components/GiftCardFull';
import { GiftDetailModal } from '../components/GiftDetailModal';
import type { Gift } from '../data/giftData';

const allRecipients = Object.keys(recipientLabels) as Recipient[];
const allOccasions = Object.keys(occasionLabels) as Occasion[];

export function ExplorePage() {
    const { isFavorite, toggleFavorite } = useFavorites();
    const [search, setSearch] = useState('');
    const [activeRecipient, setActiveRecipient] = useState<Recipient | null>(null);
    const [activeOccasion, setActiveOccasion] = useState<Occasion | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

    const filtered = useMemo(() => {
        return gifts.filter((gift) => {
            const matchesSearch =
                search === '' ||
                gift.name.toLowerCase().includes(search.toLowerCase()) ||
                gift.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
            const matchesRecipient = !activeRecipient || gift.recipients.includes(activeRecipient);
            const matchesOccasion = !activeOccasion || gift.occasions.includes(activeOccasion);
            return matchesSearch && matchesRecipient && matchesOccasion;
        });
    }, [search, activeRecipient, activeOccasion]);

    return (
        <div className="animate-fade-in-up">
            {/* Header */}
            <header className="p-6 pt-8">
                <div className="flex items-center gap-3 mb-4">
                    <Compass size={22} className="text-primary" />
                    <h2 className="text-2xl font-extrabold tracking-tight">Explorer</h2>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Rechercher un cadeau..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-12 py-3.5 bg-white rounded-xl border border-slate-100
              shadow-sm text-slate-800 placeholder:text-slate-400 outline-none
              focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors cursor-pointer
              ${showFilters ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <SlidersHorizontal size={18} />
                    </button>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="space-y-3 animate-fade-in-up mb-2">
                        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                            <button
                                onClick={() => setActiveRecipient(null)}
                                className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer
                  ${!activeRecipient ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}
                            >
                                Tous
                            </button>
                            {allRecipients.map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setActiveRecipient(r === activeRecipient ? null : r)}
                                    className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer
                    ${r === activeRecipient ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}
                                >
                                    {recipientLabels[r].label}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                            <button
                                onClick={() => setActiveOccasion(null)}
                                className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer
                  ${!activeOccasion ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}
                            >
                                Toutes
                            </button>
                            {allOccasions.map((o) => (
                                <button
                                    key={o}
                                    onClick={() => setActiveOccasion(o === activeOccasion ? null : o)}
                                    className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer
                    ${o === activeOccasion ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}
                                >
                                    {occasionLabels[o]}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            <main className="px-6 pb-28">
                <p className="text-slate-500 text-sm mb-4">{filtered.length} cadeaux disponibles</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filtered.map((gift, index) => (
                        <div
                            key={gift.id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${Math.min(index * 0.03, 0.3)}s`, opacity: 0 }}
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
            </main>

            <GiftDetailModal
                gift={selectedGift}
                isFavorite={selectedGift ? isFavorite(selectedGift.id) : false}
                onToggleFavorite={toggleFavorite}
                onClose={() => setSelectedGift(null)}
            />
        </div>
    );
}
