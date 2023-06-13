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
  generalRecipes: Recipe[];
}

export enum FormErrors {
  DuplicateUser = 'User with same email or username already exists.',
  InvalidCredentials = 'Invalid password or email.',
}

export type Recipe = {
  title: string,
  description: string,
  image?: string,
} & {
    [K in `ingredient${number}`]: string;
  }
