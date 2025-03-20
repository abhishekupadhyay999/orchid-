import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class PowerBar extends Component {
  render() {
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "My First dataset",
          data: this.props.chartData,
          borderColor: "rgba(255, 255, 255, .8)",
          borderWidth: "0",
          backgroundColor: "rgba(255, 255, 255, .8)",
          hoverBackgroundColor: "rgba(255, 255, 255, .8)",
          barPercentage: 0.5,
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
            max: 100,
            min: 0,
            ticks: {
              beginAtZero: true,
              display: false,
              stepSize: 10,
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
        
        x: 
          {
            display: false,
            
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
      <div style={{ height: 140 }}>
        <Bar data={data} height={140} options={options} />
      </div>
    );
  }
}

export default PowerBar;
