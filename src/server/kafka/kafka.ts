import "dotenv/config";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.KAKFA_BROKER],
});

const admin = kafka.admin();
const { CONNECT } = admin.events;
admin.on(CONNECT, () =>
  console.log(`Kafka Admin Connected to ${process.env.KAKFA_BROKER}!`)
);

async function run() {
  return await admin.connect();
}

run();

export { admin };
