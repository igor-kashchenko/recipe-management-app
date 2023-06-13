export type User = {
  userName: string;
  email: string;
  password: string;
}

export type usersInitialState = {
  currentUser: User | null;
  users: User[];
  error: FormErrors | null;
}

export type recipesInitialState = {
  status: Status;
  recipes: Recipe[];
  error: string | undefined;
  filteredRecipes: Recipe[];
  savedRecipes: Recipe[];
  favRecipes: Recipe[]
}

export enum FormErrors {
  DuplicateUser = 'User with same email or username already exists.',
  InvalidCredentials = 'Invalid password or email.',
}

export type Recipe = {
  title: string,
  cookingTime: string,
  description: string,
  category: string,
  image?: string,
} & {
    [K in `ingredient${number}`]: string;
  }

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export enum CookingTime {
  ALL = 'all',
  ASC = 'asc',
  DESC = 'desc',
}

export enum Category {
  ALL = 'all',
  DESSERT = 'Dessert',
  DINNER = 'Dinner',
  BREAKFAST = 'Breakfast',
}
