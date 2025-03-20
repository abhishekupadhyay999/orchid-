import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

class FvtItemChart extends Component {
  render() {
    const data = {
      weight: 0,
      defaultFontFamily: "Poppins",
      datasets: [
        {
          data: [this.props.value, 100 - this.props.value],
          borderWidth: 0,
          backgroundColor: ["rgba(255, 114, 13,1)", "rgba(236, 236, 236,1)"],
        },
      ],
    };

    const options = {
      cutout: "80%",
    };
    return (
      <div
        className="donught-chart"
        style={{  height: "80px", width: "80px" }}
      >
        <Doughnut data={data} options={options} height={80} width={80} />
      </div>
    );
  }
}

export default FvtItemChart;
