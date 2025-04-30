import React from 'react';
import styled from 'styled-components';
import AlertCard from './AlertCard';

const ListContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const AlertsCount = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  color: ${({ theme }) => theme.colors.darkGray};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const LoadMoreButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  margin: ${({ theme }) => theme.spacing.lg} auto;
  display: block;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const AlertsList = ({ alerts, loadMore }) => {
  if (alerts.length === 0) {
    return (
      <EmptyState>
        <h3>Aucun avis ou alerte trouvé</h3>
        <p>Veuillez modifier vos critères de recherche pour voir les résultats.</p>
      </EmptyState>
    );
  }

  return (
    <ListContainer>
      <AlertsCount>
        <strong>{alerts.length}</strong> avis et alertes trouvés
      </AlertsCount>
      
      {alerts.map(alert => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
      
      {alerts.length >= 5 && (
        <LoadMoreButton onClick={loadMore}>
          Charger plus d'alertes
        </LoadMoreButton>
      )}
    </ListContainer>
  );
};

export default AlertsList;