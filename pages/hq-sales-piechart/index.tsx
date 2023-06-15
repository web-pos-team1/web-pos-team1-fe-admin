import React, { useEffect, useState } from "react";
import { Chart } from "chart.js";
import axios from "axios";
import styles from './hq-sales-piechart.module.css';
import { mapToBE } from "@/globalFunction/mapToBE";

interface ChartData {
    storeName: string;
    settlementPrice: number;
}

export default function HqSalesPieChart() {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [date, setDate] = useState<string>('1week'); //
    const [startDate, setStartDate] = useState<string>('0'); // 2023-12-20
    const [endDate, setEndDate] = useState<string>('0');
    const [inputStartDate, setInputStartDate] = useState<string>('');
    const [inputEndDate, setInputEndDate] = useState<string>('');

    const handle1WeekBtnClick = () => {
        // mapToBE(``)
        // const url = `/sale-management/pie-chart/date=${date}/startDate=${startDate}/endDate=${endDate}`;
        const url = mapToBE(`/api/v1/hq/sale-management/pie-chart/date=${date}/startDate=${startDate}/endDate=${endDate}`);
        // const url = `http://localhost:8080/api/v1/hq/sale-management/pie-chart/date=${date}/startDate=${startDate}/endDate=${endDate}`;
    
        axios.get(url)
        .then((res) => {
            console.log("HqSalesPieChart/useEffect()/res: ", res);
            setChartData(res.data);
        })
        .catch((err) => {
            console.log("HqSalesPieChart/useEffect()/err: ", err);
        });        
    }
    const handle1MonthBtnClick = () => {
        // const url = `http://localhost:8080/api/v1/hq/sale-management/pie-chart/date=1month/startDate=${startDate}/endDate=${endDate}`;
        const url = mapToBE(`/api/v1/hq/sale-management/pie-chart/date=1month/startDate=${startDate}/endDate=${endDate}`);
        axios.get(url)
        .then((res) => {
            console.log("HqSalesPieChart/useEffect()/res: ", res);
            setChartData(res.data);
        })
        .catch((err) => {
            console.log("HqSalesPieChart/useEffect()/err: ", err);
        });
    }
    const handle3MonthBtnClick = () => {
        // const url = `http://localhost:8080/api/v1/hq/sale-management/pie-chart/date=3month/startDate=${startDate}/endDate=${endDate}`;
        const url = mapToBE(`/api/v1/hq/sale-management/pie-chart/date=3month/startDate=${startDate}/endDate=${endDate}`);
        axios.get(url)
        .then((res) => {
            console.log("HqSalesPieChart/useEffect()/res: ", res);
            setChartData(res.data);
        })
        .catch((err) => {
            console.log("HqSalesPieChart/useEffect()/err: ", err);
        });
    }
    const handleStartDateChange = (e: any) => {
        setInputStartDate(e.target.value);
    }

    const handleEndDateChange = (e: any) => {
        setInputEndDate(e.target.value);
    }
    // 범위검색(range query)
    const handleSearchBtnClick = () => {
        // const url = `http://localhost:8080/api/v1/hq/sale-management/pie-chart/date=term/startDate=${inputStartDate}/endDate=${inputEndDate}`;
        const url = mapToBE(`/api/v1/hq/sale-management/pie-chart/date=term/startDate=${inputStartDate}/endDate=${inputEndDate}`);
        axios.get(url)
        .then((res) => {
            console.log("HqSalesPieChart/useEffect()/res: ", res);
            console.log("You are url", url);
            console.log(res.data); 
            setChartData(res.data);
        })
        .catch((err) => {
            console.log("HqSalesPieChart/useEffect()/err: ", err);
        })
    }

    useEffect(() => {
        const updateChart = () => {
            var ctx = document.getElementById('salesPieChartEachStore').getContext('2d'); // 이건 고려하지 않아도 되는 에러
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
