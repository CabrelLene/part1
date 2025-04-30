// src/utils/offlineManager.js
import { fetchAlerts } from './api';

const ALERTS_KEY = 'montreal-alerts-cache';
const TIMESTAMP_KEY = 'montreal-alerts-timestamp';

// Stocker les alertes dans le localStorage
export const storeAlertsLocally = async () => {
  try {
    const alerts = await fetchAlerts();
    localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
    localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
    return alerts;
  } catch (error) {
    console.error("Erreur lors du stockage des alertes:", error);
    return [];
  }
};

// Récupérer les alertes du localStorage
export const getStoredAlerts = () => {
  try {
    const storedAlerts = localStorage.getItem(ALERTS_KEY);
    return storedAlerts ? JSON.parse(storedAlerts) : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des alertes stockées:", error);
    return [];
  }
};

// Vérifier si les données sont trop anciennes (plus de 24h)
export const isDataStale = () => {
  const timestamp = localStorage.getItem(TIMESTAMP_KEY);
  if (!timestamp) return true;
  
  const lastUpdate = parseInt(timestamp);
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  
  return (now - lastUpdate) > oneDayMs;
};

// Récupérer les alertes avec gestion hors-ligne
export const getAlerts = async () => {
  try {
    // Essayer d'abord de récupérer depuis l'API
    const alerts = await fetchAlerts();
    await storeAlertsLocally();
    return alerts;
  } catch (error) {
    console.log("Erreur API, utilisation des données locales:", error);
    return getStoredAlerts();
  }
};