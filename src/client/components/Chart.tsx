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
  TimeScale,
  ChartOptions,
} from "chart.js";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import { GqlChartProps } from "../../types/types";
import { useQuery } from "@apollo/client";
import ChartStreaming from "chartjs-plugin-streaming";

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
  Legend,
  TimeScale,
  ChartStreaming
);

export default function Chart({
  query,
  metric,
  duration,
  step,
  pollInterval,
  title,
}: GqlChartProps) {
  const timeNow = useRef(new Date());
  const loaded = useRef(false);
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const colors = ["00f5d4", "00bbf9", "9b5de5", "f15bb5", "fee440"];

  const options: ChartOptions<"line"> = {
    responsive: true,
    parsing: {
      xAxisKey: "time",
      yAxisKey: metric,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
      streaming: {
        duration: duration * 60000,
        delay: pollInterval * 1000,
        refresh: pollInterval * 1000,
        onRefresh: (chart) => {
          console.log(`Refreshing ${metric}`);
          const variables = {
            start: timeNow.current.toString(),
            end: new Date().toString(),
            step: step,
          };
          timeNow.current = new Date(variables.end);
          refetch({ ...variables }).then((result) => {
            console.log(metric, "request completed");
            if (loaded.current) {
              result.data.brokers.forEach((broker, index) => {
                broker[`${metric}OverTime`].forEach((point) => {
                  // chart.data.datasets[index].data.shift();
                  chart.data.datasets[index].data.push(point);
                });
              });
            }

            chart.update("quiet");
          });
        },
      },
    },
    scales: {
      xAxes: {
        type: "realtime",
        time: {
          unit: "minute",
          parser: (label: string) => new Date(label).getTime(),
          stepSize: 0.5,
          displayFormats: {
            minute: "HH:mm:ss",
          },
        },
        adapters: {
          date: {
            local: "en-us",
            setZone: true,
          },
        },
      },
    },
  };

  const { loading, data, refetch } = useQuery(query, {
    variables: {
      start: new Date(timeNow.current.valueOf() - duration * 60000).toString(),
      end: timeNow.current.toString(),
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
      brokerData.backgroundColor = `#${colors[index]}`;
      brokerData.borderColor = `#${colors[index]}`;
      brokerData.pointRadius = 0;
      brokerData.tension = 0.2;

      brokerData.data = broker[`${metric}OverTime`];

      datasets.push(brokerData);
    });

    console.log("Updating State");

    setChartData({
      labels,
      datasets,
    });

    return () => (loaded.current = true);
  }, [data]);

  return (
    <>
      {useMemo(() => {
        return loading && !loaded.current ? (
          <div>Loading...</div>
        ) : (
          <Line options={options} data={chartData} ref={chartRef} />
        );
      }, [chartData])}
    </>
  );
}

// export default function Chart({options, data}: LineProps) {
//   return <Line options={options} data={data} />;
// }
