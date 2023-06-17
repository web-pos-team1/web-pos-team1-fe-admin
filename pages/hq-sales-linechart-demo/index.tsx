import React, { useEffect, useState } from "react";
import styles from './hq-sales-barchart.module.css';
import { Chart } from 'chart.js';
import axios from "axios";
import { mapToBE } from "@/globalFunction/mapToBE";

interface BarData {
  settlementDayDate: string;
  settlementDaySettlementPrice: number;
}

interface HqSalesBarChartProps {
  chartDate: string;
  storeId: number;
  startDate: string;
  endDate: string;
}

export default function HqSalesBarChart1(props: HqSalesBarChartProps) {
  const [barData, setBarData] = useState<BarData[] | null>(null);

  useEffect(() => {
    const urlTotal = mapToBE(`/api/v1/hq/sale-management/storeId=${props.storeId}/date=${props.chartDate}/startDate=${props.startDate}/endDate=${props.endDate}`);

    axios.get(urlTotal)
      .then((res) => {
        console.log("HqSalesBarChart/useEffect()/res: ", res);
        setBarData(res.data);
      })
      .catch((err) => {
        console.log("HqSalesBarChart/useEffect()/err: ", err);
      });
  }, [props.chartDate, props.storeId, props.startDate, props.endDate]);

  useEffect(() => {
    if (barData && barData.length > 0) {
      var ctx = document.getElementById('salesBarChartWithPeriod').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: barData.map(data => data.settlementDayDate),
          datasets: [{
            data: barData.map(data => data.settlementDaySettlementPrice),
            label: '매출',
            borderColor: "rgb(109, 253, 181)",
            backgroundColor: "rgb(109, 253, 181,0.5)",
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          parsing: false,
          animation: false,
          hover: {
            mode: 'label'
          },
          scales: {
            xAxes: [{
              display: true,
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                steps: 1000000,
                stepValue: 100000,
                max: 30000000
              }
            }]
          }
        }
      });

      return () => {
        // Cleanup chart instance if component unmounts
        myChart.destroy();
      };
    }
  }, [barData]);

  return (
    <>
      <div className={styles.chartWrapper}>
        <p>매출 추이</p>
        <div className={styles.chartContent}>
          <canvas id="salesBarChartWithPeriod"></canvas>
        </div>
      </div>
    </>
  );
}
