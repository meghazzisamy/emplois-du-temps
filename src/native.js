// Pont natif : notifications locales (son + vibration) et événements de l'app.
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { App } from '@capacitor/app';

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

window.NativeBridge = {
  isNative, schedule, test, openExactSettings,
  onResume(cb) { if (isNative) App.addListener('resume', cb); },
  onNotificationTap(cb) { if (isNative) LocalNotifications.addListener('localNotificationActionPerformed', a => cb(a.notification && a.notification.extra)); }
};
window.dispatchEvent(new Event('nativebridge'));
