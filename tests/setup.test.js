import { logger } from "@oas-tools/commons";

logger.configure({ level: "off" });
process.env.NODE_ENV = "test";