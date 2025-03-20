import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class WeeklySales2 extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Jan", "Febr", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "My First dataset",
          data: this.props.chartData,
          borderColor: "rgba(255, 114, 13, 1)",
          borderWidth: "2",
          backgroundColor: "rgba(255, 114, 13, 1)",
          pointBackgroundColor: "rgba(255, 114, 13, 1)",
          pointRadius: 0,
          fill: true,
          tension : 0.3
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          display: !1,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        intersect: !1,
        mode: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
      },
      scales: {
        y: 
          {
            display: false,
            max: 100,
            min: 0,
            ticks: {
              beginAtZero: true,
              stepSize: 20,
              padding: 0,
              display: false,
            },
            grid: {
              drawBorder: false,
              display: false,
            },
          },
        
        x: 
          {
            display: false,
            ticks: {
              padding: 0,
              display: false,
              beginAtZero: true,
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
        
      },
    };

    return (
      <div style={{ height: 300 }}>
        <Line data={data} options={options} height={300} />
      </div>
    );
  }
}

export default WeeklySales2;
