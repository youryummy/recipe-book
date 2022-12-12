const mongoose = require ("mongose");
const schema = mongoose.schema;

const recipesBooksSchema = new schema({
    idRecipesBook: {
        type: String,
        required: [true, "Id of Recipe Book is required"],
        minLength: 1,
        maxLength: 6,
    },
    idUser: {
        type: String,
        required: [true, "Id of User is required"],
        minLength: 1,
        maxLength: 6,
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: 1,
        maxLength: 30,
    },
    summary: {
        type: String,
        required: false,
        minLength: 0,
        maxLength: 150,
    },
    recipesList: {
        type: Array,
        required: [true, "Recipes are required"],
    }
})

recipesBooksSchema.methods.cleanup = function(){
    return {
        idRecipesBook: this.idRecipesBook,
        idUser: this.idUser,
        name: this.name,
        summary: this.summary,
        recipesList: this.recipesList,
    }
}

const recipesBooks = mongoose.model('RecipesBooks', recipesBooksSchema);

module.export = recipesBooks;
