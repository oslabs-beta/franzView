import * as brokerData from "./datasources/brokerAdmin";
import {
  Broker,
  BrokerCpuUsage,
  UnderReplicatedPartitions,
  Cluster,
  Count,
  JVMMemoryUsage,
} from "../../types/types";
import { Topic } from "@mui/icons-material";

/**
 * TODO: Throw graphql errors from catch statements.
 * TODO: Refactor prometheusAPI to take brokerId to avoid fetching all data and then needing to filter
 */

const resolvers = {
  Broker: {
    bytesInPerSecondOverTime: async (
      parent,
      args,
      { dataSources }
    ): Promise<BrokerCpuUsage> => {
      try {
        const brokerBytesInPerSecond =
          await dataSources.prometheusAPI.getBytesInPerSec(
            parent.start,
            parent.end,
            parent.step,
            [parent.brokerId]
          );

        return brokerBytesInPerSecond;
      } catch (error) {
        console.log(
          `An error occured with Query Broker Bytes In Per Second Over Time: ${error}`
        );
      }
    },

    bytesOutPerSecondOverTime: async (
      parent,
      args,
      { dataSources }
    ): Promise<BrokerCpuUsage> => {
      try {
        const brokerBytesOutPerSecond =
          await dataSources.prometheusAPI.getBytesOutPerSec(
            parent.start,
            parent.end,
            parent.step,
            [parent.brokerId]
          );

        return brokerBytesOutPerSecond;
      } catch (error) {
        console.log(
          `An error occured with Query Broker Bytes In Per Second Over Time: ${error}`
        );
      }
    },

    cpuUsage: async (
      parent,
      args,
      { dataSources }
    ): Promise<BrokerCpuUsage> => {
      try {
        const brokerCpu = await dataSources.prometheusAPI.getBrokerCpuUsage();
        const singleBrokerCpu = brokerCpu.filter(
          (elem) => elem.brokerId === parent.brokerId
        )[0];

        return singleBrokerCpu;
      } catch (error) {
        console.log(`An error occured with Query Broker CPU Usage: ${error}`);
      }
    },

    cpuUsageOverTime: async (
      parent,
      args,
      { dataSources }
    ): Promise<BrokerCpuUsage> => {
      try {
        const brokerCpu =
          await dataSources.prometheusAPI.getBrokerCpuUsageOverTime(
            parent.start,
            parent.end,
            parent.step
          );
        const singleBrokerCpu = brokerCpu.filter(
          (elem) => elem.brokerId === parent.brokerId
        )[0];
        return singleBrokerCpu.values;
      } catch (error) {
        console.log(
          `An error occured with Query Broker CPU Usage Over Time: ${error}`
        );
      }
    },

    JVMMemoryUsageOverTime: async (
      parent,
      args,
      { dataSources }
    ): Promise<BrokerCpuUsage> => {
      try {
        const totalBrokerJVMMemoryUsage =
          await dataSources.prometheusAPI.getJVMMemoryUsageOverTime(
            parent.start,
            parent.end,
            parent.step
          );
        const brokerJVMMemoryUsage = totalBrokerJVMMemoryUsage.filter(
          (elem) => elem.brokerId === parent.brokerId
        )[0];
        return brokerJVMMemoryUsage.values;
      } catch (error) {
        console.log(
          `An error occured with Query Broker Disk Usage Over Time: ${error}`
        );
      }
    },

    JVMMemoryUsage: async (
      parent,
      args,
      { dataSources }
    ): Promise<JVMMemoryUsage> => {
      try {
        const totalBrokerJVMMemoryUsage =
          await dataSources.prometheusAPI.getJVMMemoryUsage();
        const brokerJVMMemoryUsage = totalBrokerJVMMemoryUsage.filter(
          (elem) => elem.brokerId === parent.brokerId
        )[0];
        return brokerJVMMemoryUsage;
      } catch (error) {
        console.log(
          `An error has occured with Query Broker Disk Usage: ${error}`
        );
      }
    },

    numberUnderReplicatedPartitions: async (
      parent,
      args,
      { dataSources }
    ): Promise<UnderReplicatedPartitions> => {
      try {
        const totalUnderReplicatedPartitions =
          await dataSources.prometheusAPI.getUnderReplicatedPartitions();
        const brokerUnderReplicatedPartitions =
          totalUnderReplicatedPartitions.filter(
            (elem) => elem.brokerId === parent.brokerId
          )[0];

        return brokerUnderReplicatedPartitions;
      } catch (error) {
        console.log(
          `An error occured with Query Broker numberUnderReplicatedPartitions: ${error}`
        );
      }
    },

    produceTotalTimeMs: async (
      parent,
      args,
      { dataSources }
    ): Promise<Count> => {
      try {
        const totalProduceTimeMS =
          await dataSources.prometheusAPI.getMedianTotalTimeMs("Produce");
        const produceTotalTimeMs = totalProduceTimeMS.filter(
          (elem) => elem.brokerId === parent.brokerId
        )[0];
        return produceTotalTimeMs;
      } catch (error) {
        console.log(
          `An error has occured with Query Produce Total Time MS: ${error}`
        );
      }
    },

    consumerTotalTimeMs: async (
      parent,
      args,
      { dataSources }
    ): Promise<Count> => {
      try {
        const totalConsumerTotalTimeMs =
          await dataSources.prometheusAPI.getMedianTotalTimeMs("FetchConsumer");
        const consumerTotalTimeMs = totalConsumerTotalTimeMs.filter(
          (elem) => elem.brokerId === parent.brokerId
        )[0];
        return consumerTotalTimeMs;
      } catch (error) {
        console.log(
          `An error has occured with Query Consumer Total Time MS: ${error}`
        );
      }
    },

    followerTotalTimeMs: async (
      parent,
      args,
      { dataSources }
    ): Promise<Count> => {
      try {
        const totalFollowerTotalTimeMs =
          await dataSources.prometheusAPI.getMedianTotalTimeMs("FetchFollower");
        const followerTotalTimeMs = totalFollowerTotalTimeMs.filter(
          (elem) => elem.brokerId === parent.brokerId
        )[0];
        return followerTotalTimeMs;
      } catch (error) {
        console.log(
          `An error has occured with Query Follower Total Time MS: ${error}`
        );
      }
    },
  },

  Cluster: {
    activeControllerCount: async (
      parent,
      args,
      { dataSources }
    ): Promise<Count> => {
      const metric = await dataSources.prometheusAPI.getActiveControllerCount();
      const activeControllerCount: Count = {
        count: metric.reduce(
          (prev, curr) => (prev += curr.activeControllerCount),
          0
        ),
        time: metric[0].time,
      };

      return activeControllerCount;
    },

    offlinePartitionCount: async (
      parent,
      args,
      { dataSources }
    ): Promise<Count> => {
      const metric = await dataSources.prometheusAPI.getOfflinePartitionCount();
      const offlinePartitionCount: Count = {
        count: metric.reduce(
          (prev, curr) => (prev += curr.offlinePartitionCount),
          0
        ),
        time: metric[0].time,
      };
      return offlinePartitionCount;
    },

    underMinIsr: async (parent, args, { dataSources }): Promise<Count> => {
      const metric = await dataSources.prometheusAPI.getUnderMinIsr();
      console.log(metric);
      const underMinIsr: Count = {
        metric: metric.reduce((prev, curr) => (prev += curr.underMinIsr), 0),
        time: metric[0].time,
      };
      return underMinIsr;
    },

    numberUnderReplicatedPartitions: async (
      parent,
      args,
      { dataSources }
    ): Promise<Count> => {
      const metric =
        await dataSources.prometheusAPI.getTotalUnderReplicatedPartitions();

      return metric[0];
    },
  },

  Topic: {
    numPartitions: (parent): number => {
      return parent.partitions.length;
    },

    totalReplicas: async (
      { name, partitions },
      args,
      { dataSources }
    ): Promise<number> => {
      const metric = await dataSources.prometheusAPI.getTotalReplicas(name);
      if (metric.length === 0) {
        return partitions.reduce(
          (prev, current) => prev + current.replicas.length,
          0
        );
      }
      return metric[0].totalReplicas;
    },

    totalIsrs: async (
      { name, partitions },
      args,
      { dataSources }
    ): Promise<number> => {
      const metric = await dataSources.prometheusAPI.getTotalIsrs(name);
      if (metric.length === 0) {
        return partitions.reduce(
          (prev, current) => prev + current.isr.length,
          0
        );
      }
      return metric[0].totalIsrs;
    },

    brokersWithReplicas: async (
      { name },
      args,
      { dataSources }
    ): Promise<number[]> => {
      const metric = await dataSources.prometheusAPI.getReplicasPerBroker(name);
      const brokersWithReplicas: number[] = [];
      metric.forEach((result) => brokersWithReplicas.push(result.brokerId));

      return brokersWithReplicas;
    },

    logSize: async ({ name }, args, { dataSources }): Promise<number> => {
      const metric = await dataSources.prometheusAPI.getLogSize(name);
      const logSizeGB = Number((metric[0].logSize / 1000000000).toFixed(2));

      return logSizeGB;
    },
  },

  Query: {
    brokers: async (
      parent,
      { start, end, step, brokerIds }
    ): Promise<Broker[]> => {
      const clusterInfo = await brokerData.getClusterInfo();
      if (start) {
        clusterInfo.brokers.forEach((broker) => {
          broker.start = start;
          broker.end = end;
          broker.step = step;
        });
      }
      if (brokerIds) {
        clusterInfo.brokers = clusterInfo.brokers.filter((broker) =>
          brokerIds.includes(broker.brokerId)
        );
      }

      return clusterInfo.brokers.sort((a, b) => a.brokerId - b.brokerId);
    },

    broker: async (
      parent: Broker,
      { brokerId, start, end, step }
    ): Promise<Broker> => {
      try {
        const cluster = await brokerData.getClusterInfo();
        const broker = cluster.brokers.filter(
          (elem) => elem.brokerId === brokerId
        )[0];

        broker.start = start;
        broker.end = end;
        broker.step = step;

        return broker;
      } catch (error) {
        console.log(`An error occured with Query Broker: ${error}`);
      }
    },

    cluster: async (): Promise<Cluster> => {
      const clusterInfo = await brokerData.getClusterInfo();
      return clusterInfo;
    },

    topic: async (parent, { name }): Promise<any> => {
      const topic = await brokerData.getSingleTopic(name);

      return topic;
    },

    topics: async (): Promise<any> => {
      const topics = await brokerData.getAllTopics();

      return topics;
    },

    totalTimeMs: async (
      parent,
      { request, brokerIds },
      { dataSources }
    ): Promise<Count> => {
      try {
        const totalTimeMs = await dataSources.prometheusAPI.getAvgTotalTimeMs(
          request,
          brokerIds
        );

        return totalTimeMs[0];
      } catch (error) {
        console.log(`An error has occured with Query Total Time MS: ${error}`);
      }
    },

    bytesInPerSecondOverTime: async (
      parent,
      { brokerIds, topics, start, step, end },
      { dataSources }
    ): Promise<Count> => {
      try {
        let allBytesInPerSecond =
          await dataSources.prometheusAPI.getBytesInPerSec(
            start,
            end,
            step,
            brokerIds
          );

        if (topics) {
          allBytesInPerSecond = allBytesInPerSecond.filter((el) =>
            topics.includes(el.topic)
          );
        }

        return allBytesInPerSecond;
      } catch (error) {
        console.log(`An error has occured with Query Total Time MS: ${error}`);
      }
    },

    bytesOutPerSecondOverTime: async (
      parent,
      { brokerIds, topics, start, step, end },
      { dataSources }
    ): Promise<Count> => {
      try {
        let allBytesOutPerSecond =
          await dataSources.prometheusAPI.getBytesOutPerSec(
            start,
            end,
            step,
            brokerIds
          );

        if (topics) {
          allBytesOutPerSecond = allBytesOutPerSecond.filter((el) =>
            topics.includes(el.topic)
          );
        }

        return allBytesOutPerSecond;
      } catch (error) {
        console.log(`An error has occured with Query Total Time MS: ${error}`);
      }
    },
  },

  Mutation: {
    addTopic: async (
      parent,
      { name, replicationFactor, numPartitions, configEntries }
    ) => {
      try {
        const topic = await brokerData.createTopic(
          name,
          replicationFactor,
          numPartitions,
          configEntries
        );
        return topic;
      } catch (error) {
        console.warn(
          `Mutation addTopic failed for topic: ${name}. Error: ${error}`
        );
      }
    },

    deleteTopic: async (parent, { name }) => {
      try {
        const topic = await brokerData.deleteTopic(name);
        return topic;
      } catch (error) {
        console.warn(
          `Mutation deleteTopic failed for topic: ${name}. Error: ${error}`
        );
        return error;
      }
    },
  },
};

export default resolvers;
