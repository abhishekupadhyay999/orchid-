import React from "react";
import ReactApexChart from "react-apexcharts";

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Cycling",
          data: [80, 40, 55, 20, 45, 30, 80, 90, 85, 90, 30, 85],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 230,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: "top",
            },
          },
        },
        colors: ["#FF720D"],
        legend: {
          show: false,
          position: "top",
          horizontalAlign: "left",
        },
        dataLabels: {
          enabled: false,
          offsetX: -6,
          style: {
            fontSize: "12px",
            // colors: ["#fff"],
          },
        },
        stroke: {
          show: false,
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        xaxis: {
          show: false,
          categories: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,2022,2023,2024],
        },
      },
    };
  }

  render() {
    return (
      <div id="customerMapkm">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}
export default BarChart;
