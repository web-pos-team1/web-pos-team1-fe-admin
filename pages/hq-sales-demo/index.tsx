import React, { useEffect, useState } from "react";
import { Chart } from 'chart.js';
import styles from './index.module.css';
import axios from 'axios';
import HqSalesBarChart from "../hq-sales-linechart";
import HqSalesPieChart from "../hq-sales-piechart";
import Sidebar from "../sidebar/Sidebar";
import { mapToBE } from "@/globalFunction/mapToBE";

interface SettlementDataType {
    settlementDate: string, // 정산일자
    storeName: string, // 가게이름
    charge: number, // 수수료
    settlementPrice: number, // 정산가격
    originPrice: number, // 원가
    profit:number, // 이익
}

export default function HqSales() {
    const [settlementDataList, setSettlementDataList] = useState<SettlementDataType[]>([]);
    const handleSalesManageBtnClick = () => {
        console.log("매출관리 clicked!!");
    }
    const handleSettlementManageBtnClick = () => {
        console.log("정산관리 clicked!!");
    }
    const handleRequestProductManageBtnClick = () => {
        console.log("발주관리 clicked!!");
    }
    const handleStockManageBtnClick = () => {
        console.log("재고관리 clicked!!");
    }
    const sideBarMenuList = [
        {
            name: "매출관리",
            handleClick: () => handleSalesManageBtnClick()
        },
        {
            name: "정산관리",
            handleClick: () => handleSettlementManageBtnClick()
        },
        {
            name: "발주관리",
            handleClick: () => handleRequestProductManageBtnClick()
        },
        {
            name: "재고관리",
            handleClick: () => handleStockManageBtnClick()
        },

    ]

    const handleDownload = async () => {
            try {
            const url = mapToBE(
            `/api/v1/hq1/test`
            );
            const urlLocal = 'http://localhost:8080/api/v1/hq/sale-management/list-csv/date=1week/storeId=0/startDate=0/endDate=0';
            const response = await axios.get(urlLocal, {
            responseType: "blob",
            });
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            console.log(downloadUrl);
            const link = document.createElement("a");
            console.log(link);
            link.href = downloadUrl;
            console.log(link.href);
            link.setAttribute("download", "file.csv"); // 파일명 지정
            console.log(link.attributes);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            } catch (error) {
            console.error("Error while downloading file", error);
            }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
            const url = mapToBE(`/api/v1/hq1/sale-management/list/date=1week/storeId=0/startDate=0/endDate=0`)
            const urlLocal = 'http://localhost:8080/api/v1/hq/sale-management/list/date=1week/storeId=0/startDate=0/endDate=0';
            const response = await axios.get(url);
            setSettlementDataList(response.data);
            } catch (error) {
            console.log('Error fetching settlement data:', error);
            }
        };
    
        fetchData();
      }, []);

    return (
        <div className={styles.pageWrapper}>
        <Sidebar />
        <div className={styles.sidebarRight}>
            <div>
                날짜선택
            </div>
            <div className={styles.chartContainer}>
                <HqSalesBarChart />
                <HqSalesPieChart />
            </div>
            <div className={styles.settlementDataListWrapper}>
                <div>
            <span className={styles.settlementDataListTitle}>매출 목록</span>
            <button type="button" onClick={handleDownload}>csv 저장</button>
                <table className={styles.orderListTable}>
                    <thead className={styles.orderListHead}>
                        <tr>
                            <th>정산일자</th>
                            <th>지점명</th>
                            <th>수수료</th>
                            <th>정산금액</th>
                            <th>총원가</th>
                            <th>영업이익</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            settlementDataList.map((item, index) => (
                                <tr key={index} className={styles.orderListBody}>
                                    <td>{item.settlementDate}</td>
                                    <td>{item.storeName}</td>
                                    <td>{item.charge}</td>
                                    <td>{item.settlementPrice}</td>
                                    <td>{item.originPrice}</td>                      
                                    <td>{item.profit}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div>
            </div>
            </div>

        </div>
    );
}