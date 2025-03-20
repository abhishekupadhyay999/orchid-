import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
//import { Bar } from 'react-chartjs-2';
//import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

class BasicBarChart extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "My First dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: "rgba(255, 114, 13, 1)",
          borderWidth: "0",
          backgroundColor: "rgba(255, 114, 13, 1)",
          barPercentage : 0.6
        },
      ],
    };

    const options = {
      plugins: {
        legend: false,
      },
      
      scales: {
        y: 
          {
            ticks: {
              beginAtZero: true,
            },
          },
        
        x: 
          {
            // Change here
            barPercentage: 0.5,
          },
        
      },
    };
    return (
      <div>
        <Bar data={data} options={options} height={150} />
      </div>
    );
  }
}

export default BasicBarChart;
