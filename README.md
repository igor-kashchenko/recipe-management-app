# Recipe Management Web App

## [DEMO](https://igor-kashchenko.github.io/recipe-management-app/)

This is a recipe management web application built using React, Redux, and TypeScript. The goal of this application is to allow users to store and manage their favorite recipes

## Features
### User Authentication
- Users can sign up, sign in, and sign out.
- Only authenticated users have full access to the recipe management features.
- Unauthenticated users have limited access.

### Recipe Management
Authenticated users have access to the following features:

General Recipe List:

- View a list of recipes to discover new recipes.
- Each recipe displays its title, description, ingredients, instructions, and an optional image.
- Search recipes by title or ingredients.
- Filter recipes by category or cooking time.
- Mark recipes as favorites.

Saved Recipes List:

- View saved recipes, which include favorite recipes and user-added recipes.
- Delete existing recipes in the saved recipes list.
- Search saved recipes by title or ingredients.
- Filter saved recipes by category or cooking time.
- Mark recipes as favorites.
- View favorite recipes separately.

Unauthenticated users have limited access and can only:

- View the general recipe list without the ability to save recipes, mark as favorites.
- Search recipes by title or ingredients.
- Filter recipes by category or cooking time.
- 

## Technical Stack
- React
- Redux
- TypeScript

### Installation
- Clone the repository: `git clone recipe-management-app`
- Install dependencies: `npm install`
- Start the development server: `npm start`
- Open the web app in your browser at http://localhost:3000.
