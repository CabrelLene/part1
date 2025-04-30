// src/components/home/AlertsList.jsx
import React from 'react';
import styled from 'styled-components';
import AlertCard from './AlertCard';

const AlertsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const AlertsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const AlertsTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
`;

const AlertsCount = styled.span`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const NoResults = styled.p`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.darkGray};
`;

const LoadMoreButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const AlertsList = ({ alerts, loading, hasMore, loadMore, totalCount }) => {
  return (
    <AlertsContainer>
      <AlertsHeader>
        <AlertsTitle>Avis et alertes</AlertsTitle>
        <AlertsCount>{totalCount || 0} résultats</AlertsCount>
      </AlertsHeader>
      
      {loading && alerts.length === 0 ? (
        <NoResults>Chargement des alertes...</NoResults>
      ) : alerts.length === 0 ? (
        <NoResults>Aucun avis ou alerte trouvé avec ces critères</NoResults>
      ) : (
        <>
          {alerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
          
          {hasMore && (
            <LoadMoreButton onClick={loadMore}>
              Voir plus d'alertes
            </LoadMoreButton>
          )}
        </>
      )}
    </AlertsContainer>
  );
};

export default AlertsList;