import * as brokerData from "./datasources/brokerAdmin";
import { Broker, BrokerCpuUsage } from "../../types/types";

const resolvers = {
  Query: {
    brokers: async (parent, args, { dataSources }): Promise<Broker[]> => {
      const clusterInfo = await brokerData.getClusterInfo();
      const cpuUsage = await dataSources.prometheusAPI.getBrokerCpuUsage();
      clusterInfo.forEach((broker) => {
        broker.brokerCpuUsage = cpuUsage.filter(
          (elem) => elem.brokerId === broker.brokerId
        )[0];
      });

      return clusterInfo;
    },

    broker: async (
      parent: Broker,
      { brokerId },
      { dataSources }
    ): Promise<Broker> => {
      try {
        const cluster = await brokerData.getClusterInfo();
        const broker = cluster.filter((elem) => elem.brokerId === brokerId)[0];

        const brokerCpu = await dataSources.prometheusAPI.getBrokerCpuUsage();
        const singleBrokerCpu = brokerCpu.filter(
          (elem) => elem.brokerId === brokerId
        )[0];
        broker.brokerCpuUsage = singleBrokerCpu;

        return broker;
      } catch (error) {
        console.log(`An error occured with Query Broker: ${error}`);
      }
    },

    allBrokerCpuUsage: async (
      parent: BrokerCpuUsage,
      args,
      { dataSources }
    ): Promise<BrokerCpuUsage[]> =>
      await dataSources.prometheusAPI.getBrokerCpuUsage(),

    brokerCpuUsage: async (
      parent,
      { brokerId },
      { dataSources }
    ): Promise<BrokerCpuUsage> => {
      try {
        console.log(parent);
        const brokerCpu = await dataSources.prometheusAPI.getBrokerCpuUsage();
        const singleBrokerCpu = brokerCpu.filter(
          (elem) => elem.brokerId === brokerId
        )[0];
        return singleBrokerCpu;
      } catch (error) {
        console.log(`An error occured with Query Broker CPU Usage: ${error}`);
      }
    },
  },
};

export default resolvers;
