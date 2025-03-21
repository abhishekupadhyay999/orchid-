import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class HeartRate extends Component {
  render() {
    const data = {
      labels: this.props.chartData,
      datasets: [
        {
          label: "My First dataset",
          data: this.props.chartData,
          borderColor: "#FF720D",
          borderWidth: "0",
          backgroundColor: "#FF720D",
          barPercentage: 0.8,
        },
      ],
    };

    const options = {
      plugins: {
        legend: false,
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: 
          {
            display: false,
            ticks: {
              beginAtZero: true,
              display: false,
              max: 100,
              min: 0,
              stepSize: 7,
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
        
        x: 
          {
            display: false,
            //   barPercentage: 1.2,
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
        
      },
    };

    return (
      <div style={{ height: 100 }}>
        <Bar data={data} height={100} options={options} />
      </div>
    );
  }
}

export default HeartRate;
