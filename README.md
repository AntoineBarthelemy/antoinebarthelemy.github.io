# Portfolio — Antoine Barthélémy

Site portfolio single-page en **HTML / CSS / JavaScript pur** (aucun framework, aucune librairie).

## ▶️ Ouvrir le site
Double-clique simplement sur **`index.html`** → il s'ouvre dans ton navigateur.

## 🗂️ Structure
```
Portfolio/
├── index.html          # la page
├── css/style.css       # tout le style (couleurs, effets, responsive)
├── js/
│   ├── data.js         # 👈 TON CONTENU (projets, stages, compétences...) — édite ici
│   ├── i18n.js         # textes FR/EN de l'interface
│   └── main.js         # logique (rendu, filtres, effets) — pas besoin d'y toucher
└── assets/
    ├── images/         # 👈 ta photo + captures de projets
    └── documents/      # 👈 CV.pdf + rapports de stage
```

## ✏️ Modifier le contenu
- **Projets, stages, compétences, langues, certifs** → `js/data.js`
- **Textes des menus / boutons** → `js/i18n.js`
- **Couleur d'accent** → `css/style.css`, variable `--accent` (tout en haut)

## 🖼️ Ajouter tes fichiers
Voir les fichiers `_A_DEPOSER_ICI.txt` dans `assets/images/` et `assets/documents/`.
Tant qu'un fichier manque, un placeholder s'affiche automatiquement (aucune erreur).

## 📐 Nommage des fichiers
Convention claire et obligatoire : voir **`assets/CONVENTION-NOMMAGE.md`**
(minuscules, tirets, sans accents, avec un préfixe : `profile-`, `project-`, `cv-`, `report-`…).

## 🌍 Bilingue
Bouton **FR / EN** en haut à droite. La langue est mémorisée.

## 🚀 Mettre en ligne (plus tard)
Hébergement gratuit possible sur **GitHub Pages** ou **Netlify** (glisser-déposer du dossier).
