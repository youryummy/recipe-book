import * as service from '../services/apiv1recipesbooksService.js';

export function getRecipesBook(req, res) {
    service.getRecipesBook(req, res);
}

export function addRecipesBook(req, res) {
    service.addRecipesBook(req, res);
}
