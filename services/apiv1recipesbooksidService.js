import RecipesBook from "../mongo/recipesBook.js";
import {Types} from 'mongoose';
import {logger} from "@oas-tools/commons";
import _ from "lodash";

export function findByid(req, res) {

    const id = req.params.id;

    RecipesBook.findByid(id).then(result => {
        if(result) {
            res.send(result);
        } else {
            res.status(404).send({message: 'Recipes Book with id ${id} does not exist'});
        }
    }).catch((err) => {
        logger.error('Error while getting Recipes Book: ${err.message}');
        res.status(500).send({message: 'Unexpected error ocurred, please try again later'});
    });
}

export function updateRecipesBook(req, res) {
    res.send({
        message: 'This is the mockup controller for updateRecipesBook'
    });
}

export function deleteRecipesBook(req, res) {
    res.send({
        message: 'This is the mockup controller for deleteRecipesBook'
    });
}
