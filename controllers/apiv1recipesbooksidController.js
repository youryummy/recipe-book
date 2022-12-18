import * as service from '../services/apiv1recipesbooksidService.js';

export function findByid(req, res) {
    service.findByid(req, res);
}

export function updateRecipesBook(req, res) {
    service.updateRecipesBook(req, res);
}

export function deleteRecipesBook(req, res) {
    service.deleteRecipesBook(req, res);
}
