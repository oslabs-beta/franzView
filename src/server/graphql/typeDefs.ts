import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Broker {
    brokerId: Int
    brokerPort: Int
    brokerHost: String
    brokerCpuUsage: BrokerCpuUsage
  }

  type BrokerCpuUsage {
    cpuUsage: Float
    time: String
  }

  type Query {
    brokers: [Broker]!
    broker(brokerId: Int!): Broker
    allBrokerCpuUsage: [BrokerCpuUsage]!
    brokerCpuUsage(brokerId: Int!): BrokerCpuUsage
  }
`;
