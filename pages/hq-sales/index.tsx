import React, { useEffect, useState } from "react";
import { Chart } from 'chart.js';
import styles from './hqSales.module.css';
import axios from 'axios';
import HqSalesBarChart from "../hq-sales-linechart";
import HqSalesPieChart from "../hq-sales-piechart";
import Sidebar from "../sidebar/Sidebar";
// import { CalendarComponent } from "../ToggleCalendar/Calendar";
import { SettlementDataType } from "@/types/SettlementDataTyle";
import { NextPageWithLayout } from "../_app";
import Layout from "@/components/layouts/layout";
import MainLayout from "@/components/layouts/mainLayout";

const HqSales: NextPageWithLayout = () => {

    interface SettlementDataType {
        settlementDate: string, // 정산일자
        storeName: string, // 가게이름
        charge: number, // 수수료
        settlementPrice: number, // 정산가격
        originPrice: number, // 원가
        profit:number, // 이익
    }

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

    ];
    const [value, setValue] = useState(new Date());
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
                <p>매출관리</p>
            </div>
            {/* <CalendarComponent 
            /> */}
            <div className={styles.chartContainer}>
                <HqSalesBarChart />
                <HqSalesPieChart />
            </div>
            <div className={styles.settlementDataListWrapper}>
            
                <div className={styles.settlementDataListTitle}>일일 정산 목록</div>
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
    );
}
HqSales.getLayout = function getLayout(page:React.ReactNode) {
    return (
        <MainLayout
            role='hq'
            name='권*진'
        >
            {page}
        </MainLayout>
    )
}

export default HqSales;