// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../home/SearchBar';
import Filters from '../home/Filters';
import AlertsList from '../home/AlertsList';
import { fetchAlerts } from '../utils/api';
import { getAlerts, storeAlertsLocally, isDataStale } from '../utils/offlineManager';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`;

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
  }
`;

const PageIntro = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 800px;
  line-height: 1.5;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const OfflineWarning = styled.div`
  background-color: #fff3cd;
  color: #856404;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allAlerts, setAllAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [visibleAlerts, setVisibleAlerts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [dataStale, setDataStale] = useState(false);
  
  const [filters, setFilters] = useState({
    arrondissements: ['Tous les arrondissements'],
    subjects: ['Tous les sujets'],
    startDate: '',
    endDate: '',
  });

  // Vérifier l'état de la connexion
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Charger les données depuis l'API ou le cache
  useEffect(() => {
    const loadAlerts = async () => {
      try {
        setLoading(true);
        
        // Vérifier si les données sont périmées
        const stale = isDataStale();
        setDataStale(stale);
        
        // Récupérer les données
        const data = await getAlerts();
        
        // Si en ligne et données périmées, mettre à jour le cache
        if (navigator.onLine && stale) {
          storeAlertsLocally();
        }
        
        setAllAlerts(data);
        setFilteredAlerts(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des alertes:", error);
        setLoading(false);
      }
    };
    
    loadAlerts();
  }, [isOffline]);

  // Appliquer les filtres et la recherche
  useEffect(() => {
    let result = [...allAlerts];
    
    // Appliquer le filtre de recherche
    if (searchTerm) {
      result = result.filter(alert => 
        alert.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Appliquer le filtre d'arrondissement
    if (!filters.arrondissements.includes('Tous les arrondissements')) {
      result = result.filter(alert => 
        filters.arrondissements.includes(alert.arrondissement)
      );
    }
    
    // Appliquer le filtre de sujet
    if (!filters.subjects.includes('Tous les sujets')) {
      result = result.filter(alert => 
        filters.subjects.includes(alert.subject)
      );
    }
    
    // Appliquer le filtre de date de début
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      result = result.filter(alert => 
        new Date(alert.date) >= startDate
      );
    }
    
    // Appliquer le filtre de date de fin
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59);
      result = result.filter(alert => 
        new Date(alert.date) <= endDate
      );
    }
    
    setFilteredAlerts(result);
    setVisibleCount(5); // Réinitialiser la pagination
  }, [allAlerts, searchTerm, filters]);

  // Mettre à jour les alertes visibles (pagination)
  useEffect(() => {
    setVisibleAlerts(filteredAlerts.slice(0, visibleCount));
  }, [filteredAlerts, visibleCount]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    // La recherche est déjà appliquée via useEffect
  };
  
  const resetFilters = () => {
    setFilters({
      arrondissements: ['Tous les arrondissements'],
      subjects: ['Tous les sujets'],
      startDate: '',
      endDate: '',
    });
    setSearchTerm('');
  };
  
  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 5);
  };

  return (
    <HomeContainer>
      <PageTitle>Avis et alertes</PageTitle>
      <PageIntro>
        Avis d'ébullition d'eau, travaux, fermeture de rue, nous vous informons sur des situations qui ont un impact sur votre quotidien. Consultez la liste des avis et alertes en cours.
      </PageIntro>
      
      {(isOffline || dataStale) && (
        <OfflineWarning>
          {isOffline ? 
            "Vous êtes en mode hors-ligne. Les données affichées peuvent ne pas être à jour." :
            "Les données affichées peuvent être obsolètes. Actualisez la page pour les mettre à jour."
          }
        </OfflineWarning>
      )}
      
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      
      <ContentGrid>
        <Filters 
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
        />
        
        <AlertsList 
          alerts={visibleAlerts}
          loadMore={loadMore}
          hasMore={visibleAlerts.length < filteredAlerts.length}
          loading={loading}
          totalCount={filteredAlerts.length}
        />
      </ContentGrid>
    </HomeContainer>
  );
};

export default HomePage;