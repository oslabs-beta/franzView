import React from "react";
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

// import type { ChartData, ChartOptions } from "chart.js";
// interface LineProps {
//   options: ChartOptions<"line">;
//   data: ChartData<"line">;
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
  // scales: {
  //   x: { type: "time" },
  //   time: { unit: "seconds" },
  // },
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

const labels = [0, 1, 2, 3, 4, 5];

const data = {
  labels,
  datasets: [
    {
      label: "Broker 1",
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Broker 2",
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Broker 3",
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
  ],
};

export default function Chart() {
  return <Line options={options} data={data} />;
}
