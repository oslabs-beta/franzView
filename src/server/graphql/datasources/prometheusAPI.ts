import "dotenv/config";
import { RESTDataSource } from "apollo-datasource-rest";

/**
 * TODO: Create a way for a user to provide their Prometheus URL
 * TODO: Map prometheus instance to brokerId
 */

class PrometheusAPI extends RESTDataSource {
  constructor(baseURL: string = process.env.PROMETHEUS_URL) {
    super();
    this.baseURL = baseURL;
  }

  async getBrokerCpuUsage() {
    const query = 'query=rate(process_cpu_seconds_total{job="kafka"}[1m])*100';
    const result = await this.get(`api/v1/query?${query}`);
    const data = result.data.result;

    return this.formatResponse(data, "cpuUsage");
  }

  async getBrokerCpuUsageOverTime(start, end, step) {
    const unixStart = Math.round(new Date(start).getTime() / 1000);
    const unixEnd = Math.round(new Date(end).getTime() / 1000);
    try {
      const query = `query=rate(process_cpu_seconds_total{job="kafka"}[1m])*100&start=${unixStart}&end=${unixEnd}&step=${step}`;
      const result = await this.get(`api/v1/query_range?${query}`);
      const data = result.data.result;

      return this.formatResponseSeries(data, "cpuUsage");
    } catch (error) {
      console.log(`Error occured for CPU Usage Query to Prometheus with:
       start: ${start}, 
       end:  ${end},
       step: ${step}
       Error: ${error}`);
    }
  }

  async getUnderReplicatedPartitions() {
    const query = "query=kafka_server_replicamanager_underreplicatedpartitions";
    const result = await this.get(`api/v1/query?${query}`);
    const data = result.data.result;

    return this.formatResponse(data, "underReplicatedPartitions");
  }

  async getActiveControllerCount() {
    const query =
      "query=kafka_controller_kafkacontroller_activecontrollercount";
    const result = await this.get(`api/v1/query?${query}`);
    const data = result.data.result;

    return this.formatResponse(data, "activeControllerCount");
  }

  async getOfflinePartitionCount() {
    const query =
      "query=kafka_controller_kafkacontroller_offlinepartitionscount";
    const result = await this.get(`api/v1/query?${query}`);
    const data = result.data.result;

    return this.formatResponse(data, "offlinePartitionCount");
  }

  async getDiskUsage() {
    const query =
      'query=(sum(avg_over_time(jvm_memory_bytes_used{area="heap", job!="zookeeper"}[1m]))by(application,instance)/sum(avg_over_time(jvm_memory_bytes_max{area="heap", job!="zookeeper"}[1m]))by(application,instance))*100';
    const result = await this.get(`api/v1/query?${query}`);
    const data = result.data.result;

    return this.formatResponse(data, "diskUsage");
  }

  async getDiskUsageOverTime(start, end, step) {
    const unixStart = Math.round(new Date(start).getTime() / 1000);
    const unixEnd = Math.round(new Date(end).getTime() / 1000);
    const query = `query=(sum(avg_over_time(jvm_memory_bytes_used{area="heap", job!="zookeeper"}[1m]))by(application,instance)/sum(avg_over_time(jvm_memory_bytes_max{area="heap", job!="zookeeper"}[1m]))by(application,instance))*100&start=${unixStart}&end=${unixEnd}&step=${step}`;
    const result = await this.get(`api/v1/query_range?${query}`);
    const data = result.data.result;

    return this.formatResponseSeries(data, "diskUsage");
  }

  async getTotalReplicas(name) {
    const query = `query=(sum(kafka_cluster_partition_replicascount{topic="${name}"})by(topic))`;
    const result = await this.get(`api/v1/query?${query}`);
    const data = result.data.result;

    return this.formatResponse(data, "totalReplicas");
  }

  async getReplicasPerBroker(name) {
    const query = `query=(sum(kafka_cluster_partition_replicascount{topic="${name}"})by(instance))>0`;
    const result = await this.get(`api/v1/query?${query}`);
    const data = result.data.result;

    return this.formatResponse(data, "totalReplicasPerBroker");
  }

  async getTotalIsrs(name) {
    const query = `query=(sum(kafka_cluster_partition_insyncreplicascount{topic="${name}"})by(topic))`;
    const result = await this.get(`api/v1/query?${query}`);
    const data = result.data.result;

    return this.formatResponse(data, "totalIsrs");
  }

  async getLogSize(name) {
    const query = `query=(sum(kafka_log_log_size{topic=~"${name}"})by(topic))`;
    const result = await this.get(`api/v1/query?${query}`);
    const data = result.data.result;

    return this.formatResponse(data, "logSize");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatResponse(data: any[], metric: string) {
    /* Remove for production */
    const brokerMap = {
      "kafka1:8081": 1,
      "kafka2:8081": 2,
      "kafka3:8081": 3,
    };

    const formattedData = [];
    data.forEach((result) => {
      const obj = {
        time: new Date(result.value[0] * 1000).toString(),
        resource: result.metric.instance,
        brokerId: brokerMap[result.metric.instance],
      };
      obj[metric] = Number(result.value[1]);
      formattedData.push(obj);
    });

    return formattedData;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatResponseSeries(data: any[], metric: string) {
    /* Remove for production */
    const brokerMap = {
      "kafka1:8081": 1,
      "kafka2:8081": 2,
      "kafka3:8081": 3,
    };

    const formattedData = [];
    data.forEach((result) => {
      const obj = {
        resource: result.metric.instance,
        brokerId: brokerMap[result.metric.instance],
        values: [],
      };
      result.values.forEach((value) => {
        const point = {
          time: new Date(value[0] * 1000).toString(),
        };
        point[metric] = Number(value[1]);
        obj.values.push(point);
      });
      formattedData.push(obj);
    });

    return formattedData;
  }
}

export default PrometheusAPI;
