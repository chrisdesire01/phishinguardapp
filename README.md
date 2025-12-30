# 🇧🇮 PhishGuard Burundi : Votre Bouclier Anti-Phishing IA

## 🚀 Vue d'ensemble du Projet

**PhishGuard Burundi** est une application web/mobile anti-phishing, conçue spécifiquement pour détecter les menaces (SMS, e-mails, URLs) ciblant les utilisateurs Burundais, en fournissant des alertes et des conseils en **Kirundi** et en Français.

Le cœur du projet est une intégration puissante avec un modèle de langage avancé pour un raisonnement contextuel sur les schémas d'arnaque locaux (M-Pesa, urgences administratives, etc.).

## ✨ Fonctionnalités Clés

* **Analyse Multi-Input :** Copiez-collez le contenu suspect (SMS, e-mail, URL).
* **Intelligence Burundaise :** Utilise un prompt IA affiné pour identifier les menaces spécifiques au contexte Burundais (Kirundi/Français, services locaux).
* **Scoring de Risque :** Fournit un score de 0 à 100 et un type de menace (`M-Pesa fake`, `Urgence fiscale`).
* **Alertes Locales :** Génère des conseils de sécurité clairs en **Kirundi** (`Gakuramye link, hamagara bank`) et en Français.
* **Mobile-First :** Interface réactive, prête pour une utilisation sur smartphone.
* **Historique Local :** Stockage des analyses précédentes dans le navigateur (`localStorage`).
* **Export WhatsApp :** Partage rapide du rapport d'analyse et des conseils de sécurité.

## ⚙️ Stack Technique

* **Frontend/Backend :** [Next.js 14 (App Router)](https://nextjs.org/)
* **Design :** [Tailwind CSS](https://tailwindcss.com/) pour un développement rapide et mobile-first.
* **Modèle IA :** [Anthropic Claude 3.5 Sonnet](https://www.anthropic.com/news/claude-3-5) via le [Vercel AI SDK](https://sdk.vercel.ai/).
* **Déploiement :** [Vercel](https://vercel.com/) (prêt à être déployé).

## 💻 Instructions d'Installation et de Démarrage

### Prérequis

* Node.js (version 18+)
* Clé API Anthropic (nécessaire pour Claude 3.5)

### Étapes

1.  **Clonez le dépôt :**
    ```bash
    git clone [votre-repo-ici] phishguard-burundi
    cd phishguard-burundi
    ```

2.  **Installez les dépendances :**
    ```bash
    npm install
    # ou pnpm install / yarn install
    ```

3.  **Configurez les variables d'environnement :**
    Créez un fichier `.env.local` à la racine du projet et ajoutez votre clé API :
    ```
    # .env.local
    ANTHROPIC_API_KEY="votre_clé_anthropic_ici"
    ```

4.  **Lancez l'application en développement :**
    ```bash
    npm run dev
    ```
    Ouvrez `http://localhost:3000` dans votre navigateur.

## 💡 Déploiement sur Vercel

1.  Assurez-vous que tous les changements sont `commit`és.
2.  Liez votre dépôt GitHub/GitLab/Bitbucket à un nouveau projet sur [Vercel](https://vercel.com/new).
3.  Lors de la configuration du projet, ajoutez votre variable d'environnement :
    * **Clé :** `ANTHROPIC_API_KEY`
    * **Valeur :** `[votre_clé_anthropic_ici]`
4.  Cliquez sur **Deploy**. L'application sera déployée et fonctionnelle en quelques minutes.
