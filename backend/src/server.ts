import "dotenv/config";

import app from "./app.ts";
import { connectDB } from "./config/db.ts";
import env from "./utils/validateEnv.ts";

const port = env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to connect to the database: ${error.message}`);
    process.exit(1);
  });
