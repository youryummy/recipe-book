import RecipesBook from "../mongo/recipesBook.js";
import {logger} from "@oas-tools/commons";
import { Types } from 'mongoose';
import { CircuitBreaker } from "../circuitBreaker/circuitBreaker.js";

export async function findByRecipesBookId(req, res) {

  const { page = 1, limit = 100, search } = _req.query;

    try {

        let result;
        let count;
        
        if (search !== undefined) {
            result = await RecipesBook.find({_id: {$regex: search, $options: "i"}}).limit(Number(limit)).skip((page - 1) * limit).exec()
            count = await RecipesBook.countDocuments({nombre: {$regex: search, $options: "i"}});
        } else {
            result = await RecipesBook.find().cache(10).limit(Number(limit)).skip((page - 1) * limit).exec();
            count = await RecipesBook.count().cache(10)
        }

        res.send({
            currentPage: parseInt(page, 10),
            totalPages: Math.ceil(count / limit),
            pageLimit: parseInt(limit, 10),
            result
        })

    } catch(err) {
        logger.error(`Error while getting all recipes books: ${err.message}`);
        res.status(500).send({ message: "Unexpected error ocurred, please try again later" });
    }
}

export async function updateRecipesBook(req, res) {

  const body = req.body;
  const idRecipesBook = req.params.id;

  CircuitBreaker.getBreaker(RecipesBook)
    .fire("findByIdAndUpdate", { _id: idRecipesBook }, body)
    .then((result) => {
      if (result) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
}

export async function deleteRecipesBook(req, res) {
    
  const idRecipesBook = req.params.id;

  try {
    CircuitBreaker.getBreaker(RecipesBook).fire("findByIdAndDelete", {
      _id: idRecipesBook,
    });
    return res.sendStatus(204);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}


export async function getRecipesBook(req, res) {

  CircuitBreaker.getBreaker(RecipesBook)
    .fire("find", {})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
}

export async function findByUserId(req, res) {

  const { page = 1, limit = 100, search } = _req.query;

    try {

        let result;
        let count;
        
        if (search !== undefined) {
            result = await RecipesBook.find({idUser: {$regex: search, $options: "i"}}).limit(Number(limit)).skip((page - 1) * limit).exec()
            count = await RecipesBook.countDocuments({nombre: {$regex: search, $options: "i"}});
        } else {
            result = await RecipesBook.find().cache(10).limit(Number(limit)).skip((page - 1) * limit).exec();
            count = await RecipesBook.count().cache(10)
        }

        res.send({
            currentPage: parseInt(page, 10),
            totalPages: Math.ceil(count / limit),
            pageLimit: parseInt(limit, 10),
            result
        })

    } catch(err) {
        logger.error(`Error while getting all recipes books: ${err.message}`);
        res.status(500).send({ message: "Unexpected error ocurred, please try again later" });
    }

}

export async function addRecipesBook(req, res) {

  const newRecipesBook = req.body;

  CircuitBreaker.getBreaker(RecipesBook).fire("create", newRecipesBook).then((result) => {
      if (result) {
        return res.send(newRecipesBook);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
}
