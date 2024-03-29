import React from 'react';
import { ContentContainer } from '../../components/ContentContainer';
import { UniversalList } from '../../components/UniversalList';
import { useAppSelector } from '../../redux/hooks';

export const FavPage: React.FC = () => {
  const favRecipes = useAppSelector((state) => state.recipes.favRecipes);

  return (
    <ContentContainer>
      <UniversalList recipes={favRecipes} />
    </ContentContainer>
  );
};
