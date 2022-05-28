import * as brokerData from "./datasources/brokerAdmin";
import { Broker } from "../../types";

const resolvers = {
  Query: {
    brokers: async (): Promise<Broker[]> => await brokerData.getClusterInfo(),
    broker: async (parent: Broker, { brokerId }): Promise<Broker> => {
      try {
        const cluster = await brokerData.getClusterInfo();
        const broker = cluster.filter((elem) => (elem.brokerId = brokerId))[0];

        return broker;
      } catch (error) {
        console.log(`An error occured with Query Broker: ${error}`);
      }
    },
  },
};

export default resolvers;
