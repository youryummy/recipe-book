import RecipesBook from "../mongo/recipesBook.js";
import {Types} from 'mongoose';
import {logger} from "@oas-tools/commons";
import _ from 'lodash';

export function getRecipesBook(req, res) {
    res.send({
        message: 'This is the mockup controller for getRecipesBook'
    });
}

export function addRecipesBook(req, res) {
    
    const body = req.body;
    body.id = new Types.ObjectId();

    RecipesBook.create(body).then(() => {
        res.status(201).send();
    }).catch((err) => {
        logger.error('Error while creating Recipes Book: ${err.message}');
        res.status(500).send({message: 'Unexpected error ocurred, please try again later'});
    });
}
