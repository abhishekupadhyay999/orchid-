import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class GradientBarChart extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "My First dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: "rgba(255, 114, 13, 1)",
          borderWidth: "0",
          backgroundColor: "rgba(255, 114, 13, 0.5)",
          hoverBackgroundColor: "rgba(255, 114, 13, 0.5)",
		      barPercentage : 0.6
        },
      ],
    };
    const options = {
      plugins:{
        legend: false,
      },
      scales: {
        y: 
          {
            ticks: {
              beginAtZero: true,
            },
          },
        
        x: 
          {
            // Change here
            barPercentage: 0.5,
          },
        
      },
    };

    return (
      <>
        <Bar data={data} height={150} options={options} />
      </>
    );
  }
}

export default GradientBarChart;