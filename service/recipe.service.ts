import { RecipeModel } from '@/models/recipe.model';
import { Recipe, RecipeModelDTO, RecipeModelType } from '@/types/Recipe';
import { search } from '@/types/search';
import getConnection from '@/utils/db';
import { Pagination } from '../models/pagination';

const ITEMS_PER_PAGE = 20;
const SITE_RECIPE_BASE_URL = process.env.SITE_RECIPE_BASE_URL || '';
export class RecipeService {

  constructor() {
    getConnection();
  }

  async getByUrl(url: string): Promise<Recipe | null> {
    return await RecipeModel
      .findOne({ url: url },
        'name description url details ingredients steps').exec()
  }

  async getByRecipe(recipe: Recipe): Promise<RecipeModelDTO[]> {
    return await RecipeModel.find({
      _id: { $ne: recipe._id },
      $or: [
        { name: { $in: [recipe.name.toString()] } },
        { ingredients: { $in: recipe.ingredients } }
      ]
    }, 'name description url details ingredients steps')
      .limit(4)
      .transform(RecipeDTOTransform).exec()
  }

  async getSearchNumberOfPage(search: string, itemsPerPage: number): Promise<number> {
    const count = await RecipeModel
      .find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { ingredients: { $elemMatch: { $regex: search, $options: 'i' } } },
          { steps: { $elemMatch: { $regex: search, $options: 'i' } } }
        ]
      }, '_id name description url').count().exec()
    return Math.ceil(count / itemsPerPage);
  }

  async searchPage({ search = '', page = 1 }: search): Promise<RecipeModelDTO[]> {
    const recipes = await RecipeModel
      .find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { ingredients: { $elemMatch: { $regex: search, $options: 'i' } } },
          { steps: { $elemMatch: { $regex: search, $options: 'i' } } }
        ]
      }, '_id name description url')
      .skip(Math.max(0, page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .transform(RecipeDTOTransform).exec();
    return recipes
  }

  async search({ search = '', page = 1 }: search): Promise<Pagination<RecipeModelDTO>> {
    const numberOfPages = await this.getSearchNumberOfPage(search, ITEMS_PER_PAGE);
    const data = await this.searchPage({ search, page });
    return {
      numberOfPages,
      data: data
    } as Pagination<RecipeModelDTO>
  }

  async insert(recipe: Recipe): Promise<RecipeModelType> {
    // const temp = new RecipeModel(recipe);
    // temp.save();
    // return temp;
    throw new Error('Method not implemented')
  }

  async getAllUrl(index: number, itemsPerPage: number): Promise<string[]> {
    return (await RecipeModel.find({}, { url: 1 })
      .skip(Math.max(0, index - 1) * itemsPerPage)
      .limit(itemsPerPage))
      .map(m => SITE_RECIPE_BASE_URL + m.url);
  }
}

function RecipeDTOTransform(recipes: RecipeModelType[]) {
  return recipes.map(recipe => {
    return {
      _id: recipe._id,
      name: recipe.name,
      description: recipe.description,
      url: recipe.url,
    } as RecipeModelDTO
  })
}