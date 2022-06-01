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
      brokers {
        numberUnderReplicatedPartitions {
          underReplicatedPartitions
        }
      }
    }
  }
`;
