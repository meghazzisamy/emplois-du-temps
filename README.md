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

## Transférer les données depuis la page web Claude
Page web → ⚙️ Paramètres → **Copier une sauvegarde** → dans l'application → ⚙️ Paramètres → colle dans
« Colle une sauvegarde ici » → **Restaurer**.

## Structure
- `www/index.html` – toute l'application (HTML/CSS/JS)
- `src/native.js` – pont vers les notifications Android (compilé dans `www/native.js`)
- `android/` – projet Android généré par Capacitor
- `.github/workflows/build-apk.yml` – fabrication et publication de l'APK
- `tools/icons.py` – génération des icônes
