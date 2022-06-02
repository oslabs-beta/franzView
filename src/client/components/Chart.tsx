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

const animation = {};

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

  const delayBetweenPoints = 1000;
  const previousY = (ctx) =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart
          .getDatasetMeta(ctx.datasetIndex)
          .data[ctx.index - 1].getProps(["y"], true).y;
  const animation = {
    x: {
      type: "string",
      easing: "linear",
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== "data" || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== "data" || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
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
    onCompleted: (data) => {
      console.log(metric, "request completed");
      if (chartRef.current?.data.datasets.length > 1 && loaded.current) {
        data.brokers.forEach((broker, index) => {
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
      }

      setTimeout(() => {
        const variables = {
          start: timeNow.current.toString(),
          end: new Date(
            timeNow.current.valueOf() + pollInterval * 1000
          ).toString(),
          step: step,
        };
        timeNow.current = new Date(variables.end);
        refetch({ ...variables });
      }, pollInterval * 1000);
      return data;
    },
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
