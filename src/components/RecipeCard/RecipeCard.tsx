import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Recipe } from '../../types';
import { parseRecipe } from '../../utils.ts';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import {
  favRecipe,
  removeFavRecipe,
  removeSavedRecipe,
  saveRecipe,
} from '../../redux/recipes';

type Props = {
  recipe: Recipe;
};

export const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const dispatch = useAppDispatch();

  const isUserLoggenIn = useAppSelector((state) => state.user.currentUser);
  const favourites = useAppSelector((state) => state.recipes.favRecipes);
  const saved = useAppSelector((state) => state.recipes.savedRecipes);

  const { title, description, category, cookingTime } = recipe;
  const ingredients = parseRecipe(recipe);

  const handleSaveClick = (recipe: Recipe) => {
    dispatch(saveRecipe(recipe));
  };

  const handleFavClick = (recipe: Recipe) => {
    dispatch(favRecipe(recipe));
  };

  const handleRemoveCardFromSaved = (title: string) => {
    dispatch(removeSavedRecipe(title));
  };

  const handleRemoveCardFromFav = (title: string) => {
    dispatch(removeFavRecipe(title));
  };

  const isFavourite = favourites.some((fav) => fav.title === title);
  const isSaved = saved.some((save) => save.title === title);

  return (
    <Card
      sx={{ p: 3, boxSizing: 'border-box', overflow: 'auto', height: '400px' }}
      elevation={5}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={2}
      >
        <Tooltip title={title} placement="bottom-start">
          <Typography
            variant="h6"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s',
              cursor: 'pointer',
              ':hover': {
                color: '#2f2f44',
              },
            }}
          >
            {title}
          </Typography>
        </Tooltip>

        {isUserLoggenIn && (
          <>
            {isSaved ? (
              <BookmarkAddedIcon
                titleAccess="add to saved"
                sx={{
                  transition: 'color 0.2s',
                  cursor: 'pointer',
                  ':hover': {
                    color: '#2f2f44',
                  },
                }}
                onClick={() => handleRemoveCardFromSaved(title)}
              />
            ) : (
              <BookmarkAddedOutlinedIcon
                titleAccess="add to saved"
                sx={{
                  transition: 'color 0.2s',
                  cursor: 'pointer',
                  ':hover': {
                    color: '#2f2f44',
                  },
                }}
                onClick={() => handleSaveClick(recipe)}
              />
            )}

            {isFavourite ? (
              <FavoriteOutlinedIcon
                titleAccess="add to favourites"
                sx={{
                  transition: 'color 0.2s',
                  cursor: 'pointer',
                  ':hover': {
                    color: '#2f2f44',
                  },
                }}
                onClick={() => handleRemoveCardFromFav(title)}
              />
            ) : (
              <FavoriteBorderIcon
                titleAccess="add to favourites"
                sx={{
                  transition: 'color 0.2s',
                  cursor: 'pointer',
                  ':hover': {
                    color: '#2f2f44',
                  },
                }}
                onClick={() => handleFavClick(recipe)}
              />
            )}
          </>
        )}
      </Box>

      <CardMedia
        component={'img'}
        image="https://placehold.co/200"
        alt={title}
        title={title}
        sx={{
          borderRadius: '10px',
          height: '200px',
          mb: 2,
        }}
      />

      <CardContent sx={{ p: 0, pb: 0 }}>
        <Typography mb={2}>Category: {category}</Typography>
      </CardContent>

      <Typography variant={'body1'} color={'primary'} mb={2}>
        {description}
      </Typography>

      <Typography variant={'body1'} color={'primary'} mb={2}>
        Cooking time: {cookingTime}
      </Typography>

      <Typography variant="h6">Ingredients</Typography>

      <List sx={{ py: 1, listStyleType: 'disc' }}>
        {ingredients?.map((ingredient) => (
          <ListItem
            key={ingredient}
            sx={{ p: 0, listStyleType: 'disc', display: 'list-item' }}
          >
            <ListItemText primary={ingredient} />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
