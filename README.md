# 📅 Emploi du temps – Samy

Application Android (Capacitor) : planning enseignant + développeur, bilan, rattrapage, analyse,
et **rappels avec son et vibration** avant chaque activité, même quand l'application est fermée.

## Installer sur le téléphone
1. Ouvre **Releases** (à droite sur la page du dépôt) → la dernière version.
2. Télécharge le fichier `EmploiDuTemps-v1.X.apk`.
3. Ouvre-le → **Installer**. La première fois, Android demande d'autoriser « Installer des applications inconnues » pour ton navigateur.
4. Au premier lancement, accepte les **notifications**.
5. ⚙️ Paramètres → 🔔 Notifications → **Tester** pour vérifier le son et la vibration.

## Mettre à jour
Chaque modification envoyée sur `main` fabrique automatiquement une nouvelle version (onglet **Actions**, ~5 min),
publiée dans **Releases**. Installe le nouvel APK par-dessus l'ancien : tes données sont gardées
(la clé de signature est fixe : `keystore/app.keystore`).

## 🏠 Accueil et navigation
- Barre du bas : 🏠 Accueil · 🗓️ Planning · 🎯 Objectifs · 📊 Analyse · ☰ Plus (Bilan, Rattraper, Paramètres).
- L'accueil montre l'essentiel : salutation et résumé du jour (adapté au matin, à la journée, au soir, au jour de repos),
  l'activité en cours avec le temps restant et ses sous-tâches à cocher, la suivante avec un compte à rebours,
  la tâche n°1, une seule alerte à la fois (concentration en cours › bilan du soir › rattrapage › eau),
  la progression du jour et l'eau.

## 🎯 Mode concentration
- Depuis l'accueil (« 🎯 Concentration ») ou depuis n'importe quelle activité.
- Jusqu'à la fin du créneau, 🍅 Pomodoro 25 + 5 min, 15/30/45/60 min ou chrono libre.
- Plein écran, sous-tâches cochables, pause, son + vibration à la fin, notification si l'app est fermée,
  écran maintenu allumé. À la fin, le temps réel est enregistré (aussi pour le sport et les langues)
  et l'app demande le statut. Le temps de concentration apparaît dans l'Analyse et peut devenir un objectif.

## Configurer son planning
- ⚙️ Paramètres → 🧭 **Assistant** : profil et rythme → repas → cours → travail enseignant → développement
  → sport → eau → autres activités → vérification (chevauchements, objectifs) → création.
  L'assistant repart toujours du planning actuel.
- ⚙️ Paramètres → ✏️ **Semaine type** : modifier, supprimer, copier un jour vers d'autres, vider un jour.
- Dans le planning : 🗑️ **Supprimer** une activité (ce jour seulement ou toutes les semaines),
  ⋯ **Journée** → 🌴 libérer toute la journée (rétablissable).
- Les semaines passées gardent leur planning : modifier la semaine type ne change pas l'historique.
- À la fin de l'assistant, on choisit où appliquer le planning : toutes les semaines à partir de la semaine
  prochaine (conseillé), à partir de cette semaine, ou une seule semaine (planning spécial ⭐, annulable via ⋯ Journée).
- Conflits d'horaire vérifiés en direct avant d'enregistrer : frise de la journée + 🟢 libre / 🟠 sur un repos / 🔴 conflit,
  avec proposition du créneau libre le plus proche.

## Profils métier
Au premier lancement : prénom → « Que fais-tu dans la vie ? » (plusieurs choix possibles) → jours de repos →
récapitulatif, puis l'assistant de planning. Profils : 👨‍🏫 Enseignant · 💻 Développeur / informatique · 🎓 Étudiant ·
🏢 Employé de bureau · 🤝 Commercial / terrain · 🩺 Santé · 💼 Indépendant · 🏠 Vie de famille · ✏️ Autre.
Chaque profil ajoute ses catégories (avec unité, objectif, sous-catégories, tâches rapides). Un profil peut être ajouté
plus tard (Paramètres → 👤 Mes profils) sans toucher aux catégories existantes. Une installation existante est reconnue
automatiquement (profils déduits de ses catégories) et ne voit pas l'écran de bienvenue.

## Catégories intelligentes (pour tous les métiers)
Chaque catégorie (Paramètres → ouvrir une catégorie) se règle : à noter dans le bilan, mesurer en heures / minutes /
séances, objectif par semaine (0 = ce qui est prévu), détails de séance (effort ou apprentissage) et objectif en minutes,
suivi dans l'analyse, travail principal, série de jours 🔥, nom des sous-catégories (Projet, Client, Matière…).
L'analyse, les objectifs automatiques, le bilan, l'accueil et les séries sont générés à partir de ces réglages.

## Règles métier
- Seuls les imprévus, les missions et les activités ponctuelles marquées « 🔁 Remplacer » barrent ce qui est prévu
  au même moment (les activités barrées vont dans Rattraper). Sinon, les deux activités sont gardées.
- Rattrapage : jusqu'à 60 jours en arrière ; au-delà de 14 jours, « Abandonner » est proposé.
- Rappels programmés sur 14 jours, avec un rappel d'ouvrir l'app avant la fin ; plus de rappel d'eau une fois l'objectif du jour atteint.
- Une activité qui passe minuit (ex. 23:00 → 01:00) est coupée en deux automatiquement.
- Une semaine spéciale ⭐ se modifie comme la semaine type (sans toucher à la semaine type).
- « ↶ Annuler » pendant 6 s après une suppression, un vidage de jour, une replanification automatique…
- Rappel sur l'accueil si la sauvegarde n'a pas été envoyée hors du téléphone depuis 7 jours.

## Bilan
- ✅ Fait coche toutes les sous-tâches ; une sous-tâche non cochée = 🌓 à moitié.
- 💬 Remarque possible sur chaque sous-tâche, en plus de la note de l'activité et de la note du jour.
- 🗣️ Langues : choix de la langue (Anglais, Français, Arabe…), temps pratiqué et compétences travaillées.

## Analyse
- Verdict « j'avance / je recule » (indice de respect des objectifs vs les 3 semaines précédentes),
  évolution sur 8 semaines, tableau des KPI (valeur, % atteint, écart vs semaine précédente, moyenne 4 semaines),
  rendement (prévu / réalisé / perdu), remarques et conseils, et toutes tes remarques de la semaine.

## 🎯 Objectifs
- 5 niveaux : jour, semaine, mois, trimestre, année, avec navigation ‹ › entre les périodes.
- Objectifs répétés (habitudes, indicateurs suivis à chaque période) et objectifs d'une période précise.
- 5 façons de mesurer : ✔ oui/non, 🔢 chiffré, ☑ étapes, 📏 automatique (calculé depuis le planning et le bilan),
  🔗 moyenne des sous-objectifs. Un objectif peut contribuer à un objectif plus long (mois → trimestre → année).
- Progression comparée au temps écoulé, projection « au rythme actuel », report d'un objectif non atteint.

## Eau et sport
- 💧 Carte « Eau aujourd'hui » sur l'accueil, rappels réguliers (Paramètres → Notifications), graphique par jour.
- 🏃 Durée réelle et intensité de chaque séance, séances hors planning (＋ → 🏃 Sport fait),
  objectifs en séances et en minutes par semaine.

## Sauvegardes
- **Automatique** : une copie par jour dans `Documents/EmploiDuTemps/` du téléphone (14 jours gardés),
  mise à jour 20 s après chaque modification et quand on quitte l'app. Une copie est aussi faite avant
  chaque restauration ou réinitialisation.
- **Hors du téléphone** : ⚙️ Paramètres → 📤 **Envoyer la sauvegarde** → Google Drive / WhatsApp / e-mail.
- **Restaurer** : ⚙️ Paramètres → 📂 **Restaurer depuis un fichier**.

## Transférer les données depuis la page web Claude
Page web → ⚙️ Paramètres → **Copier une sauvegarde** → dans l'application → ⚙️ Paramètres → colle dans
« Colle une sauvegarde ici » → **Restaurer**.

## Structure
- `www/index.html` – toute l'application (HTML/CSS/JS)
- `src/native.js` – pont vers les notifications Android (compilé dans `www/native.js`)
- `android/` – projet Android généré par Capacitor
- `.github/workflows/build-apk.yml` – fabrication et publication de l'APK
- `tools/icons.py` – génération des icônes
