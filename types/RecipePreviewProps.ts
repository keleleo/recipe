import { Types } from 'mongoose';
import { Recipe } from './Recipe';

export type RecipePreviewProps = Pick<Recipe, 'name' | 'description' | 'url'> & {
  _id: Types.ObjectId;
};