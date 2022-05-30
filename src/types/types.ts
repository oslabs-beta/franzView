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
}

export interface BrokerCpuUsage {
  cpuUsage: number;
  time: string;
}
