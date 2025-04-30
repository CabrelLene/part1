// src/utils/api.js
// Constantes pour les URLs de l'API
const BASE_API_URL = 'https://donnees.montreal.ca/api/3/action/datastore_search';
const RESOURCE_ID = 'fc6e5f85-7eba-451c-8243-bdf35c2ab336';
const GEOJSON_URL = 'https://donnees.montreal.ca/dataset/556c84af-aebf-4ca9-9a9c-2f246601674c/resource/d249e452-46f5-422f-91ae-898c98eea6cc/download/avis-alertes.geojson';

// Fonction pour récupérer les avis et alertes
export const fetchAlerts = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}?resource_id=${RESOURCE_ID}&limit=100`);
    const data = await response.json();
    
    if (data.success && data.result && data.result.records) {
      return data.result.records.map(record => ({
        id: record._id,
        title: record.titre || 'Sans titre',
        description: record.message || '',
        date: record.date_publication || new Date().toISOString(),
        expiryDate: record.date_fin || null,
        arrondissement: record.arrondissement || 'Tous les arrondissements',
        subject: record.categorie || 'Non catégorisé',
        content: record.message_complet || record.message || '',
      }));
    }
    
    throw new Error("Erreur lors de la récupération des données");
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
};

// Fonction pour récupérer les avis et alertes avec les coordonnées géographiques
export const fetchGeoAlerts = async () => {
  try {
    const response = await fetch(GEOJSON_URL);
    const data = await response.json();
    
    if (data && data.features) {
      return data.features.map(feature => ({
        id: feature.properties.id || feature.id,
        title: feature.properties.titre || 'Sans titre',
        description: feature.properties.message || '',
        date: feature.properties.date_publication || new Date().toISOString(),
        expiryDate: feature.properties.date_fin || null,
        arrondissement: feature.properties.arrondissement || 'Tous les arrondissements',
        subject: feature.properties.categorie || 'Non catégorisé',
        content: feature.properties.message_complet || feature.properties.message || '',
        coordinates: feature.geometry ? feature.geometry.coordinates : null
      }));
    }
    
    throw new Error("Erreur lors de la récupération des données géographiques");
  } catch (error) {
    console.error("Erreur API GeoJSON:", error);
    throw error;
  }
};

// Extraire les arrondissements depuis les données
export const fetchArrondissements = async () => {
  try {
    const alerts = await fetchAlerts();
    const allArrondissements = ["Tous les arrondissements"];
    
    alerts.forEach(alert => {
      if (alert.arrondissement && !allArrondissements.includes(alert.arrondissement)) {
        allArrondissements.push(alert.arrondissement);
      }
    });
    
    return allArrondissements;
  } catch (error) {
    console.error("Erreur lors de la récupération des arrondissements:", error);
    return ["Tous les arrondissements"];
  }
};

// Extraire les sujets depuis les données
export const fetchSubjects = async () => {
  try {
    const alerts = await fetchAlerts();
    const allSubjects = ["Tous les sujets"];
    
    alerts.forEach(alert => {
      if (alert.subject && !allSubjects.includes(alert.subject)) {
        allSubjects.push(alert.subject);
      }
    });
    
    return allSubjects;
  } catch (error) {
    console.error("Erreur lors de la récupération des sujets:", error);
    return ["Tous les sujets"];
  }
};