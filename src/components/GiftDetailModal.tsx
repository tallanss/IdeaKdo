import type { Gift } from '../data/giftData';
import { Heart, ShoppingBag, X } from 'lucide-react';

interface GiftDetailModalProps {
    readonly gift: Gift | null;
    readonly isFavorite: boolean;
    readonly onToggleFavorite: (id: string) => void;
    readonly onClose: () => void;
}

export function GiftDetailModal({ gift, isFavorite, onToggleFavorite, onClose }: GiftDetailModalProps) {
    if (!gift) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto
          animate-fade-in-up shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur rounded-full p-2 shadow-md
            hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                >
                    <X size={20} className="text-slate-600" />
                </button>

                {/* Image */}
                <div className="relative h-72 w-full overflow-hidden rounded-t-2xl sm:rounded-t-2xl">
                    <img
                        src={gift.image}
                        alt={gift.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{gift.name}</h2>
                            <p className="text-primary text-xl font-bold mt-1">{gift.price.toFixed(2)} €</p>
                        </div>
                        <button
                            onClick={() => onToggleFavorite(gift.id)}
                            className="shrink-0 bg-slate-50 rounded-full p-3 hover:bg-slate-100
                active:scale-95 transition-all cursor-pointer"
                        >
                            <Heart
                                size={22}
                                className={`transition-colors ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
                                    }`}
                            />
                        </button>
                    </div>

                    <p className="text-slate-600 leading-relaxed">{gift.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {gift.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    <button
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg
              shadow-primary/30 flex items-center justify-center gap-3 text-lg
              transition-all active:scale-95 cursor-pointer mt-4"
                    >
                        <ShoppingBag size={20} />
                        Acheter ce cadeau
                    </button>
                </div>
            </div>
        </div>
    );
}
