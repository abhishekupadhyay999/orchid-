import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Widget1 extends Component {
  render() {
    const data = {
      labels: this.props.chartData,
      datasets: [
        {
          label: "My First dataset",
          data: this.props.chartData,
          backgroundColor: "#9CC0F7",
          borderColor: "#3A82EF",
          borderWidth: 2,
          strokeColor: "#3A82EF",
          capBezierPoints: !0,        
          pointRadius: 1.5,         
          fill : true
        },
      ],
    };

    const options = {
      plugins: {
        legend :  false
      },
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false,
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
      <div style={{ height: 150 }}>
        <Line data={data} options={options} height={150} />
      </div>
    );
  }
}

export default Widget1;
