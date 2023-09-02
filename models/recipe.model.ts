import { Details, Recipe } from '@/types/Recipe';
import { Model, Schema, model, models } from 'mongoose';

const detailsSchema = new Schema<Details>({
  time: { type: String, required: true },
  peopleServed: { type: String, required: true },
  dificult: { type: String, required: true }
})


const recipeSchema = new Schema<Recipe>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  details: { type: detailsSchema, required: true, _id: false },
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
})

const RecipeModel = models.Recipe as Model<Recipe>|| model<Recipe>("Recipe", recipeSchema);

export { recipeSchema, RecipeModel }