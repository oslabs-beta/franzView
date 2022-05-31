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
    numberUnderReplicatedPartitions: UnderReplicatedPartitions
    brokerCpuUsage: BrokerCpuUsage
    brokerDiskUsage: DiskUsage
    brokerCpuUsageOverTime: [BrokerCpuUsage]
    brokerDiskUsageOverTime: [DiskUsage]
  }

  type Topic {
    name: String!
    numPartitions: Int!
    totalReplicas: Int
    totalIsrs: Int
    brokersWithReplicas: [Int]
    logSize: Int
  }

  type ActiveControllerCount {
    count: Int!
    time: String
  }

  type BrokerCpuUsage {
    cpuUsage: Float!
    time: String
  }

  type DiskUsage {
    diskUsage: Float!
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
    brokers(start: String, end: String, step: String): [Broker]!
    broker(brokerId: Int!, start: String, end: String, step: String): Broker
    cluster: Cluster
    topic(name: String!): Topic
    topics: [Topic]
  }
`;
