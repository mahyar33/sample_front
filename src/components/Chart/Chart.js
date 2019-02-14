/**
 * Module dependencies.
 */
import React, {Component} from 'react';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";


class Chart extends Component {

    constructor(props) {
        super(props);

    }

    /**
     * Configure chart and assign Data
     */
    options = data => ({

        chart: {
            type: 'scatter',
            borderWidth: 1,
            borderColor: '#ccc',
            marginLeft: 90,
            marginRight: 50,
            backgroundColor: '#eee',
            plotBackgroundColor: '#fff',
        },
        credits: {enabled: false},
        title: {
            text: 'Drones Position'
        },
        legend: {
            enabled: false
        },
        tooltip: {
            // show tooltip when hover the point
            formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    this.x + ': ' + this.y;
            }
        },
        plotOptions: {
            series: {
                shadow: false,
            }
        },
        xAxis: {
            title: {
                text: 'X Axis'
            },
            min: -200,
            max: 200,
            tickInterval: 200,
            tickLength: 0,
            minorTickLength: 0,
            gridLineWidth: 1,
            showLastLabel: true,
            showFirstLabel: false,
            lineColor: '#ccc',
            lineWidth: 1
        },
        yAxis: {
            title: {
                text: 'Y Axis<br/>',
                rotation: 0,
                margin: 25,
            },
            min: -200,
            max: 200,
            tickInterval: 200,
            tickLength: 3,
            minorTickLength: 0,
            lineColor: '#ccc',
            lineWidth: 1
        },
        series: [{
            color: '#185aa9',
            data: data,
            point: {
                events: {
                    // when click the point dropdown change
                    click: (e) => {
                        if (typeof this.props.selectedPoint == 'function')
                            this.props.selectedPoint(e.point.name)
                    }
                }
            }
        }]

    })

    /**
     * Draw custom chart
     */
    highchartOncComplete = (chart) => {
        var width = chart.plotBox.width / 2.0;
        var height = chart.plotBox.height / 2.0 + 1;

        chart.renderer.rect(chart.plotBox.x,
            chart.plotBox.y, width, height, 1)
            .attr({
                fill: 'lightblue',
                zIndex: 0
            })
            .add();

        chart.renderer.rect(chart.plotBox.x + width,
            chart.plotBox.y, width, height, 1)
            .attr({
                fill: 'yellow',
                zIndex: 0
            })
            .add();

        chart.renderer.rect(chart.plotBox.x,
            chart.plotBox.y + height, width, height, 1)
            .attr({
                fill: 'yellow',
                zIndex: 0
            })
            .add();

        chart.renderer.rect(chart.plotBox.x + width,
            chart.plotBox.y + height, width, height, 1)
            .attr({
                fill: 'lightblue',
                zIndex: 0
            })
            .add();


    }


    render() {
        return (
            <div style={{height: "450px", width: "500px", margin: "20px auto 0"}}>
                <HighchartsReact
                    options={this.options(this.props.data)}
                    highcharts={Highcharts}
                    callback={this.highchartOncComplete}
                    allowChartUpdate={true}
                />
            </div>
        );
    }
}

export default Chart;
