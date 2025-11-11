import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DonutChart = ({grpData}) => {
    // (Number(grpData?.part9)/grpData?.part13 *100)/grpData?.part13
    // console.log('(Number(grpData?.part9)/grpData?.part13 *100)/grpData?.part13: ', (Number(grpData?.part9) * 100)/grpData?.part13);
    // console.log('DonutChartData: ', DonutChartData);

    //   const weeklyData = DonutChartData?.week?.data || [];

    //   // Extract data for Monthly and Weekly datasets
    //   const weekValue = weeklyData?.map((item) =>
    //     parseInt(item?.daily_total_sales, 10)
    //   );

    const chartRef = useRef(null);

    useEffect(() => {
        if (!grpData) return;
        if (chartRef.current) {
            const chart = Highcharts.chart(chartRef.current, {
                chart: {
                    type: 'pie',
                    height: 300,
                    backgroundColor: 'transparent',
                    //   spacing: [0, 0, 0, 0],
                    custom: {},
                    events: {
                        render() {
                            const chart = this,
                                series = chart.series[0];
                            let customLabel = chart.options.chart.custom.label;

                            if (!customLabel) {
                                customLabel = chart.options.chart.custom.label =
                                    chart.renderer.label(
                                        `<div className="text-center" style="text-align: center; text-align: center;">
                                        <span style="font-size: 28px;font-weight: bold; ">${grpData?.part13}</span>
                                        <span className="text-center" style="font-size: 22px; font-weight: bold ; text-align:center;"></span><br/>
                                </div>`, 0,
                                        0,
                                        'html'
                                    )
                                        .add();
                            }

                            const x = series.center[0] + chart.plotLeft - (customLabel.getBBox().width / 2);
                            const y = series.center[1] + chart.plotTop - (customLabel.getBBox().height / 2);

                            customLabel.attr({ x,  y });
                        }
                    }
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                tooltip: {
                    pointFormat: ''
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    pie: {
                        innerSize: '70%',
                        size: '100%',
                        borderWidth: 6,
                        borderRadius: 8,
                        borderColor: '#D2F1F9',
                        dataLabels: { enabled: false },
                        allowPointSelect: false,
                        startAngle: 0,
                        endAngle: 360,
                        slicedOffset: 0,
                    }
                },
                colors: ['#FF741F', '#B399FF', '#B5D35B', '#FCF45F'], // ✅ custom colors

                series: [{
                    name: 'Registrations',
                    colorByPoint: true,
                    data: [{
                        name: 'Purchases',
                        y: Number(grpData?.part9)
                    }, {
                        name: 'Signups',
                        y: Number(grpData?.part10)
                    }, {
                        name: 'Milestones',
                        y: Number(grpData?.part11)
                    }, {
                        name: 'Referrals',
                        y: Number(grpData?.part12)
                    }]
                }]
            });
        }
    }, [grpData]);

    return (
        <div className="highcharts-figure">
            <div ref={chartRef} className='donutChart-style' id="container"></div>
            {/* <div className='text-dark text-center fw-bold fs-5'>Total Sale</div> */}
        </div>
    );
};

export default DonutChart;
