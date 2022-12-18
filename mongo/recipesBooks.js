var express = require('express');
var router = express.Router();

var recipesBooks = [
  {"idRecipeBook": "43fsd", "idUser": "sajs23", "name": "Winter Recipes", "summary": "My winter recipes", "recipeList": ["134dnd", "431ffa"]},
  {"idRecipeBook": "43dada", "idUser": "sajs23", "name": "Winter2 Recipes", "summary": "My winter recipes", "recipeList": ["134dnd", "431ffa"]},
  {"idRecipeBook": "4213123fsd", "idUser": "sajsds23", "name": "Summer Recipes", "summary": "My Summer recipes", "recipeList": ["1ff34dnd", "43ffw1ffa"]},
  {"idRecipeBook": "fhi56856", "idUser": "sajfas23", "name": "Fall Recipes", "summary": "My Summer recipes", "recipeList": ["1ff34dnd", "43ffw1ffa"]},
]

/*Para prueba con accounts
var accounts = [
  {"username": "deyan", "recipesBooks": ["43fsd", "4213123fsd"]},
  {"username": "aniita", "recipesBooks": ["fhi"]},
]
*()

/* GET recipesBooks listing. */
router.get('/', function(req, res, next) {
  res.send(recipesBooks);
});

/* GET recipesBooks/idUser listing. */
router.get('/:idUser', function(req, res, next) {
  var idUser = req.params.idUser;
  var result = recipesBooks.filter(r => r.idUser === idUser)
  
  if(result){
    res.send(result);
  } else {
    res.sendStatus(404);
  }
});

/* GET recipesBooks/idRecipeBook listing. */
router.get('/recipeBook/:idRecipeBook', function(req, res, next) {
  var idRecipeBook = req.params.idRecipeBook;
  var result = recipesBooks.find(r => {
    return r.idRecipeBook === idRecipeBook;
  })
  
  if(result){
    res.send(result);
  } else {
    res.sendStatus(404);
  }
});

/* POST recipesbooks */
router.post('/', function(req, res, next) {
  var updatedRecipesBook = req.body;
  var indexRecipeBook = recipesBooks.findIndex(r => r.idRecipeBook === updatedRecipesBook.idRecipeBook);
  recipesBooks[indexRecipeBook] = updatedRecipesBook;
  
  res.sendStatus(200);
});

/* PUT recipesBooks/idRecipeBook listing. */
router.put('/:idRecipeBook', function(req, res, next) {
  var recipesBook = req.body;
  recipesBooks.push(recipesBook);

  res.sendStatus(200);
});

/* DELETE recipesBooks/idRecipeBook listing. */
router.delete('/:idRecipeBook', function(req, res, next) {
  var idRecipeBook = req.params.idRecipeBook;
  var indexRecipeBook = recipesBooks.findIndex(r => r.idRecipeBook === idRecipeBook);
  
  //test
  recipesBooks.splice(indexRecipeBook, 1); 
  res.sendStatus(200);
});
 

module.exports = router;
