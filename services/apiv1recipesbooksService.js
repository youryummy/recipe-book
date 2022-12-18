import RecipesBook from "../mongo/recipesBook.js";
import {Types} from 'mongoose';
import {logger} from "@oas-tools/commons";
import _ from 'lodash';

export function getRecipesBook(req, res) {
    
    const id = req.params.id;

    RecipesBook.find(result => {
        if(result) {
            res.send(result);
        } else {
            res.status(404).send({message: 'Recipes Books does not exist'});
        }
    }).catch((err) => {
        logger.error('Error while getting the Recipes Book: ${err.message}');
        res.status(500).send({message: 'Unexpected error ocurred, please try again later'});
    });
}

export function getByidUser(req, res) {
    
    const idUser = req.params.idUser;

    RecipesBook.findByidUser(idUser).then(result => {
        if(result) {
            res.send(result);
        } else {
            res.status(404).send({message: 'Recipes Book for User ${idUser} does not exist'});
        }
    }).catch((err) => {
        logger.error('Error while getting the Recipes Book: ${err.message}');
        res.status(500).send({message: 'Unexpected error ocurred, please try again later'});
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
