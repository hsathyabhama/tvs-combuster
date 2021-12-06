import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class ChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      label: this.props.label,
      labels: this.props.labels,
      title: this.props.title,
      backgroundColor: this.props.backgroundColor,
      borderColor: this.props.borderColor,
      textColor: "blue",
      upperLimit: this.props.upperLimit,
      lowerLimit: this.props.lowerLimit,
    };
  }

  render() {
    const {
      data,
      label,
      backgroundColor,
      borderColor,
      title,
      upperLimit,
      lowerLimit,
    } = this.state;
    let max = parseInt(upperLimit, 10);
    let min = parseInt(lowerLimit, 10);
    let titleColor;

    data.map((It) => {
      //To display the color variation in table view
      if (It > max) {
        titleColor = "red";
      } else if (It < max && It > min) {
        titleColor = "#03fc28";
      } else if (It < min) {
        titleColor = "yellow";
      }
    });

    return (
      <div>
        <Line
          height={240}
          data={{
            labels: ["", "", "", "", "", ""],
            datasets: [
              {
                label: label,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
                title: title,
                upperLimit: upperLimit,
                lowerLimit: lowerLimit,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            animation: {
              duration: 0,
            },
            title: {
              display: true,
              text: title,
              fontColor: titleColor,
              fontSize: "16",
              fontWeight: "bold",
            },

            legend: {
              position: "top",
              align: "middle",
              labels: {
                fontColor: "white",
                fontSize: 15,
              },
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: "rgba(255, 255, 255, 0.1)",
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    color: "rgba(255, 255, 255, 0.1)",
                  },
                  ticks: {
                    max: max,
                    min: min,
                    stepSize: max / 10,
                    fontColor: "white",
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}
export default ChartComponent;
