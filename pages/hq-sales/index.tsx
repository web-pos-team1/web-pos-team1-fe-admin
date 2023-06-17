import React, { useEffect, useState } from "react";
import { Chart } from 'chart.js';
import styles from './hqSales.module.css'; // 이름이 달라져서 생긴 에러 해결
import axios from 'axios';
import HqSalesBarChart from "../hq-sales-linechart";
import HqSalesPieChart from "../hq-sales-piechart";
import Sidebar from "../sidebar/Sidebar";
import MainLayout from "@/components/layouts/mainLayout";


export default function HqSales(
    // props: {date: string, storeId?: number, startDate: string, endDate: string }
) { const [date, setDate] = useState<string>('');
    const [storeId, setStoreId] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('0'); // 기본 값 0, 기간별 조회를 할 때 yyyy-mm-dd 형식 입력
    const [endDate, setEndDate] = useState<string>('0'); // 기본 값 0
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

    ]

    // useEffect(() => {
    //     const url = `http://localhost:4000/salesBarChartLabelList`
    //     axios.get(url)
    //     .then((res: any) => setSettlementDataList(res.data))
    //     .catch((err: any) => console.log("err: ", err));
    // }, [])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/v1/hq/sale-management/list/date=1week/storeId=0/startDate=0/endDate=0');
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
                <HqSalesBarChart 
                    date={date}
                    storeId={storeId}
                    startDate={startDate}
                    endDate={endDate}
                />
                <HqSalesPieChart 
                />
            </div>
            <div className={styles.settlementDataListWrapper}>

                <div className={styles.settlementDataListTitle}>매출 목록</div>
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
