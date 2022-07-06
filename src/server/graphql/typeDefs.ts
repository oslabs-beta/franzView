import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Cluster {
    activeControllerCount: Metric
    activeController: Broker
    brokers: [Broker]!
    offlinePartitionCount: Metric
    numberUnderReplicatedPartitions: Metric
    deleteTopic: Boolean
    underMinIsr: Metric
  }

  type Broker {
    brokerId: Int!
    brokerPort: Int!
    brokerHost: String!
    numberUnderReplicatedPartitions: Metric
    cpuUsage: Metric
    JVMMemoryUsage: Metric
    cpuUsageOverTime: [Metric]
    JVMMemoryUsageOverTime: [Metric]
    produceTotalTimeMs: Metric
    consumerTotalTimeMs: Metric
    followerTotalTimeMs: Metric
    bytesInPerSecondOverTime: [TimeSeriesMetric]
    bytesOutPerSecondOverTime: [TimeSeriesMetric]
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

  type TimeSeriesMetric {
    topic: String
    values: [Metric]
  }

  type Metric {
    time: String
    metric: Float
  }

  type JVMMemoryUsage {
    JVMMemoryUsage: Float!
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
    totalTimeMs(request: String!, brokerIds: [Int]): Metric
    bytesInPerSecondOverTime(
      brokerIds: [Int]
      topics: [String]
      start: String!
      end: String!
      step: String!
    ): [TimeSeriesMetric]
    bytesOutPerSecondOverTime(
      brokerIds: [Int]
      topics: [String]
      start: String!
      end: String!
      step: String!
    ): [TimeSeriesMetric]
  }

  input ConfigEntry {
    name: String!
    value: String!
  }

  type Mutation {
    addTopic(
      name: String!
      replicationFactor: Int
      numPartitions: Int
      configEntries: [ConfigEntry]
    ): Topic!
    deleteTopic(name: String!): Topic
  }
`;
