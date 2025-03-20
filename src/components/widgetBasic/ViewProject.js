import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class ViewProject extends Component {
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
            data: this.props.chartData,
            borderColor: "#430b58",
            borderWidth: "0",
            backgroundColor: "#6c2586",
            barPercentage: 0.1,
            // hoverBackgroundColor: chart_widget_2gradientStroke,
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
            display: false,
            max: 100,
            min: 0,
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
        <Bar id="chart_widget_2" data={data} options={options} height={150} />
      </div>
    );
  }
}

export default ViewProject;
