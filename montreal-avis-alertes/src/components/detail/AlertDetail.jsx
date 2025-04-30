import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatDate } from '../../utils/filterUtils';

const DetailContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  &:hover {
    text-decoration: underline;
  }
  
  &::before {
    content: '←';
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const AlertHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const AlertTitle = styled.h1`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.large};
  }
`;

const AlertMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const AlertMetaItem = styled.span`
  background-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.darkGray};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 600;
`;

const AlertContent = styled.div`
  line-height: 1.6;
  
  h2 {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${({ theme }) => theme.fontSizes.large};
    margin: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.md};
  }
  
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    margin: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.sm};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.lg};
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const ShareContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const ShareTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ShareButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ShareButton = styled.button`
  background-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.darkGray};
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.mediumGray};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const AlertDetail = ({ alert }) => {
  if (!alert) {
    return <DetailContainer>Alerte non trouvée</DetailContainer>;
  }

  const handleShare = (platform) => {
    alert(`Fonctionnalité de partage sur ${platform} non implémentée.`);
  };

  return (
    <DetailContainer>
      <BackLink to="/">Retour aux alertes</BackLink>
      
      <AlertHeader>
        <AlertTitle>{alert.title}</AlertTitle>
        <AlertMeta>
          <AlertMetaItem>{formatDate(alert.date)}</AlertMetaItem>
          <AlertMetaItem>{alert.arrondissement}</AlertMetaItem>
          <AlertMetaItem>{alert.subject}</AlertMetaItem>
        </AlertMeta>
      </AlertHeader>
      
      <AlertContent dangerouslySetInnerHTML={{ __html: alert.content }} />
      
      <ShareContainer>
        <ShareTitle>Partager cette alerte</ShareTitle>
        <ShareButtons>
          <ShareButton onClick={() => handleShare('courriel')}>Courriel</ShareButton>
          <ShareButton onClick={() => handleShare('facebook')}>Facebook</ShareButton>
          <ShareButton onClick={() => handleShare('twitter')}>Twitter</ShareButton>
        </ShareButtons>
      </ShareContainer>
    </DetailContainer>
  );
};

export default AlertDetail;