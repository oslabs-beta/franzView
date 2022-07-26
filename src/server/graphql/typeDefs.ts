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
    messagesInPerSec: [TimeSeriesMetric]
  }

  type Topic {
    name: String!
    numPartitions: Int
    totalReplicas: Int
    totalIsrs: Int
    brokersWithReplicas: [Int]
    logSize: Float
  }

  type TimeSeriesMetric {
    topic: String
    values: [Metric]
  }

  type Metric {
    time: String
    metric: Float
  }

  type OngoingTopicReassignment {
    topic: String
    partitions: [OngoingPartitionReassignment]
  }

  type OngoingPartitionReassignment {
    partitionIndex: Number
    replicas: [Number]
    addingReplicas: [Number]
    removingReplicas: [Number]
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
    topics(name: [String]): [Topic]
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
    messagesInPerSec(
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

  input ReplicaAssignment {
    partition: Number!
    replicas: [Number]
  }

  input PartitionReassignment {
    topic: String!
    PartitionAssigment: [ReplicaAssignment]!
  }

  type Mutation {
    addTopic(
      name: String!
      replicationFactor: Int
      numPartitions: Int
      configEntries: [ConfigEntry]
    ): Topic!
    deleteTopic(name: String!): Topic
    reassignPartitions(
      topics: [PartitionReassignment]
    ): OngoingTopicReassignment
  }
`;
