import React, { useEffect, useState } from "react";
import { Chart } from "chart.js";
import axios from "axios";
import styles from './hq-sales-piechart.module.css';
import { mapToBE } from "@/globalFunction/mapToBE";

interface ChartData {
    storeName: string;
    settlementPrice: number;
}

export default function HqSalesPieChart(
    props: {
        date?: string
    }
) {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [date, setDate] = useState<string>('1week'); //
    const [startDate, setStartDate] = useState<string>('0'); // 2023-12-20
    const [endDate, setEndDate] = useState<string>('0');
    const [inputStartDate, setInputStartDate] = useState<string>('0');
    const [inputEndDate, setInputEndDate] = useState<string>('0');

    const handle1WeekBtnClick = () => {
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
            const url = mapToBE(`/api/v1/hq/sale-management/pie-chart/date=${date}/startDate=${inputStartDate}/endDate=${inputEndDate}`);
            axios.get(url)
            .then((res: any) => {
                console.log("res: ", res);
                var ctx = document.getElementById('salesPieChartEachStore').getContext('2d'); // 이건 고려하지 않아도 되는 에러
                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: res.data.map((data: any) => data.storeName),// chartData.map(data => data.storeName),
                        datasets: [{
                            data: res.data.map((data: any) => data.settlementPrice),// chartData.map(data => data.settlementPrice),
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
                                // "#000000",
                                // "#3a9999",
                                // "#2d2d6e",
                                // "#623162",
                                // "#929200",
                                // "#8c5b2e",
                                // "#8c2e2e",
                                // "#9c7479",
                                // "#6c8994",
                                // "#6f6f6f",
                                // "#007f00",
                                // "#003f00",
                                // "#bfbfbf",
                                //
                                "#a6c4c9",
"#b8d1cc",
"#c8dece",
"#d8ebd0",
"#e8f8d2",
"#f5fbd3",
"#f5e9d4",
"#f4d6d5",
"#f4c4d6",
"#f3b2d7",
"#f2a0d8",
"#f18ed9",
"#f07cd9",
                                //
                                // "#707070",
                                // "#488f64",
                                // "#32327a",
                                // "#663366",
                                // "#a5a500",
                                // "#996633",
                                // "#993333",
                                // "#b2878c",
                                // "#7d9ea8",
                                // "#808080",
                                // "#007f00",
                                // "#004c00",
                                // "#cccccc",
                                //
                                // "#404040",
                                // "#2E8B57",
                                // "#000080",
                                // "#800080",
                                // "#FFFF00",
                                // "#FFA500",
                                // "#FF0000",
                                // "#FFC0CB",
                                // "#87CEEB",
                                // "#808080",
                                // "#00FF00",
                                // "#008000",
                                // "#FFFFFF",
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
                })
            })
            };
        updateChart();
    }, [chartData]);

    return (
        <>
            {/* Pie chart */}
            <div className={styles.chartWrapper}>
                <p>지점별 매출분포</p>
                <canvas id='salesPieChartEachStore' className={styles.pieChartContent}></canvas>
            </div>
        </>
    );
}
