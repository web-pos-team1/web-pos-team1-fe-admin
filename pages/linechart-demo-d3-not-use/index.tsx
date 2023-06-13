import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { line } from "d3-shape";

import styles from './hq-sales-barchart.module.css';
import axios from "axios";

interface BarData {
  settlementDayDate: string;
  settlementDaySettlementPrice: number;
}

export default function HqSalesBarChart() {
  const chartRef = useRef<SVGSVGElement>(null);
  const [barData, setBarData] = useState<BarData[]>([]);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    const svgNode = svg.node() as SVGSVGElement;

    const newWidth = svgNode.getAttribute("width");
    const newHeight = svgNode.getAttribute("height");

    if (newWidth && newHeight) {
      setWidth(parseInt(newWidth));
      setHeight(parseInt(newHeight));
    }

    const xScale = d3
      .scaleBand()
      .domain(barData.map((data) => data.settlementDayDate))
      .range([0, width])
      .padding(0.1);
    const maxPrice = d3.max(
      barData.filter((data) => typeof data.settlementDaySettlementPrice === 'number'),
      (data) => data.settlementDaySettlementPrice
    );
    const yScale = d3
      .scaleLinear()
      .domain([0, maxPrice || 0])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const xAxisSelection = svg.select<SVGGElement>(".x-axis");
    xAxisSelection.call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    const yAxisSelection = svg.select<SVGGElement>(".y-axis");
    yAxisSelection.call(yAxis);

    const lineGenerator = line<BarData>()
      .x((data) => xScale(data.settlementDayDate)!)
      .y((data) => yScale(data.settlementDaySettlementPrice));

    svg
      .selectAll(".line")
      .data([barData])
      .join("path")
      .attr("class", styles.line)
      .attr("d", (data) => lineGenerator(data)!);
  }, [barData, width, height]);

  const fetchData = (url: string) => {
    axios
      .get(url)
      .then((res) => {
        console.log("HqSalesBarChart/fetchData()/res: ", res);
        setBarData(res.data);
      })
      .catch((err) => {
        console.log("HqSalesBarChart/fetchData()/err: ", err);
      });
  };

  const handle1WeekBtnClick = () => {
    const url = `http://localhost:8080/api/v1/hq/sale-management/storeId=0/date=1week/startDate=0/endDate=0`;
    fetchData(url);
  };

  const handle1MonthBtnClick = () => {
    const url = `http://localhost:8080/api/v1/hq/sale-management/storeId=0/date=1month/startDate=0/endDate=0`;
    fetchData(url);
  };

  const handle3MonthBtnClick = () => {
    const url = `http://localhost:8080/api/v1/hq/sale-management/storeId=0/date=3month/startDate=0/endDate=0`;
    fetchData(url);
  };

  return ( //ㄹ
    <div className={styles.chartWrapper}>
      <svg ref={chartRef} width={500} height={300}></svg>
      <button onClick={handle1WeekBtnClick}>1 Week</button>
      <button onClick={handle1MonthBtnClick}>1 Month</button>
      <button onClick={handle3MonthBtnClick}>3 Months</button>
    </div>
  );
}
