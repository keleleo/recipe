import { RecipeModel } from '@/models/recipe.model';
import { Recipe, RecipeModelDTO, RecipeModelType } from '@/types/Recipe';
import { search } from '@/types/search';
import getConnection from '@/utils/db';
import { Pagination } from '../models/pagination';

const ITEMS_PER_PAGE = 20;

export class RecipeService {

  constructor() {
    getConnection();
  }

  async getByUrl(url: string): Promise<Recipe | null> {
    return await RecipeModel
      .findOne({ url: url },
        'name description url details ingredients steps').exec()
  }

  async getSearchNumberOfPage(search: string): Promise<number> {
    const count = await RecipeModel
    .find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { ingredients: { $elemMatch: { $regex: search, $options: 'i' } } },
        { steps: { $elemMatch: { $regex: search, $options: 'i' } } }
      ]
    }, '_id name description url').count().exec()
    return Math.ceil(count/ITEMS_PER_PAGE);
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
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .transform(RecipeDTOTransform).exec();
    return recipes
  }

  async search({ search = '', page = 1 }: search): Promise<Pagination<RecipeModelDTO>> {
    const numberOfPages = await this.getSearchNumberOfPage(search);
    const data = await this.searchPage({ search, page });
    return {
      numberOfPages,
      data:data
    } as Pagination<RecipeModelDTO>
  }

  async insert(recipe: Recipe): Promise<RecipeModelType> {
    // const temp = new RecipeModel(recipe);
    // temp.save();
    // return temp;
    throw new Error('Method not implemented')
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