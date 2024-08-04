"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { User } from "@prisma/client";
import { ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const UserDataChart = ({ users, label }: { users: User[]; label: string }) => {
  // Define the type for processedData
  type ProcessedData = {
    [key: string]: number;
  };

  // Process data for the chart
  const processedData: ProcessedData = users.reduce(
    (acc: ProcessedData, user: User) => {
      // Extract the date from the user's createdAt property
      const date = new Date(user.createdAt).toLocaleDateString();

      // Initialize the count for this date if it doesn't exist
      if (!acc[date]) {
        acc[date] = 0;
      }

      // Increment the count for this date
      acc[date] += 1;

      // Return the updated accumulator
      return acc;
    },
    {} // Initial value of the accumulator
  );

  const labels = Object.keys(processedData);
  const data = Object.values(processedData);
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "line",
        },
      },
      title: {
        display: true,
        text: `Number of ${label} Over Time`,
      },
    },
    elements: {
      line: {
        tension: 0.4, // smooth the lines if needed
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1, // Ensure whole numbers
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default UserDataChart;
