import { gql } from "@apollo/client";

export const CARD_METRICS_QUERY = gql`
  query Cluster {
    cluster {
      activeControllerCount {
        count
      }
      offlinePartitionCount {
        count
      }
      numberUnderReplicatedPartitions {
        underReplicatedPartitions
      }
    }
  }
`;

export const BROKER_METRICS_QUERY = gql`
  query Topics {
    topics {
      name
      numPartitions
      totalReplicas
      totalIsrs
      brokersWithReplicas
      logSize
    }
  }
`;
export const ALL_BROKER_CPU_USAGE = gql`
  query BrokersCPUUsage($start: String, $end: String, $step: String) {
    broker: brokers(start: $start, end: $end, step: $step) {
      brokerId
      cpuUsage: cpuUsageOverTime {
        cpuUsage
        time
      }
    }
  }
`;

export const ALL_BROKER_DISK_USAGE = gql`
  query BrokersJVMMemoryUsage($start: String, $end: String, $step: String) {
    broker: brokers(start: $start, end: $end, step: $step) {
      brokerId
      JVMMemoryUsage: JVMMemoryUsageOverTime {
        JVMMemoryUsage
        time
      }
    }
  }
`;

export const BROKER_FRAGMENT = gql`
  fragment CoreBrokerFields on Broker {
    brokerId
    brokerPort
    brokerHost
  }
`;

export const CORE_ALL_BROKERS_QUERY = gql`
  ${BROKER_FRAGMENT}
  query CoreAllBrokerFields {
    brokers {
      ...CoreBrokerFields
    }
  }
`;

export const ALL_BROKERS_TIME_MS = gql`
  ${BROKER_FRAGMENT}
  query BrokerTimeMs {
    brokers {
      produceTotalTimeMs {
        totalTimeMs
        time
      }
      consumerTotalTimeMs {
        totalTimeMs
        time
      }
      followerTotalTimeMs {
        totalTimeMs
        time
      }
      ...CoreBrokerFields
    }
  }
`;

export const AVERAGE_TOTALTIMEMS = gql`
  query totalTimeMs($request: String!, $brokerIds: [Int]) {
    totalTimeMs(request: $request, brokerIds: $brokerIds) {
      totalTimeMs
      time
    }
  }
`;

export const BYTES_IN_PER_SECOND = gql`
  query BytesInPerSecondOverTime(
    $start: String!
    $end: String!
    $step: String!
    $brokerIds: [Int]
  ) {
    topic: bytesInPerSecondOverTime(
      start: $start
      end: $end
      step: $step
      brokerIds: $brokerIds
    ) {
      topic
      bytesInPerSecond: values {
        time
        bytesInPerSecond: metric
      }
    }
  }
`;

export const BYTES_OUT_PER_SECOND = gql`
  query BytesOutPerSecondOverTime(
    $start: String!
    $end: String!
    $step: String!
    $brokerIds: [Int]
  ) {
    topic: bytesOutPerSecondOverTime(
      start: $start
      end: $end
      step: $step
      brokerIds: $brokerIds
    ) {
      topic
      bytesOutPerSecond: values {
        time
        bytesOutPerSecond: metric
      }
    }
  }
`;
