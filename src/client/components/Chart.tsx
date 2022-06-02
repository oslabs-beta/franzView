import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { GqlChartProps } from "../../types/types";
import { useQuery } from "@apollo/client";

// https://react-chartjs-2.js.org/faq/typescript
// import type { ChartData, ChartOptions } from 'chart.js';
// interface LineProps {
//   options: ChartOptions<'line'>;
//   data: ChartData<'line'>;
// }

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "CPU Usage",
    },
  },
};

export default function Chart({
  query,
  metric,
  duration,
  step,
  pollInterval,
  title,
}: GqlChartProps) {
  const [timeNow, setTimeNow] = useState(new Date());
  const loaded = useRef(false);
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  let refetching = false;

  const { loading, error, data, refetch, networkStatus } = useQuery(query, {
    variables: {
      start: new Date(timeNow.valueOf() - duration * 60000).toString(),
      end: timeNow.toString(),
      step: step,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (loading || loaded.current) return;
    const datasets = [];
    const labels = [];
    data?.brokers.forEach((broker, index) => {
      const brokerData: any = {};
      brokerData.label = `brokerId: ${broker.brokerId}`;
      brokerData.data = broker[`${metric}OverTime`].map((point) => {
        if (index === 0) {
          labels.push(
            new Date(point.time).toLocaleTimeString("en-us", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          );
        }
        return point[metric];
      });

      datasets.push(brokerData);
    });

    setChartData({
      labels,
      datasets,
    });

    const moreData = setInterval(() => {
      console.log("Waiting to refetch:", metric);

      if (!refetching) {
        refetching = true;
        console.log("Refetching:", metric);
        const variables = {
          start: timeNow.toString(),
          end: new Date(timeNow.valueOf() + pollInterval * 1000).toString(),
          step: step,
        };
        setTimeNow(new Date(variables.end));
        refetch({ ...variables }).then(() => {
          console.log(metric, " refetched");
          refetching = false;
        });
      }
      return;
    }, pollInterval * 1000);

    return () => (loaded.current = true);
  }, [data]);

  useEffect(() => {
    if (loading || !loaded.current) return;
    if (!chartRef.current.data || !data) return;
    data.brokers.forEach((broker, index, array) => {
      broker[`${metric}OverTime`].forEach((point) => {
        if (index === 0) {
          chartRef.current?.data?.labels.shift();
          chartRef.current?.data?.labels.push(
            new Date(point.time).toLocaleTimeString("en-us", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          );
        }

        chartRef.current?.data?.datasets[index].data.shift();
        chartRef.current?.data?.datasets[index].data.push(point[metric]);
      });
    });

    console.log(metric, "updating");
    chartRef.current.update();
  }, [data]);

  // data?.brokers.forEach((broker, index) => {
  //   if (!chartData.datasets[index]) {
  //     console.log('First time')
  //     const newLabels = [];
  //     const brokerData: any = {}
  //     brokerData.label = `brokerId: ${broker.brokerId}`
  //     brokerData.data = broker[`${metric}OverTime`].map(point => {
  //      if (index === 0){ chartData.labels.push(new Date(point.time).toLocaleTimeString('en-us', {
  //         hour: '2-digit',
  //         minute: '2-digit',
  //         second: '2-digit'
  //       }));}
  //       return point[metric]
  //     })
  //     return chartData.datasets.push(brokerData)
  //   }
  //    else {
  //     console.log('secondTime')
  //     broker[`${metric}OverTime`].forEach(point => {
  //       if (index === 0) {
  //         chartData.labels.shift();
  //         chartData.labels.push(new Date(point.time).toLocaleTimeString('en-us', {
  //         hour: '2-digit',
  //         minute: '2-digit',
  //         second: '2-digit'
  //       }))
  //       }

  //       chartData.datasets[index].data.shift();
  //       return chartData.datasets[index].data.push(point[metric]);
  //     })
  //   }
  // });

  return (
    <>
      {loading && !loaded.current ? (
        <div>Loading...</div>
      ) : (
        <Line options={options} data={chartData} ref={chartRef} />
      )}
    </>
  );
}

// export default function Chart({options, data}: LineProps) {
//   return <Line options={options} data={data} />;
// }
