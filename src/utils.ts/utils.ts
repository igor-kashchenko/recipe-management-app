import { Category, CookingTime, Recipe } from '../types';

export const parseRecipe = (recipe: Recipe | null) => {
  if (recipe === null) {
    return [];
  }

  const ingredients = Object.values(recipe)
    .slice(4)
    .filter((ingredient) => ingredient !== '');

  return ingredients;
};

export const mockDataFromApi = [
  {
    title: 'Pancakes',
    cookingTime: '30 minutes',
    description: 'Delicious homemade pancakes',
    category: 'Breakfast',
    ingredient1: 'Flour',
    ingredient2: 'Milk',
    ingredient3: 'Eggs',
  },
  {
    title: 'Spaghetti Bolognese',
    cookingTime: '45 minutes',
    description: 'Classic Italian pasta dish',
    category: 'Dinner',
    ingredient1: 'Ground beef',
    ingredient2: 'Tomatoes',
    ingredient3: 'Onion',
  },
  {
    title: 'Chicken Stir-Fry',
    cookingTime: '25 minutes',
    description: 'Quick and flavorful chicken stir-fry',
    category: 'Dinner',
    ingredient1: 'Chicken breast',
    ingredient2: 'Bell peppers',
    ingredient3: 'Soy sauce',
  },
  {
    title: 'Caprese Salad',
    cookingTime: '10 minutes',
    description: 'Refreshing Italian salad',
    category: 'Appetizer',
    ingredient1: 'Tomatoes',
    ingredient2: 'Fresh mozzarella',
    ingredient3: 'Basil leaves',
  },
  {
    title: 'Banana Bread',
    cookingTime: '60 minutes',
    description: 'Moist and delicious banana bread',
    category: 'Dessert',
    ingredient1: 'Ripe bananas',
    ingredient2: 'Flour',
    ingredient3: 'Sugar',
  },
  {
    title: 'Chocolate Chip Cookies',
    cookingTime: '40 minutes',
    description: 'Homemade chocolate chip cookies for dessert.',
    category: 'Dessert',
    ingredient1: 'Butter',
    ingredient2: 'Sugar',
    ingredient3: 'Chocolate chips',
  },
  {
    title: 'Vegetable Curry',
    cookingTime: '50 minutes',
    description: 'Flavorful and spicy vegetable curry.',
    category: 'Dinner',
    ingredient1: 'Potatoes',
    ingredient2: 'Carrots',
    ingredient3: 'Cauliflower',
  },
  {
    title: 'Omelette',
    cookingTime: '15 minutes',
    description: 'Classic omelette with your choice of fillings.',
    category: 'Breakfast',
    ingredient1: 'Eggs',
    ingredient2: 'Cheese',
    ingredient3: 'Vegetables',
  },
];

export const filterRecipes = (
  recipes: Recipe[],
  searchTerm: string
): Recipe[] => {
  const lowercasedSearchTerm = searchTerm.toLowerCase();

  return recipes.filter((recipe) => {
    const ingredients = parseRecipe(recipe);

    return (
      recipe.title.toLowerCase().includes(lowercasedSearchTerm) ||
      ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(lowercasedSearchTerm)
      )
    );
  });
};

export const sortAsc = (a: Recipe, b: Recipe) =>
  parseInt(a.cookingTime) - parseInt(b.cookingTime);
export const sortDesc = (a: Recipe, b: Recipe) =>
  parseInt(b.cookingTime) - parseInt(a.cookingTime);

export const filterRecipe = (
  recipes: Recipe[],
  categoryFilter: Category,
  cookingTimeFilter: CookingTime
) => {
  return recipes
    .filter((recipe) => {
      const isCategoryMatch =
        categoryFilter === 'all' || recipe.category === categoryFilter;
      return isCategoryMatch;
    })
    .sort(cookingTimeFilter === CookingTime.ASC ? sortAsc : sortDesc);
};
