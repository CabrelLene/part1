// src/components/home/Filters.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchArrondissements, fetchSubjects } from '../utils/api';

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

const MultiSelectContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  max-height: 200px;
  overflow-y: auto;
`;

const CheckboxOption = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

const Checkbox = styled.input`
  margin-right: ${({ theme }) => theme.spacing.sm};
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

const ActiveFiltersContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ActiveFiltersTitle = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.darkGray};
`;

const ActiveFiltersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ActiveFilter = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.darkGray};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const RemoveFilterButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.darkGray};
  margin-left: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.small};
  
  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

const ClearAllButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.small};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Filters = ({ filters, setFilters, resetFilters }) => {
  const [arrondissements, setArrondissements] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [arrondissementsData, subjectsData] = await Promise.all([
          fetchArrondissements(),
          fetchSubjects()
        ]);
        
        setArrondissements(arrondissementsData);
        setSubjects(subjectsData);
      } catch (error) {
        console.error("Erreur lors du chargement des options de filtre:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFilterOptions();
  }, []);
  
  const handleArrondissementChange = (arr) => {
    let newArrondissements = [...filters.arrondissements];
    
    if (arr === "Tous les arrondissements") {
      // Si "Tous les arrondissements" est sélectionné, on réinitialise la liste
      newArrondissements = ["Tous les arrondissements"];
    } else {
      // Si l'arrondissement est déjà dans la liste, on le retire
      if (newArrondissements.includes(arr)) {
        newArrondissements = newArrondissements.filter(a => a !== arr);
        
        // Si la liste est vide, on ajoute "Tous les arrondissements"
        if (newArrondissements.length === 0) {
          newArrondissements = ["Tous les arrondissements"];
        }
      } else {
        // Sinon, on l'ajoute et on retire "Tous les arrondissements" s'il est présent
        newArrondissements = newArrondissements.filter(a => a !== "Tous les arrondissements");
        newArrondissements.push(arr);
      }
    }
    
    setFilters({ ...filters, arrondissements: newArrondissements });
  };
  
  const handleSubjectChange = (subj) => {
    let newSubjects = [...filters.subjects];
    
    if (subj === "Tous les sujets") {
      // Si "Tous les sujets" est sélectionné, on réinitialise la liste
      newSubjects = ["Tous les sujets"];
    } else {
      // Si le sujet est déjà dans la liste, on le retire
      if (newSubjects.includes(subj)) {
        newSubjects = newSubjects.filter(s => s !== subj);
        
        // Si la liste est vide, on ajoute "Tous les sujets"
        if (newSubjects.length === 0) {
          newSubjects = ["Tous les sujets"];
        }
      } else {
        // Sinon, on l'ajoute et on retire "Tous les sujets" s'il est présent
        newSubjects = newSubjects.filter(s => s !== "Tous les sujets");
        newSubjects.push(subj);
      }
    }
    
    setFilters({ ...filters, subjects: newSubjects });
  };
  
  const removeArrondissementFilter = (arr) => {
    let newArrondissements = filters.arrondissements.filter(a => a !== arr);
    
    if (newArrondissements.length === 0) {
      newArrondissements = ["Tous les arrondissements"];
    }
    
    setFilters({ ...filters, arrondissements: newArrondissements });
  };
  
  const removeSubjectFilter = (subj) => {
    let newSubjects = filters.subjects.filter(s => s !== subj);
    
    if (newSubjects.length === 0) {
      newSubjects = ["Tous les sujets"];
    }
    
    setFilters({ ...filters, subjects: newSubjects });
  };
  
  const removeDateFilter = (type) => {
    if (type === 'start') {
      setFilters({ ...filters, startDate: '' });
    } else {
      setFilters({ ...filters, endDate: '' });
    }
  };
  
  const hasActiveFilters = () => {
    return (
      (filters.arrondissements.length === 1 && filters.arrondissements[0] !== "Tous les arrondissements") ||
      filters.arrondissements.length > 1 ||
      (filters.subjects.length === 1 && filters.subjects[0] !== "Tous les sujets") ||
      filters.subjects.length > 1 ||
      filters.startDate !== '' ||
      filters.endDate !== ''
    );
  };
  
  const handleSubscribe = () => {
    alert("La fonctionnalité d'abonnement aux alertes n'est pas encore disponible.");
  };

  if (loading) {
    return (
      <FiltersContainer>
        <FiltersTitle>Chargement des filtres...</FiltersTitle>
      </FiltersContainer>
    );
  }

  return (
    <FiltersContainer>
      <FiltersTitle>Filtrer les alertes</FiltersTitle>
      
      {hasActiveFilters() && (
        <ActiveFiltersContainer>
          <ActiveFiltersTitle>Filtres actifs</ActiveFiltersTitle>
          <ActiveFiltersList>
            {filters.arrondissements.map(arr => {
              if (arr !== "Tous les arrondissements") {
                return (
                  <ActiveFilter key={`arr-${arr}`}>
                    {arr}
                    <RemoveFilterButton 
                      onClick={() => removeArrondissementFilter(arr)}
                      aria-label={`Supprimer le filtre d'arrondissement ${arr}`}
                    >
                      &times;
                    </RemoveFilterButton>
                  </ActiveFilter>
                );
              }
              return null;
            })}
            
            {filters.subjects.map(subj => {
              if (subj !== "Tous les sujets") {
                return (
                  <ActiveFilter key={`subj-${subj}`}>
                    {subj}
                    <RemoveFilterButton 
                      onClick={() => removeSubjectFilter(subj)}
                      aria-label={`Supprimer le filtre de sujet ${subj}`}
                    >
                      &times;
                    </RemoveFilterButton>
                  </ActiveFilter>
                );
              }
              return null;
            })}
            
            {filters.startDate && (
              <ActiveFilter>
                À partir du {new Date(filters.startDate).toLocaleDateString('fr-CA')}
                <RemoveFilterButton 
                  onClick={() => removeDateFilter('start')}
                  aria-label="Supprimer le filtre de date de début"
                >
                  &times;
                </RemoveFilterButton>
              </ActiveFilter>
            )}
            
            {filters.endDate && (
              <ActiveFilter>
                Jusqu'au {new Date(filters.endDate).toLocaleDateString('fr-CA')}
                <RemoveFilterButton 
                  onClick={() => removeDateFilter('end')}
                  aria-label="Supprimer le filtre de date de fin"
                >
                  &times;
                </RemoveFilterButton>
              </ActiveFilter>
            )}
          </ActiveFiltersList>
          
          <ClearAllButton onClick={resetFilters}>
            Tout effacer
          </ClearAllButton>
        </ActiveFiltersContainer>
      )}
      
      <FilterGroup>
        <FilterLabel>Arrondissement</FilterLabel>
        <MultiSelectContainer>
          {arrondissements.map((arr) => (
            <CheckboxOption key={arr}>
              <Checkbox
                type="checkbox"
                id={`arr-${arr}`}
                checked={filters.arrondissements.includes(arr)}
                onChange={() => handleArrondissementChange(arr)}
              />
              <label htmlFor={`arr-${arr}`}>{arr}</label>
            </CheckboxOption>
          ))}
        </MultiSelectContainer>
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel>Sujet</FilterLabel>
        <MultiSelectContainer>
          {subjects.map((subj) => (
            <CheckboxOption key={subj}>
              <Checkbox
                type="checkbox"
                id={`subj-${subj}`}
                checked={filters.subjects.includes(subj)}
                onChange={() => handleSubjectChange(subj)}
              />
              <label htmlFor={`subj-${subj}`}>{subj}</label>
            </CheckboxOption>
          ))}
        </MultiSelectContainer>
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