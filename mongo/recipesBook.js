import {Schema, model} from "mongoose";

const recipesBookSchema = new Schema({
  id: Schema.Types.ObjectId,
  idUser: String,
  name: String,
  summary: String,
  recipeList: Array,
});

export default model('RecipesBook', recipesBookSchema, 'recipesBooks');
