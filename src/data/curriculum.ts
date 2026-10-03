/**
 * Curriculum data for French 5ème Collège (Cycle 4)
 * Subjects: Mathématiques, Physique, Chimie, Sciences (SVT), Technologie
 * Includes lesson summaries, interactive schematics metadata, quizzes,
 * and 6-year exam compilation (2020-2026) with detailed answers.
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface InteractiveDiagramConfig {
  type: 'circuit' | 'matter' | 'fraction' | 'tectonics' | 'algorithm' | 'density';
  title: string;
  description: string;
  initialParams?: Record<string, number | string | boolean>;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  summaryPoints: string[];
  mnemonic: string;
  realWorldExample: string;
  diagram: InteractiveDiagramConfig;
  quiz: QuizQuestion[];
}

export interface ExamQuestion {
  id: string;
  year: number; // 2020 to 2026
  session: string; // e.g. "Évaluation Nationale 5ème", "Épreuve Commune Trimestre 2", "Brevet Blanc Cycle 4"
  topic: string;
  statement: string;
  question: string;
  points: number;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  detailedSolution: string[];
  commonTrap: string;
}

export interface SubjectData {
  id: 'maths' | 'physique' | 'chimie' | 'svt' | 'techno';
  name: string;
  shortName: string;
  themeColor: string;
  accentBg: string;
  accentText: string;
  tagline: string;
  description: string;
  lessons: Lesson[];
  exams: ExamQuestion[];
}

export const CURRICULUM_DATA: Record<string, SubjectData> = {
  maths: {
    id: 'maths',
    name: 'Mathématiques',
    shortName: 'Maths',
    themeColor: 'from-blue-600 to-indigo-600',
    accentBg: 'bg-blue-500',
    accentText: 'text-blue-600',
    tagline: 'Nombres relatifs, fractions, géométrie & raisonnement',
    description: 'Le programme de 5ème structure la pensée logique : découverte des nombres négatifs, manipulation des fractions et propriétés géométriques des triangles.',
    lessons: [
      {
        id: 'maths-fractions',
        title: 'Fractions : Égalités & Additions',
        subtitle: 'Partager des grandeurs et additionner des fractions de même dénominateur',
        category: 'Nombres et calculs',
        readTime: '6 min',
        summaryPoints: [
          'Une fraction a/b représente le quotient de a par b (avec b différent de 0).',
          'On ne change pas la valeur d’une fraction si on multiplie ou divise son numérateur et son dénominateur par un MÊME nombre non nul (ex : 2/3 = 4/6).',
          'Pour additionner ou soustraire deux fractions ayant le MÊME dénominateur, on additionne (ou soustrait) les numérateurs et on GARDE le dénominateur commun : a/d + b/d = (a+b)/d.',
          'Si les dénominateurs sont différents en 5ème, l’un est toujours un multiple de l’autre : on réduit d’abord au même dénominateur avant d’opérer.'
        ],
        mnemonic: '« Ne touche jamais au bas de la fraction ! » On n’additionne JAMAIS les dénominateurs entre eux.',
        realWorldExample: 'Partager 3 pizzas entre 4 amis : chacun reçoit 3/4 de pizza. Si un ami prend 1/4 supplémentaire, il a (3+1)/4 = 4/4 = 1 pizza entière.',
        diagram: {
          type: 'fraction',
          title: 'Simulateur interactif de fractions & proportions',
          description: 'Ajuste le numérateur et le dénominateur pour visualiser le découpage en parts et l’équivalence visuelle.',
          initialParams: { num: 3, den: 4 }
        },
        quiz: [
          {
            id: 'q-m1',
            question: 'Calcule : 3/7 + 2/7 = ?',
            options: ['5/14', '5/7', '6/7', '1/7'],
            correctIndex: 1,
            explanation: 'Les deux fractions ont le même dénominateur (7). On additionne les numérateurs : 3 + 2 = 5, et on conserve 7. Le résultat est donc 5/7.'
          },
          {
            id: 'q-m2',
            question: 'Quelle fraction est égale à 2/5 ?',
            options: ['4/10', '4/7', '5/2', '6/10'],
            correctIndex: 0,
            explanation: 'En multipliant le numérateur et le dénominateur par 2 : (2×2)/(5×2) = 4/10. Les fractions sont donc strictement équivalentes.'
          },
          {
            id: 'q-m3',
            question: 'Pour calculer 1/3 + 2/6, quelle est la première étape indispensable ?',
            options: [
              'Additionner 1 + 2 et 3 + 6',
              'Multiplier les deux fractions',
              'Transformer 1/3 en 2/6 pour avoir le même dénominateur',
              'Inverser les fractions'
            ],
            correctIndex: 2,
            explanation: 'Comme 6 est un multiple de 3 (3 × 2 = 6), on multiplie 1/3 par 2 au numérateur et au dénominateur pour obtenir 2/6. Ensuite, 2/6 + 2/6 = 4/6 = 2/3.'
          }
        ]
      },
      {
        id: 'maths-relatifs',
        title: 'Les Nombres Relatifs : Repérage & Somme',
        subtitle: 'Comprendre les gains et pertes sur la droite graduée',
        category: 'Nombres et calculs',
        readTime: '7 min',
        summaryPoints: [
          'Un nombre relatif est composé d’un signe (+ ou -) et d’une distance à zéro.',
          'Deux nombres qui ont la même distance à zéro mais des signes contraires sont dits OPPOSÉS (ex : +5 et -5). Leur somme vaut toujours 0.',
          'Pour additionner deux relatifs de MÊME signe : on garde le signe commun et on additionne leurs distances à zéro. Ex : (-3) + (-4) = -7.',
          'Pour additionner deux relatifs de SIGNES CONTRAIRES : on prend le signe de celui qui a la plus grande distance à zéro et on soustrait la plus petite de la plus grande. Ex : (+8) + (-5) = +3 ; (-9) + (+4) = -5.'
        ],
        mnemonic: 'Pense au thermomètre ou à l’ascenseur : descendre de 4 étages puis encore de 3, c’est descendre de 7 étages (-4 + -3 = -7) !',
        realWorldExample: 'La météo à Chamonix : il fait -2°C le matin, la température baisse de 5°C la nuit suivante. Il fait alors (-2) + (-5) = -7°C.',
        diagram: {
          type: 'fraction',
          title: 'Axe thermomètre interactif des relatifs',
          description: 'Observe la position sur la droite graduée et le résultat des cumuls positifs et négatifs.',
          initialParams: { num: -3, den: 5 }
        },
        quiz: [
          {
            id: 'q-m4',
            question: 'Quel est le résultat de (-7) + (+10) ?',
            options: ['-17', '-3', '+3', '+17'],
            correctIndex: 2,
            explanation: 'Les deux nombres ont des signes opposés. +10 a la plus grande distance à zéro (10 > 7), le signe du résultat est donc (+). On calcule 10 - 7 = 3. Le résultat est +3.'
          },
          {
            id: 'q-m5',
            question: 'Quelle est la somme de deux nombres opposés, comme (-14) et (+14) ?',
            options: ['0', '+28', '-28', '1'],
            correctIndex: 0,
            explanation: 'Par définition mathématique, deux nombres opposés s’annulent mutuellement, leur somme est rigoureusement égale à 0.'
          }
        ]
      },
      {
        id: 'maths-triangles',
        title: 'Triangles : Somme des angles & Inégalité triangulaire',
        subtitle: 'Propriétés fondamentales pour construire et prouver',
        category: 'Espace et géométrie',
        readTime: '5 min',
        summaryPoints: [
          'La somme des mesures des trois angles d’un triangle vaut TOUJOURS 180°.',
          'Dans un triangle rectangle, les deux angles aigus sont complémentaires (leur somme vaut 90°).',
          'Dans un triangle équilatéral, les 3 angles sont égaux et mesurent 180° / 3 = 60° chacun.',
          'Inégalité triangulaire : dans un triangle, la longueur de chaque côté est inférieure à la somme des deux autres.'
        ],
        mnemonic: '« 180° le demi-tour parfait » : plie les 3 coins d’un triangle en papier, ils s’alignent exactement sur une ligne droite.',
        realWorldExample: 'Les charpentes de toit et ponts en treillis utilisent la triangulation car le triangle est la seule forme géométrique indéformable.',
        diagram: {
          type: 'fraction',
          title: 'Somme des angles d’un triangle dynamique',
          description: 'Vérifie que quels que soient les sommets déplacés, le total fait toujours 180°.',
          initialParams: { num: 60, den: 180 }
        },
        quiz: [
          {
            id: 'q-m6',
            question: 'Dans un triangle ABC, l’angle A mesure 70° et l’angle B mesure 50°. Combien mesure l’angle C ?',
            options: ['50°', '60°', '70°', '90°'],
            correctIndex: 1,
            explanation: 'La somme vaut 180°. A + B = 70° + 50° = 120°. Donc l’angle C = 180° - 120° = 60°.'
          },
          {
            id: 'q-m7',
            question: 'Peut-on construire un triangle dont les côtés mesurent 2 cm, 3 cm et 8 cm ?',
            options: ['Oui, toujours', 'Non, car 2 + 3 = 5 < 8', 'Oui, s’il est rectangle', 'Impossible à savoir'],
            correctIndex: 1,
            explanation: 'D’après l’inégalité triangulaire, le plus grand côté doit être strictement inférieur à la somme des deux autres. Ici 8 > 2 + 3 (8 > 5), les segments ne peuvent pas se rejoindre.'
          }
        ]
      },
      {
        id: 'maths-proportionnalite',
        title: 'Proportionnalité, Pourcentages & Échelles',
        subtitle: 'Calculer une 4ème proportionnelle, appliquer un pourcentage et lire une échelle',
        category: 'Organisation et gestion de données',
        readTime: '6 min',
        summaryPoints: [
          'Deux grandeurs sont proportionnelles si l’on passe des valeurs de l’une aux valeurs de l’autre en multipliant TOUJOURS par un même nombre, appelé COEFFICIENT DE PROPORTIONNALITÉ.',
          'Dans un tableau de proportionnalité à 4 cases, les PRODUITS EN CROIX sont égaux : si a/b = c/d alors a × d = b × c.',
          'Appliquer un pourcentage p% à une quantité, c’est multiplier cette quantité par la fraction p/100 (ex : 20% de 80 € = 80 × 0,20 = 16 €).',
          'L’échelle d’un plan est le quotient : Longueur sur le plan / Longueur réelle (exprimées dans la MÊME unité). Une échelle 1/50 signifie que 1 cm sur le plan représente 50 cm en réalité.'
        ],
        mnemonic: '« Produit en croix = Diagonales magiques » : multiplie les deux valeurs en diagonale et divise par le nombre restant !',
        realWorldExample: 'Ajuster les doses d’une recette de crêpes pour 6 personnes quand la recette de base est pour 4 personnes : on multiplie tous les ingrédients par 6/4 = 1,5.',
        diagram: {
          type: 'fraction',
          title: 'Simulateur de proportions & pourcentages',
          description: 'Ajuste la part en pourcentage pour visualiser l’équivalence avec le ratio et la fraction.',
          initialParams: { num: 25, den: 100 }
        },
        quiz: [
          {
            id: 'q-m8',
            question: 'Si 4 cahiers coûtent 6 €, combien coûtent 10 cahiers ?',
            options: ['12 €', '15 €', '16 €', '20 €'],
            correctIndex: 1,
            explanation: 'Prix d’un cahier = 6 € / 4 = 1,50 €. Pour 10 cahiers : 10 × 1,50 € = 15 € (ou produit en croix : (10 × 6) / 4 = 60 / 4 = 15 €).'
          },
          {
            id: 'q-m9',
            question: 'Un pull à 50 € bénéficie d’une réduction de 30%. Quel est le montant de la réduction ?',
            options: ['10 €', '15 €', '30 €', '35 €'],
            correctIndex: 1,
            explanation: 'Montant de la réduction = 50 × (30 / 100) = 50 × 0,3 = 15 €. (Le nouveau prix du pull sera 50 - 15 = 35 €).'
          },
          {
            id: 'q-m10',
            question: 'Sur une carte à l’échelle 1/100 000, deux villages sont distants de 3 cm. Quelle est leur distance réelle ?',
            options: ['300 m', '3 km', '30 km', '300 km'],
            correctIndex: 1,
            explanation: 'Distance réelle = 3 cm × 100 000 = 300 000 cm = 3 000 m = 3 kilomètres.'
          }
        ]
      },
      {
        id: 'maths-symetrie-centrale',
        title: 'La Symétrie Centrale : Demi-tour & Propriétés',
        subtitle: 'Faire faire un demi-tour à une figure autour d’un point fixe',
        category: 'Espace et géométrie',
        readTime: '6 min',
        summaryPoints: [
          'La symétrie centrale de centre O correspond à un DEMI-TOUR (rotation de 180°) autour du point O.',
          'Le symétrique du point M par rapport à O est le point M’ tel que le centre O soit exactement le MILIEU du segment [MM’].',
          'Une droite et sa symétrique par rapport à un point O sont strictement PARALLÈLES.',
          'Conservation : La symétrie centrale conserve les longueurs, les mesures des angles, le parallélisme et les aires. La figure image est superposable à la figure initiale.'
        ],
        mnemonic: '« Axe = Miroir (pliage), Centre = Demi-tour (aiguille de montre à 180°) ».',
        realWorldExample: 'Les cartes à jouer (Roi, Reine, Valet) ont un centre de symétrie : qu’on les tienne à l’endroit ou à l’envers, elles ont exactement la même apparence !',
        diagram: {
          type: 'fraction',
          title: 'Visualiseur de demi-tour & symétrie centrale',
          description: 'Observe la trajectoire circulaire de 180° autour du centre O.',
          initialParams: { num: 180, den: 360 }
        },
        quiz: [
          {
            id: 'q-m11',
            question: 'Si le point B’ est le symétrique de B par rapport à O, que représente le point O pour le segment [BB’] ?',
            options: ['Une extrémité', 'Le milieu exact', 'Le quart', 'Un point extérieur'],
            correctIndex: 1,
            explanation: 'Par définition mathématique de la symétrie centrale, le centre de symétrie O est toujours le milieu du segment joignant un point à son symétrique.'
          },
          {
            id: 'q-m12',
            question: 'Quelle est la position relative d’une droite (d) et de sa symétrique (d’) par rapport à un centre O ?',
            options: ['Elles sont perpendiculaires', 'Elles se coupent en O', 'Elles sont strictement parallèles', 'Elles sont confondues'],
            correctIndex: 2,
            explanation: 'La symétrie centrale transforme toujours une droite en une droite qui lui est strictement parallèle.'
          },
          {
            id: 'q-m13',
            question: 'Un triangle d’aire 24 cm² subit une symétrie centrale. Quelle est l’aire du triangle symétrique ?',
            options: ['12 cm²', '24 cm²', '48 cm²', '0 cm²'],
            correctIndex: 1,
            explanation: 'La symétrie centrale conserve scrupuleusement les aires : la figure symétrique a donc exactement la même aire (24 cm²).'
          }
        ]
      }
    ],
    exams: [
      {
        id: 'ex-m-2026',
        year: 2026,
        session: 'Évaluation Nationale Bilan 5ème (Session 2026)',
        topic: 'Fractions & Problème de partage',
        statement: 'Lucas dispose d’un budget de 60 €. Il dépense 1/3 pour un livre de sciences et 2/5 pour une calculatrice.',
        question: '1) Quelle fraction de son budget a-t-il dépensée au total ? 2) Combien d’argent lui reste-t-il ?',
        points: 5,
        difficulty: 'Moyen',
        detailedSolution: [
          'Étape 1 : Pour additionner les dépenses, mettons 1/3 et 2/5 au même dénominateur. Le plus petit multiple commun de 3 et 5 est 15.',
          '1/3 = (1 × 5) / (3 × 5) = 5/15.',
          '2/5 = (2 × 3) / (5 × 3) = 6/15.',
          'Fraction totale dépensée = 5/15 + 6/15 = 11/15 du budget.',
          'Étape 2 : La fraction restante est 15/15 - 11/15 = 4/15.',
          'Étape 3 : Montant restant = (4/15) × 60 € = (60 / 15) × 4 = 4 × 4 = 16 €.',
          'Conclusion : Lucas a dépensé 11/15 de son budget et il lui reste exactement 16 €.'
        ],
        commonTrap: 'Additionner 1/3 et 2/5 en faisant (1+2)/(3+5) = 3/8, ce qui est une faute grave de dénominateur !'
      },
      {
        id: 'ex-m-2025',
        year: 2025,
        session: 'Épreuve Commune Collège 5ème (Session 2025)',
        topic: 'Nombres relatifs en situation',
        statement: 'Un sous-marin se trouve à -145 mètres. Il remonte d’abord de 60 mètres, puis plonge de 45 mètres supplémentaires.',
        question: 'À quelle profondeur se situe le sous-marin à la fin de cette manœuvre ? Justifie par un calcul de relatifs.',
        points: 4,
        difficulty: 'Facile',
        detailedSolution: [
          'Position initiale : -145 m.',
          'Première remontée (+60 m) : (-145) + (+60) = -85 m.',
          'Deuxième descente (-45 m) : (-85) + (-45) = -130 m.',
          'Conclusion : Le sous-marin se trouve à -130 mètres (soit 130 m sous le niveau de la mer).'
        ],
        commonTrap: 'Confondre le sens : remonter correspond à une addition (+60) et plonger à une soustraction ou addition d’un négatif (-45).'
      },
      {
        id: 'ex-m-2024',
        year: 2024,
        session: 'Devoir Commun Trimestre 2 (Session 2024)',
        topic: 'Géométrie : Triangle isocèle et angles',
        statement: 'Soit un triangle ISO isocèle en I. L’angle au sommet principal I mesure 40°.',
        question: 'Calcule en détaillant la mesure des deux autres angles à la base (angles S et O).',
        points: 4,
        difficulty: 'Moyen',
        detailedSolution: [
          'Propriété 1 : Dans tout triangle, la somme des trois angles vaut 180°.',
          'La somme des deux angles à la base vaut donc : 180° - 40° = 140°.',
          'Propriété 2 : Dans un triangle isocèle, les deux angles adjacents à la base sont égaux.',
          'Mesure de chaque angle = 140° / 2 = 70°.',
          'Conclusion : Les angles S et O mesurent chacun 70°.'
        ],
        commonTrap: 'Oublier que les deux angles à la base sont strictement égaux et se tromper dans la division par 2.'
      },
      {
        id: 'ex-m-2023',
        year: 2023,
        session: 'Contrôle Bilan Cycle 4 (Session 2023)',
        topic: 'Symétrie centrale et propriétés',
        statement: 'Le point M’ est le symétrique du point M par rapport à un centre O.',
        question: 'Que peut-on affirmer concernant le point O pour le segment [MM’] ? Justifie la propriété de conservation des longueurs.',
        points: 3,
        difficulty: 'Facile',
        detailedSolution: [
          'Par définition de la symétrie centrale de centre O, le point O est le MILIEU du segment [MM’].',
          'De plus, les points M, O et M’ sont alignés.',
          'La symétrie centrale conserve les longueurs, les mesures d’angles et les aires : la distance OM est strictement égale à la distance OM’.'
        ],
        commonTrap: 'Confondre centre de symétrie (demi-tour autour d’un point) et axe de symétrie (pliage le long d’une droite).'
      },
      {
        id: 'ex-m-2022',
        year: 2022,
        session: 'Évaluation Diagnostic 5ème (Session 2022)',
        topic: 'Priorités opératoires avec parenthèses',
        statement: 'On considère l’expression numérique : A = 25 - 3 × (4 + 2).',
        question: 'Calcule l’expression A en détaillant chaque étape de calcul.',
        points: 3,
        difficulty: 'Facile',
        detailedSolution: [
          'Étape 1 : Calcul prioritaire entre parenthèses : (4 + 2) = 6. Donc A = 25 - 3 × 6.',
          'Étape 2 : La multiplication est prioritaire sur la soustraction : 3 × 6 = 18. Donc A = 25 - 18.',
          'Étape 3 : Soustraction finale : 25 - 18 = 7.',
          'Conclusion : A = 7.'
        ],
        commonTrap: 'Faire d’abord 25 - 3 = 22 avant de multiplier, en ignorant les priorités opératoires fondamentales.'
      },
      {
        id: 'ex-m-2021',
        year: 2021,
        session: 'Épreuve d’Entraînement 5ème (Session 2021)',
        topic: 'Proportionnalité & Tableaux croisés',
        statement: 'Pour fabriquer 12 crêpes, il faut 250 g de farine. Léa souhaite en préparer 30.',
        question: 'Quelle masse de farine doit-elle utiliser ? Rédige ta démarche avec le coefficient ou le produit en croix.',
        points: 4,
        difficulty: 'Moyen',
        detailedSolution: [
          'Méthode 1 (Produit en croix) : Masse = (30 × 250) / 12 = 7500 / 12 = 625 g.',
          'Méthode 2 (Décomposition) : Pour 24 crêpes (le double de 12), il faut 500 g de farine. Pour 6 crêpes (la moitié de 12), il faut 125 g. Pour 30 crêpes (24 + 6), il faut 500 + 125 = 625 g.',
          'Conclusion : Léa doit utiliser exactement 625 g de farine.'
        ],
        commonTrap: 'Oublier d’indiquer l’unité (grammes) ou faire une erreur d’inversion dans le produit en croix.'
      },
      {
        id: 'ex-m-2020',
        year: 2020,
        session: 'Épreuve Commune Annuelle (Session 2020)',
        topic: 'Aires de figures usuelles',
        statement: 'Un champ rectangulaire mesure 40 mètres de longueur et 25 mètres de largeur. On y plante une zone triangulaire de base 20 m et hauteur 15 m.',
        question: 'Calcule l’aire totale du champ, puis l’aire de la zone triangulaire restante.',
        points: 5,
        difficulty: 'Moyen',
        detailedSolution: [
          '1) Aire totale du rectangle = Longueur × largeur = 40 m × 25 m = 1 000 m².',
          '2) Aire du triangle = (Base × Hauteur) / 2 = (20 × 15) / 2 = 300 / 2 = 150 m².',
          '3) Aire restante = 1 000 m² - 150 m² = 850 m².',
          'Conclusion : Le champ a une aire de 1 000 m² et la zone restante mesure 850 m².'
        ],
        commonTrap: 'Oublier de diviser par 2 dans la formule de l’aire d’un triangle.'
      }
    ]
  },

  physique: {
    id: 'physique',
    name: 'Physique',
    shortName: 'Physique',
    themeColor: 'from-amber-500 to-orange-600',
    accentBg: 'bg-amber-500',
    accentText: 'text-amber-600',
    tagline: 'Électricité, circuits, énergie & mouvements',
    description: 'En 5ème, la physique explore les mystères de l’électricité (boucles, série et dérivation) et les notions de mouvement et de vitesse.',
    lessons: [
      {
        id: 'phys-circuits',
        title: 'Le Circuit Électrique Simple & Boucle',
        subtitle: 'Dipôles, générateur, récepteur et sens du courant',
        category: 'Énergie & Électricité',
        readTime: '6 min',
        summaryPoints: [
          'Un circuit électrique doit former une boucle FERMÉE contenant au moins un générateur (pile) et un récepteur (lampe, moteur).',
          'Par convention historique, le courant électrique sort par la borne positive (+) du générateur et rentre par la borne négative (-).',
          'Un interrupteur OUVERT empêche le passage du courant (circuit ouvert, lampe éteinte) ; FERMÉ, il laisse passer le courant.',
          'Matériaux : Les conducteurs (métaux, graphite, eau salée) laissent passer le courant ; les isolants (plastique, verre, bois sec, air) le bloquent.'
        ],
        mnemonic: '« Du PLUS vers le MOINS » (+ vers -) : comme une cascade qui descend du haut vers le bas.',
        realWorldExample: 'Dans une lampe de poche, le bouton poussoir ferme la boucle métallique entre les piles et l’ampoule LED.',
        diagram: {
          type: 'circuit',
          title: 'Laboratoire de circuit électrique interactif',
          description: 'Actionne l’interrupteur et observe le passage des électrons et l’allumage de la lampe.',
          initialParams: { switchClosed: true, circuitType: 'serie' }
        },
        quiz: [
          {
            id: 'q-p1',
            question: 'Quel est le sens conventionnel du courant électrique dans un circuit ?',
            options: ['De la borne (-) vers la borne (+)', 'De la borne (+) vers la borne (-)', 'Il n’a pas de sens', 'Il change chaque seconde'],
            correctIndex: 1,
            explanation: 'Par convention scientifique, le courant électrique circule de la borne positive (+) vers la borne négative (-) à l’extérieur du générateur.'
          },
          {
            id: 'q-p2',
            question: 'Que se passe-t-il si un interrupteur est OUVERT dans un circuit simple ?',
            options: ['La lampe brille plus fort', 'Le circuit disjoncte', 'Le courant ne circule pas et la lampe est éteinte', 'La pile chauffe'],
            correctIndex: 2,
            explanation: 'Quand l’interrupteur est ouvert, la boucle de courant est coupée (séparée par de l’air isolant). Le courant ne peut pas circuler.'
          },
          {
            id: 'q-p3',
            question: 'Parmi ces matériaux, lequel est un conducteur électrique ?',
            options: ['Une règle en plastique', 'Une gomme', 'Un trombone en fer', 'Une feuille de papier'],
            correctIndex: 2,
            explanation: 'Le fer est un métal. Tous les métaux contiennent des électrons libres et sont d’excellents conducteurs de courant électrique.'
          }
        ]
      },
      {
        id: 'phys-serie-derivation',
        title: 'Circuits en Série vs en Dérivation',
        subtitle: 'Une seule boucle ou plusieurs boucles indépendantes',
        category: 'Énergie & Électricité',
        readTime: '6 min',
        summaryPoints: [
          'Circuit en SÉRIE : les dipôles sont branchés les uns à la suite des autres en une SEULE boucle. Si une lampe grille ou est dévissée, TOUTES les autres s’éteignent !',
          'Circuit en DÉRIVATION : le circuit comporte plusieurs boucles. Chaque boucle fonctionne de manière INDÉPENDANTE.',
          'Dans une maison ou une voiture, tous les appareils sont branchés en DÉRIVATION pour pouvoir fonctionner séparément.',
          'Court-circuit du générateur : relier directement la borne (+) à la borne (-) sans récepteur crée un danger d’incendie.'
        ],
        mnemonic: '« Dérivation = Indépendance » : éteindre la lumière du salon ne coupe pas le frigo dans la cuisine !',
        realWorldExample: 'Les guirlandes de Noël modernes sont en dérivation : si une ampoule casse, les 99 autres restent illuminées.',
        diagram: {
          type: 'circuit',
          title: 'Comparateur Série vs Dérivation',
          description: 'Dévisse une lampe et observe la conséquence sur le reste du circuit.',
          initialParams: { switchClosed: true, circuitType: 'derivation' }
        },
        quiz: [
          {
            id: 'q-p4',
            question: 'Dans un circuit en série comportant deux lampes, que se passe-t-il si l’on dévisse l’une des lampes ?',
            options: ['L’autre lampe brille deux fois plus', 'L’autre lampe s’éteint aussi', 'Rien ne change', 'La pile explose'],
            correctIndex: 1,
            explanation: 'En série, il n’y a qu’une seule boucle. Dévisser une lampe ouvre la boucle complète : le courant s’arrête partout.'
          },
          {
            id: 'q-p5',
            question: 'Comment sont branchées les prises de courant dans nos habitations ?',
            options: ['En série', 'En dérivation', 'En boucle ouverte', 'Sans générateur'],
            correctIndex: 1,
            explanation: 'Elles sont en dérivation afin que chaque appareil reçoive la même tension (230 V) et fonctionne même si les autres sont éteints.'
          }
        ]
      },
      {
        id: 'phys-mouvement-vitesse',
        title: 'Mouvement, Trajectoire & Vitesse (v = d / t)',
        subtitle: 'Décrire le déplacement d’un objet et calculer sa vitesse moyenne',
        category: 'Mouvement et interactions',
        readTime: '6 min',
        summaryPoints: [
          'Le mouvement d’un objet dépend toujours de l’OBJET DE RÉFÉRENCE choisi (appelé RÉFÉRENTIEL). Un voyageur assis dans un train est immobile par rapport au wagon, mais en mouvement par rapport au quai.',
          'La TRAJECTOIRE est l’ensemble des positions successives occupées par l’objet : RECTILIGNE (ligne droite) ou CIRCULAIRE (cercle).',
          'La vitesse peut être UNIFORME (vitesse constante), ACCÉLÉRÉE (vitesse qui augmente) ou RALENTIE (vitesse qui diminue).',
          'Formule de la vitesse moyenne : v = d / t (vitesse = distance divisée par le temps). Attention aux unités : km et h donnent des km/h ; mètres et secondes donnent des m/s.'
        ],
        mnemonic: '« V = D sur T » (la Voiture Démarre Toujours) : la distance est toujours en haut du calcul !',
        realWorldExample: 'Le radar automatique sur l’autoroute calcule la vitesse moyenne d’un véhicule en mesurant le temps écoulé pour franchir une distance balisée au sol.',
        diagram: {
          type: 'circuit',
          title: 'Simulateur de vitesse & chronophotographie',
          description: 'Observe la trajectoire et le type de mouvement à vitesse constante.',
          initialParams: { switchClosed: true, circuitType: 'serie' }
        },
        quiz: [
          {
            id: 'q-p6',
            question: 'Un automobiliste parcourt 150 km en 2 heures. Quelle est sa vitesse moyenne ?',
            options: ['60 km/h', '75 km/h', '100 km/h', '300 km/h'],
            correctIndex: 1,
            explanation: 'Formule : v = d / t = 150 km / 2 h = 75 km/h.'
          },
          {
            id: 'q-p7',
            question: 'Comment qualifie-t-on le mouvement d’une cabine de grande roue tournant à vitesse constante ?',
            options: ['Rectiligne uniforme', 'Circulaire uniforme', 'Circulaire accéléré', 'Immobile'],
            correctIndex: 1,
            explanation: 'La trajectoire est un cercle (mouvement circulaire) et la vitesse ne varie pas (mouvement uniforme), d’où l’appellation circulaire uniforme.'
          },
          {
            id: 'q-p8',
            question: 'Pourquoi dit-on que le mouvement est relatif ?',
            options: [
              'Parce qu’il va très vite',
              'Parce qu’il dépend de l’observateur ou du référentiel choisi',
              'Parce qu’il s’arrête la nuit',
              'Parce qu’il utilise de l’énergie'
            ],
            correctIndex: 1,
            explanation: 'Un même objet peut être à la fois immobile par rapport à un référentiel (ex: le siège de bus) et en mouvement par rapport à un autre (ex: la route).'
          }
        ]
      },
      {
        id: 'phys-sources-energie',
        title: 'Sources & Conversions d’Énergie',
        subtitle: 'Identifier les formes d’énergie et tracer la chaîne énergétique',
        category: 'Énergie et ses conversions',
        readTime: '6 min',
        summaryPoints: [
          'Une source d’énergie est RENOUVELABLE si elle se régénère à l’échelle humaine (soleil, vent, eau, biomasse, géothermie) ; NON RENOUVELABLE si ses réserves s’épuisent (pétrole, charbon, gaz, uranium).',
          'Formes d’énergie : Cinétique (liée à la vitesse), Thermique (chaleur), Lumineuse (rayonnement), Chimique (aliments, piles, carburant), Électrique.',
          'Principe fondamental de conservation : L’énergie ne peut être ni créée ni détruite, elle se CONVERTIT d’une forme à une autre avec souvent des pertes sous forme de chaleur.',
          'La chaîne énergétique relie : Source -> Énergie d’entrée -> Convertisseur -> Énergie utile + Énergie thermique dissipée.'
        ],
        mnemonic: '« Rien ne se perd, tout se transforme » : toute l’énergie reçue en entrée ressort exactement en sortie.',
        realWorldExample: 'La dynamo de vélo : l’énergie mécanique du cycliste qui pédale est convertie par le galet et l’alternateur en énergie électrique pour allumer le phare.',
        diagram: {
          type: 'circuit',
          title: 'Schéma de chaîne de conversion énergétique',
          description: 'Suis le flux de la source d’énergie jusqu’au récepteur utile.',
          initialParams: { switchClosed: true, circuitType: 'serie' }
        },
        quiz: [
          {
            id: 'q-p9',
            question: 'Parmi ces sources, laquelle est une énergie renouvelable ?',
            options: ['Le charbon', 'L’uranium', 'Le vent (énergie éolienne)', 'Le gaz naturel'],
            correctIndex: 2,
            explanation: 'Le vent est une ressource inépuisable à l’échelle humaine générée par le rayonnement solaire sur l’atmosphère : c’est une énergie renouvelable.'
          },
          {
            id: 'q-p10',
            question: 'Quelle est la conversion d’énergie réalisée par un grille-pain électrique ?',
            options: [
              'Énergie thermique vers énergie électrique',
              'Énergie électrique vers énergie thermique (chaleur)',
              'Énergie cinétique vers énergie chimique',
              'Énergie lumineuse vers énergie mécanique'
            ],
            correctIndex: 1,
            explanation: 'La résistance du grille-pain reçoit de l’énergie électrique du secteur et la transforme en chaleur (énergie thermique utile) pour dorer le pain.'
          },
          {
            id: 'q-p11',
            question: 'Que devient l’énergie dissipée par frottement dans les freins d’un vélo ?',
            options: [
              'Elle disparaît totalement',
              'Elle est rejetée dans l’air sous forme d’énergie thermique (chaleur)',
              'Elle se transforme en électricité',
              'Elle fait accélérer le vélo'
            ],
            correctIndex: 1,
            explanation: 'En vertu de la loi de conservation, l’énergie cinétique perdue est transformée en chaleur (échauffement des patins et de la jante).'
          }
        ]
      }
    ],
    exams: [
      {
        id: 'ex-p-2026',
        year: 2026,
        session: 'Évaluation Bilan de Physique 5ème (Session 2026)',
        topic: 'Panne dans un circuit en série',
        statement: 'Un élève monte un circuit en série comprenant une pile 4,5 V, un interrupteur fermé, une lampe L1 et un moteur M. Le moteur ne tourne pas et la lampe ne s’allume pas.',
        question: '1) Pourquoi les deux dipôles sont-ils arrêtés en même temps ? 2) Propose une démarche expérimentale pour trouver le composant défectueux.',
        points: 5,
        difficulty: 'Moyen',
        detailedSolution: [
          '1) Comme le circuit est en SÉRIE, tous les dipôles appartiennent à la même et unique boucle de courant. Si un seul composant est en panne (ouvert), la boucle entière est rompue et aucun dipôle ne peut fonctionner.',
          '2) Démarche expérimentale de test :',
          ' - Étape A : Tester la pile seule avec une lampe témoin en bon état pour vérifier qu’elle n’est pas déchargée.',
          ' - Étape B : Remplacer la lampe L1 par un fil conducteur (ou une lampe neuve) : si le moteur démarre, c’est la lampe L1 qui était grillée.',
          ' - Étape C : Si le moteur ne démarre toujours pas, tester le moteur seul aux bornes de la pile.',
          'Conclusion : Cette méthode par substitution permet d’identifier précisément le dipôle défectueux sans risque.'
        ],
        commonTrap: 'Conclure hâtivement que les deux composants (lampe et moteur) sont simultanément grillés.'
      },
      {
        id: 'ex-p-2025',
        year: 2025,
        session: 'Contrôle Commun de Collège (Session 2025)',
        topic: 'Phénomène de court-circuit',
        statement: 'Dans un circuit en dérivation comportant deux lampes L1 et L2, un élève place par mégarde un fil métallique entre les deux bornes de la lampe L1.',
        question: 'Que se passe-t-il pour la lampe L1, la lampe L2 et pour la pile ? Quels sont les risques ?',
        points: 4,
        difficulty: 'Difficile',
        detailedSolution: [
          '1) Le fil branché aux bornes de L1 crée un COURT-CIRCUIT du dipôle L1.',
          '2) Comme les lampes sont en dérivation, court-circuiter L1 revient à relier directement la borne (+) à la borne (-) de la pile par un fil de très faible résistance.',
          '3) Conséquence : Le courant emprunte le chemin le plus facile (le fil) et ne passe plus par L1 ni par L2 : les deux lampes s’éteignent.',
          '4) Danger : L’intensité du courant devient très élevée, la pile et le fil s’échauffent rapidement (effet Joule), risquant de détruire le générateur ou de provoquer un départ d’incendie.'
        ],
        commonTrap: 'Penser que seule la lampe L1 s’éteint alors qu’en dérivation, le court-circuit affecte tout le circuit et la pile.'
      },
      {
        id: 'ex-p-2024',
        year: 2024,
        session: 'Épreuve Trimestrielle de Physique (Session 2024)',
        topic: 'Vitesse moyenne et mouvements',
        statement: 'Un cycliste parcourt une distance de 18 kilomètres en 45 minutes.',
        question: 'Calcule sa vitesse moyenne en km/h. Exprime d’abord la formule littérale utilisée.',
        points: 4,
        difficulty: 'Moyen',
        detailedSolution: [
          'Formule : Vitesse = Distance / Temps (v = d / t).',
          'Conversion du temps en heures : 45 minutes = 45 / 60 h = 0,75 heure (ou 3/4 d’heure).',
          'Calcul : v = 18 km / 0,75 h = 24 km/h.',
          'Conclusion : La vitesse moyenne du cycliste est de 24 km/h.'
        ],
        commonTrap: 'Diviser 18 par 45 directement sans convertir les minutes en heures, ce qui donnerait un résultat absurde.'
      },
      {
        id: 'ex-p-2023',
        year: 2023,
        session: 'Devoir Surveillé de Sciences Physiques (Session 2023)',
        topic: 'Schématisation normalisée d’un circuit',
        statement: 'On souhaite schématiser l’éclairage des deux phares d’une automobile alimentés par une batterie de 12 V avec un interrupteur général.',
        question: 'Doit-on brancher les deux phares en série ou en dérivation ? Justifie en citant un argument de sécurité routière.',
        points: 3,
        difficulty: 'Facile',
        detailedSolution: [
          'Les phares doivent impérativement être branchés en DÉRIVATION.',
          'Justification : En cas de panne ou d’ampoule grillée sur un phare la nuit, l’autre phare doit continuer à éclairer la route pour assurer la visibilité et la sécurité du conducteur.',
          'De plus, chaque phare reçoit ainsi la tension nominale de 12 V de la batterie.'
        ],
        commonTrap: 'Proposer un montage en série qui plongerait le véhicule dans le noir complet dès la moindre défaillance d’une ampoule.'
      },
      {
        id: 'ex-p-2022',
        year: 2022,
        session: 'Évaluation des Acquis 5ème (Session 2022)',
        topic: 'Notion de trajectoire',
        statement: 'Une bille tombe verticalement dans l’air sans vent. Un train roule en ligne droite à vitesse constante.',
        question: 'Qualifie la trajectoire et le type de mouvement du train (mouvement rectiligne uniforme).',
        points: 3,
        difficulty: 'Facile',
        detailedSolution: [
          '1) Trajectoire : La trajectoire est une ligne droite, le mouvement est donc RECTILIGNE.',
          '2) Vitesse : La vitesse est constante au cours du temps, le mouvement est donc UNIFORME.',
          'Conclusion : Le mouvement du train est qualifié de RECTILIGNE UNIFORME.'
        ],
        commonTrap: 'Confondre « rectiligne » (forme du trajet) et « uniforme » (évolution de la vitesse).'
      },
      {
        id: 'ex-p-2021',
        year: 2021,
        session: 'Contrôle Bilan Collège (Session 2021)',
        topic: 'Conversion d’énergie',
        statement: 'Une éolienne utilise le vent pour faire tourner un alternateur qui produit de l’électricité.',
        question: 'Complète la chaîne énergétique : quelle est l’énergie d’entrée et quelle est l’énergie utile de sortie ?',
        points: 3,
        difficulty: 'Facile',
        detailedSolution: [
          'Énergie d’entrée : Énergie mécanique (cinétique du vent en mouvement).',
          'Convertisseur : Les pales et l’alternateur.',
          'Énergie utile de sortie : Énergie électrique.',
          'Énergie thermique perdue : Énergie dissipée sous forme de chaleur par frottements.'
        ],
        commonTrap: 'Oublier de nommer l’énergie cinétique/mécanique du vent.'
      },
      {
        id: 'ex-p-2020',
        year: 2020,
        session: 'Épreuve Commune 5ème (Session 2020)',
        topic: 'Sens de branchement d’une diode',
        statement: 'Une DEL (diode électroluminescente) est insérée dans un circuit.',
        question: 'Comment doit-elle être orientée par rapport au sens du courant pour émettre de la lumière ?',
        points: 3,
        difficulty: 'Facile',
        detailedSolution: [
          'Une diode ne laisse passer le courant que dans un seul sens : le SENS PASSANT.',
          'La flèche de son symbole normalisé doit pointer dans le sens du courant (de la borne + vers la borne -).',
          'Branchée en sens inverse (sens bloquant), elle se comporte comme un interrupteur ouvert et reste éteinte.'
        ],
        commonTrap: 'Confondre sens passant et sens bloquant.'
      }
    ]
  },

  chimie: {
    id: 'chimie',
    name: 'Chimie',
    shortName: 'Chimie',
    themeColor: 'from-emerald-500 to-teal-600',
    accentBg: 'bg-emerald-500',
    accentText: 'text-emerald-600',
    tagline: 'Matière, mélanges, solutions & masse volumique',
    description: 'En 5ème, la chimie décrypte les trois états de la matière, la conservation de la masse lors d’un changement d’état et les séparations de mélanges.',
    lessons: [
      {
        id: 'chim-etats-matiere',
        title: 'Les 3 États de la Matière & Changements d’État',
        subtitle: 'Solide, liquide, gaz et comportement des molécules',
        category: 'Organisation de la matière',
        readTime: '6 min',
        summaryPoints: [
          'État SOLIDE : les molécules sont ordonnées, très rapprochées et liées. Un solide a une forme propre et un volume propre.',
          'État LIQUIDE : les molécules sont en contact mais désordonnées et mobiles. Un liquide prend la forme du récipient (surface libre plane et horizontale au repos).',
          'État GAZ : les molécules sont très espacées, désordonnées et très agitées. Un gaz est compressible et occupe tout le volume offert.',
          'La MASSE se CONSERVE rigoureusement lors d’un changement d’état : 100 g de glace fondent en exactement 100 g d’eau liquide.'
        ],
        mnemonic: '« Solide = Soldats au garde-à-vous, Liquide = Foule dans le métro, Gaz = Abeilles en vol rapide ! »',
        realWorldExample: 'Dans le congélateur, une bouteille en plastique fermée remplie d’eau à ras bord peut éclater car l’eau augmente de volume en gelant, mais sa masse reste strictement inchangée.',
        diagram: {
          type: 'matter',
          title: 'Simulateur d’états moléculaires',
          description: 'Fais varier la température pour observer le passage solide -> liquide -> gaz.',
          initialParams: { temperature: 20, state: 'liquid' }
        },
        quiz: [
          {
            id: 'q-c1',
            question: 'Que peut-on affirmer sur la masse de 150 g de glace lorsqu’elle fond complètement ?',
            options: ['Elle diminue car l’eau liquide est plus légère', 'Elle augmente car la glace prend moins de place', 'Elle reste rigoureusement égale à 150 g', 'Elle devient nulle'],
            correctIndex: 2,
            explanation: 'La masse se conserve toujours lors d’un changement d’état car le nombre total de molécules d’eau reste strictement le même.'
          },
          {
            id: 'q-c2',
            question: 'Quelle est la propriété remarquable de la surface libre d’un liquide au repos ?',
            options: ['Elle est oblique', 'Elle est plane et horizontale', 'Elle est courbée vers le haut', 'Elle dépend du vent'],
            correctIndex: 1,
            explanation: 'Au repos, la surface de tout liquide en contact avec l’air est toujours plane et horizontale (c’est le principe du niveau à bulle des maçons).'
          },
          {
            id: 'q-c3',
            question: 'Comment appelle-t-on le passage direct de l’état liquide à l’état gazeux à la température d’ébullition ?',
            options: ['La fusion', 'La vaporisation', 'La liquéfaction', 'La solidification'],
            correctIndex: 1,
            explanation: 'Le passage de liquide à gaz s’appelle la vaporisation (ou ébullition quand elle a lieu à 100°C pour l’eau pure sous pression normale).'
          }
        ]
      },
      {
        id: 'chim-melanges-solutions',
        title: 'Mélanges Homogènes, Hétérogènes & Solubilité',
        subtitle: 'Dissoudre, mélanger et séparer les constituants',
        category: 'Organisation de la matière',
        readTime: '5 min',
        summaryPoints: [
          'Mélange HÉTÉROGÈNE : on distingue au moins deux constituants à l’œil nu (ex : eau + huile, eau boueuse).',
          'Mélange HOMOGÈNE : on ne peut pas distinguer les constituants à l’œil nu après agitation (ex : eau + sel dissous, sirop à l’eau).',
          'DISSOLUTION : le soluté (ex : sucre) se dissout dans le solvant (ex : eau) pour former une solution. Si on en ajoute trop, la solution devient SATURÉE.',
          'Techniques de séparation : la DÉCANTATION et la FILTRATION pour les mélanges hétérogènes ; la DISTILLATION pour récupérer l’eau pure.'
        ],
        mnemonic: '« Homogène = Un seul aspect », « Hétérogène = Plusieurs couches visibles ».',
        realWorldExample: 'Dans les marais salants, on laisse l’eau de mer s’évaporer sous le soleil : l’eau s’échappe sous forme de gaz et le sel cristallise au fond.',
        diagram: {
          type: 'matter',
          title: 'Séparateur interactif de mélanges',
          description: 'Teste la décantation et la filtration pour séparer l’eau, le sable et l’huile.',
          initialParams: { temperature: 25, state: 'liquid' }
        },
        quiz: [
          {
            id: 'q-c4',
            question: 'L’eau gazeuse pétillante est-elle un mélange homogène ou hétérogène avant ouverture ?',
            options: ['Homogène quand les bulles ne sont pas visibles', 'Hétérogène dès que des bulles de gaz apparaissent', 'Un corps pur', 'Un solide'],
            correctIndex: 1,
            explanation: 'Dès que des bulles de gaz sont visibles dans le liquide, on distingue deux phases (gaz + liquide) : le mélange est donc hétérogène.'
          },
          {
            id: 'q-c5',
            question: 'Quand dit-on qu’une solution d’eau salée est « saturée » ?',
            options: ['Quand l’eau bout', 'Quand le sel ajouté ne peut plus se dissoudre et se dépose au fond', 'Quand il n’y a plus d’eau', 'Quand le sel change de couleur'],
            correctIndex: 1,
            explanation: 'La saturation est atteinte lorsque le solvant ne peut plus dissoudre de soluté supplémentaire à cette température. L’excédent reste solide au fond.'
          }
        ]
      },
      {
        id: 'chim-masse-volumique',
        title: 'Masse Volumique & Identification des Espèces Chimiques',
        subtitle: 'Calculer la masse d’un volume donné et identifier des matériaux inconnus',
        category: 'Organisation et transformations de la matière',
        readTime: '6 min',
        summaryPoints: [
          'La MASSE VOLUMIQUE d’une substance est la masse par unité de volume de cette substance : formule ρ (rhô) = m / V.',
          'Unités usuelles : Si la masse m est en grammes (g) et le volume V en centimètres cubes (cm³) ou millilitres (mL), ρ s’exprime en g/cm³ ou g/mL.',
          'La masse volumique est une PROPRIÉTÉ CARACTÉRISTIQUE d’une espèce pure (ex : l’eau pure a une masse volumique de 1,0 g/cm³ ; l’huile environ 0,9 g/cm³ ; l’aluminium 2,7 g/cm³ ; le fer 7,8 g/cm³ ; l’or 19,3 g/cm³).',
          'Flottaison : Un liquide ou solide moins dense (masse volumique plus faible) surnage au-dessus d’un liquide plus dense.'
        ],
        mnemonic: '« Rhô = M sur V » (Mon Vélo) : masse en haut, volume en bas !',
        realWorldExample: 'La glace flotte sur l’eau liquide car la masse volumique de la glace (0,92 g/cm³) est inférieure à celle de l’eau liquide (1,0 g/cm³).',
        diagram: {
          type: 'matter',
          title: 'Simulateur de masse volumique & déplacement d’eau',
          description: 'Plonge un cube dans l’éprouvette pour mesurer le volume déplacé et calculer rhô.',
          initialParams: { temperature: 20, state: 'liquid' }
        },
        quiz: [
          {
            id: 'q-c6',
            question: 'Un échantillon de 100 cm³ d’un liquide pèse 80 g. Quelle est sa masse volumique ?',
            options: ['0,8 g/cm³', '1,25 g/cm³', '80 g/cm³', '8 000 g/cm³'],
            correctIndex: 0,
            explanation: 'Formule : ρ = m / V = 80 g / 100 cm³ = 0,8 g/cm³.'
          },
          {
            id: 'q-c7',
            question: 'Pourquoi l’huile flotte-t-elle au-dessus de l’eau vinaigrée ?',
            options: [
              'Parce qu’elle est jaune',
              'Parce que sa masse volumique est inférieure à celle de l’eau',
              'Parce qu’elle contient plus de bulles',
              'Parce qu’elle est chaude'
            ],
            correctIndex: 1,
            explanation: 'L’huile a une masse volumique d’environ 0,9 g/cm³, ce qui est inférieur à l’eau (1,0 g/cm³). Le fluide le moins dense surnage toujours.'
          },
          {
            id: 'q-c8',
            question: 'Comment mesure-t-on facilement le volume d’un solide de forme irrégulière au laboratoire ?',
            options: [
              'Avec une règle graduée',
              'En mesurant le volume d’eau déplacé dans une éprouvette graduée',
              'En le faisant brûler',
              'Avec un thermomètre'
            ],
            correctIndex: 1,
            explanation: 'La méthode par déplacement d’eau consiste à noter le niveau d’eau avant puis après immersion du solide : la différence de niveau donne directement le volume du solide.'
          }
        ]
      },
      {
        id: 'chim-air-composition',
        title: 'L’Air qui nous entoure : Composition & Propriétés',
        subtitle: 'Diazote, dioxygène, masse de l’air et compressibilité',
        category: 'Organisation et transformations de la matière',
        readTime: '5 min',
        summaryPoints: [
          'L’air sec est un MÉLANGE GAZEUX constitué principalement de deux gaz : environ 78% (soit 4/5) de DIAZOTE (N₂) et environ 21% (soit 1/5) de DIOXYGÈNE (O₂).',
          'Les autres gaz (argon, dioxyde de carbone CO₂, vapeur d’eau) représentent moins de 1% du volume total de l’air.',
          'L’air pèse : dans les conditions normales de température et de pression, 1 LITRE D’AIR pèse environ 1,2 à 1,3 gramme.',
          'Propriétés mécaniques : Les gaz sont COMPRESSIBLES (on peut réduire leur volume en augmentant leur pression) et EXPANSIBLES (ils occupent tout le volume disponible).'
        ],
        mnemonic: '« 4/5 de Diazote, 1/5 de Dioxygène » : 4 parts pour le calme, 1 part pour la vie !',
        realWorldExample: 'Quand on gonfle la roue d’un VTT avec une pompe, on comprime l’air : le volume d’air est réduit et la pression à l’intérieur du pneu augmente.',
        diagram: {
          type: 'matter',
          title: 'Simulateur de seringue & compression des molécules gazeuses',
          description: 'Pousse le piston de la seringue pour observer le rapprochement des molécules d’air.',
          initialParams: { temperature: 20, state: 'gas' }
        },
        quiz: [
          {
            id: 'q-c9',
            question: 'Quelle est la proportion approximative de dioxygène (O₂) dans l’air ?',
            options: ['1% (soit 1/100)', '21% (soit 1/5 environ)', '50% (la moitié)', '78% (soit 4/5 environ)'],
            correctIndex: 1,
            explanation: 'L’air contient environ 21% (soit 1/5) de dioxygène et 78% (4/5) de diazote.'
          },
          {
            id: 'q-c10',
            question: 'Combien pèse approximativement 1 litre d’air à température ambiante au niveau de la mer ?',
            options: ['0 gramme', 'Environ 1,2 gramme', '100 grammes', '1 kilogramme'],
            correctIndex: 1,
            explanation: 'L’air a une masse réelle bien que faible : 1 litre d’air pèse environ 1,2 g à 20°C sous pression normale.'
          },
          {
            id: 'q-c11',
            question: 'Que se passe-t-il pour les molécules d’air quand on bouche l’embout d’une seringue et qu’on enfonce le piston ?',
            options: [
              'Le nombre de molécules diminue',
              'Les molécules se rapprochent et les chocs contre la paroi augmentent (la pression monte)',
              'Les molécules fondent en liquide',
              'L’air disparaît'
            ],
            correctIndex: 1,
            explanation: 'Les gaz sont compressibles : les molécules sont plus resserrées, elles occupent un volume plus petit et frappent la paroi plus fréquemment, augmentant la pression.'
          }
        ]
      }
    ],
    exams: [
      {
        id: 'ex-c-2026',
        year: 2026,
        session: 'Évaluation Commune de Chimie 5ème (Session 2026)',
        topic: 'Masse volumique et identification d’un métal',
        statement: 'Un élève mesure la masse d’un cube métallique inconnu : m = 54 g. Il plonge le cube dans une éprouvette graduée contenant 50 mL d’eau ; le niveau monte à 70 mL.',
        question: '1) Quel est le volume du cube ? 2) Calcule sa masse volumique en g/cm³. 3) Sachant que la masse volumique de l’aluminium est de 2,7 g/cm³ et celle du fer de 7,8 g/cm³, identifie le métal.',
        points: 5,
        difficulty: 'Moyen',
        detailedSolution: [
          '1) Volume du cube (méthode par déplacement d’eau) : V = 70 mL - 50 mL = 20 mL = 20 cm³.',
          '2) Formule de la masse volumique : ρ (rhô) = m / V.',
          'Calcul : ρ = 54 g / 20 cm³ = 2,7 g/cm³.',
          '3) Identification : La masse volumique calculée (2,7 g/cm³) correspond exactement à celle de l’aluminium.',
          'Conclusion : Le cube métallique est en aluminium.'
        ],
        commonTrap: 'Oublier que 1 mL = 1 cm³ ou diviser le volume par la masse au lieu de faire masse divisée par volume.'
      },
      {
        id: 'ex-c-2025',
        year: 2025,
        session: 'Contrôle Bilan Matière et Changements d’état (Session 2025)',
        topic: 'Palier de température de l’eau pure',
        statement: 'Lors de l’ébullition de l’eau déminéralisée sous pression atmosphérique normale, un thermomètre indique 100°C pendant plusieurs minutes.',
        question: 'Pourquoi la température ne monte-t-elle pas au-dessus de 100°C alors que la plaque chauffante continue de fournir de la chaleur ?',
        points: 4,
        difficulty: 'Moyen',
        detailedSolution: [
          '1) L’eau déminéralisée est un CORPS PUR.',
          '2) Propriété fondamentale : Pour un corps pur, le changement d’état se fait à TEMPÉRATURE CONSTANTE (présence d’un palier).',
          '3) Explication physique : Toute l’énergie thermique apportée par la plaque sert à rompre les liaisons entre molécules d’eau pour les faire passer de l’état liquide à l’état gazeux, et non à augmenter la température.',
          'Conclusion : Tant qu’il reste de l’eau liquide, la température reste bloquée à 100°C.'
        ],
        commonTrap: 'Penser que l’eau d’un mélange (comme l’eau salée) a aussi un palier fixe à 100°C (les mélanges n’ont pas de palier plat).'
      },
      {
        id: 'ex-c-2024',
        year: 2024,
        session: 'Devoir Surveillé de Chimie (Session 2024)',
        topic: 'Conservation de la masse lors d’une dissolution',
        statement: 'On dissout 15 g de sel de cuisine dans 185 g d’eau pure.',
        question: 'Quelle est la masse totale de la solution obtenue ? Justifie ta réponse.',
        points: 3,
        difficulty: 'Facile',
        detailedSolution: [
          'Propriété : Lors d’une dissolution, la masse totale se conserve.',
          'Masse totale = masse du soluté (sel) + masse du solvant (eau).',
          'Calcul : m = 15 g + 185 g = 200 g.',
          'Conclusion : La solution pèse rigoureusement 200 grammes.'
        ],
        commonTrap: 'Penser que le sel « disparaît » ou perd de sa masse une fois devenu invisible dans l’eau.'
      },
      {
        id: 'ex-c-2023',
        year: 2023,
        session: 'Épreuve Expérimentale de 5ème (Session 2023)',
        topic: 'Protocole de filtration d’une eau boueuse',
        statement: 'On dispose d’un mélange d’eau et de terre. On souhaite obtenir une eau limpide.',
        question: 'Nomme le matériel de laboratoire nécessaire et décris brièvement le résultat de la filtration.',
        points: 4,
        difficulty: 'Facile',
        detailedSolution: [
          'Matériel : Un entonnoir, un filtre en papier poreux, un bécher (ou erlenmeyer), et le mélange hétérogène.',
          'Déroulement : Le papier filtre retient les particules solides en suspension (résidu de terre).',
          'Résultat : Le liquide recueilli dans le bécher est transparent et homogène : c’est le FILTRAT.',
          'Précision : Cette eau est limpide mais elle n’est pas forcément potable car des micro-organismes ou sels dissous peuvent subsister.'
        ],
        commonTrap: 'Affirmer que l’eau filtrée est potable et stérile.'
      },
      {
        id: 'ex-c-2022',
        year: 2022,
        session: 'Contrôle Écrit des Acquis (Session 2022)',
        topic: 'L’air est-il de la matière ?',
        statement: 'Un ballon de football est pesé dégonflé (410 g), puis gonflé avec une pompe (416 g).',
        question: 'Que prouve cette expérience sur la nature de l’air qui nous entoure ?',
        points: 3,
        difficulty: 'Facile',
        detailedSolution: [
          'Calcul : La masse augmente de 416 g - 410 g = 6 g.',
          'Déduction : L’air injecté dans le ballon a une masse mesurable (environ 1,2 g par litre à température ambiante).',
          'Conclusion : L’air a une masse et occupe un volume : l’air est donc bien de la matière.'
        ],
        commonTrap: 'Penser que les gaz sont immatériels et n’ont aucun poids.'
      },
      {
        id: 'ex-c-2021',
        year: 2021,
        session: 'Épreuve Bilan de Chimie (Session 2021)',
        topic: 'Composition de l’air',
        statement: 'L’air est un mélange gazeux vital.',
        question: 'Quels sont les deux principaux gaz qui constituent l’air et dans quelles proportions approchées ?',
        points: 3,
        difficulty: 'Facile',
        detailedSolution: [
          'L’air sec est composé principalement de :',
          ' - Environ 80% (soit 4/5) de DIAZOTE (N₂).',
          ' - Environ 20% (soit 1/5) de DIOXYGÈNE (O₂).',
          'Les autres gaz (dioxyde de carbone, argon, vapeur d’eau) représentent moins de 1% du volume total.'
        ],
        commonTrap: 'Croire que l’air est constitué à 100% de dioxygène.'
      },
      {
        id: 'ex-c-2020',
        year: 2020,
        session: 'Épreuve Commune Trimestre 1 (Session 2020)',
        topic: 'Liquides miscibles et non miscibles',
        statement: 'On verse de l’huile et du vinaigre dans un flacon à vinaigrette.',
        question: 'Pourquoi forment-ils deux phases séparées ? Quel liquide se place au-dessus et pourquoi ?',
        points: 4,
        difficulty: 'Facile',
        detailedSolution: [
          '1) L’eau du vinaigre et l’huile sont deux liquides NON MISCIBLES (ils ne se mélangent pas de façon stable).',
          '2) L’huile se place au-dessus du vinaigre car sa MASSE VOLUMIQUE est plus faible que celle de l’eau (l’huile est moins dense que l’eau : environ 0,9 g/cm³ contre 1,0 g/cm³).',
          'Conclusion : Le liquide le moins dense surnage toujours au-dessus du plus dense.'
        ],
        commonTrap: 'Dire que l’huile est plus lourde parce qu’elle est visqueuse.'
      }
    ]
  },

  svt: {
    id: 'svt',
    name: 'Sciences (SVT)',
    shortName: 'SVT',
    themeColor: 'from-green-600 to-emerald-700',
    accentBg: 'bg-green-600',
    accentText: 'text-green-600',
    tagline: 'Corps humain, nutrition, planète Terre & écosystèmes',
    description: 'En 5ème, les SVT explorent la respiration des êtres vivants dans différents milieux, l’approvisionnement des organes en nutriments et la dynamique interne de la Terre (séismes, volcanisme).',
    lessons: [
      {
        id: 'svt-respiration-organes',
        title: 'La Respiration & l’Approvisionnement des Organes',
        subtitle: 'Échanges gazeux, poumons, branchies et circulation sanguine',
        category: 'Le corps humain et la santé',
        readTime: '6 min',
        summaryPoints: [
          'Tous les êtres vivants respirent : ils prélèvent du DIOXYGÈNE (O₂) et rejettent du DIOXYDE DE CARBONE (CO₂) dans leur milieu.',
          'Dans l’air : les mammifères et oiseaux utilisent des POUMONS munis d’alvéoles pulmonaires pour maximiser les échanges avec les capillaires sanguins.',
          'Dans l’eau : les poissons utilisent des BRANCHIES très fines et richement vascularisées pour capter l’O₂ dissous dans l’eau.',
          'Les muscles consomment du glucose et de l’O₂ pour produire l’énergie nécessaire à leur contraction, et libèrent de la chaleur et des déchets (CO₂, urée).'
        ],
        mnemonic: '« O₂ entre, CO₂ sort » : le sang qui arrive aux alvéoles est pauvre en O₂, le sang qui en repart est rouge vif et enrichi en O₂.',
        realWorldExample: 'Lors d’un sprint en EPS, le rythme respiratoire et cardiaque augmente pour acheminer rapidement plus d’O₂ et de sucre aux muscles en action.',
        diagram: {
          type: 'matter',
          title: 'Schéma dynamique des échanges gazeux alvéolaires',
          description: 'Visualise le passage de l’O₂ depuis l’air alvéolaire vers les globules rouges du capillaire sanguin.',
          initialParams: { temperature: 37, state: 'gas' }
        },
        quiz: [
          {
            id: 'q-s1',
            question: 'Quel gaz indispensable au fonctionnement musculaire est prélevé au niveau des alvéoles pulmonaires ?',
            options: ['Le dioxyde de carbone (CO₂)', 'Le dioxygène (O₂)', 'L’azote', 'Le méthane'],
            correctIndex: 1,
            explanation: 'Le dioxygène (O₂) traverse la très fine paroi alvéolo-capillaire pour se fixer sur l’hémoglobine des globules rouges.'
          },
          {
            id: 'q-s2',
            question: 'Par quel organe respiratoire un poisson rouge respire-t-il dans son bocal ?',
            options: ['Des poumons', 'Des branchies', 'Des trachées', 'Sa queue'],
            correctIndex: 1,
            explanation: 'L’eau pénètre par la bouche du poisson et ressort par les ouïes en passant sur les branchies, où se font les échanges de gaz respiratoires.'
          },
          {
            id: 'q-s3',
            question: 'Pourquoi les alvéoles pulmonaires humaines offrent-elles une surface d’échange gigantesque (environ 100 m²) ?',
            options: [
              'Pour stocker de la nourriture',
              'Pour réchauffer l’estomac',
              'Pour maximiser et accélérer le passage des gaz entre l’air et le sang',
              'Pour filtrer la poussière'
            ],
            correctIndex: 2,
            explanation: 'La démultiplication en millions d’alvéoles à parois microscopiques offre une surface de contact équivalente à un terrain de tennis pour alimenter tout le corps.'
          }
        ]
      },
      {
        id: 'svt-seismes-tectonique',
        title: 'Tectonique des Plaques & Risques Géologiques',
        subtitle: 'Failles, ondes sismiques, dorsales et subduction',
        category: 'La planète Terre et l’environnement',
        readTime: '6 min',
        summaryPoints: [
          'La lithosphère terrestre est découpée en une douzaine de PLAQUES TECTONIQUES rigides qui se déplacent sur l’asthénosphère déformable (quelques cm par an).',
          'Un SÉISME résulte d’une rupture brutale des roches en profondeur au niveau d’un FOYER, le long d’une FAILLE soumise à des contraintes continues.',
          'L’ÉPICENTRE est le point à la surface de la Terre situé directement à la verticale du foyer : c’est là que les secousses et dégâts sont généralement maximaux.',
          'Zone de divergence (dorsale océanique) : les plaques s’écartent et créent de la nouvelle croûte. Zone de convergence (subduction/collision) : les plaques se rapprochent et forment des fosses océaniques ou des chaînes de montagnes (Alpes, Himalaya).'
        ],
        mnemonic: '« Foyer = Fond sous terre, Épicentre = En surface à la verticale ».',
        realWorldExample: 'Les bâtiments antisismiques au Japon sont montés sur amortisseurs et rotules géantes pour absorber l’énergie des ondes de cisaillement.',
        diagram: {
          type: 'tectonics',
          title: 'Simulateur interactif des plaques tectoniques',
          description: 'Déplace les plaques pour observer les zones de subduction, dorsales et foyers sismiques.',
          initialParams: { stressLevel: 50, faultMovement: 'subduction' }
        },
        quiz: [
          {
            id: 'q-s4',
            question: 'Comment appelle-t-on le point précis en profondeur où se produit la cassure de la roche lors d’un tremblement de terre ?',
            options: ['L’épicentre', 'Le foyer (ou hypocentre)', 'Le cratère', 'La faille de surface'],
            correctIndex: 1,
            explanation: 'La rupture prend naissance au foyer (en profondeur). L’épicentre est sa projection verticale directe à la surface du sol.'
          },
          {
            id: 'q-s5',
            question: 'Que se passe-t-il au niveau d’une zone de subduction ?',
            options: [
              'Deux plaques s’écartent pour créer un océan',
              'Une plaque océanique dense plonge sous une plaque continentale moins dense',
              'La Terre s’arrête de tourner',
              'Les volcans s’éteignent tous définitivement'
            ],
            correctIndex: 1,
            explanation: 'En subduction, la lithosphère océanique froide et dense s’enfonce dans le manteau sous l’autre plaque, provoquant des séismes profonds et un volcanisme explosif.'
          }
        ]
      },
      {
        id: 'svt-digestion-absorption',
        title: 'La Digestion & l’Absorption des Nutriments',
        subtitle: 'De l’aliment solide au nutriment soluble absorbé dans le sang',
        category: 'Le corps humain et la santé',
        readTime: '6 min',
        summaryPoints: [
          'Le tube digestif comprend : Bouche -> Œsophage -> Estomac -> Intestin grêle -> Gros intestin -> Anus (les glandes annexes sont les glandes salivaires, le foie et le pancréas).',
          'La digestion est double : MÉCANIQUE (mastication des dents, brassage de l’estomac) et CHIMIQUE (découpage moléculaire par les enzymes digestives).',
          'Les aliments sont transformés en NUTRIMENTS solubles (glucose, acides aminés, acides gras, vitamines, minéraux).',
          'L’ABSORPTION a lieu au niveau de l’INTESTIN GRÊLE : grâce à des millions de villosités microscopiques (surface équivalente à 250 m²), les nutriments traversent la paroi pour passer dans le sang et la lymphe.'
        ],
        mnemonic: '« Aliments -> Digestion (enzymes ciseaux) -> Nutriments -> Villosités -> Sang ».',
        realWorldExample: 'Prendre un petit-déjeuner complet avant un devoir de maths : les féculents (pain complet) fournissent du glucose qui sera absorbé dans l’intestin grêle pour alimenter le cerveau toute la matinée.',
        diagram: {
          type: 'matter',
          title: 'Schéma de l’absorption intestinale & villosités',
          description: 'Observe le passage des molécules de nutriments à travers la fine paroi de la villosité vers le capillaire sanguin.',
          initialParams: { temperature: 37, state: 'liquid' }
        },
        quiz: [
          {
            id: 'q-s6',
            question: 'À quel niveau du tube digestif se produit la quasi-totalité de l’absorption des nutriments vers le sang ?',
            options: ['Dans la bouche', 'Dans l’estomac', 'Dans l’intestin grêle', 'Dans le gros intestin'],
            correctIndex: 2,
            explanation: 'L’intestin grêle possède une surface d’échange gigantesque (250 m²) tapissée de villosités très vascularisées qui absorbent les nutriments.'
          },
          {
            id: 'q-s7',
            question: 'Que sont les enzymes digestives ?',
            options: [
              'Des petits microbes dangereux',
              'Des « ciseaux moléculaires » chimiques qui découpent les gros aliments en petits nutriments solubles',
              'Des muscles de l’estomac',
              'Des vitamines synthétiques'
            ],
            correctIndex: 1,
            explanation: 'Les enzymes (sécrétées par la salive, l’estomac et le pancréas) accélèrent la coupure des grosses molécules d’aliments en nutriments microscopiques.'
          },
          {
            id: 'q-s8',
            question: 'Qu’appelle-t-on les villosités et microvillosités intestinales ?',
            options: [
              'Des dents au fond de la gorge',
              'Des replis microscopiques de la paroi qui multiplient considérablement la surface d’absorption',
              'Des os protégeant l’abdomen',
              'Des globules blancs'
            ],
            correctIndex: 1,
            explanation: 'Ces replis microscopiques déploient une surface immense d’échange comparable à un terrain de tennis pour transférer efficacement les nutriments vers le sang.'
          }
        ]
      },
      {
        id: 'svt-volcanisme-risques',
        title: 'Le Volcanisme : Éruptions Effusives vs Explosives',
        subtitle: 'Magma, lave, gaz dissous et prévention des risques volcaniques',
        category: 'La planète Terre et l’environnement',
        readTime: '6 min',
        summaryPoints: [
          'Le MAGMA est un mélange de roches en fusion et de gaz dissous sous haute pression dans un réservoir magmatique en profondeur ; la LAVE est le magma dégazé qui coule à la surface.',
          'Éruption EFFUSIVE (Volcans rouges, ex : Piton de la Fournaise) : Magma fluide, pauvre en silice. Les gaz s’échappent aisément : longues coulées de lave fluide et projections de fontaines de lave.',
          'Éruption EXPLOSIVE (Volcans gris, ex : Montagne Pelée, Vésuve) : Magma très visqueux et pâteux, riche en silice et en gaz piégés sous pression. Pulvérisation en nuées ardentes dévastatrices et panache de cendres.',
          'Prévention et surveillance : Les observatoires volcanologiques mesurent les séismes volcaniques, les déformations du sol (inclinomètres, GPS) et les émissions de gaz pour alerter et évacuer les populations à temps.'
        ],
        mnemonic: '« Effusif = Fluide / Rouge / Coulées paisibles », « Explosif = Épais / Gris / Nuée ardente dangereuse ».',
        realWorldExample: 'Secouer une bouteille d’eau gazeuse : le bouchon saute brutalement quand la pression des bulles piégées devient trop forte, exactement comme dans un volcan explosif !',
        diagram: {
          type: 'tectonics',
          title: 'Simulateur d’éruption volcanique',
          description: 'Compare la montée de magma fluide (coulées) vs visqueux (explosion et nuée ardente).',
          initialParams: { stressLevel: 65, faultMovement: 'subduction' }
        },
        quiz: [
          {
            id: 'q-s9',
            question: 'Quelle est la principale caractéristique d’un volcan de type explosif (volcan gris) ?',
            options: [
              'Une lave très liquide qui coule lentement',
              'Un magma très visqueux piégeant les gaz jusqu’à former des nuées ardentes destructrices',
              'Une absence totale de séismes',
              'Une formation uniquement sous les glaciers'
            ],
            correctIndex: 1,
            explanation: 'Dans un volcan explosif, la viscosité extrême du magma empêche le dégazage calme : la pression monte jusqu’à l’explosion en avalanche de cendres et gaz brûlants.'
          },
          {
            id: 'q-s10',
            question: 'Quelle est la différence scientifique entre le « magma » et la « lave » ?',
            options: [
              'Le magma est froid, la lave est chaude',
              'Le magma est en profondeur avec ses gaz dissous ; la lave est en surface après dégazage',
              'C’est exactement la même chose sans aucune nuance',
              'La lave ne contient pas de roche'
            ],
            correctIndex: 1,
            explanation: 'Le magma contient tous ses gaz dissous sous pression dans la chambre magmatique ; en arrivant à l’air libre, il se dégazifie et prend le nom de lave.'
          },
          {
            id: 'q-s11',
            question: 'Quel appareil les volcanologues utilisent-ils pour mesurer les gonflements du cône avant une éruption ?',
            options: ['Un baromètre', 'Un inclinomètre et des balises GPS de haute précision', 'Un microscope optique', 'Une boussole'],
            correctIndex: 1,
            explanation: 'La montée du magma fait gonfler les pentes du volcan : les inclinomètres et le GPS mesurent ces déformations millimétriques pour anticiper le réveil volcanique.'
          }
        ]
      }
    ],
    exams: [
      {
        id: 'ex-s-2026',
        year: 2026,
        session: 'Évaluation Nationale SVT 5ème (Session 2026)',
        topic: 'Analyse d’un sismogramme et localisation de l’épicentre',
        statement: 'Trois stations d’enregistrement (A, B, C) enregistrent un séisme survenu le 14 mars. La station A enregistre les premières ondes à 10h02min10s, la station B à 10h02min25s et la station C à 10h02min48s.',
        question: '1) Quelle station est la plus proche du foyer ? 2) Explique comment les géologues utilisent trois stations pour localiser l’épicentre sur une carte (méthode de triangulation).',
        points: 5,
        difficulty: 'Moyen',
        detailedSolution: [
          '1) C’est la station A qui est la plus proche du foyer car elle a enregistré les ondes sismiques en premier (10h02min10s), les ondes se propageant à vitesse constante dans la roche.',
          '2) Méthode de triangulation :',
          ' - L’écart de temps d’arrivée entre les ondes P (rapides) et les ondes S (lentes) permet de calculer la distance exacte du foyer à chaque station.',
          ' - On trace sur la carte un cercle centré sur chaque station, dont le rayon correspond à la distance calculée.',
          ' - Le point d’intersection unique des 3 cercles donne la position géographique exacte de l’épicentre.',
          'Conclusion : Trois stations sont indispensables pour éliminer toute ambiguïté.'
        ],
        commonTrap: 'Penser que deux stations suffisent (deux cercles se coupent généralement en deux points distincts, d’où l’obligation d’une 3e station).'
      },
      {
        id: 'ex-s-2025',
        year: 2025,
        session: 'Contrôle de SVT Trimestre 2 (Session 2025)',
        topic: 'Digestion et absorption intestinale',
        statement: 'Des aliments solides (pomme, pain) pénètrent dans le tube digestif et se retrouvent transformés en nutriments microscopiques dans le sang.',
        question: 'À quel niveau du tube digestif a lieu la quasi-totalité de l’absorption des nutriments ? Quelles sont les particularités anatomiques de cette zone ?',
        points: 4,
        difficulty: 'Moyen',
        detailedSolution: [
          '1) L’absorption a lieu dans l’INTESTIN GRÊLE.',
          '2) Particularités anatomiques exceptionnelles :',
          ' - Présence de millions de replis microscopiques appelés VILLOSITÉS et MICROVILLOSITÉS.',
          ' - Une surface d’échange immense déployée (environ 250 m², la surface d’un terrain de tennis).',
          ' - Une paroi extrêmement fine (une seule couche de cellules) séparant la lumière intestinale d’un réseau très dense de capillaires sanguins et lymphatiques.',
          'Conclusion : Les nutriments solubles (glucose, acides aminés) traversent cette fine barrière pour passer directement dans la circulation sanguine.'
        ],
        commonTrap: 'Confondre estomac (lieu du broyage et digestion chimique partielle) et intestin grêle (lieu de l’absorption vers le sang).'
      },
      {
        id: 'ex-s-2024',
        year: 2024,
        session: 'Épreuve Commune de Sciences (Session 2024)',
        topic: 'Effort physique et paramètres physiologiques',
        statement: 'Au cours d’un test d’effort en laboratoire, on mesure la fréquence cardiaque et la consommation d’O₂ d’un collégien au repos puis en course soutenue.',
        question: 'Décris l’évolution de ces deux paramètres et explique le lien logique avec le besoin des cellules musculaires.',
        points: 4,
        difficulty: 'Facile',
        detailedSolution: [
          'Constat : Lors du passage du repos à l’effort, la fréquence cardiaque (battements/min) et le volume de dioxygène consommé (L/min) augmentent fortement et proportionnellement à l’effort.',
          'Explication physiologique : Les muscles en activité ont besoin de fabriquer plus d’énergie mécanique. Pour cela, ils réalisent la respiration cellulaire :',
          '  Nutriments (glucose) + Dioxygène (O₂) -> Énergie + Déchets (CO₂) + Chaleur.',
          'Pour approvisionner les muscles plus vite, le cœur accélère le débit sanguin et les poumons augmentent la fréquence ventilatoire.'
        ],
        commonTrap: 'Oublier d’associer le rôle du dioxygène à celui du glucose (énergie musculaire).'
      },
      {
        id: 'ex-s-2023',
        year: 2023,
        session: 'Devoir Bilan Géologie 5ème (Session 2023)',
        topic: 'Volcanisme effusif vs explosif',
        statement: 'Le Piton de la Fournaise (La Réunion) émet de longues coulées de lave fluide rouge, tandis que la Montagne Pelée (Martinique) produit des nuées ardentes explosives.',
        question: 'Compare la viscosité du magma et la teneur en gaz dissous de ces deux types de volcans.',
        points: 4,
        difficulty: 'Moyen',
        detailedSolution: [
          'Volcan effusif (ex : Piton de la Fournaise) : Magma fluide, pauvre en silice. Les gaz s’échappent facilement sans surpression, la lave coule paisiblement le long des pentes (volcan rouge).',
          'Volcan explosif (ex : Montagne Pelée) : Magma très visqueux et pâteux, riche en silice et en gaz piégés. Les gaz accumulent une pression gigantesque jusqu’à pulvériser le dôme en une nuée ardente dévastatrice de cendres et gaz brûlants (volcan gris).'
        ],
        commonTrap: 'Inverser les caractéristiques de la lave (dire que l’explosif a une lave très liquide).'
      },
      {
        id: 'ex-s-2022',
        year: 2022,
        session: 'Évaluation SVT Cycle 4 (Session 2022)',
        topic: 'Reproduction sexuée et fécondation',
        statement: 'Chez l’oursin en mer, les cellules reproductrices sont libérées dans l’eau.',
        question: 'S’agit-il d’une fécondation interne ou externe ? Définis précisément la fécondation.',
        points: 3,
        difficulty: 'Facile',
        detailedSolution: [
          '1) Fécondation : C’est l’union d’un gamète mâle (spermatozoïde) et d’un gamète femelle (ovule) pour former une cellule-œuf à l’origine d’un nouvel individu.',
          '2) Comme la rencontre des gamètes a lieu directement dans l’eau de mer à l’extérieur du corps des parents, il s’agit d’une FÉCONDATION EXTERNE (contrairement aux mammifères où elle est interne).'
        ],
        commonTrap: 'Confondre accouplement et fécondation (l’oursin ne s’accouple pas).'
      },
      {
        id: 'ex-s-2021',
        year: 2021,
        session: 'Contrôle Commun SVT (Session 2021)',
        topic: 'Réseau trophique et écosystème',
        statement: 'Dans une mare, des larves d’insectes mangent des algues vertes, les grenouilles mangent les larves et un héron mange les grenouilles.',
        question: 'Schématise cette chaîne alimentaire et qualifie le rôle des végétaux chlorophylliens (producteurs primaires).',
        points: 3,
        difficulty: 'Facile',
        detailedSolution: [
          'Chaîne alimentaire : Algues vertes -> Larves d’insectes -> Grenouilles -> Héron (la flèche signifie « est mangé par »).',
          'Rôle des végétaux : Les algues sont des PRODUCTEURS PRIMAIRES car elles fabriquent leur propre matière organique uniquement à partir d’eau, de sels minéraux, de CO₂ et de lumière solaire (photosynthèse).'
        ],
        commonTrap: 'Orienter les flèches à l’envers (faire pointer du prédateur vers la proie au lieu du contraire).'
      },
      {
        id: 'ex-s-2020',
        year: 2020,
        session: 'Épreuve Bilan Fin de 5ème (Session 2020)',
        topic: 'Puberté et caractères sexuels secondaires',
        statement: 'À la puberté, le corps de l’enfant se transforme sous l’action d’hormones.',
        question: 'Quelles sont les hormones responsables chez la fille et chez le garçon ? Comment circulent-elles ?',
        points: 3,
        difficulty: 'Facile',
        detailedSolution: [
          'Chez le garçon : la testostérone (produite par les testicules).',
          'Chez la fille : les œstrogènes et la progestérone (produits par les ovaires).',
          'Mode d’action : Une hormone est une substance chimique sécrétée dans le SANG qui agit à distance sur des organes cibles pour déclencher le développement des caractères sexuels.'
        ],
        commonTrap: 'Penser que les hormones transitent par les nerfs au lieu de la circulation sanguine.'
      }
    ]
  },

  techno: {
    id: 'techno',
    name: 'Technologie',
    shortName: 'Techno',
    themeColor: 'from-purple-600 to-indigo-700',
    accentBg: 'bg-purple-600',
    accentText: 'text-purple-600',
    tagline: 'Chaînes d’info & énergie, matériaux, algorithmes & objets connectés',
    description: 'En 5ème, la technologie apprend à modéliser le fonctionnement des objets techniques : capteurs, actionneurs, chaîne d’information et d’énergie, et programmation Scratch.',
    lessons: [
      {
        id: 'techno-chaine-info-energie',
        title: 'Chaîne d’Information & Chaîne d’Énergie',
        subtitle: 'Acquérir, traiter, communiquer · Alimenter, distribuer, convertir, transmettre',
        category: 'Design, innovation et modélisation',
        readTime: '7 min',
        summaryPoints: [
          'Tout système automatisé (ex: portail automatique, volet roulant, robot aspirateur) est composé de deux chaînes indissociables.',
          'CHAÎNE D’INFORMATION : 1) Acquérir (capteurs : infrarouge, température, bouton) -> 2) Traiter (carte microcontrôleur/ordinateur) -> 3) Communiquer (voyants, écran, Bluetooth, ordres à la chaîne d’énergie).',
          'CHAÎNE D’ÉNERGIE : 1) Alimenter (batterie, secteur) -> 2) Distribuer (relais, variateur) -> 3) Convertir (moteur électrique, vérin, résistance) -> 4) Transmettre (engrenages, courroies, crémaillères).',
          'Le signal de commande circule de la chaîne d’information vers les organes de distribution de la chaîne d’énergie pour produire l’action mécanique attendue.'
        ],
        mnemonic: '« Info = Cerveau et sens (Capteurs -> Puce), Énergie = Muscles (Batterie -> Moteur -> Roues) ».',
        realWorldExample: 'Un lampadaire solaire automatique : 1) La cellule photoélectrique détecte la nuit (Acquérir), 2) La carte décide d’allumer (Traiter), 3) Le transistor envoie le courant (Distribuer), 4) La LED éclaire la rue (Convertir).',
        diagram: {
          type: 'algorithm',
          title: 'Simulateur d’objet technique automatisé',
          description: 'Déclenche le capteur de présence et observe la transmission d’ordres vers le moteur du portail.',
          initialParams: { sensorTriggered: false, state: 'idle' }
        },
        quiz: [
          {
            id: 'q-t1',
            question: 'Dans un robot suiveur de ligne, à quel bloc fonctionnel de la chaîne d’information appartient le capteur optique infrarouge ?',
            options: ['Traiter', 'Acquérir', 'Convertir', 'Alimenter'],
            correctIndex: 1,
            explanation: 'Les capteurs prélèvent des grandeurs physiques réelles (lumière, distance, température) : ils assurent la fonction « Acquérir ».'
          },
          {
            id: 'q-t2',
            question: 'Quel composant assure la fonction « Convertir » dans un monte-charge électrique ?',
            options: ['La prise secteur 230 V', 'Le câble en acier', 'Le moteur électrique', 'L’interrupteur d’arrêt d’urgence'],
            correctIndex: 2,
            explanation: 'Le moteur électrique transforme l’énergie électrique en énergie mécanique de rotation : il assure la fonction « Convertir ».'
          },
          {
            id: 'q-t3',
            question: 'Quel organe assure la liaison d’ordre entre la chaîne d’information et la chaîne d’énergie ?',
            options: ['Le distributeur (relais ou transistor)', 'La pile', 'L’écran d’affichage', 'La roue dentée'],
            correctIndex: 0,
            explanation: 'Le relais ou transistor reçoit le signal faible d’information (5 V) et commute l’alimentation puissante d’énergie (12 V ou 230 V) vers l’actionneur.'
          }
        ]
      },
      {
        id: 'techno-algorithmes-scratch',
        title: 'Algorithmique & Blocs de Programmation',
        subtitle: 'Variables, boucles répétitives, conditions Si... Alors et événements',
        category: 'Informatique et programmation',
        readTime: '6 min',
        summaryPoints: [
          'Un ALGORITHME est une suite ordonnée d’instructions précises qui résout un problème donné ou pilote un comportement.',
          'Événement déclencheur : « Quand drapeau vert cliqué », « Quand touche Espace pressée », « Quand obstacle détecté ».',
          'Structure conditionnelle (Test logique) : « SI [Condition vraie] ALORS [Faire action A] SINON [Faire action B] ».',
          'Boucle répétitive : « Répéter 10 fois » (boucle bornée) ou « Répéter indéfiniment » (boucle permanente du programme robotique).'
        ],
        mnemonic: '« Si... Alors... Sinon » : comme dans la vraie vie (Si il pleut, alors prends un parapluie, sinon prends tes lunettes de soleil).',
        realWorldExample: 'Dans un feu tricolore piéton : SI le bouton poussoir piéton est pressé, ALORS attendre 5 secondes, passer le feu voiture au rouge et le feu piéton au vert.',
        diagram: {
          type: 'algorithm',
          title: 'Exécuteur visuel de blocs Scratch',
          description: 'Modifie la condition de distance d’obstacle et lance l’exécution du robot pas à pas.',
          initialParams: { distance: 15, state: 'running' }
        },
        quiz: [
          {
            id: 'q-t4',
            question: 'Dans Scratch, quelle instruction permet d’exécuter une séquence d’actions en boucle continue sans s’arrêter ?',
            options: ['Répéter 1 fois', 'Si... Alors', 'Répéter indéfiniment', 'Attendre 1 seconde'],
            correctIndex: 2,
            explanation: 'La boucle « Répéter indéfiniment » s’exécute sans interruption tant que le programme est en cours d’exécution (idéal pour surveiller les capteurs d’un robot).'
          },
          {
            id: 'q-t5',
            question: 'À quoi sert une VARIABLE dans un programme informatique ?',
            options: [
              'À changer la couleur de l’écran',
              'À stocker une valeur en mémoire (ex: un score, un chronomètre, une distance)',
              'À éteindre l’ordinateur',
              'À connecter le Wi-Fi'
            ],
            correctIndex: 1,
            explanation: 'Une variable est une case mémoire étiquetée qui conserve une donnée (nombre ou texte) pouvant être modifiée au fil du programme.'
          }
        ]
      },
      {
        id: 'techno-familles-materiaux',
        title: 'Les Familles de Matériaux, Propriétés & Recyclage',
        subtitle: 'Métaux, céramiques, polymères et matériaux organiques',
        category: 'Matériaux et structures',
        readTime: '6 min',
        summaryPoints: [
          'On classe les matériaux en 4 GRANDES FAMILLES : 1) Les Métalliques (fer, aluminium, cuivre), 2) Les Céramiques et verres (brique, porcelaine, verre), 3) Les Polymères/plastiques (PVC, polyéthylène, plexiglas), 4) Les Organiques d’origine vivante (bois, cuir, coton, laine).',
          'Propriétés mécaniques et physiques : Conductivité électrique et thermique, dureté, légèreté (masse volumique faible), élasticité, résistance à l’oxydation/rouille.',
          'Critères de sélection d’un matériau : Sécurité de l’utilisateur, contraintes mécaniques, coût de fabrication, esthétique et impact écologique.',
          'Cycle de vie et recyclage : Tri sélectif, valorisation matière (refonte de l’aluminium ou broyage du plastique) et écoconception pour limiter l’épuisement des ressources.'
        ],
        mnemonic: '« M-C-P-O » : Métaux (brillants), Céramiques (durs), Polymères (souples), Organiques (vivants).',
        realWorldExample: 'Une coque de smartphone associe plusieurs familles : du verre trempé pour l’écran tactile (dureté), de l’aluminium pour le châssis rigide (légèreté) et du polymère silicone pour la coque antichoc (élasticité).',
        diagram: {
          type: 'algorithm',
          title: 'Arbre de décision pour le choix d’un matériau',
          description: 'Teste les critères de légèreté, conduction et résistance pour sélectionner le bon matériau.',
          initialParams: { distance: 20, state: 'idle' }
        },
        quiz: [
          {
            id: 'q-t6',
            question: 'À quelle famille de matériaux appartient le bois de chêne utilisé pour fabriquer une table ?',
            options: ['Les métalliques', 'Les céramiques', 'Les organiques', 'Les polymères synthétiques'],
            correctIndex: 2,
            explanation: 'Le bois est issu du règne végétal (matière vivante) : il appartient donc à la famille des matériaux organiques.'
          },
          {
            id: 'q-t7',
            question: 'Pourquoi l’aluminium est-il préféré au fer pour fabriquer le cadre d’un vélo de course ?',
            options: [
              'Parce qu’il est transparent',
              'Parce qu’il est beaucoup plus léger (faible densité) et ne rouille pas à l’eau',
              'Parce qu’il conduit mieux les ondes radio',
              'Parce qu’il fond à basse température'
            ],
            correctIndex: 1,
            explanation: 'L’aluminium a une masse volumique très faible (2,7 g/cm³ contre 7,8 pour le fer) et s’autoprotège contre la corrosion par une fine couche d’oxyde (alumine).'
          },
          {
            id: 'q-t8',
            question: 'Que signifie l’« écoconception » d’un objet technique ?',
            options: [
              'L’emballer dans du plastique coloré',
              'Prendre en compte son impact environnemental à toutes les étapes de son cycle de vie (de l’extraction au recyclage)',
              'Augmenter son prix de vente',
              'Le fabriquer uniquement à la main'
            ],
            correctIndex: 1,
            explanation: 'L’écoconception vise à réduire au minimum l’empreinte écologique dès la conception (choix de matériaux recyclables, démontabilité facile, faible consommation).'
          }
        ]
      },
      {
        id: 'techno-reseaux-informatiques',
        title: 'Les Réseaux Informatiques & Internet au Collège',
        subtitle: 'Architecture LAN, commutateur switch, routeur et adresse IP',
        category: 'Informatique et réseaux',
        readTime: '6 min',
        summaryPoints: [
          'Réseau Local (LAN) : Ensemble d’équipements informatiques interconnectés au sein d’un même bâtiment (salles de classe, CDI, administration du collège).',
          'Le COMMUTATEUR (SWITCH) : Concentre et distribue les câbles Ethernet RJ45 en acheminant les données uniquement vers l’ordinateur destinataire sur le réseau local.',
          'Le ROUTEUR / BOX : Fait la passerelle entre le réseau local (LAN) et le réseau mondial INTERNET (WAN). Il traduit les paquets et sécurise les échanges avec un pare-feu.',
          'L’ADRESSE IP : Identifiant numérique unique attribué à chaque machine connectée (ex: 192.168.1.25) pour garantir que chaque message ou fichier arrive au bon destinataire.'
        ],
        mnemonic: '« Switch = Facteur de quartier (distribue dans l’école), Routeur = Aéroport international (vers Internet) ».',
        realWorldExample: 'Quand tu te connectes à l’ENT (Environnement Numérique de Travail) du collège depuis chez toi, ta requête passe par ta box Internet, traverse les routeurs mondiaux pour atteindre le serveur sécurisé de l’académie.',
        diagram: {
          type: 'algorithm',
          title: 'Simulateur d’acheminement de paquets réseau',
          description: 'Observe le trajet des données depuis la tablette de l’élève à travers le switch jusqu’au serveur.',
          initialParams: { distance: 10, state: 'idle' }
        },
        quiz: [
          {
            id: 'q-t9',
            question: 'Quel équipement matériel relie tous les ordinateurs d’une salle de technologie entre eux par câbles RJ45 ?',
            options: ['Une souris', 'Un commutateur (switch)', 'Une clé USB', 'Une imprimante 3D'],
            correctIndex: 1,
            explanation: 'Le commutateur (switch) possède de multiples ports réseau pour relier et interconnecter localement tous les ordinateurs.'
          },
          {
            id: 'q-t10',
            question: 'À quoi sert le ROUTEUR dans un réseau informatique ?',
            options: [
              'À taper du texte au clavier',
              'À interconnecter le réseau local (LAN) avec le réseau étendu externe Internet (WAN)',
              'À nettoyer l’écran de poussière',
              'À recharger la batterie de la tablette'
            ],
            correctIndex: 1,
            explanation: 'Le routeur sélectionne la meilleure route pour faire communiquer des réseaux différents et relier le collège à Internet.'
          },
          {
            id: 'q-t11',
            question: 'Qu’est-ce qu’une adresse IP ?',
            options: [
              'Le mot de passe de l’ordinateur',
              'Un numéro d’identification unique permettant d’acheminer les données vers la bonne machine',
              'Le nom de l’inventeur d’Internet',
              'La taille du disque dur'
            ],
            correctIndex: 1,
            explanation: 'Tout comme une adresse postale pour une lettre, l’adresse IP est le numéro d’identification unique d’une machine sur un réseau IP.'
          }
        ]
      }
    ],
    exams: [
      {
        id: 'ex-t-2026',
        year: 2026,
        session: 'Évaluation Bilan Technologie 5ème (Session 2026)',
        topic: 'Système d’arrosage automatique connecté',
        statement: 'Une serre de collège dispose d’un arrosage automatique : une sonde d’humidité du sol mesure l’eau. Si l’humidité est inférieure à 30%, une micro-pompe 12 V alimentée par batterie arrose pendant 20 secondes.',
        question: '1) Identifie le capteur et l’actionneur du système. 2) Rédige l’algorithme en pseudo-code ou sous forme de blocs logiques.',
        points: 5,
        difficulty: 'Moyen',
        detailedSolution: [
          '1) Identification des composants :',
          ' - Capteur (Chaîne d’info) : La sonde d’humidité du sol (fonction « Acquérir »).',
          ' - Actionneur (Chaîne d’énergie) : La pompe électrique 12 V (fonction « Convertir » l’énergie électrique en énergie hydraulique de pompage).',
          '2) Algorithme de pilotage :',
          ' Répéter indéfiniment :',
          '   Mesurer Humidité',
          '   SI Humidité < 30 ALORS :',
          '     Activer Relais Pompe',
          '     Attendre 20 secondes',
          '     Désactiver Relais Pompe',
          '   SINON :',
          '     Laisser Pompe éteinte',
          '   Attendre 10 minutes avant prochaine mesure.'
        ],
        commonTrap: 'Inverser capteur et actionneur (dire que la pompe est le capteur).'
      },
      {
        id: 'ex-t-2025',
        year: 2025,
        session: 'Contrôle Commun Technologie (Session 2025)',
        topic: 'Familles de matériaux et recyclabilité',
        statement: 'Pour fabriquer le châssis d’une trottinette électrique pliable de 5ème, on hésite entre l’alliage d’aluminium, la fonte et le PVC.',
        question: 'Quel matériau choisis-tu pour concilier légèreté, rigidité mécanique et résistance aux intempéries ? Justifie en éliminant les deux autres.',
        points: 4,
        difficulty: 'Facile',
        detailedSolution: [
          'Choix retenu : L’ALLIAGE D’ALUMINIUM.',
          'Justifications :',
          ' - L’aluminium est un métal non ferreux très léger (densité faible 2,7 g/cm³) et très rigide.',
          ' - Il ne rouille pas à la pluie grâce à sa couche naturelle d’alumine protectrice.',
          'Élimination des alternatives :',
          ' - La fonte est beaucoup trop lourde (densité ~7,5) pour une trottinette portable et sensible à la corrosion.',
          ' - Le PVC (matière plastique) manquerait de rigidité et casserait sous le poids répété d’un collégien lors des sauts de trottoir.'
        ],
        commonTrap: 'Choisir le PVC en pensant uniquement à son faible coût sans considérer la sécurité mécanique.'
      },
      {
        id: 'ex-t-2024',
        year: 2024,
        session: 'Épreuve Écrite Trimestrielle (Session 2024)',
        topic: 'Réseaux informatiques : adressage IP et serveur',
        statement: 'Dans la salle informatique du collège, chaque ordinateur est relié à un commutateur (switch) par un câble Ethernet RJ45.',
        question: 'À quoi sert l’adresse IP d’un ordinateur sur le réseau du collège ? Quelle est la différence entre un réseau local (LAN) et Internet (WAN) ?',
        points: 4,
        difficulty: 'Moyen',
        detailedSolution: [
          '1) Rôle de l’adresse IP : C’est un numéro d’identification unique attribué à chaque machine sur le réseau (ex: 192.168.1.42) permettant d’acheminer les paquets de données au bon destinataire, comme une adresse postale.',
          '2) Différence LAN vs WAN :',
          ' - LAN (Local Area Network) : Réseau local restreint géographiquement (l’enceinte du collège, une maison).',
          ' - WAN (Wide Area Network) / Internet : Réseau étendu mondial interconnectant des millions de réseaux locaux à travers des routeurs dorsaux.'
        ],
        commonTrap: 'Confondre commutateur (switch) et routeur box Internet.'
      },
      {
        id: 'ex-t-2023',
        year: 2023,
        session: 'Devoir Bilan Informatique et Objets (Session 2023)',
        topic: 'Portail automatique et capteur fin de course',
        statement: 'Un portail coulissant électrique est équipé de deux capteurs de fin de course (FC_Ouv pour ouvert, FC_Ferm pour fermé).',
        question: 'À quelle famille de capteurs appartiennent ces composants et pourquoi sont-ils indispensables à la sécurité du moteur ?',
        points: 3,
        difficulty: 'Facile',
        detailedSolution: [
          'Famille : Ce sont des capteurs mécaniques de contact (ou détecteurs de position tout-ou-rien).',
          'Rôle de sécurité : Quand le vantail atteint la position maximale, il appuie sur le capteur. Le microcontrôleur coupe instantanément l’alimentation du moteur pour éviter qu’il ne force mécaniquement, ne chauffe et ne grille son bobinage contre la butée.'
        ],
        commonTrap: 'Penser que le moteur s’arrête tout seul magiquement sans capteur de position.'
      },
      {
        id: 'ex-t-2022',
        year: 2022,
        session: 'Évaluation Diagnostic Technologie 5ème (Session 2022)',
        topic: 'Fonction d’usage et fonction d’estime',
        statement: 'On analyse un smartphone destiné aux adolescents.',
        question: 'Donne la fonction d’usage principale et deux exemples de fonctions d’estime.',
        points: 3,
        difficulty: 'Facile',
        detailedSolution: [
          'Fonction d’usage (Ce à quoi sert l’objet techniquement) : Permettre de communiquer à distance (appels, messages, accès Internet) en toute mobilité.',
          'Fonctions d’estime (Ce qui plaît subjectivement à l’utilisateur) :',
          ' - La couleur ou la finition de la coque (ex: bleu métallique, vert pastel).',
          ' - Le design fin et l’arrondi des tranches.',
          ' - La notoriété de la marque.'
        ],
        commonTrap: 'Confondre fonction d’usage (objective et universelle) et fonction d’estime (goûts personnels et mode).'
      },
      {
        id: 'ex-t-2021',
        year: 2021,
        session: 'Contrôle Commun Technologie (Session 2021)',
        topic: 'Transmission de mouvement : engrenages',
        statement: 'Une roue motrice de 20 dents tourne à 100 tours/min et entraîne une roue réceptrice de 40 dents.',
        question: 'La roue réceptrice tourne-t-elle plus vite ou moins vite que la roue motrice ? Calcule sa vitesse de rotation.',
        points: 4,
        difficulty: 'Moyen',
        detailedSolution: [
          'Rapport de transmission = Dents roue motrice / Dents roue réceptrice = 20 / 40 = 1/2 = 0,5.',
          'Vitesse roue réceptrice = 100 tours/min × 0,5 = 50 tours/min.',
          'Conclusion : La roue réceptrice tourne deux fois MOINS VITE (système réducteur de vitesse), mais avec un couple (force) deux fois plus grand.'
        ],
        commonTrap: 'Penser qu’une roue plus grande tourne plus vite.'
      },
      {
        id: 'ex-t-2020',
        year: 2020,
        session: 'Épreuve Bilan 5ème (Session 2020)',
        topic: 'Cycle de vie d’un objet technique',
        statement: 'On étudie l’impact écologique d’une lampe de bureau.',
        question: 'Cite dans l’ordre chronologique les 5 grandes étapes du cycle de vie d’un objet (de l’extraction au recyclage).',
        points: 3,
        difficulty: 'Facile',
        detailedSolution: [
          '1) Extraction des matières premières.',
          '2) Fabrication et assemblage en usine.',
          '3) Emballage et transport/distribution.',
          '4) Utilisation par le consommateur (consommation d’énergie, entretien).',
          '5) Fin de vie : collecte, dépollution, recyclage ou valorisation énergétique.'
        ],
        commonTrap: 'Oublier l’étape cruciale du transport ou de la fin de vie.'
      }
    ]
  }
};
