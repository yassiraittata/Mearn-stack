import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  PORT: port({ default: 8080 }),
  MONGO_URI: str(),
});
