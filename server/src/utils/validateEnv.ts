import { cleanEnv, port, str } from "envalid";
import "dotenv/config";

export default cleanEnv(process.env, {
  PORT: port(),
  MONGO_CONN: str(),
  JWT_SECRET: str(),
  NODE_ENV: str(),
});
