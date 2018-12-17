export interface Recipe {
  title?: string;
  createDt?: any;
  ingredients?: any;
}
export interface RecipeId extends Recipe {
  id: string;
}
