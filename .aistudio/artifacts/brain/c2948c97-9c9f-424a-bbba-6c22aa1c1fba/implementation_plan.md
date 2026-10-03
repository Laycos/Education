# Collège 5ème Cap Révision — Plateforme Interactive Web & Mobile

Plateforme d'apprentissage et de révision tout-en-un conforme au programme officiel de l'Éducation Nationale française (cycle 4, classe de 5ème), proposant des fiches synthétiques illustrées, des schémas interactifs, des quiz d'entraînement immédiats, et les annales d'examens des 6 dernières années avec corrigés détaillés et tuteur IA à la demande.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Les choix fondamentaux ont été confirmés lors de la phase d'échange interactif et guident directement l'architecture du projet :

- **Format d'expérience confirmé** : Application web responsive avec simulateur de cadre mobile interactif (permettant de tester à la fois l'ergonomie mobile tactile au format smartphone et l'espace de travail étendu sur grand écran).
- **Stratégie de contenu confirmée** : Socle de connaissances officielles pré-intégrées (Mathématiques, Physique-Chimie, SVT, Technologie) avec enrichissement et génération d'exercices/explications complémentaires via l'IA Gemini 3.8 Flash à la demande.
- **Identité visuelle confirmée** : Thème par défaut « Bleu Océan Lumineux » rehaussé de cartes et boutons tactiles avec effet 3D physique (ombres biseautées, profondeur de clic), complété d'un sélecteur instantané vers le mode Sombre 3D et Gris Ardoise moderne.
- **Gestion des erreurs conviviale** : Interception globale des erreurs avec journal de débogage discret et affichage de messages d'aide rassurants et bienveillants adaptés aux collégiens.

---

## 1. Overview & Core Concept

### Ce que fait l'application
« Cap Révision 5ème » offre aux élèves de 5ème (12-13 ans) un compagnon d'apprentissage méthodique, stimulant et clair. L'élève sélectionne sa matière, consulte les synthèses visuelles indispensables, teste immédiatement ses réflexes via des quiz interactifs, et se prépare aux épreuves d'évaluation grâce aux meilleures questions d'examens et bilans des 6 dernières années (2020 à 2026), avec explications pas-à-pas.

### Public cible & Persona
- **Élèves de 5ème** : Besoin d'explications concrètes, de schémas mnémotechniques et d'une gratification immédiate sans surcharge cognitive.
- **Parents & Enseignants** : Suivi de la progression, conformité stricte aux repères de progression du cycle 4 français, fiabilité des corrigés.

### Matières couvertes
1. **Mathématiques** : Nombres relatifs, fractions, proportionnalité, triangles et angles, symétrie axiale et centrale, initiation à l'algorithmique.
2. **Physique-Chimie** : Les états de la matière, mélanges et corps purs, circuit électrique simple et en boucle, masse volumique et mesures.
3. **Sciences de la Vie et de la Terre (SVT)** : Nutrition et respiration des êtres vivants, tectonique des plaques et séismes, reproduction humaine et puberté, écosystèmes locaux.
4. **Technologie** : Chaîne d'information et d'énergie, modélisation 3D et matériaux, algorithmique & blocs de programmation, réseaux et impact environnemental du numérique.

---

## 2. User Experience & Visual Design

### Parcours utilisateur clé
1. **Accueil & Sélection de Matière** : Cartes 3D immersives par matière avec repère visuel immédiat, indicateur de maîtrise et accès en 1 clic.
2. **Espace Leçon & Schématisation** :
   - *À retenir absolument* : 3 à 5 points clés concis.
   - *Schéma mental interactif* : Visualisation dynamique SVG/interactive (ex: le circuit électrique, le cycle de l'eau, le calcul fractionnaire imagé).
   - *Astuce mnémotechnique* : Formules mnémotechniques adaptées aux collégiens.
3. **Quiz d'application immédiat** : Séries de 5 questions à choix multiple ou glisser-déposer avec retour haptique/sonore visuel, explication immédiate après validation et score final.
4. **Annales 6 Ans (2020 - 2026)** :
   - Filtre par millésime et thématique.
   - Questions clés extraites des bilans et évaluations nationales / brevets blancs 5ème.
   - Mode entraînement libre ou chronométré.
5. **Corrigés Détaillés & Tuteur Gemini** :
   - Corrigé officiel étape par étape.
   - Bouton « Explique-moi autrement avec l'IA » : Gemini reformule la méthode avec une analogie simple ou génère un exercice similaire pour s'entraîner.
6. **Bascule Web / Mode Mobile Simulator** : Bouton dans la barre supérieure pour alterner entre la vue plein écran responsive et le mode cadre smartphone Expo (avec barre de navigation basse ergonomique).

### Identité Visuelle & Thèmes 3D
- **Palette Océan Lumineux (Par défaut)** :
  - Fond de scène : Dégradé doux bleu azur polaire (`#F0F7FF` / `#E0F2FE`)
  - Surfaces de cartes : Blanc pur avec biseau 3D (`border-b-4 border-sky-300 shadow-[0_8px_20px_-4px_rgba(14,165,233,0.15)]`)
  - Accent primaire : Bleu Océan vibrant (`#0284C7`), bouton interactif avec extrusion (`bg-sky-500 shadow-[0_5px_0_#0369a1] active:translate-y-1 active:shadow-[0_1px_0_#0369a1]`)
- **Palette Gris Ardoise Moderne** :
  - Fond de scène neutre feutré (`#F8FAFC`), surfaces ardoise (`#E2E8F0` / `#94A3B8`), boutons 3D acier brossé.
- **Palette Sombre Nébuleuse 3D** :
  - Fond noir bleuté profond (`#0B1120`), cartes surélevées (`#1E293B` avec liseré supérieur phosphorescent `#38BDF8`), boutons 3D lumineux.
- **Discipline typographique & anti-slop** :
  - Titres : *Plus Jakarta Sans* Semi-Bold avec équilibre optique (`text-wrap: balance`).
  - Corps de texte : Typographie fluide ultra-lisible, interlignage aéré.
  - Formules & Chiffres : Nombres tabulaires alignés (`font-mono tabular-nums`).
  - Aucune pilule superflue : Séparateurs textuels typographiques épurés (`·`).

---

## 3. Key Product Decisions & Trade-Offs

| Décision | Choix retenu | Justification & Bénéfice | Alternative écartée |
| :--- | :--- | :--- | :--- |
| **Contenu pédagogique** | Banque officielle préchargée + IA Gemini à la demande | Fonctionnement instantané hors-ligne, zéro latence au démarrage, fiabilité pédagogique garantie, avec l'intelligence artificielle pour personnaliser les explications. | 100% IA dynamique (trop lent, risque d'hallucinations sur le programme de 5ème). |
| **Ergonomie double-plateforme** | Web responsive fluide + mode « Expo Mobile Preview Frame » commutable | Permet de simuler fidèlement l'application mobile Expo avec thumb-zone tout en offrant le confort d'un bureau grand écran. | Application purement mobile étirée sur 1440px ou site web statique sans sensation tactile. |
| **Effets 3D** | CSS 3D Tactile Skeuomorphique moderne (box-shadows étagés, états pressed fluides) | Performance maximale à 60 FPS, sans lourdeur WebGL inutile pour une interface de lecture et d'exercices. | Three.js lourd pour toute l'interface (batterie déchargée rapidement sur mobile). |
| **Traitement d'erreurs** | Logger centralisé + Notification Toast empathique (« Pas de panique ») | Répond directement à la consigne utilisateur en rassurant l'élève tout en facilitant le diagnostic technique d'un clic. | Alerte brute ou silence complet lors d'un échec réseau. |

---

## 4. Technical Architecture & Data Strategy

### Diagramme d'Architecture Système

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             NAVIGATEUR CLIENT                                │
│                                                                             │
│  ┌───────────────────────┐  ┌────────────────────────────────────────────┐  │
│  │     TopBar Contract   │  │   Theme & Device Switcher                  │  │
│  │   [Brand · Nav · CTAs]│  │   (Ocean / Gris / Dark · Web / Mobile Expo)│  │
│  └───────────┬───────────┘  └─────────────────────┬──────────────────────┘  │
│              │                                    │                         │
│  ┌───────────▼────────────────────────────────────▼──────────────────────┐  │
│  │               CONTENEUR PRINCIPAL DU DISPOSITIF                        │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │ Matières 5ème : Mathématiques · Physique-Chimie · SVT · Techno  │  │  │
│  │  ├─────────────────────────────────────────────────────────────────┤  │  │
│  │  │ [1. Fiche Synthèse]   [2. Schéma Interactif]   [3. Quiz Flash]  │  │  │
│  │  │ [4. Annales 6 Ans]    [5. Corrigé Pas-à-Pas]   [6. Tuteur IA]   │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────┬───────────────────────────────────┘  │
│                                      │                                      │
│  ┌───────────────────────────────────▼───────────────────────────────────┐  │
│  │                  Système de Feedback & Journal d'Erreurs               │  │
│  │  - Toast bienveillant collégien ("Oups ! Pas de panique...")          │  │
│  │  - Enregistreur d'erreurs local (Trace console & export debug)         │  │
│  └───────────────────────────────────┬───────────────────────────────────┘  │
└──────────────────────────────────────┼──────────────────────────────────────┘
                                       │ Fetch API (/api/tutor)
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                       SERVEUR EXPRESS (server.ts)                            │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Endpoint POST /api/tutor/explain                                      │  │
│  │ Utilise @google/genai SDK (modèle gemini-3.8-flash)                   │  │
│  │ System Prompt : Spécialiste pédagogique 5ème collège Éducation Nat.   │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Modèle de Données & État
- **`Subject`** : `id`, `name`, `icon`, `colorTheme`, `description`, `topicsCount`
- **`Lesson`** : `id`, `subjectId`, `title`, `keyPoints[]`, `interactiveDiagramType`, `diagramData`, `mnemonic`
- **`QuizQuestion`** : `id`, `lessonId`, `question`, `options[]`, `correctIndex`, `explanation`, `difficulty`
- **`ExamArchive`** : `id`, `subjectId`, `year` (2020 à 2026), `examType` (Évaluation nationale / Brevet blanc 5ème), `problemStatement`, `question`, `solutionSteps[]`, `commonMistakes[]`
- **`UserProgress`** : progression par matière, quiz réussis, score moyen, questions sauvegardées (sauvegardé en `localStorage` réactif)

### Mapping Interactif des Composants
- `SubjectSelector3D` : Grille de sélection tactile avec survol élastique et indicateur de complétion.
- `LessonViewer` : Vue double-colonne (ou onglets sur mobile) articulant le texte synthétique et le schéma SVG interactif dynamique manipulable (ex: ajuster des curseurs pour observer les réactions).
- `InteractiveQuiz` : Machine à états (Question -> Réponse choisie -> Révélation 3D -> Bilan -> Recommencer).
- `ExamArchivesBrowser` : Sélecteur temporel 2020-2026 avec filtre de difficulté et bouton d'affichage instantané du corrigé pas-à-pas.
- `AITutorDrawer` : Tiroir coulissant avec requête vers `/api/tutor/explain` pour reformuler, expliquer ou poser une question libre avec streaming de réponse.
- `DeviceFrame` : Composant wrapper basculant entre le format plein écran responsive et une maquette iPhone/Android ergonomique avec boutons de tranche et barre inférieure.
- `ErrorNotificationCenter` : Gestionnaire global capturant les exceptions réseau ou de saisie, affichant un message réconfortant tout en consignant la pile d'exécution.

---

## 5. Implementation Phases

1. **Phase 1 : Socle Pédagogique & Données Officielles 5ème**
   - Création de la bibliothèque de données complète et authentique (cours, quiz, annales 2020-2026, corrigés pas-à-pas) pour les 4 matières : Mathématiques, Physique-Chimie, SVT, Technologie.
2. **Phase 2 : Design System 3D & Gestionnaire de Thèmes**
   - Styles 3D skeuomorphiques modernes (effets de bouton poussoir, biseaux, ombres portées douces).
   - Thèmes Océan Lumineux, Gris Ardoise et Nébuleuse Sombre.
   - Simulateur de cadre mobile commutable avec tab-bar tactile.
3. **Phase 3 : Schémas Interactifs & Modules de Révision**
   - Développement des schémas visuels interactifs manipulables pour chaque matière.
   - Système de quiz avec feedback immédiat et explications détaillées.
4. **Phase 4 : Intégration Serveur Express & Tuteur Gemini 3.8 Flash**
   - Configuration du backend Express avec proxy sécurisé `@google/genai`.
   - Prompts système calibrés pour le niveau 5ème avec réponses structurées et bienveillantes.
5. **Phase 5 : Gestion des Erreurs Conviviale & Finitions**
   - Intercepteur d'erreurs global, notifications élégantes et journal de diagnostic.
   - Vérification de la compilation et réactivité mobile/desktop.
