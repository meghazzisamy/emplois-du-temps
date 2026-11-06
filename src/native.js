// Pont natif : notifications locales (son + vibration), sauvegardes en fichier et événements de l'app.
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { App } from '@capacitor/app';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

const CHANNEL = 'edt_rappels_v1';
const isNative = Capacitor.isNativePlatform();

async function ensureReady() {
  if (!isNative) return false;
  let p = await LocalNotifications.checkPermissions();
  if (p.display !== 'granted') p = await LocalNotifications.requestPermissions();
  if (p.display !== 'granted') return false;
  try {
    await LocalNotifications.createChannel({
      id: CHANNEL, name: 'Rappels emploi du temps',
      description: 'Rappels avant chaque activité',
      importance: 5, visibility: 1, vibration: true, lights: true, lightColor: '#0F3D5E'
    });
  } catch (e) {}
  return true;
}

// list = [{id:Number, at:Date, title, body}]
async function schedule(list) {
  if (!(await ensureReady())) return { ok: false, reason: 'permission' };
  const pending = await LocalNotifications.getPending();
  if (pending.notifications.length) await LocalNotifications.cancel({ notifications: pending.notifications.map(n => ({ id: n.id })) });
  const now = Date.now();
  const notifications = list.filter(n => n.at.getTime() > now + 5000).slice(0, 400).map(n => ({
    id: n.id, title: n.title, body: n.body, largeBody: n.body,
    schedule: { at: n.at, allowWhileIdle: true },
    channelId: CHANNEL, smallIcon: 'ic_stat_notify', iconColor: '#0F3D5E', autoCancel: true,
    extra: n.extra || null
  }));
  if (notifications.length) await LocalNotifications.schedule({ notifications });
  let exact = null;
  try { exact = (await LocalNotifications.checkExactNotificationSetting()).exact_alarm; } catch (e) {}
  return { ok: true, count: notifications.length, exact };
}

async function test() {
  if (!(await ensureReady())) return false;
  await LocalNotifications.schedule({ notifications: [{
    id: 999999, title: '🔔 Test réussi', body: 'Les rappels sonnent et vibrent comme ça.',
    schedule: { at: new Date(Date.now() + 5000), allowWhileIdle: true }, channelId: CHANNEL, smallIcon: 'ic_stat_notify', iconColor: '#0F3D5E'
  }]});
  return true;
}

async function openExactSettings() { try { await LocalNotifications.changeExactNotificationSetting(); } catch (e) {} }

/* ---------- Sauvegardes en fichier ----------
   Dossier public « Documents/EmploiDuTemps » : il survit à la désinstallation de l'app
   et se retrouve avec le gestionnaire de fichiers. Si Android refuse (anciens téléphones),
   on écrit dans le dossier privé de l'app (protège au moins contre une erreur de saisie). */
const BK_DIR = 'EmploiDuTemps';
const BK_KEEP = 14;
const DIRS = [[Directory.Documents, 'Documents/' + BK_DIR], [Directory.Data, "dossier de l'app"]];

async function prune(directory) {
  try {
    const { files } = await Filesystem.readdir({ path: BK_DIR, directory });
    const names = files.map(f => (typeof f === 'string' ? f : f.name)).filter(n => /^edt-.*\.json$/.test(n)).sort();
    for (const n of names.slice(0, Math.max(0, names.length - BK_KEEP))) {
      try { await Filesystem.deleteFile({ path: `${BK_DIR}/${n}`, directory }); } catch (e) {}
    }
  } catch (e) {}
}

// Écrit name (ex. "edt-2026-11-06.json") ; renvoie {ok, where}
async function saveBackup(name, json, askPermission) {
  if (!isNative) return { ok: false, reason: 'web' };
  if (askPermission) {
    try {
      const p = await Filesystem.checkPermissions();
      if (p.publicStorage !== 'granted') await Filesystem.requestPermissions();
    } catch (e) {}
  }
  for (const [directory, where] of DIRS) {
    try {
      await Filesystem.writeFile({ path: `${BK_DIR}/${name}`, data: json, directory, encoding: Encoding.UTF8, recursive: true });
      await prune(directory);
      return { ok: true, where };
    } catch (e) {}
  }
  return { ok: false, reason: 'write' };
}

// Ouvre le menu Android « Partager » (Drive, WhatsApp, e-mail…) avec le fichier de sauvegarde
async function shareBackup(name, json) {
  if (!isNative) return false;
  await Filesystem.writeFile({ path: name, data: json, directory: Directory.Cache, encoding: Encoding.UTF8 });
  const { uri } = await Filesystem.getUri({ path: name, directory: Directory.Cache });
  await Share.share({ title: 'Sauvegarde emploi du temps', text: name, files: [uri], dialogTitle: 'Enregistrer la sauvegarde' });
  return true;
}

window.NativeBridge = {
  isNative, schedule, test, openExactSettings, saveBackup, shareBackup,
  onResume(cb) { if (isNative) App.addListener('resume', cb); },
  onPause(cb) { if (isNative) App.addListener('pause', cb); },
  onNotificationTap(cb) { if (isNative) LocalNotifications.addListener('localNotificationActionPerformed', a => cb(a.notification && a.notification.extra)); }
};
window.dispatchEvent(new Event('nativebridge'));
