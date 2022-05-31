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

export interface DiskUsage extends Metric {
  diskUsage: number;
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
}

export interface UnderReplicatedPartitions {
  underReplicatedPartitions: number;
  time: string;
}
