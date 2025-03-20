import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class LifeTimeEarning extends Component {
  render() {
    const data = {
        defaultFontFamily: "Poppins",
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "My First dataset",
            data: [65, 59, 80, 81, 56, 55, 40, 88, 45, 95, 54, 76],
            borderColor: "#ff2c53",
            borderWidth: "0",
            backgroundColor: "#ff2c53",
            hoverBackgroundColor: "#ff2c53",
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
      <div>
        <Bar id="chart_widget_7" data={data} options={options} height={150} />
      </div>
    );
  }
}

export default LifeTimeEarning;
