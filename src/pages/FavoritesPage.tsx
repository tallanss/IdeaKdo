import { useState } from 'react';
import { Heart, Gift } from 'lucide-react';
import { gifts } from '../data/giftData';
import { useFavorites } from '../hooks/useFavorites';
import { GiftCardFull } from '../components/GiftCardFull';
import { GiftDetailModal } from '../components/GiftDetailModal';
import type { Gift as GiftType } from '../data/giftData';

export function FavoritesPage() {
    const { favorites, isFavorite, toggleFavorite } = useFavorites();
    const [selectedGift, setSelectedGift] = useState<GiftType | null>(null);

    const favoriteGifts = gifts.filter((g) => favorites.includes(g.id));

    return (
        <div className="animate-fade-in-up">
            {/* Header */}
            <header className="p-6 pt-8">
                <div className="flex items-center gap-3">
                    <Heart size={22} className="text-primary fill-primary" />
                    <h2 className="text-2xl font-extrabold tracking-tight">Mes Favoris</h2>
                </div>
                {favoriteGifts.length > 0 && (
                    <p className="text-slate-500 text-sm mt-1">{favoriteGifts.length} cadeau{favoriteGifts.length > 1 ? 'x' : ''} sauvegardé{favoriteGifts.length > 1 ? 's' : ''}</p>
                )}
            </header>

            <main className="px-6 pb-28">
                {favoriteGifts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                            <Gift size={32} className="text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Pas encore de favoris</h3>
                        <p className="text-slate-500 max-w-xs mx-auto">
                            Explorez les cadeaux et appuyez sur le cœur pour les sauvegarder ici.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {favoriteGifts.map((gift, index) => (
                            <div
                                key={gift.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
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

            <GiftDetailModal
                gift={selectedGift}
                isFavorite={selectedGift ? isFavorite(selectedGift.id) : false}
                onToggleFavorite={toggleFavorite}
                onClose={() => setSelectedGift(null)}
            />
        </div>
    );
}
