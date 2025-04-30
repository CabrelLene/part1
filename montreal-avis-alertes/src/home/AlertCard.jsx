import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatDate } from '../utils/filterUtils';

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  display: block;
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const AlertDate = styled.span`
  background-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.darkGray};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 600;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;

const AlertTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const AlertMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const AlertMetaItem = styled.span`
  background-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.darkGray};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const AlertSummary = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ReadMore = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  display: inline-block;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AlertCard = ({ alert }) => {
  return (
    <CardContainer>
      <CardLink to={`/detail/${alert.id}`}>
        <CardContent>
          <CardHeader>
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDate>{formatDate(alert.date)}</AlertDate>
          </CardHeader>
          
          <AlertMeta>
            <AlertMetaItem>{alert.arrondissement}</AlertMetaItem>
            <AlertMetaItem>{alert.subject}</AlertMetaItem>
          </AlertMeta>
          
          <AlertSummary>{alert.summary}</AlertSummary>
          
          <ReadMore>Voir les détails</ReadMore>
        </CardContent>
      </CardLink>
    </CardContainer>
  );
};

export default AlertCard;