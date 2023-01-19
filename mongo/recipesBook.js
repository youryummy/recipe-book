import {Schema, model} from "mongoose";

const recipesBookSchema = new Schema({
  idUser: String,
  name: String,
  summary: String,
  recipeList: Array,
}, { versionKey: false });



export default model('RecipesBook', recipesBookSchema, 'recipesBook');
