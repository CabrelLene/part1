import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AlertDetail from '../components/detail/AlertDetail';
import { alerts } from '../data/mockData';

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`;

const DetailPage = () => {
  const { id } = useParams();
  const alert = alerts.find(a => a.id === parseInt(id));

  return (
    <DetailContainer>
      <AlertDetail alert={alert} />
    </DetailContainer>
  );
};

export default DetailPage;