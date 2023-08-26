import "dotenv/config";

import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then((): void => {
    const PORT: number = Number(process.env.PORT) || 3000;

    app.listen(PORT, () => {
      console.log(`Servidor executando ${PORT}`);
    });
  })
  .catch((err: unknown): void => {
    console.log("Error during  data source initialization");
  });
