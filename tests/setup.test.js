import { logger } from "@oas-tools/commons";
import RecipesBook from "../mongo/recipesBook.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import server from '../server.js';

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

else if (process.argv.includes("tests/components")) {
    dotenv.config({ path: ".env.test" }); // load test env variables

    const mongoPort = process.env.MONGO_PORT ?? 27017;
const mongoHost = process.env.MONGO_HOST ?? 'localhost';
const mongoDBName = process.env.MONGO_DBNAME ?? 'default-db';
const mongoProto = process.env.MONGO_PROTO ?? 'mongodb';
const mongoUser = process.env.MONGO_USER;
const mongoPwd = process.env.MONGO_PWD;
    
    
const mongoURL = `${mongoProto}://` +
`${mongoUser ? mongoUser + ":" : ""}` +
`${mongoPwd ? mongoPwd + "@" : ""}` +
`${mongoHost}${mongoProto == "mongodb+srv" ? "" : ":" + mongoPort}` +
`/${mongoDBName}`;
    console.log("mongoURL: ", mongoURL); 

    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoURL).then(async () => {

        
        // populate test db
        await RecipesBook.insertMany([
            {name: "test1", summary: "test1", recipeList: "test1", idUser: "test1"},
            {name: "test2", summary: "test2", recipeList: "test2", idUser: "test2"},
            {name: "test3", summary: "test3", recipeList: "test3", idUser: "test3"},
            {name: "test4", summary: "test4", recipeList: "test4", idUser: "test4"},
            {name: "test5", summary: "test5", recipeList: "test5", idUser: "test5"}
        ]);


        // Cleans db after tests
        const oldExit = process.exit;
        process.exit = async (code) => {
            await mongoose.connection.db.dropCollection("recipesBook");                                                         
            await mongoose.disconnect();
            oldExit(code);
        };

        // Starts server
        await server.deploy(process.env.NODE_ENV).catch(err => { console.log(err); });
        
    }).catch((err) => {
        console.log("Failed to connect to test db: ", err.message);
        process.exit(1);
    });
}