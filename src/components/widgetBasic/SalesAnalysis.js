import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class SalesAnalysis extends Component {
  render() {
    const data = {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
      datasets: [
        {
          label: "My First dataset",
          data: this.props.chartData,
          backgroundColor: "#fff",
          borderColor: "#3A82EF",
          borderWidth: 2,
          strokeColor: "#3A82EF",
          capBezierPoints: !0,          
          pointRadius: 1.5,
          
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false,
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            usePointStyle: false,
          },
        },
      },
      scales: {
        x: 
          {
            display: false,
            grid: {
              display: false,
              drawBorder: false,
            },
            scaleLabel: {
              display: false,
              labelString: "Month",
            },
          },        
        y: 
          {
            display: false,
            grid: {
              display: false,
              drawBorder: false,
            },
            scaleLabel: {
              display: true,
              labelString: "Value",
            },
          },        
      },
      elements: {
        line: {
          tension: 0,
        },
        point: {
          radius: 0,
          borderWidth: 0,
        },
      },
      title: {
        display: false,
      },
    };
    return (
      < >
        <Line data={data} options={options} height={255} />
      </>
    );
  }
}

export default SalesAnalysis;
