import * as admin from 'firebase-admin';
import * as restoreService from './import';
import * as backupService from './export';

/**
 * Initialize Firebase App
 *
 * @param {any} serviceAccount
 * @param {any} databaseURL
 */
export const initializeApp = (serviceAccount: string, databaseURL: string) => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: databaseURL
    });
    admin.firestore().settings({ timestampsInSnapshots: true });
  }
  return true;
};

export { admin };

/**
 * Backup data from firestore
 *
 * @param {string} collectionName
 * @return {json}
 */
export const backup = (collectionName: string) => {
  return backupService.backup(collectionName);
};

/**
 * Restore data to firestore
 * @param fileName
 * @param options
 */
export const restore = (
  fileName: string,
  options: restoreService.IImportOptions = {}
) => {
  return restoreService.restore(fileName, options);
};

/**
 * Get all collections data
 * @param {Array<string>} collectionNameArray
 */
export const backups = (collectionNameArray: Array<string> = []) => {
  return backupService.getAllCollections(collectionNameArray);
};
