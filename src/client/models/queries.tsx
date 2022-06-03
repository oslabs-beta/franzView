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
    brokers(start: $start, end: $end, step: $step) {
      brokerId
      cpuUsageOverTime {
        cpuUsage
        time
      }
    }
  }
`;

export const ALL_BROKER_DISK_USAGE = gql`
  query BrokersDiskUsage($start: String, $end: String, $step: String) {
    brokers(start: $start, end: $end, step: $step) {
      brokerId
      diskUsageOverTime {
        diskUsage
        time
      }
    }
  }
`;

export const BROKER_FRAGMENT = gql`
  fragment CoreBrokerFields on Broker {
    brokerId: Int!
    brokerPort: Int!
    brokerHost: String!
  }
`;

export const CORE_ALL_BROKERS_QUERY = gql`
  query CoreAllBrokerFields {
    brokers {
      ${BROKER_FRAGMENT}
    }
  }
`;
