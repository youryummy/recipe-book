import RecipesBook from "../mongo/recipesBook.js";
import {logger} from "@oas-tools/commons";
import { Types } from 'mongoose';
import _ from "lodash";


export async function findByRecipesBookId(req, res) {

    const _id = req.params.id;

    try {
        const recipesBook = await RecipesBook.findOne({_id: _id});

        //FALTA QUE SE AÑADA LA INFORMACIÓN PARA CADA RECETA

        res.send(recipesBook);
      } catch (e) {
        res.status(400).send({ error: e.message });
      }

}

export async function updateRecipesBook(req, res) {

    const { name, summary, idUser, recipeList } = req.body;

    const _id = req.params.id;

    try {
    
        var existingRecipesBook = await RecipesBook.findOne({_id: _id});
    
        if (existingRecipesBook != null) {
            existingRecipesBook.name = name;
            existingRecipesBook.summary = summary;
            existingRecipesBook.idUser = idUser;
            existingRecipesBook.recipeList = recipeList;
          await existingRecipesBook.save();
          return res.sendStatus(204);
        } else {
          res.sendStatus(404);
        }
      } catch (e) {
        res.status(400).send({ error: e.message });
      }

}

export async function deleteRecipesBook(req, res) {
    
    const _id = req.params.id;

    try {
        await RecipesBook.deleteOne({ _id: _id });
        res.sendStatus(204);
      } catch (e) {
        res.status(400).send({ error: e.message });
      }
}


export async function getRecipesBook(req, res) {

    try {
        const recipesBooks = await RecipesBook.find({});
        res.send(recipesBooks);
      } catch (e) {
        res.status(400).send({ error: e.message });
      }
}

export async function findByUserId(req, res) {
    const idUser = req.params.idUser;

    try {
        const results = await RecipesBook.find({idUser: idUser});
    
        res.send(results);
      } catch (e) {
        if (e.errors) {
          res.status(400).send({ error: e.message });
        } else {
          res.sendStatus(501);
        }
      }
}

export async function addRecipesBook(req, res) {

    const { name, summary, idUser, recipeList } = req.body;

    const newRecipesBook = new RecipesBook({
        name,
        summary,
        recipeList,
        idUser,
      });

      try {
        await newRecipesBook.save();
        return res.sendStatus(201);
      } catch (e) {
        res.status(400).send({ error: e.message });
      }
}
