import "dotenv/config";
import { Kafka } from "kafkajs";

const brokers = process.env.KAKFA_BROKER.split(",");
const kafka = new Kafka({
  clientId: "franzView-client",
  brokers,
});

const admin = kafka.admin();
const { CONNECT } = admin.events;

admin.on(CONNECT, () => console.log("Kafka Admin Connected!"));

async function run() {
  return await admin.connect();
}

run();

export { admin };
