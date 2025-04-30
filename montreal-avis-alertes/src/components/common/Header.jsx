import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  
  img {
    height: 50px;
  }
`;

const LogoLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.large};
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <LogoLink to="/">
            <img src="/logo-montreal.svg.png" alt="Logo Ville de Montréal" />
            <span>Avis et Alertes</span>
          </LogoLink>
        </Logo>
        <div>
          <NavLink href="#">Mon Compte</NavLink>
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;