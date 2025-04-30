import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.small};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-right: none;
  font-size: ${({ theme }) => theme.fontSizes.regular};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-right: 1px solid ${({ theme }) => theme.colors.lightGray};
    border-bottom: none;
  }
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Rechercher des avis et alertes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton type="submit">Rechercher</SearchButton>
      </SearchForm>
    </SearchContainer>
  );
};

export default SearchBar;