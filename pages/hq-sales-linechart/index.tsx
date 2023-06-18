import React, { useEffect, useState } from "react";
import styles from './hq-sales-barchart.module.css';
import { Chart } from 'chart.js';
import axios from "axios";
import { mapToBE } from "@/globalFunction/mapToBE";
interface BarData { // 이름은 BarData지만 LineData를 나타낸다.
    settlementDayDate: string;
    settlementDaySettlementPrice: number;
}

interface HqSalesBarChartProps {  
    chartDate: string,
    storeId: number;
    startDate: string;
    endDate: string;
}

export default function HqSalesBarChart(
    props: HqSalesBarChartProps
) {
    const [barData, setBarData] = useState<BarData[]>([]);
    const [inputStartDate, setInputStartDate] = useState<string>('0');
    const [inputEndDate,setInputEndDate] = useState<string>('0');
    const [chartDate,setChartDate] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('0'); // 2023-12-20
    const [endDate, setEndDate] = useState<string>('0');
    const [storeId, setStoreId] = useState<number>(0);  
    const [date, setDate] = useState<string>('1month'); // 1week, 1month, 3month  
    
    const urlTotal = mapToBE(`/api/v1/hq/sale-management/storeId=${props.storeId}/date=${props.chartDate}/startDate=${props.startDate}/endDate=${props.endDate}`);
    
    // 실행되지 않았던 이유 : 클릭을 해야 실행되는 매서드만 있어서
    const handle1WeekBtnClick = () => {
        // const url = mapToBE(`/api/v1/hq/sale-management/storeId=${storeId}/date=${date}/startDate=${startDate}/endDate=${endDate}`);
        axios.get(urlTotal)
        .then((res) => {
            console.log("HqSalesPieChart/useEffect()/res: ", res);
            setBarData(res.data);
        })
        .catch((err) => {
            console.log("HqSalesPieChart/useEffect()/err: ", err);
        });        
    }

    // 전체 조회 한달
    const handle1MonthBtnClick = () => {
        // const url = `http://localhost:8080/api/v1/hq/sale-management/storeId=0/date=1month/startDate=0/endDate=0`;
        const url = mapToBE(`/api/v1/hq/sale-management/storeId=0/date=1month/startDate=0/endDate=0`);
        axios.get(url)
        .then((res) => {
            console.log("HqSalesPieChart/useEffect()/res: ", res);
            setBarData(res.data);
        })
        .catch((err) => {
            console.log("HqSalesPieChart/useEffect()/err: ", err);
        });        
    }

    // 전체 조회 3달
    const handle3MonthBtnClick = () => {
        // const url = `http://localhost:8080/api/v1/hq/sale-management/storeId=0/date=3month/startDate=0/endDate=0`;
        const url = mapToBE(`/api/v1/hq/sale-management/storeId=0/date=3month/startDate=0/endDate=0`);
        axios.get(url)
        .then((res) => {
            console.log("HqSalesPieChart/useEffect()/res: ", res);
            setBarData(res.data);
        })
        .catch((err) => {
            console.log("HqSalesPieChart/useEffect()/err: ", err);
        });        
    }

    // 전체 조회 기간별
    const handleStartDateChange = (e: any) => {
        setInputStartDate(e.target.value);
    }

    const handleEndDateChange = (e: any) => {
        setInputEndDate(e.target.value);
    }

    const handleSearchBtnClick = () => {
        // const url = `http://localhost:8080/api/v1/hq/sale-management/storeId=0/date=term/startDate=${inputStartDate}/endDate=${inputEndDate}`;
        const url = mapToBE(`/api/v1/hq/sale-management/storeId=2/date=term/startDate=${inputStartDate}/endDate=${inputEndDate}`);
        axios.get(url)
        .then((res) => {
            console.log("HqSalesPieChart/useEffect()/res: ", res);
            console.log("You are url", url);
            console.log(res.data); 
            setBarData(res.data);
        })
        .catch((err) => {
            console.log("HqSalesPieChart/useEffect()/err: ", err);
        })
    }



    useEffect(() => {

        const url = mapToBE(`/api/v1/hq/sale-management/storeId=2/date=${date}/startDate=${inputStartDate}/endDate=${inputEndDate}`);
        axios.get(url)
        .then((res: any) => {
            console.log("res: ", res);
            var ctx = document.getElementById('salesBarChartWithPeriod').getContext('2d');
            var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: res.data.map((data: any) => data.settlementDayDate) ,//barData.map(data => data.settlementDayDate), // String에서 string으로 변경하니 에러 없어짐
                datasets: [{
                    data:  res.data.map((data: any) => data.settlementDaySettlementPrice),// barData.map(data => data.settlementDaySettlementPrice),
                    label: '매출',
                    // borderColor: "rgb(109, 253, 181)",
                    // borderColor: "rgb(76, 48, 79, 181)",
                    borderColor: "rgb(76, 48, 79)",
                    // backgroundColor: "rgb(109, 253, 181, 0.5)",
                    backgroundColor: "rgb(76, 48, 79, 0.5)",
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true, // 기존에 원래 있던 것
                parsing: false, // 새로 추가한 것
                legend: {
                    display: false
                },
                animation: false,
                // label:false,
                // hover: {
                //     mode: 'label'
                // },
                scales: {
                    xAxes: [{
                            display: true,
                        }],
                    yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                steps: 1000000, // 1551
                                stepValue: 100000,
                                max: 30000000
                            }
                        }]
                }
            }
        })
        });
    }, [barData]) // 원래 []이었는데 []안에 barData 넣으니까 해결됨
    return (
        <>
            <div className={styles.chartWrapper}>
                <div className={styles.chartTitle}>매출 추이</div>
                <div className={styles.chartContent}>
                  <canvas id='salesBarChartWithPeriod' className={styles.lineChartData}></canvas>  
                </div>
            </div>
        </>
            
    );
}