import { admin } from "../../kafka/kafka";
import { Broker } from "../../../types";

export async function getClusterInfo(): Promise<Broker[]> {
  try {
    await admin.connect();
    const info = await admin.describeCluster();
    const brokers: Broker[] = [];
    for (let i = 0; i < info.brokers.length; i++) {
      brokers.push({
        brokerId: info.brokers[i].nodeId,
        brokerPort: info.brokers[i].port,
        brokerHost: info.brokers[i].host,
      });
    }

    await admin.disconnect();
    return brokers;
  } catch (error) {
    console.log(error);
  }
}
