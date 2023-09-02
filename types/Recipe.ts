import { Document, Types } from 'mongoose';

export type Recipe = {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  url: string;
  details: Details;
  ingredients: Ingredient;
  steps: Step;
}

export type Details = {
  time: string;
  peopleServed: string;
  dificult: String;
}
export type Ingredient = string[];

export type Step = string[];



/**
 * Type for mongoose model
 */
export type RecipeModelType = Recipe & Document<Types.ObjectId,any, Recipe>;
export type RecipeModelDTO = Pick<RecipeModelType, '_id' | 'name' | 'description' | 'url'>;