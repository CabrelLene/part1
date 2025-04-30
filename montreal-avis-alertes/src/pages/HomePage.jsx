import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../home/SearchBar';
import Filters from '../home/Filters';
import AlertsList from '../home/AlertsList';
import { alerts } from '../data/mockData';
import { filterAlerts } from '../utils/filterUtils';

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

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    arrondissement: 'Tous les arrondissements',
    subject: 'Tous les sujets',
    startDate: '',
    endDate: '',
  });
  const [filteredAlerts, setFilteredAlerts] = useState(alerts);
  const [visibleAlerts, setVisibleAlerts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const filtered = filterAlerts(alerts, { ...filters, searchTerm });
    setFilteredAlerts(filtered);
    setVisibleCount(5);
  }, [filters, searchTerm]);

  useEffect(() => {
    setVisibleAlerts(filteredAlerts.slice(0, visibleCount));
  }, [filteredAlerts, visibleCount]);

  const handleSearch = () => {
    const filtered = filterAlerts(alerts, { ...filters, searchTerm });
    setFilteredAlerts(filtered);
    setVisibleCount(5);
  };

  const resetFilters = () => {
    setFilters({
      arrondissement: 'Tous les arrondissements',
      subject: 'Tous les sujets',
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
        />
      </ContentGrid>
    </HomeContainer>
  );
};

export default HomePage;