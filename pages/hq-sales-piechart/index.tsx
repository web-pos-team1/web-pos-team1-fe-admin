import React, { useEffect } from "react"
import { Chart } from "chart.js";
import styles from './hq-sales-piechart.module.css';

export default function HqSalesPieChart() {
    useEffect(() => {
        var ctx = document.getElementById('salesPieChartEachStore').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["강남점", "경기점", "광주신세계"],
                datasets: [{
                    data: [1754000, 1500238, 500234],
                    borderColor: [
                        "#3cba9f",
                        "#ffa500",
                        "#c45850",
                    ],
                    backgroundColor: [
                        "rgb(60,186,159,0.1)",
                        "rgb(255,165,0,0.1)",
                        "rgb(196,88,80,0.1)",
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
    }, [])
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
    )
}