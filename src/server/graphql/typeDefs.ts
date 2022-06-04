import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Cluster {
    activeControllerCount: ActiveControllerCount
    activeController: Broker
    brokers: [Broker]!
    offlinePartitionCount: OfflinePartitionCount
    numberUnderReplicatedPartitions: UnderReplicatedPartitions
  }

  type Broker {
    brokerId: Int!
    brokerPort: Int!
    brokerHost: String!
    numberUnderReplicatedPartitions: UnderReplicatedPartitions
    cpuUsage: BrokerCpuUsage
    diskUsage: DiskUsage
    cpuUsageOverTime: [BrokerCpuUsage]
    diskUsageOverTime: [DiskUsage]
    produceTotalTimeMs: TotalTimeMs
    consumerTotalTimeMs: TotalTimeMs
    followerTotalTimeMs: TotalTimeMs
  }

  type Topic {
    name: String!
    numPartitions: Int
    totalReplicas: Int
    totalIsrs: Int
    brokersWithReplicas: [Int]
    logSize: Float
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

  type TotalTimeMs {
    totalTimeMs: Float!
    time: String
  }

  type Query {
    brokers(
      start: String
      end: String
      step: String
      brokerIds: [Int]
    ): [Broker]!
    broker(brokerId: Int!, start: String, end: String, step: String): Broker
    cluster: Cluster
    topic(name: String!): Topic
    topics: [Topic]
    totalTimeMs(request: String!): TotalTimeMs
  }
`;
