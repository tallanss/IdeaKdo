import type { Gift } from '../data/giftData';

interface GiftCardProps {
    readonly gift: Gift;
    readonly isFavorite: boolean;
    readonly onToggleFavorite: (id: string) => void;
    readonly onClick?: () => void;
    readonly style?: React.CSSProperties;
}

export function GiftCardFull({ gift, isFavorite, onToggleFavorite, onClick, style }: GiftCardProps) {
    return (
        <div
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer
        hover:shadow-md transition-all duration-300"
            style={style}
            onClick={onClick}
        >
            <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(gift.id);
                    }}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-2 shadow-sm
            hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={isFavorite ? '#f43f5e' : 'none'}
                        stroke={isFavorite ? '#f43f5e' : '#94a3b8'}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
            </div>
            <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-slate-800 text-sm leading-tight">{gift.name}</h4>
                    <span className="shrink-0 text-primary font-bold text-sm">{gift.price.toFixed(2)} €</span>
                </div>
                <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">{gift.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                    {gift.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] font-medium bg-primary/10 text-primary rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
