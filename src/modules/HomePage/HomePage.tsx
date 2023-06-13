import React from 'react';
import { GeneralRecipesList } from '../../components/GeneralRecipesList';
import { ContentContainer } from '../../components/ContentContainer';

export const HomePage: React.FC = () => {
  return (
    <ContentContainer>
      <GeneralRecipesList />
    </ContentContainer>
  );
};
