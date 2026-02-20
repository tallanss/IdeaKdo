export interface Gift {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    recipients: Recipient[];
    occasions: Occasion[];
    tags: string[];
}

export type Recipient = 'partenaire' | 'parent' | 'ami' | 'enfant';
export type Occasion = 'anniversaire' | 'mariage' | 'noel' | 'fete-des-meres' | 'saint-valentin' | 'naissance';

export const recipientLabels: Record<Recipient, { label: string; icon: string }> = {
    partenaire: { label: 'Partenaire', icon: 'Heart' },
    parent: { label: 'Parent', icon: 'Users' },
    ami: { label: 'Ami', icon: 'Smile' },
    enfant: { label: 'Enfant', icon: 'Baby' },
};

export const occasionLabels: Record<Occasion, string> = {
    anniversaire: 'Anniversaire',
    mariage: 'Mariage',
    noel: 'Noël',
    'fete-des-meres': 'Fête des mères',
    'saint-valentin': 'Saint-Valentin',
    naissance: 'Naissance',
};

export const gifts: Gift[] = [
    // --- Bougies & Bien-être ---
    {
        id: '1',
        name: 'Bougie Artisanale Parfumée',
        description: 'Bougie en cire de soja aux huiles essentielles, coulée à la main dans un pot en céramique artisanal.',
        price: 35,
        image: 'https://images.unsplash.com/photo-1602607079858-8e8a3b633041?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'noel', 'fete-des-meres'],
        tags: ['relaxation', 'artisanal', 'déco'],
    },
    {
        id: '2',
        name: 'Coffret Spa Luxe',
        description: 'Ensemble de soins avec huile de massage, bombe de bain et masque visage aux ingrédients naturels.',
        price: 65,
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fdab72?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'saint-valentin', 'fete-des-meres'],
        tags: ['bien-être', 'luxe', 'soins'],
    },
    {
        id: '3',
        name: 'Diffuseur d\'Huiles Essentielles',
        description: 'Diffuseur ultrasonique en bois de bambou avec 6 huiles essentielles bio incluses.',
        price: 45,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'noel', 'fete-des-meres'],
        tags: ['bien-être', 'aromathérapie', 'déco'],
    },

    // --- Tech & Gadgets ---
    {
        id: '4',
        name: 'Montre Connectée Premium',
        description: 'Montre intelligente avec suivi santé, GPS intégré et écran AMOLED. Design minimaliste et élégant.',
        price: 199,
        image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'noel', 'saint-valentin'],
        tags: ['tech', 'sport', 'santé'],
    },
    {
        id: '5',
        name: 'Appareil Photo Instantané',
        description: 'Appareil photo instantané au style rétro avec 20 films inclus. Parfait pour capturer les moments.',
        price: 89,
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'ami', 'enfant'],
        occasions: ['anniversaire', 'noel', 'mariage'],
        tags: ['photo', 'rétro', 'créatif'],
    },
    {
        id: '6',
        name: 'Enceinte Bluetooth Design',
        description: 'Enceinte portable avec son 360°, étanche et autonomie 24h. Finition tissu premium.',
        price: 79,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'ami', 'enfant'],
        occasions: ['anniversaire', 'noel'],
        tags: ['musique', 'tech', 'portable'],
    },
    {
        id: '7',
        name: 'Écouteurs Sans Fil Premium',
        description: 'Écouteurs true wireless avec réduction de bruit active et boîtier de charge sans fil.',
        price: 149,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'noel', 'saint-valentin'],
        tags: ['musique', 'tech', 'premium'],
    },
    {
        id: '8',
        name: 'Liseuse Électronique',
        description: 'Liseuse e-ink avec éclairage ajustable, étanche et capacité de 8000+ livres.',
        price: 129,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'noel', 'fete-des-meres'],
        tags: ['lecture', 'tech', 'culture'],
    },

    // --- Mode & Accessoires ---
    {
        id: '9',
        name: 'Écharpe en Cachemire',
        description: 'Écharpe 100% cachemire d\'Écosse, douce et chaude. Disponible en 8 coloris.',
        price: 120,
        image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent'],
        occasions: ['anniversaire', 'noel', 'fete-des-meres', 'saint-valentin'],
        tags: ['mode', 'luxe', 'chaleur'],
    },
    {
        id: '10',
        name: 'Portefeuille Cuir Artisanal',
        description: 'Portefeuille en cuir italien pleine fleur, cousu main avec personnalisation initiales.',
        price: 85,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'noel', 'saint-valentin'],
        tags: ['mode', 'artisanal', 'personnalisé'],
    },
    {
        id: '11',
        name: 'Montre Classique Élégante',
        description: 'Montre automatique avec bracelet cuir, cadran minimaliste et boîtier en acier inoxydable.',
        price: 185,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent'],
        occasions: ['anniversaire', 'mariage', 'saint-valentin'],
        tags: ['mode', 'luxe', 'classique'],
    },
    {
        id: '12',
        name: 'Sac à Main en Cuir',
        description: 'Sac à main minimaliste en cuir végétal, design scandinave avec bandoulière amovible.',
        price: 155,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'fete-des-meres', 'saint-valentin'],
        tags: ['mode', 'luxe', 'éco-responsable'],
    },

    // --- Gastronomie ---
    {
        id: '13',
        name: 'Coffret Chocolats Grands Crus',
        description: 'Assortiment de 24 chocolats fins par un Maître Chocolatier, cacao d\'origine unique.',
        price: 45,
        image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'noel', 'saint-valentin', 'fete-des-meres'],
        tags: ['gastronomie', 'gourmand', 'luxe'],
    },
    {
        id: '14',
        name: 'Coffret Dégustation Thé',
        description: 'Collection de 12 thés du monde en vrac avec infuseur en verre soufflé artisanal.',
        price: 55,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'noel', 'fete-des-meres'],
        tags: ['gastronomie', 'bien-être', 'découverte'],
    },
    {
        id: '15',
        name: 'Panier Gourmand Terroir',
        description: 'Sélection de produits du terroir français : foie gras, confits, vins et fromages.',
        price: 95,
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=500&fit=crop',
        recipients: ['parent', 'ami'],
        occasions: ['anniversaire', 'noel', 'mariage'],
        tags: ['gastronomie', 'terroir', 'convivial'],
    },
    {
        id: '16',
        name: 'Machine à Café Expresso',
        description: 'Machine expresso automatique avec broyeur intégré, mousseur à lait et écran tactile.',
        price: 250,
        image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent'],
        occasions: ['anniversaire', 'noel', 'mariage'],
        tags: ['gastronomie', 'tech', 'quotidien'],
    },

    // --- Décoration & Maison ---
    {
        id: '17',
        name: 'Lampe d\'Ambiance LED',
        description: 'Lampe design en bois et verre soufflé avec variateur de couleurs et télécommande.',
        price: 75,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab3fe?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'noel', 'mariage'],
        tags: ['déco', 'ambiance', 'design'],
    },
    {
        id: '18',
        name: 'Plante d\'Intérieur Rare',
        description: 'Monstera Variegata en pot céramique fait main. Livré avec guide d\'entretien.',
        price: 68,
        image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'noel', 'fete-des-meres', 'naissance'],
        tags: ['déco', 'nature', 'zen'],
    },
    {
        id: '19',
        name: 'Cadre Photo Numérique',
        description: 'Cadre 10" haute résolution avec WiFi. Partagez des photos depuis votre téléphone.',
        price: 110,
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=500&fit=crop',
        recipients: ['parent', 'partenaire'],
        occasions: ['anniversaire', 'noel', 'fete-des-meres', 'naissance'],
        tags: ['déco', 'tech', 'souvenir'],
    },

    // --- Expériences ---
    {
        id: '20',
        name: 'Vol en Montgolfière',
        description: 'Survol de la campagne française au lever du soleil pour 2 personnes. Champagne inclus.',
        price: 220,
        image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent'],
        occasions: ['anniversaire', 'mariage', 'saint-valentin'],
        tags: ['expérience', 'aventure', 'romantique'],
    },
    {
        id: '21',
        name: 'Atelier de Cuisine',
        description: 'Cours de cuisine gastronomique avec un chef étoilé. Menu 3 plats + vins.',
        price: 130,
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'saint-valentin', 'fete-des-meres'],
        tags: ['expérience', 'gastronomie', 'convivial'],
    },
    {
        id: '22',
        name: 'Massage Duo en Spa',
        description: 'Séance de massage relaxant pour 2 personnes dans un spa 5 étoiles. 1h30.',
        price: 180,
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=500&fit=crop',
        recipients: ['partenaire'],
        occasions: ['anniversaire', 'saint-valentin', 'mariage'],
        tags: ['expérience', 'bien-être', 'luxe'],
    },
    {
        id: '23',
        name: 'Escape Game Privé',
        description: 'Session privée d\'escape game immersif pour 2-6 joueurs. Scénarios exclusifs.',
        price: 40,
        image: 'https://images.unsplash.com/photo-1590422749897-47036da0b0ff?w=400&h=500&fit=crop',
        recipients: ['ami', 'partenaire', 'enfant'],
        occasions: ['anniversaire', 'noel'],
        tags: ['expérience', 'jeu', 'groupe'],
    },

    // --- Enfants ---
    {
        id: '24',
        name: 'Kit Robotique Éducatif',
        description: 'Robot programmable à construire soi-même. Apprentissage du code dès 8 ans.',
        price: 60,
        image: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=400&h=500&fit=crop',
        recipients: ['enfant'],
        occasions: ['anniversaire', 'noel'],
        tags: ['éducatif', 'tech', 'créatif'],
    },
    {
        id: '25',
        name: 'Coffret Loisirs Créatifs',
        description: 'Coffret complet avec peinture, argile, perles et matériaux de bricolage. 150+ pièces.',
        price: 35,
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=500&fit=crop',
        recipients: ['enfant'],
        occasions: ['anniversaire', 'noel'],
        tags: ['créatif', 'art', 'jeu'],
    },
    {
        id: '26',
        name: 'Télescope Débutant',
        description: 'Télescope astronomique avec trépied, 3 oculaires et carte du ciel interactive.',
        price: 95,
        image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=400&h=500&fit=crop',
        recipients: ['enfant', 'ami'],
        occasions: ['anniversaire', 'noel'],
        tags: ['éducatif', 'science', 'découverte'],
    },
    {
        id: '27',
        name: 'Console de Jeux Rétro',
        description: 'Mini console avec 500+ jeux classiques intégrés. 2 manettes incluses.',
        price: 55,
        image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400&h=500&fit=crop',
        recipients: ['enfant', 'ami', 'partenaire'],
        occasions: ['anniversaire', 'noel'],
        tags: ['jeu', 'rétro', 'nostalgie'],
    },

    // --- Personnalisé ---
    {
        id: '28',
        name: 'Album Photo Personnalisé',
        description: 'Album relié en lin avec 50 pages. Impression photo HD et textes personnalisables.',
        price: 50,
        image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'mariage', 'naissance', 'fete-des-meres'],
        tags: ['personnalisé', 'souvenir', 'émotion'],
    },
    {
        id: '29',
        name: 'Bijou Gravé Personnalisé',
        description: 'Bracelet ou collier en argent 925 avec gravure de votre choix. Écrin offert.',
        price: 75,
        image: 'https://images.unsplash.com/photo-1515562141589-67f0d93b4348?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'saint-valentin', 'fete-des-meres', 'naissance'],
        tags: ['bijoux', 'personnalisé', 'luxe'],
    },
    {
        id: '30',
        name: 'Étoile Personnalisée',
        description: 'Nommez une étoile et recevez un coffret avec certificat, carte du ciel et coordonnées GPS.',
        price: 40,
        image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'enfant'],
        occasions: ['anniversaire', 'naissance', 'saint-valentin', 'mariage'],
        tags: ['personnalisé', 'romantique', 'unique'],
    },

    // --- Livres & Culture ---
    {
        id: '31',
        name: 'Coffret Bande Dessinée',
        description: 'Intégrale collector d\'une série BD culte en édition limitée numérotée.',
        price: 55,
        image: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=400&h=500&fit=crop',
        recipients: ['ami', 'enfant', 'partenaire'],
        occasions: ['anniversaire', 'noel'],
        tags: ['culture', 'lecture', 'collector'],
    },
    {
        id: '32',
        name: 'Abonnement Box Culturelle',
        description: 'Box mensuelle avec livre, magazine culturel, snack artisanal et objet surprise.',
        price: 30,
        image: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=400&h=500&fit=crop',
        recipients: ['ami', 'partenaire', 'parent'],
        occasions: ['anniversaire', 'noel'],
        tags: ['culture', 'surprise', 'abonnement'],
    },

    // --- Sport & Aventure ---
    {
        id: '33',
        name: 'Sac à Dos Randonnée',
        description: 'Sac technique 30L ultra-léger, imperméable avec système d\'hydratation intégré.',
        price: 95,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'ami'],
        occasions: ['anniversaire', 'noel'],
        tags: ['sport', 'aventure', 'outdoor'],
    },
    {
        id: '34',
        name: 'Tapis de Yoga Premium',
        description: 'Tapis en caoutchouc naturel antidérapant avec sac de transport et sangle.',
        price: 65,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'ami', 'parent'],
        occasions: ['anniversaire', 'noel', 'fete-des-meres'],
        tags: ['sport', 'bien-être', 'yoga'],
    },

    // --- Bijoux & Luxe ---
    {
        id: '35',
        name: 'Parfum de Niche',
        description: 'Eau de parfum artisanale d\'une maison de niche, flacon 50ml dans un coffret luxe.',
        price: 140,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent'],
        occasions: ['anniversaire', 'saint-valentin', 'fete-des-meres'],
        tags: ['luxe', 'parfum', 'niche'],
    },
    {
        id: '36',
        name: 'Boucles d\'Oreilles Perles',
        description: 'Boucles d\'oreilles en or 18 carats avec perles de culture d\'eau douce.',
        price: 165,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent'],
        occasions: ['anniversaire', 'saint-valentin', 'fete-des-meres', 'mariage'],
        tags: ['bijoux', 'luxe', 'élégance'],
    },

    // --- Maison & Cuisine ---
    {
        id: '37',
        name: 'Set de Couteaux Japonais',
        description: 'Trio de couteaux japonais en acier damas avec manche en bois d\'olivier.',
        price: 175,
        image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent', 'ami'],
        occasions: ['anniversaire', 'mariage', 'noel'],
        tags: ['cuisine', 'artisanal', 'premium'],
    },
    {
        id: '38',
        name: 'Carafe à Décanter Design',
        description: 'Carafe en cristal soufflé bouche avec bouchon en chêne. Capacité 1.5L.',
        price: 85,
        image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=400&h=500&fit=crop',
        recipients: ['parent', 'ami', 'partenaire'],
        occasions: ['mariage', 'anniversaire', 'noel'],
        tags: ['vin', 'déco', 'artisanal'],
    },

    // --- Cocooning ---
    {
        id: '39',
        name: 'Plaid en Laine Mérinos',
        description: 'Grand plaid 180x220cm en laine mérinos extra-fine. Tissé au Portugal.',
        price: 110,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent'],
        occasions: ['anniversaire', 'noel', 'fete-des-meres'],
        tags: ['cocooning', 'chaleur', 'luxe'],
    },
    {
        id: '40',
        name: 'Peignoir en Bambou',
        description: 'Peignoir ultra-doux en fibre de bambou bio. Broderie initiales offerte.',
        price: 70,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
        recipients: ['partenaire', 'parent'],
        occasions: ['anniversaire', 'saint-valentin', 'fete-des-meres'],
        tags: ['cocooning', 'bien-être', 'personnalisé'],
    },
];

// Trending gifts (subset for homepage)
export const trendingGiftIds = ['1', '4', '5', '13', '20', '29'];

export function filterGifts(
    allGifts: Gift[],
    recipients: Recipient[],
    occasions: Occasion[],
    minBudget: number,
    maxBudget: number
): Gift[] {
    return allGifts.filter((gift) => {
        const matchesRecipient =
            recipients.length === 0 || recipients.some((r) => gift.recipients.includes(r));
        const matchesOccasion =
            occasions.length === 0 || occasions.some((o) => gift.occasions.includes(o));
        const matchesBudget = gift.price >= minBudget && gift.price <= maxBudget;
        return matchesRecipient && matchesOccasion && matchesBudget;
    });
}
