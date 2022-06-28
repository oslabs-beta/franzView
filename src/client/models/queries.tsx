import { gql } from "@apollo/client";

//(p & r) - We think this should be renamed to Dashboard_ Brokers_Metrics_Query;
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
      underMinIsr {
        metric
      }
    }
  }
`;
//This should be renamed to Topic_Metrics_Query
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

//Add additional query for metrics on broker page only

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

export const UNDERMIN_ISR = gql`
  query UnderMinIsr(
    $start: String!
    $end: String!
    $step: String!
    $brokerIds: [Int]
  ) {
    topic: underMinIsr(
      start: $start
      end: $end
      step: $step
      brokerIds: $brokerIds
    ) {
      topic
      underMinIsr: values {
        time
        underMinIsr: metric
      }
    }
  }
`;

export const UNDERREPLICATED_PARTITIONS = gql`
  query UnderreplicatedPartitions(
    $start: String!
    $end: String!
    $step: String!
    $brokerIds: [Int]
  ) {
    topic: underreplicatedPartitions(
      start: $start
      end: $end
      step: $step
      brokerIds: $brokerIds
    ) {
      topic
      underreplicatedPartitions: values {
        time
        underreplicatedPartitions: metric
      }
    }
  }
`;
