import RecipesBook from "../mongo/recipesBook.js";
import {logger} from "@oas-tools/commons";
import { Types } from 'mongoose';
import { CircuitBreaker } from "../circuitBreaker/circuitBreaker.js";

export async function findByRecipesBookId(req, res) {

  const idRecipesBook = req.params.id;
  
    CircuitBreaker.getBreaker(RecipesBook).fire("find", {_id: idRecipesBook}).then(result => {

      if (result) {
        res.send(result);

      } else {
        res.sendStatus(404);
      }
      
    }).catch ((err) => {
      res.status(500).send({ error: err.message });
    });
}

export async function updateRecipesBook(req, res) {

    const body = req.body;
    const idRecipesBook = req.params.id;
    
        CircuitBreaker.getBreaker(RecipesBook).fire("findByIdAndUpdate", {_id: idRecipesBook}, body).then(result => {
          if(result) {
            res.sendStatus(201);
          } else {
            res.sendStatus(404);
          }
        }).catch ((err) => {
          res.status(500).send({ error: err.message });
        })
}

export async function deleteRecipesBook(req, res) {
    
  const idRecipesBook = req.params.id;

    try {
      CircuitBreaker.getBreaker(RecipesBook).fire("findByIdAndDelete", {_id: idRecipesBook});
      return res.sendStatus(201);

      } catch (err) {
        res.status(400).send({ error: err.message });
      }
}


export async function getRecipesBook(req, res) {

  CircuitBreaker.getBreaker(RecipesBook).fire("find", {}).then((result) => {
    res.send(result);
    
  }).catch((err) => {
    res.status(500).send({ error: err.message });
  })
}

export async function findByUserId(req, res) {

  const username = req.params.idUser;

  CircuitBreaker.getBreaker(RecipesBook).fire("find", {idUser: username}).then(result => {

    if (result) {
      res.send(result);

    } else {
      res.status(404);
    }

  }).catch ((err) => {
          res.status(501).send({ error: err.message });
  })
}

export async function addRecipesBook(req, res) {

    const newRecipesBook = req.body;

      try {
        CircuitBreaker.getBreaker(RecipesBook).fire("create", newRecipesBook);
        return res.send(newRecipesBook);
      } catch (err) {
        res.status(400).send({ error: err.message });
      }
}
