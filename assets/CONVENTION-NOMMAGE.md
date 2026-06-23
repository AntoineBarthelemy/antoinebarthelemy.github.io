# 📐 Convention de nommage des fichiers

Pour que les fichiers restent clairs et qu'on sache toujours ce qu'on manipule.

## Règles générales
- **Tout en minuscules**
- **Tirets** `-` entre les mots (kebab-case) — jamais d'espace ni de `_`
- **Pas d'accents** ni de caractères spéciaux (`é` → `e`, `ç` → `c`…)
- Un **préfixe de catégorie** au début (dit ce que c'est)
- Nom **court et descriptif**

Exemple : `Photo de Profil (1).JPG` ❌ → `profile-antoine.jpg` ✅

---

## 🖼️ Images — `assets/images/`

| Type | Préfixe | Exemple |
|------|---------|---------|
| Photo de profil | `profile-` | `profile-antoine.jpg` |
| Visuel / capture de projet | `project-` | `project-sam.jpg` |
| Logo (techno ou entreprise) | `logo-` | `logo-nextjs.svg` |
| Icône d'interface | `icon-` | `icon-github.svg` |
| Image de partage réseaux sociaux | `og-` | `og-cover.jpg` |

> ⚠️ **Règle clé pour les projets** : le nom reprend exactement l'**`id`** du projet
> défini dans `js/data.js`. Exemple : projet `id: "gpt-youtube"` → `project-gpt-youtube.jpg`.

**Fichiers projets attendus :**
`project-sam.jpg` · `project-spoffee.jpg` · `project-culture-jam.jpg` ·
`project-unbelievably.jpg` · `project-gpt-youtube.jpg` · `project-zcasino.jpg` ·
`project-infra-reseau.jpg`

---

## 📄 Documents — `assets/documents/`

| Type | Préfixe | Exemple |
|------|---------|---------|
| CV | `cv-` | `cv-antoine-barthelemy.pdf` |
| Rapport de stage | `report-` | `report-codilee.pdf` |
| Certification / diplôme | `certificate-` | `certificate-ielts.pdf` |

**Fichiers documents attendus :**
`cv-antoine-barthelemy.pdf` · `report-codilee.pdf` · `report-malblanc.pdf` ·
`report-hktech.pdf` · `report-koesio.pdf` · `certificate-ielts.pdf`

---

## ✅ En résumé
`<categorie>-<description>.<extension>` — minuscules, tirets, sans accent.
Si tu hésites sur un nom, demande-toi : *« est-ce que quelqu'un comprend ce que c'est rien qu'au nom ? »*
