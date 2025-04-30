import React from 'react';
import styled from 'styled-components';
import { arrondissements, subjects } from '../data/mockData';

const FiltersContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FiltersTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.secondary};
`;

const FilterGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DateInputsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const DateInput = styled.input`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SubscribeContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const SubscribeButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e78000;
  }
`;

const ResetButton = styled.button`
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

const Filters = ({ filters, setFilters, resetFilters }) => {
  const handleSubscribe = () => {
    alert("La fonctionnalité d'abonnement aux alertes n'est pas encore disponible.");
  };

  return (
    <FiltersContainer>
      <FiltersTitle>Filtrer les alertes</FiltersTitle>
      
      <FilterGroup>
        <FilterLabel htmlFor="arrondissement">Arrondissement</FilterLabel>
        <Select
          id="arrondissement"
          value={filters.arrondissement}
          onChange={(e) => setFilters({ ...filters, arrondissement: e.target.value })}
        >
          {arrondissements.map((arr) => (
            <option key={arr} value={arr}>
              {arr}
            </option>
          ))}
        </Select>
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel htmlFor="subject">Sujet</FilterLabel>
        <Select
          id="subject"
          value={filters.subject}
          onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
        >
          {subjects.map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
        </Select>
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel>Période</FilterLabel>
        <DateInputsContainer>
          <DateInput
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            placeholder="Date de début"
          />
          <DateInput
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            placeholder="Date de fin"
          />
        </DateInputsContainer>
      </FilterGroup>
      
      <ResetButton onClick={resetFilters}>
        Réinitialiser les filtres
      </ResetButton>
      
      <SubscribeContainer>
        <SubscribeButton onClick={handleSubscribe}>
          M'abonner aux alertes
        </SubscribeButton>
      </SubscribeContainer>
    </FiltersContainer>
  );
};

export default Filters;