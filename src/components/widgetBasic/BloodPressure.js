import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BloodPressur extends Component {
  render() {
    const data = {
      labels: this.props.chartData,
      datasets: [
        {
          label: "My First dataset",
          data: this.props.chartData,
          borderColor: "#787878",
          borderWidth: "0",
          backgroundColor: "#787878",
          barPercentage: 0.6,
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
            max: 100,
            min: 0,
            display: false,
            ticks: {
              beginAtZero: true,
              display: false,
              stepSize: 7,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
         },
        
        x:
          {
            display: false,
            
            gridLines: {
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

export default BloodPressur;
