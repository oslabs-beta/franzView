import * as brokerData from "./datasources/brokerAdmin";
import {
  Broker,
  BrokerCpuUsage,
  UnderReplicatedPartitions,
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

  Query: {
    brokers: async (): Promise<Broker[]> => {
      const clusterInfo = await brokerData.getClusterInfo();
      return clusterInfo;
    },

    broker: async (parent: Broker, { brokerId }): Promise<Broker> => {
      try {
        const cluster = await brokerData.getClusterInfo();
        const broker = cluster.filter((elem) => elem.brokerId === brokerId)[0];

        return broker;
      } catch (error) {
        console.log(`An error occured with Query Broker: ${error}`);
      }
    },
  },
};

export default resolvers;
