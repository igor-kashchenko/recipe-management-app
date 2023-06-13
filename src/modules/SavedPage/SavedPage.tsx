import React from 'react';
import { ContentContainer } from '../../components/ContentContainer';
import { UniversalList } from '../../components/UniversalList';
import { useAppSelector } from '../../redux/hooks';

export const SavedPage: React.FC = () => {
  const savedRecipes = useAppSelector(state => state.recipes.savedRecipes);

  return (
    <ContentContainer>
      <UniversalList recipes={savedRecipes}/>
    </ContentContainer>
  );
};

