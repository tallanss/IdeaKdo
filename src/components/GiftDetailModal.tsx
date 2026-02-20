import type { Gift } from '../data/giftData';
import { Heart, ShoppingBag, X, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GiftDetailModalProps {
    readonly gift: Gift | null;
    readonly isFavorite: boolean;
    readonly onToggleFavorite: (id: string) => void;
    readonly onClose: () => void;
}

export function GiftDetailModal({ gift, isFavorite, onToggleFavorite, onClose }: GiftDetailModalProps) {
    const shareGift = async () => {
        if (!gift) return;
        const shareData = {
            title: gift.name,
            text: `J'ai trouvé cette idée cadeau géniale : ${gift.name} - ${gift.description}`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                alert('Lien copié dans le presse-papier !');
            }
        } catch (err) {
            console.error('Erreur partage:', err);
        }
    };

    return (
        <AnimatePresence>
            {gift && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="relative bg-white rounded-t-[40px] sm:rounded-[40px] w-full sm:max-w-lg max-h-[92vh] overflow-y-auto
              shadow-premium z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header / Image area */}
                        <div className="relative h-96 w-full overflow-hidden">
                            <img
                                src={gift.image}
                                alt={gift.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

                            <div className="absolute top-6 left-6 right-6 flex justify-between">
                                <button
                                    onClick={onClose}
                                    className="bg-white/90 backdrop-blur p-3 rounded-2xl shadow-premium text-slate-600 cursor-pointer active:scale-95 transition-transform"
                                >
                                    <X size={20} />
                                </button>
                                <div className="flex gap-2">
                                    <button
                                        onClick={shareGift}
                                        className="bg-white/90 backdrop-blur p-3 rounded-2xl shadow-premium text-primary cursor-pointer active:scale-95 transition-transform"
                                    >
                                        <Share2 size={20} />
                                    </button>
                                    <button
                                        onClick={() => onToggleFavorite(gift.id)}
                                        className="bg-white/90 backdrop-blur p-3 rounded-2xl shadow-premium cursor-pointer active:scale-95 transition-transform"
                                    >
                                        <Heart
                                            size={20}
                                            className={isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 pb-12 -mt-10 relative bg-white rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                            <div className="flex flex-wrap gap-2 mb-6">
                                {gift.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-400 rounded-full border border-slate-100"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-start justify-between gap-4 mb-4">
                                <h2 className="text-3xl font-black text-slate-900 leading-[1.1]">{gift.name}</h2>
                            </div>

                            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-2xl mb-6">
                                <p className="text-primary font-black text-xl">{gift.price.toFixed(2)} €</p>
                            </div>

                            <p className="text-slate-600 leading-relaxed text-lg mb-8">
                                {gift.description}
                            </p>

                            {/* Action */}
                            <button
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-5 rounded-2xl 
                  flex items-center justify-center gap-4 text-xl shadow-premium transition-all 
                  active:scale-95 cursor-pointer"
                            >
                                <ShoppingBag size={24} />
                                Acheter maintenant
                            </button>

                            <p className="text-center text-slate-400 text-xs mt-8 font-bold uppercase tracking-widest">
                                Disponible chez nos partenaires
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
