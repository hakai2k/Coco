import app from "./app";
import mongoose from "mongoose";
import env from "./utils/validateEnv";

mongoose
  .connect(env.MONGO_CONN)
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`Server running on ${env.PORT}`);
    });
  })
  .catch(console.error);
