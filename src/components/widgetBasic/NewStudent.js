import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class NewStudent extends Component {
  render() {
    const data = {
      labels: this.props.chartData,
      datasets: [
        {
          label: "My First dataset",
          data: this.props.chartData,
          borderColor: "#FFCE78",
          borderWidth: "0",
          backgroundColor: "#FFCE78",
          barPercentage: 0.6,
        },
      ],
    };

    const options = {
      plugins: { legend: false,},
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
      <div style={{ height: 150 }}>
        <Bar data={data} height={150} options={options} />
      </div>
    );
  }
}

export default NewStudent;
