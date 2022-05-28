import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Broker {
    brokerId: Int
    brokerPort: Int
    brokerHost: String
  }

  type Query {
    brokers: [Broker]!
    broker(brokerId: String!): Broker
  }
`;
