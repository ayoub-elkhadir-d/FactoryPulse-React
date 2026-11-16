# FactoryPulse

FactoryPulse est un petit tableau de bord React pour suivre les machines d'un
atelier. Les données de départ sont lues depuis `public/machines.json`. Les
ajouts, changements de statut et suppressions sont gardés en mémoire pendant la
session et sont réinitialisés au rechargement de la page.

## Démarrer en local

Prérequis : Node.js 22 ou une version plus récente et npm.

```bash
npm install
npm run dev
```

Ouvrez l'adresse affichée par Vite (par défaut `http://localhost:5173`).

## Démarrer avec Docker

Prérequis : Docker avec le plugin Docker Compose.

```bash
docker compose up --build
```

Ouvrez `http://localhost:8080`. Pour arrêter le conteneur, exécutez
`docker compose down`.

## Pages

- `/` : indicateurs et production journalière.
- `/machines` : recherche, filtres, changement de statut et suppression.
- `/machines/new` : formulaire d'ajout avec validation.

Les trois statuts disponibles sont « En fonctionnement », « À l'arrêt » et
« En panne ». Le tableau de bord recalcule ses indicateurs à partir de la liste
actuelle des machines.

## Tests

```bash
npm test
```

Les tests utilisent Jest et React Testing Library.

## Organisation du code

- `src/App.jsx` charge le fichier JSON une fois et partage la liste des machines
  avec les pages.
- `src/Pages/` contient le tableau de bord, la liste et la page d'ajout.
- `src/Components/` contient les cartes, le tableau et les contrôles réutilisables.
- `src/constants/machines.js` liste les statuts autorisés.
- `src/utils/` contient le calcul des indicateurs, la validation et la création
  d'identifiants.
- `public/machines.json` est uniquement la source initiale des données.
