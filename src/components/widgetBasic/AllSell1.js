import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class AllSell1 extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Jan", "Febr", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "My First dataset",
          data: this.props.chartData,
          borderColor: "#3693FF",
          borderWidth: "2",
          backgroundColor: "transparent",
          pointBackgroundColor: "#3693FF",
          pointRadius: 0,
          tension: 0.5
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
      scales: {
        y: 
          {
            max: 100,
            min: 0,
            display: false,
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
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
        
      },
    };
    return (
      <div style={{ height: 150 }}>
        <Line data={data} options={options} height={150} />
      </div>
    );
  }
}

export default AllSell1;
