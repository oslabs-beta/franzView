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
    brokerCpuUsage: async (
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

    brokerCpuUsageOverTime: async (
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

    brokerDiskUsageOverTime: async (
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

    brokerDiskUsage: async (
      parent,
      args,
      { dataSources }
    ): Promise<DiskUsage> => {
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
  },

  Query: {
    brokers: async (parent, { start, end, step }): Promise<Broker[]> => {
      const clusterInfo = await brokerData.getClusterInfo();
      if (start) {
        clusterInfo.brokers.forEach((broker) => {
          broker.start = start;
          broker.end = end;
          broker.step = step;
        });
      }
      return clusterInfo.brokers;
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
  },
};

export default resolvers;
