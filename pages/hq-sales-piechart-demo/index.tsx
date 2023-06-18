import React, { useEffect, useState } from "react";
import { Chart } from "chart.js";
import axios from "axios";
import styles from './hq-sales-piechart.module.css';
import { mapToBE } from "@/globalFunction/mapToBE";

interface ChartData {
    storeName: string;
    settlementPrice: number;
}

interface HqSalesBarChartProps {
    chartDate: string;
    startDate: string;
    endDate: string;
}

export default function HqSalesPieChart1(
    props: HqSalesBarChartProps
) {
    const [chartData, setChartData] = useState<ChartData[] | null>(null);

    useEffect(() => {
        const urlTotal = mapToBE(`/api/v1/hq/sale-management/pie-chart/date=${props.chartDate}/startDate=${props.startDate}/endDate=${props.endDate}`);

        axios.get(urlTotal)
            .then((res) => {
                console.log("HqSalesPieChart1/useEffect()/res: ", res);
                setChartData(res.data);
                console.log("res 받았다" +props.chartDate+ props.startDate + props.endDate);
            })
            .catch((err) => {
                console.log("HqSalesPieChart1/useEffect()/err: ", err);
            });
    }, [props.chartDate, props.startDate, props.endDate]);

    useEffect(() => {
        if (chartData && chartData.length > 0) {
            const updateChart = () => {
                var ctx = document.getElementById('salesPieChartEachStore').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: chartData.map(data => data.storeName),
                        datasets: [{
                            data: chartData.map(data => data.settlementPrice),
                            borderColor: [
                                "#FFFFFF",
                                "#FFFFFF",
                                "#FFFFFF",
                                "#FFFFFF",
                                "#FFFFFF",
                                "#FFFFFF",
                                "#FFFFFF",
                                "#FFFFFF",
                                "#FFFFFF",
                                "#FFFFFF",
                                "#FFFFFF",
                                "#FFFFFF",
                                "#FFFFFF",
                                "#FFFFFF",
                            ],
                            backgroundColor: [
                                "#404040",
                                "#2E8B57",
                                "#000080",
                                "#800080",
                                "#FFFF00",
                                "#FFA500",
                                "#FF0000",
                                "#FFC0CB",
                                "#87CEEB",
                                "#808080",
                                "#00FF00",
                                "#008000",
                                "#FFFFFF",
                            ],
                            borderWidth: 2,
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                display: false,
                            }],
                            yAxes: [{
                                display: false,
                            }],
                        }
                    },
                });
            };

            updateChart();
        }
    }, [chartData]);

    return (
        <>
            {/* Pie chart */}
            <div className={styles.chartWrapper}>
                <p>지점별 매출분포</p>
                <div className={styles.chartContent}>
                    <canvas id='salesPieChartEachStore'></canvas>
                </div>
            </div>
        </>
    );
}
