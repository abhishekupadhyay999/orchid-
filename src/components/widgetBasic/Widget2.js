import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class Widget2 extends Component {
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
          label: "Expense",
          backgroundColor: "#ff2c53",
          hoverBackgroundColor: "#ff5777",
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
            },
          },
        
      },
    };

    return (
      <div style={{ height: 180 }}>
        <Bar data={data} height={180} options={options} />
      </div>
    );
  }
}

export default Widget2;
