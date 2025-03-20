import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class MarketNow extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "forteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
        "twenty",
      ],
      datasets: [
        {
          label: "Expense",
          backgroundColor: "#430b58",
          hoverBackgroundColor: "#6c2586",
          data: this.props.chartData[0].data,
          barPercentage: 0.2,
        },
        {
          label: "Earning",
          backgroundColor: "#F1F3F7",
          hoverBackgroundColor: "#F1F3F7",
          data: this.props.chartData[1].data,
          barPercentage: 0.2,
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      title: {
        display: false,
      },
      tooltips: {
        mode: "index",
        intersect: false,
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x:
          {
            display: false,
            stacked: true,            
            // barThickness: 5,
            ticks: {
              display: false,
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
        
        y:
          {
            display: false,
            stacked: true,
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
              max: 100,
              min: 0,
            },
          },
        
      },
    };

    return (
      <div >
        <Bar data={data} height={255} options={options} />
      </div>
    );
  }
}

export default MarketNow;
