import * as service from '../services/recipesBookManager.js';

export function getRecipesBook(req, res) {
    service.getRecipesBook(req, res);
}

export function addRecipesBook(req, res) {
    service.addRecipesBook(req, res);
}

export function findByRecipesBookId(req, res) {
    service.findByRecipesBookId(req, res);
}

export function updateRecipesBook(req, res) {
    service.updateRecipesBook(req, res);
}

export function deleteRecipesBook(req, res) {
    service.deleteRecipesBook(req, res);
}

export function findByUserId(req, res) {
    service.findByUserId(req, res);
}