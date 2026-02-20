import { useState, useCallback } from 'react';
import { gifts, filterGifts, type Gift, type Recipient, type Occasion } from '../data/giftData';

export interface Filters {
    recipients: Recipient[];
    occasions: Occasion[];
    minBudget: number;
    maxBudget: number;
}

export function useGiftGenerator() {
    const [filters, setFilters] = useState<Filters>({
        recipients: [],
        occasions: [],
        minBudget: 10,
        maxBudget: 200,
    });
    const [results, setResults] = useState<Gift[]>([]);
    const [hasGenerated, setHasGenerated] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const toggleRecipient = useCallback((recipient: Recipient) => {
        setFilters((prev) => ({
            ...prev,
            recipients: prev.recipients.includes(recipient)
                ? prev.recipients.filter((r) => r !== recipient)
                : [...prev.recipients, recipient],
        }));
    }, []);

    const toggleOccasion = useCallback((occasion: Occasion) => {
        setFilters((prev) => ({
            ...prev,
            occasions: prev.occasions.includes(occasion)
                ? prev.occasions.filter((o) => o !== occasion)
                : [...prev.occasions, occasion],
        }));
    }, []);

    const setBudget = useCallback((max: number) => {
        setFilters((prev) => ({ ...prev, maxBudget: max }));
    }, []);

    const generate = useCallback(() => {
        setIsGenerating(true);
        // Simulate a small delay for UI feedback
        setTimeout(() => {
            const filtered = filterGifts(
                gifts,
                filters.recipients,
                filters.occasions,
                filters.minBudget,
                filters.maxBudget
            );
            // Shuffle results for variety
            const shuffled = [...filtered].sort(() => Math.random() - 0.5);
            setResults(shuffled);
            setHasGenerated(true);
            setIsGenerating(false);
        }, 800);
    }, [filters]);

    const reset = useCallback(() => {
        setFilters({ recipients: [], occasions: [], minBudget: 10, maxBudget: 200 });
        setResults([]);
        setHasGenerated(false);
    }, []);

    return {
        filters,
        results,
        hasGenerated,
        isGenerating,
        toggleRecipient,
        toggleOccasion,
        setBudget,
        generate,
        reset,
    };
}
