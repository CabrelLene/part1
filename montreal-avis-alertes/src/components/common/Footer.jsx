import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterText = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>© 2023 Ville de Montréal. Tous droits réservés.</FooterText>
        <FooterLinks>
          <FooterLink href="#">Accessibilité</FooterLink>
          <FooterLink href="#">Confidentialité</FooterLink>
          <FooterLink href="#">Mentions légales</FooterLink>
          <FooterLink href="#">Nous contacter</FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;