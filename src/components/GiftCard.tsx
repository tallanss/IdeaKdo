import type { Gift } from '../data/giftData';
import { Heart } from 'lucide-react';

interface GiftCardProps {
    readonly gift: Gift;
    readonly isFavorite: boolean;
    readonly onToggleFavorite: (id: string) => void;
    readonly style?: React.CSSProperties;
}

export function GiftCard({ gift, isFavorite, onToggleFavorite, style }: GiftCardProps) {
    return (
        <div className="group" style={style}>
            <div className="relative h-60 w-full rounded-xl bg-slate-200 overflow-hidden mb-3">
                <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(gift.id);
                    }}
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full p-1.5 shadow-sm
            hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                >
                    <Heart
                        size={16}
                        className={`transition-colors ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
                            }`}
                    />
                </button>
                {/* Price badge */}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur rounded-full px-3 py-1 shadow-sm">
                    <span className="text-sm font-bold text-primary">{gift.price.toFixed(2)} €</span>
                </div>
            </div>
            <h4 className="font-bold text-slate-800 truncate text-sm">{gift.name}</h4>
            <p className="text-slate-500 text-xs mt-0.5 line-clamp-2">{gift.description}</p>
        </div>
    );
}
