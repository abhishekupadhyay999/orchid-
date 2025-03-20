import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class BasicAreaChart extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "My First dataset",
          data: [25, 20, 60, 41, 66, 45, 80],
          borderColor: "rgba(0, 0, 1128, .3)",
          borderWidth: "1",
          backgroundColor: "rgba(255, 114, 13, .5)",
          pointBackgroundColor: "rgba(0, 0, 1128, .3)",
          fill: true,
          tension : 0.4
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
            max: 100,
            min: 0,
            ticks: {
              beginAtZero: true,
              stepSize: 20,
              padding: 10,
            },
          },
        
        x: 
          {
            ticks: {
              padding: 5,
            },
          },
        
      },
    };
    return (
      <div>
        <Line data={data} options={options} height={150} />
      </div>
    );
  }
}

export default BasicAreaChart;
