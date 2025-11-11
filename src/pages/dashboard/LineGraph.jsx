import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

const LineGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    Highcharts.chart(chartRef.current, {
      chart: {
        type: 'spline',
        borderRadius: 12,
        zooming: {
          type: 'xy'
        }
      },
    //   title: {
    //     text: 'Monthly Data Overview'
    //   },
     
      xAxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        // title: {
        //   text: 'Month'
        // },
        crosshair: true
      },
      yAxis: {
        min: 100,
        max: 800,
        tickInterval: 100,
        // title: {
        //   text: 'Value'
        // }
      },
      tooltip: {
        valueSuffix: ''
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      series: [
        {
          name: 'Performance',
          data: [150, 300, 450, 400, 600, 750, 700, 650, 500, 550, 300, 200],
          tooltip: {
            valueSuffix: ''
          }
        }
      ]
    });
  }, []);

  return (
    <div ref={chartRef} style={{ width: '100%' }} />
  );
};

export default LineGraph;
