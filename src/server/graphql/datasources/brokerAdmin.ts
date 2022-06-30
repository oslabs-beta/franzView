import { admin } from "../../kafka/kafka";
import { Cluster, Broker } from "../../../types/types";
import { ConfigResourceTypes } from "kafkajs";

/**
 * TODO: Keep admin connection to avoid needing to reconnect multiple times. Disconnect if not needed for extended time.
 *
 */

export async function getClusterInfo(): Promise<Cluster> {
  try {
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

    return cluster;
  } catch (error) {
    console.log(error);
  }
}

export async function getSingleTopic(name: string) {
  try {
    const topic = await admin
      .fetchTopicMetadata({ topics: [name] })
      .then((topics) => topics.topics[0]);

    return topic;
  } catch (error) {
    console.log(`Kafka Admin Error getting single topic: ${error}`);
  }
}

export async function getAllTopics() {
  try {
    const names = await admin.listTopics();
    const topics = await admin.fetchTopicMetadata({ topics: names });

    return topics.topics;
  } catch (error) {
    console.log(`Kafka Admin Error getting single topic: ${error}`);
  }
}

export async function createTopic(
  topic: string,
  replicationFactor: number,
  numPartitions: number
) {
  const topicConfig = {
    topic,
    replicationFactor,
    numPartitions,
  };

  try {
    if (await admin.createTopics({ topics: [topicConfig] })) {
      const topics = await admin.fetchTopicMetadata({ topics: [topic] });
      return topics.topics[0];
    } else {
      throw `Topic ${topic} already exists`;
    }
  } catch (error) {
    console.warn(`Error when creating topic: ${topic}. Error: ${error}`);
  }
}

export async function deleteTopic(topic: string) {
  try {
    const cluster = await admin.describeCluster();
    const canDelete = await admin.describeConfigs({
      includeSynonyms: true,
      resources: [
        {
          type: ConfigResourceTypes.BROKER,
          name: cluster.brokers[0].nodeId.toString(),
          configNames: ["delete.topic.enable"],
        },
      ],
    });

    if (canDelete[0].configValue != "true")
      throw "Delete topic is not enabled on this cluster.";

    const topicToDelete = await getSingleTopic(topic);
    await admin.deleteTopics({ topics: [topic] });
    return topicToDelete;
  } catch (error) {
    console.log(error);
    return error;
  }
}
