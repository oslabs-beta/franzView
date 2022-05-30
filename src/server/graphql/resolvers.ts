import * as brokerData from "./datasources/brokerAdmin";
import { Broker, BrokerCpuUsage } from "../../types/types";

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
