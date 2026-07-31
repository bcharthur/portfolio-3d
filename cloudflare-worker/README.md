# Worker de refresh des stats Root-Me / Cyber-Learning

Ce Worker reçoit les clics du bouton "Actualiser" du site, applique une
limite de fréquence (par visiteur + globale) puis déclenche l'Action
GitHub `update-stats.yml` à la demande. Le token GitHub reste côté
serveur (secret Worker), jamais exposé au navigateur.

## Prérequis

- Un compte Cloudflare gratuit (https://dash.cloudflare.com/sign-up)
- Node.js installé en local

## 1. Installer Wrangler (CLI Cloudflare)

```bash
cd cloudflare-worker
npm install -g wrangler
wrangler login
```

Une page de connexion Cloudflare s'ouvre dans le navigateur.

## 2. Créer le namespace KV (stocke les cooldowns)

```bash
wrangler kv namespace create STATS_REFRESH_KV
```

La commande affiche un `id`. Copie-le dans `wrangler.toml`, à la place
de `REPLACE_WITH_KV_NAMESPACE_ID`.

## 3. Créer un token GitHub pour le Worker

Sur GitHub : **Settings → Developer settings → Personal access tokens →
Fine-grained tokens → Generate new token**

- Repository access : uniquement `bcharthur/portfolio-3d`
- Permissions : **Actions → Read and write** (c'est le seul droit
  nécessaire, ce token ne doit avoir aucun autre accès)
- Copie le token généré (il ne sera plus jamais réaffiché)

## 4. Enregistrer le token comme secret du Worker

```bash
wrangler secret put GITHUB_TOKEN
```

Colle le token créé à l'étape 3 quand demandé. Il est chiffré côté
Cloudflare, jamais visible dans le code ni dans le bundle envoyé au
navigateur.

## 5. Déployer

```bash
wrangler deploy
```

La commande affiche l'URL publique du Worker, du type :
`https://portfolio-stats-refresh.<ton-sous-domaine>.workers.dev`

## 6. Brancher le site dessus

Sur GitHub : **Settings → Secrets and variables → Actions → onglet
"Variables"** (pas "Secrets" - cette URL n'est pas sensible, elle finit
de toute façon dans le bundle JS public) → **New repository variable** :

- Name : `STATS_REFRESH_URL`
- Value : l'URL affichée à l'étape 5, ex.
  `https://portfolio-stats-refresh.<ton-sous-domaine>.workers.dev`

Le workflow `depoy.yml` la passe déjà automatiquement au build
(`VITE_STATS_REFRESH_URL`). Tant que cette variable n'existe pas, le
bouton "Actualiser" reste simplement invisible sur le site - rien ne
casse.

## Vérifier que ça marche

```bash
curl -i -X POST https://portfolio-stats-refresh.<ton-sous-domaine>.workers.dev \
  -H "Origin: https://bcharthur.github.io"
```

Premier appel : `202` avec `{"ok":true,"cooldownSeconds":900}`.
Appel immédiat suivant : `429` avec `{"ok":false,"error":"rate_limited",...}`.

## Ajuster les limites

Dans `src/index.js` :

- `PER_IP_COOLDOWN_SECONDS` : délai minimum entre deux clics d'un même
  visiteur (15 min par défaut)
- `GLOBAL_COOLDOWN_SECONDS` : délai minimum entre deux déclenchements,
  tous visiteurs confondus (2 min par défaut) - protège les minutes
  GitHub Actions et évite de solliciter Root-Me/Cyber-Learning trop
  souvent même si plusieurs personnes cliquent en même temps
