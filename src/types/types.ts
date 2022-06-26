import { DocumentNode } from "graphql";

export interface DefaultErr {
  log: string;
  status: number;
  message: Messsage;
}

export interface Messsage {
  err: string;
}

export interface Broker {
  brokerId: number;
  brokerPort: number;
  brokerHost: string;
  brokerCpuUsage?: BrokerCpuUsage;
  start?: string;
  end?: string;
  step?: string;
}

export interface BrokerCpuUsage {
  cpuUsage: number;
  time: string;
}

export interface JVMMemoryUsage extends Metric {
  JVMMemoryUsage: number;
}

export interface Topic {
  name: string;
  numPartitions: number;
  totalReplicas: number;
  totalIsrs: number;
  brokersWithReplicas: [number];
  logSize: number;
}

export interface Metric {
  time: string;
}

export interface Count extends Metric {
  count: number;
}

export interface Cluster {
  activeController: Broker;
  brokers: Broker[];
  activeControllerCount?: Count;
  offlinePartitionCount?: Count;
  underMinIsr?: Count;
}

export interface UnderReplicatedPartitions {
  underReplicatedPartitions: number;
  time: string;
}

export interface GqlChartProps {
  query: DocumentNode;
  metric: string;
  duration: number;
  step: string;
  pollInterval?: number;
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  resource?: string;
  label?: string;
  args?: any;
}
