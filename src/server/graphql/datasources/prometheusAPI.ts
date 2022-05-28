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
        time: new Date(result.value[0]).toString(),
        resource: result.metric.instance,
        brokerId: brokerMap[result.metric.instance],
      };
      obj[metric] = Number(result.value[1]);
      formattedData.push(obj);
    });

    return formattedData;
  }
}

export default PrometheusAPI;
