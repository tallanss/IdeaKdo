import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart,
    Users,
    Smile,
    Baby,
    Sparkles,
    ChevronRight,
    ChevronLeft,
    ArrowRight
} from 'lucide-react';
import {
    type Recipient,
    type Occasion,
    occasionLabels
} from '../data/giftData';
import { useGiftGenerator } from '../hooks/useGiftGenerator';
import { useNavigate } from 'react-router-dom';

const recipients: { id: Recipient; label: string; icon: any }[] = [
    { id: 'partenaire', label: 'Partenaire', icon: Heart },
    { id: 'parent', label: 'Parent', icon: Users },
    { id: 'ami', label: 'Ami', icon: Smile },
    { id: 'enfant', label: 'Enfant', icon: Baby },
];

const occasions: { id: Occasion; label: string }[] = Object.entries(occasionLabels).map(([id, label]) => ({
    id: id as Occasion,
    label,
}));

const budgetSteps = [25, 50, 100, 200, 500];

export function WizardFlow() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const { filters, toggleRecipient, toggleOccasion, setBudget, generate, isGenerating } = useGiftGenerator();

    const nextStep = () => setStep(s => Math.min(s + 1, 3));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleFinish = () => {
        generate();
        setTimeout(() => {
            navigate('/results', { state: { filters } });
        }, 600);
    };

    const surpriseMe = () => {
        // Randomly select a recipient and occasion
        const randomRecipient = recipients[Math.floor(Math.random() * recipients.length)].id;
        const randomOccasion = occasions[Math.floor(Math.random() * occasions.length)].id;

        // Reset and set random
        toggleRecipient(randomRecipient);
        toggleOccasion(randomOccasion);
        setBudget(100);

        // Generate immediately
        handleFinish();
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '20%' : '-20%',
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? '20%' : '-20%',
            opacity: 0
        })
    };

    return (
        <div className="bg-white rounded-3xl shadow-premium border border-slate-50 overflow-hidden">
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-50">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: '33%' }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                />
            </div>

            <div className="p-8">
                <AnimatePresence mode="wait" custom={step}>
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            custom={step}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <span className="text-primary font-bold text-sm uppercase tracking-wider">Étape 1/3</span>
                                <h3 className="text-2xl font-extrabold text-slate-900">Pour qui est ce cadeau ?</h3>
                                <p className="text-slate-500">Choisissez une ou plusieurs personnes à gâter.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {recipients.map((r) => {
                                    const isSelected = filters.recipients.includes(r.id);
                                    const Icon = r.icon;
                                    return (
                                        <button
                                            key={r.id}
                                            onClick={() => toggleRecipient(r.id)}
                                            className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300
                        active:scale-95 cursor-pointer group
                        ${isSelected
                                                    ? 'border-primary bg-primary/5 text-primary'
                                                    : 'border-slate-100 bg-slate-50/50 text-slate-400 hover:border-primary/30'}`}
                                        >
                                            <div className={`p-3 rounded-xl mb-3 transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-white text-slate-400 group-hover:bg-primary/10'}`}>
                                                <Icon size={28} fill={isSelected ? 'currentColor' : 'none'} />
                                            </div>
                                            <span className={`font-bold ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>{r.label}</span>
                                            {isSelected && (
                                                <motion.div
                                                    layoutId="check"
                                                    className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                                                >
                                                    <Sparkles size={10} className="text-white" />
                                                </motion.div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="pt-4 flex items-center gap-4">
                                <button
                                    onClick={nextStep}
                                    disabled={filters.recipients.length === 0}
                                    className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2
                    hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
                                >
                                    Continuer
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            custom={step}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <span className="text-primary font-bold text-sm uppercase tracking-wider">Étape 2/3</span>
                                <h3 className="text-2xl font-extrabold text-slate-900">Quelle est l'occasion ?</h3>
                                <p className="text-slate-500">Dites-nous quel événement nous fêtons.</p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {occasions.map((o) => {
                                    const isSelected = filters.occasions.includes(o.id);
                                    return (
                                        <button
                                            key={o.id}
                                            onClick={() => toggleOccasion(o.id)}
                                            className={`px-6 py-4 rounded-2xl border-2 font-bold transition-all duration-300
                        active:scale-95 cursor-pointer
                        ${isSelected
                                                    ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                                                    : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-primary/20'}`}
                                        >
                                            {o.label}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="pt-4 flex items-center gap-4">
                                <button
                                    onClick={prevStep}
                                    className="p-4 rounded-xl border-2 border-slate-100 text-slate-400 hover:bg-slate-50 transition-all active:scale-95"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={filters.occasions.length === 0}
                                    className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2
                    hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
                                >
                                    Suivant
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            custom={step}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <span className="text-primary font-bold text-sm uppercase tracking-wider">Dernière étape ! 🎁</span>
                                <h3 className="text-2xl font-extrabold text-slate-900">Quel est votre budget ?</h3>
                                <p className="text-slate-500">Nous trouverons les meilleures pépites pour vous.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <div className="text-4xl font-black text-slate-900">
                                        {filters.maxBudget === 500 ? '∞' : `${filters.maxBudget}€`}
                                    </div>
                                    <div className="text-slate-400 font-bold mb-1">Maximum</div>
                                </div>

                                <input
                                    type="range"
                                    min={0}
                                    max={budgetSteps.length - 1}
                                    step={1}
                                    value={budgetSteps.indexOf(filters.maxBudget)}
                                    onChange={(e) => setBudget(budgetSteps[parseInt(e.target.value)])}
                                    className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-primary"
                                />

                                <div className="grid grid-cols-4 gap-2">
                                    {[25, 50, 100, 200].map(val => (
                                        <button
                                            key={val}
                                            onClick={() => setBudget(val)}
                                            className={`py-2 rounded-lg text-xs font-bold transition-all
                        ${filters.maxBudget === val ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}
                                        >
                                            {val}€
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 space-y-3">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={prevStep}
                                        className="p-4 rounded-xl border-2 border-slate-100 text-slate-400 hover:bg-slate-50 transition-all active:scale-95"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={handleFinish}
                                        disabled={isGenerating}
                                        className="flex-1 bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2
                      hover:bg-primary-dark transition-all active:scale-95 shadow-primary-glow"
                                    >
                                        {isGenerating ? (
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                                <Sparkles size={20} />
                                            </motion.div>
                                        ) : (
                                            <>
                                                Trouver le cadeau
                                                <ArrowRight size={20} />
                                            </>
                                        )}
                                    </button>
                                </div>

                                <button
                                    onClick={surpriseMe}
                                    className="w-full text-slate-400 font-bold text-sm hover:text-primary transition-colors py-2"
                                >
                                    Je n'ai pas d'idée, surprenez-moi !
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
