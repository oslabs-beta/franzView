import { admin } from "../../kafka/kafka";
import { Cluster, Broker } from "../../../types/types";

/**
 * TODO: Keep admin connection to avoid needing to reconnect multiple times. Disconnect if not needed for extended time.
 *
 */

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

export async function getSingleTopic(name: string) {
  try {
    await admin.connect();
    const topic = await admin
      .fetchTopicMetadata({ topics: [name] })
      .then((topics) => topics.topics[0]);

    return topic;
  } catch (error) {
    console.log(`Kafka Admin Error getting single topic: ${error}`);
  }
}
