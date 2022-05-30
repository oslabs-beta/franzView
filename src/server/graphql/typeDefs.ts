import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Cluster {
    activeControllerCount: ActiveControllerCount
    activeController: Broker
    brokers: [Broker]!
    offlinePartitionCount: OfflinePartitionCount
  }

  type Broker {
    brokerId: Int!
    brokerPort: Int!
    brokerHost: String!
    brokerCpuUsage: BrokerCpuUsage
    numberUnderReplicatedPartitions: UnderReplicatedPartitions
  }

  type ActiveControllerCount {
    count: Int!
    time: String
  }

  type BrokerCpuUsage {
    cpuUsage: Float!
    time: String
  }

  type OfflinePartitionCount {
    count: Int!
    time: String
  }

  type UnderReplicatedPartitions {
    underReplicatedPartitions: Int!
    time: String
  }

  type Query {
    brokers: [Broker]!
    broker(brokerId: Int!): Broker
    cluster: Cluster
  }
`;
