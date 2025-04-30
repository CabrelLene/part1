/**
 * Filtre les alertes en fonction des critères de recherche et de filtres
 * @param {Array} alerts - Liste des alertes
 * @param {Object} filters - Critères de filtrage
 * @returns {Array} - Liste des alertes filtrées
 */
export const filterAlerts = (alerts, filters) => {
    return alerts.filter(alert => {
      // Filtrer par terme de recherche
      if (filters.searchTerm && !alert.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filtrer par arrondissement
      if (filters.arrondissement && filters.arrondissement !== "Tous les arrondissements" && 
          alert.arrondissement !== filters.arrondissement) {
        return false;
      }
      
      // Filtrer par sujet
      if (filters.subject && filters.subject !== "Tous les sujets" && 
          alert.subject !== filters.subject) {
        return false;
      }
      
      // Filtrer par date
      if (filters.startDate && new Date(alert.date) < new Date(filters.startDate)) {
        return false;
      }
      
      if (filters.endDate && new Date(alert.date) > new Date(filters.endDate)) {
        return false;
      }
      
      return true;
    });
  };
  
  /**
   * Formatte une date pour l'affichage
   * @param {string} dateStr - Date au format YYYY-MM-DD
   * @returns {string} - Date formatée
   */
  export const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('fr-CA', options);
  };