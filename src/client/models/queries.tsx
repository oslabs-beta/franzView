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
