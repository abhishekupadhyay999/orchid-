import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);


class DonutChart extends Component {
  render() {
    const data = {
      weight: 0,
      defaultFontFamily: "Poppins",
      datasets: [
        {
          data: [this.props.value, 100 - this.props.value],
          borderWidth: 0,
          backgroundColor: [
            this.props.backgroundColor,
            this.props.backgroundColor2,
          ],
        },
      ],
    };

    const options = {
      cutout: "85%",
    };
    return (
      <div className="donught-chart" >
        <Doughnut data={data} options={options} height={100} width={100} />
      </div>
    );
  }
}

export default DonutChart;
