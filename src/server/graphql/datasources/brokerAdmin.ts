import { admin } from "../../kafka/kafka";
import { Cluster, Broker } from "../../../types/types";

export async function getClusterInfo(): Promise<Cluster> {
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

    const cluster: Cluster = {
      brokers,
      activeController: brokers.filter(
        (broker) => broker.brokerId === info.controller
      )[0],
    };

    await admin.disconnect();
    return cluster;
  } catch (error) {
    console.log(error);
  }
}
