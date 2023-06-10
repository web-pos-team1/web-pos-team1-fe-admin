import React, { useEffect, useState } from "react";
import styles from './hq-sales-barchart.module.css';
import { Chart } from 'chart.js';

export default function HqSalesBarChart() {
    useEffect(() => {

        var ctx = document.getElementById('salesBarChartWithPeriod').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["05.12", "05.13", "05.14", "05.15", "05.16", "05.17"],
                datasets: [{
                    data: [3000000, 4000000, 2500000, 3000000, 3500000, 7000000],
                    label: '매출',
                    borderColor: "rgb(109, 253, 181)",
                    backgroundColor: "rgb(109, 253, 181,0.5)",
                    borderWidth: 2
                }]
            },
        });
    }, [])
    return (
        <>
            <div className={styles.chartWrapper}>
                <p>매출 추이</p>
                <div className={styles.chartContent}>
                  <canvas id='salesBarChartWithPeriod'></canvas>  
                </div>
            </div>
        </>
            
    );
}