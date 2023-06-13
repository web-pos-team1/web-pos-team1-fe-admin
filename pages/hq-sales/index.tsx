import React, { useEffect, useState } from "react";
import { Chart } from 'chart.js';
import styles from './index.module.css';
import axios from 'axios';
import HqSalesBarChart from "../hq-sales-barchart";
import HqSalesPieChart from "../hq-sales-piechart";
import Sidebar from "../sidebar/Sidebar";

interface SettlementDataType {
    orderSerialNumber: string, // '2023051102010001'
    branchName: string, // '강남점'
    orderDate: string, // '2023.05.11'
    orderStatus: string, // '성공'
    orderMethod: string, // '카드'
    totalPrice: number, // 80000
    couponUsePrice?: number, // 10000 
    poinUsePrice?: number, // 1000
    finalTotalPrice: number, // 100000
    charge: number, // 10000
    totalOriginPrice: number, // 10000
    profit: number // 100000
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
    useEffect(() => {
        const url = `http://localhost:4000/salesBarChartLabelList`
        axios.get(url)
        .then((res: any) => setSettlementDataList(res.data))
        .catch((err: any) => console.log("err: ", err));
    }, [])
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
            
                <div className={styles.settlementDataListTitle}>매출 목록</div>
                <table className={styles.orderListTable}>
                    <thead className={styles.orderListHead}>
                        <tr>
                            <th>주문번호</th>
                            <th>지점명</th>
                            <th>주문일자</th>
                            <th>결제상태</th>
                            <th>결제수단</th>
                            <th>총주문금액</th>
                            <th>상품권금액</th>
                            <th>포인트사용액</th>
                            <th>최중주문금액</th>
                            <th>수수료</th>
                            <th>총원가</th>
                            <th>영업이익</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            settlementDataList.map((item, index) => (
                                <tr key={index} className={styles.orderListBody}>
                                    <td>{item.orderSerialNumber}</td>
                                    <td>{item.branchName}</td>
                                    <td>{item.orderDate}</td>
                                    <td>{item.orderStatus}</td>
                                    <td>{item.orderMethod}</td>
                                    <td>{item.totalPrice}</td>                      
                                    <td>{item.couponUsePrice}</td>
                                    <td>{item.poinUsePrice}</td>
                                    <td>{item.finalTotalPrice}</td>
                                    <td>{item.charge}</td>
                                    <td>{item.totalOriginPrice}</td>
                                    <td>{item.profit}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div>
            </div>

        </div>
    );
}