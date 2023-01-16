import http from "http";
import express from "express";
import { initialize, use } from "@oas-tools/core";
import { OASSwagger } from "./middleware/oas-swagger.js";
import { logger } from "@oas-tools/commons";

const deploy = async (env) => {
    const serverPort = process.env.PORT ?? 8080;
    const app = express();

    app.use(express.json());
    
    // Feature toggles
    let config = {}
    if (env === "production") {
        config.middleware = { 
            validator: { requestValidation: false, responseValidation: false } // Done in gateway
        }
    } else if (env === "test") {
        logger.level = "off";
    }


    // Initialize OAS Tools
    use(OASSwagger, {path: "/docs"});
    initialize(app, config).then(() => {
        http.createServer(app).listen(serverPort, () => {
        console.log("\nApp running at http://localhost:" + serverPort);
        console.log("________________________________________________________________");
        if (config?.middleware?.swagger?.disable !== false) {
            console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
            console.log("________________________________________________________________");
        }
        });
    });
}

const undeploy = () => {
  process.exit();
};

export default {deploy, undeploy}