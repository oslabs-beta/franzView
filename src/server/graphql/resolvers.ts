import * as brokerData from "./datasources/brokerAdmin";
import {
  Broker,
  BrokerCpuUsage,
  UnderReplicatedPartitions,
  Cluster,
  Count,
  DiskUsage,
} from "../../types/types";

/**
 * TODO: Throw graphql errors from catch statements.
 * TODO: Refactor prometheusAPI to take brokerId to avoid fetching all data and then needing to filter
 */

const resolvers = {
  Broker: {
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

    diskUsageOverTime: async (
      parent,
      args,
      { dataSources }
    ): Promise<BrokerCpuUsage> => {
      try {
        const totalBrokerDiskUsage =
          await dataSources.prometheusAPI.getDiskUsageOverTime(
            parent.start,
            parent.end,
            parent.step
          );
        const brokerDiskUsage = totalBrokerDiskUsage.filter(
          (elem) => elem.brokerId === parent.brokerId
        )[0];
        return brokerDiskUsage.values;
      } catch (error) {
        console.log(
          `An error occured with Query Broker Disk Usage Over Time: ${error}`
        );
      }
    },

    diskUsage: async (parent, args, { dataSources }): Promise<DiskUsage> => {
      try {
        const totalBrokerDiskUsage =
          await dataSources.prometheusAPI.getDiskUsage();
        const brokerDiskUsage = totalBrokerDiskUsage.filter(
          (elem) => elem.brokerId === parent.brokerId
        )[0];
        return brokerDiskUsage;
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

    totalReplicas: async ({ name }, args, { dataSources }): Promise<number> => {
      const metric = await dataSources.prometheusAPI.getTotalReplicas(name);

      return metric[0].totalReplicas;
    },

    totalIsrs: async ({ name }, args, { dataSources }): Promise<number> => {
      const metric = await dataSources.prometheusAPI.getTotalIsrs(name);

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
      { request },
      { dataSources }
    ): Promise<Count> => {
      try {
        const totalTimeMs = await dataSources.prometheusAPI.getAvgTotalTimeMs(
          request
        );

        return totalTimeMs[0];
      } catch (error) {
        console.log(`An error has occured with Query Total Time MS: ${error}`);
      }
    },
  },
};

export default resolvers;
