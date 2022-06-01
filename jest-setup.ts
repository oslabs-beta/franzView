// regenerator runtime will help run async code
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const regeneratorRuntime = "regenerator-runtime";
import server from "./src/server/server";
import { admin } from "./src/server/kafka/kafka";

export default async () => {
  global.testServer = await server;
  global.admin = await admin;
};
