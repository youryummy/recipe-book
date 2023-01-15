import { logger } from "@oas-tools/commons";
import RecipesBook from "../mongo/recipesBook.js";
import mongoose from "mongoose";

logger.configure({ level: "off" });
process.env.NODE_ENV = "test";

if (process.argv.includes("tests/integration")) {

    mongoose.set('strictQuery', false);

     await mongoose.connect("mongodb://localhost:27017/test", {connectTimeoutMS: 3000, serverSelectionTimeoutMS: 3000 }).then(async () => {
     
        await RecipesBook.insertMany([
            {name: "test1", summary: "test1", recipeList: "test1", idUser: "test1"},
            {name: "test2", summary: "test2", recipeList: "test2", idUser: "test2"},
            {name: "test3", summary: "test3", recipeList: "test3", idUser: "test3"},
            {name: "test4", summary: "test4", recipeList: "test4", idUser: "test4"},
            {name: "test5", summary: "test5", recipeList: "test5", idUser: "test5"}
        ]);

        const oldExit = process.exit;
        process.exit = async (code) => {
            await mongoose.connection.db.dropCollection("recipesBook");                                                         
            await mongoose.disconnect();
            oldExit(code);
        };

    }).catch((err) => {
        console.log("Failed to connect to test db: ", err.message);
        process.exit(1);
    }); 
}