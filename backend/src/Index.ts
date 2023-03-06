// ENV variable
require("dotenv").config();
import path from "path";

// Import Logger
import Logger from "./database/logger";

import express from "express";
import cors from "cors";

async function main() {
  const app = express();
  const port = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static("public"))

  app.listen(port, async () => {
    Logger.info(`🚀 Projeto rodando no endereço: http://127.0.0.1:${port}`);

    // mongoDB.createConection();
  });
}

main().catch((error) => {
  Logger.error("🥵 Erro!");
  Logger.error(error);
});
