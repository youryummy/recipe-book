import RecipesBook from "../mongo/recipesBook.js";
import {logger} from "@oas-tools/commons";
import { Types } from 'mongoose';
import { CircuitBreaker } from "../circuitBreaker/circuitBreaker.js";


export async function findByRecipesBookId(req, res) {

  const idRecipesBook = req.params._id;
  
    CircuitBreaker.getBreaker(RecipesBook).fire("findById", {_id: idRecipesBook}).then(result => {

      if (result) {
        res.send(result);

      } else {
        res.sendStatus(404);
      }
    }).catch ((e) => {
      res.sendStatus(500);
    });
}

export async function updateRecipesBook(req, res) {

    const body = req.body;
    const idRecipesBook = req.params._id;
    
        CircuitBreaker.getBreaker(RecipesBook).fire("findByIdAndUpdate", {_id: idRecipesBook}, body).then(result => {
          if(result) {
            res.sendStatus(201);
          } else {
            res.sendStatus(404);
          }
        }).catch ((e) => {
          res.sendStatus(500);
        })
}

export async function deleteRecipesBook(req, res) {
    
  const idRecipesBook = req.params._id;

    try {
      CircuitBreaker.getBreaker(RecipesBook).fire("delete", {_id: idRecipesBook});
      return res.sendStatus(201);

      } catch (e) {
        res.status(400).send({ error: e.message });
      }
}


export async function getRecipesBook(req, res) {

  CircuitBreaker.getBreaker(RecipesBook).fire("find", {}).then((results) => {
    res.send(results);
    
  }).catch((err) => {
    res.sendStatus(500);
  })
}

export async function findByUserId(req, res) {

    const username = req.params.idUser;

      try {
        CircuitBreaker.getBreaker(RecipesBook).fire("find", {idUser: username}).then(result => {

          if (result) {
            res.send(result);

          } else {
            res.status(404);
          }
        })

      } catch (e) {
          res.sendStatus(501);
        }
}

export async function addRecipesBook(req, res) {

    const newRecipesBook = req.body;

      try {
        CircuitBreaker.getBreaker(RecipesBook).fire("create", newRecipesBook);
        return res.sendStatus(newRecipesBook);
      } catch (e) {
        res.status(400).send({ error: e.message });
      }
}
