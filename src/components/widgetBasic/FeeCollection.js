import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import 'chart.js/auto'

class FeeCollection extends Component {
  render() {
    const data = {
      labels: this.props.chartData,
      datasets: [
        {
          label: "My First dataset",
          data: this.props.chartData,
          backgroundColor: "#fa707e",
          borderColor: "#f77f8b",
          borderWidth: 3,
          strokeColor: "#F77F8B",
          capBezierPoints: !0,
          fill : true          
        },
      ],
    };

    const options = {
      plugins: {
        responsive: true,
        legend: {
          display: false,          
        },
        tooltips: {
          enabled: false,
        },
      },
      maintainAspectRatio: false,
      scales: {
        x: 
          {
            display: false,
            gridLines: {
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
            gridLines: {
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
      <div style={{ height: 140, marginTop: "10px" }}>
        <Line data={data} options={options} height={140} />
      </div>
    );
  }
}

export default FeeCollection;
