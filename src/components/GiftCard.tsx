import type { Gift } from '../data/giftData';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface GiftCardProps {
    readonly gift: Gift;
    readonly isFavorite: boolean;
    readonly onToggleFavorite: (id: string) => void;
    readonly style?: React.CSSProperties;
}

export function GiftCard({ gift, isFavorite, onToggleFavorite, style }: GiftCardProps) {
    return (
        <div
            className="flex flex-col gap-3 group cursor-pointer"
            style={style}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-slate-50">
                <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Floating Heart Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(gift.id);
                    }}
                    className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all cursor-pointer z-10"
                >
                    <Heart
                        size={18}
                        className={`transition-colors ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-300'
                            }`}
                    />
                </button>
            </div>

            {/* Info */}
            <div className="px-1 space-y-1">
                <h4 className="font-extrabold text-[15px] text-slate-900 leading-tight group-hover:text-primary transition-colors line-clamp-1">
                    {gift.name}
                </h4>
                <p className="text-primary font-black text-sm">
                    {gift.price.toFixed(2)} €
                </p>
            </div>
        </div>
    );
}
