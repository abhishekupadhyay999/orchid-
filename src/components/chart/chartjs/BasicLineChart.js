
import { Line } from "react-chartjs-2";
import 'chart.js/auto'


const BasicLineChart = () => {  
    const data =  {      
        defaultFontFamily: "Poppins",
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "My First dataset",
            data: [25, 20, 60, 41, 66, 45, 80],
            borderColor: "rgba(255, 114, 13, 1)",
            borderWidth: "2",
            backgroundColor: "transparent",
            // pointBackgroundColor: "rgba(255, 114, 13, 1)",
            tension : 0.4
          },
        ],      
    };

    const options = {
      plugins: {
        legend: false,
      },
      scales: {
        y: 
          {
            max: 100,
            min: 0,
            ticks: {
              beginAtZero: true,
              stepSize: 20,
              padding: 10,
            },
          },
        
        x: 
          {
            ticks: {
              padding: 5,
            },
          },
        
      },
    };
    return (
      <div>
        <Line data={data} options={options} height={150} id="lineChart_1" />
      </div>
    );
}


export default BasicLineChart;
