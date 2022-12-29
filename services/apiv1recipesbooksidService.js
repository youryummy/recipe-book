import RecipesBook from "../mongo/recipesBook.js";
import {logger} from "@oas-tools/commons";
import { Types } from 'mongoose';
import _ from "lodash";


export async function findByid(req, res) {

    const _id = req.params.id;

    RecipesBook.findByid(_id).then(result => {
        if(result) {
            res.send(result);
        } else {
            res.status(404).send({message: 'Recipes Book with id ${_id} does not exist'});
        }
    }).catch((err) => {
        logger.error('Error while getting the Recipes Book: ${err.message}');
        res.status(500).send({message: 'Unexpected error ocurred, please try again later'});
    });
}

export function updateRecipesBook(req, res) {

    const _id = req.params.id;
    const body = req.body;

    RecipesBook.update(_id, body).then(result => {
        if(result) {
            res.status(204).send();
        } else {
            res.status(404).send({message: 'Recipes Book with id ${_id} does not exist'});
        }
        res.json(result);
    }).catch((err) => {
        logger.error('Error while deleting the Recipes Book: ${err.message}');
        res.status(500).send({message: 'Unexpectec error ocurred, please try again later'});
    });
}

export function deleteRecipesBook(req, res) {
    
    const _id = req.params.id;

    RecipesBook.delete(_id).then(result => {
        if(result) {
            res.status(204).send();
        } else {
            res.status(404).send({message: 'Recipes Book with id ${_id} does not exist'});
        }
        res.json(result);
    }).catch((err) => {
        logger.error('Error while deleting the Recipes Book: ${err.message}');
        res.status(500).send({message: 'Unexpected error ocurred, please try again later'});
    });
}
