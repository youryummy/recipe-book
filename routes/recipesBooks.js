var express = require('express');
var router = express.Router();

var recipesBooks = [
  {"id": "43fsd", "name": "Winter Recipes", "summary": "My winter recipes", "recipeList": ["134dnd", "431ffa"]},
  {"id": "4213123fsd", "name": "Summer Recipes", "summary": "My Summer recipes", "recipeList": ["1ff34dnd", "43ffw1ffa"]},
  {"id": "fhi", "name": "Fall Recipes", "summary": "My Summer recipes", "recipeList": ["1ff34dnd", "43ffw1ffa"]},

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

/* GET recipesBooks/userId listing. */
router.get('/:username', async function(req, res, next) {
  var username = req.params.username;
  var recipesBooksIdList = await accounts.getRecipesBooksByAccount(username);
  /*Para prueba con accounts
    var result = recipesBooks.filter(recipeBook => accounts.find(a => a.username === username).recipesBooks.includes(recipeBook.id));
  */
  if(result){
    res.send(result);
  } else {
    res.sendStatus(404);
  }
});

/* POST recipesbooks */
router.post('/', function(req, res, next) {
  var recipesBook = req.body;
  recipesBooks.push(recipesBook);
  res.sendStatus(201);
});



module.exports = router;
