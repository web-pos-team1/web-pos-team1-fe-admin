import React, { useEffect, useState } from "react";
import { Chart } from 'chart.js';
import styles from './hq-sales2.module.css'; // 이름이 달라져서 생긴 에러 해결
import axios from 'axios';
import HqSalesBarChart from "../hq-sales-linechart";
import HqSalesPieChart from "../hq-sales-piechart";
import Sidebar from "../sidebar/Sidebar";
import MainLayout from "@/components/layouts/mainLayout";
import Image from "next/image";
import { mapToBE } from "@/globalFunction/mapToBE";
import { StoreType } from "@/types/StoreType";
import { TermType } from "@/types/TermType";

const initTermDataList = [
    {
        "id": 1,
        "name": "1주일",
    },
    {
        "id": 2,
        "name": "1개월",
    },
    {
        "id": 3,
        "name": "3개월",
    }
];

export default function HqSales2(
    // props: {date: string, storeId?: number, startDate: string, endDate: string }
) { const [date, setDate] = useState<string>('');
    const [storeId, setStoreId] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('2023-06-11'); // 기본 값 0, 기간별 조회를 할 때 yyyy-mm-dd 형식 입력
    const [endDate, setEndDate] = useState<string>('2023-06-18'); // 기본 값 0

    const [storeList, setStoreList] = useState<StoreType[]>([]);
    const [termList, setTermList] = useState<TermType[]>(initTermDataList);
    const [activeStoreState, setActiveStoreState] = useState<boolean[]>([]);    
    const [activeTermState, setActiveTermState] = useState<boolean[]>([]);

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
    const handleStartDateChange = (e: any) => {
        setStartDate(e.target.value);
    }
    const handleEndDateChange = (e: any) => {
        setEndDate(e.target.value);
    }

    // useEffect(() => {
    //     const url = `http://localhost:4000/salesBarChartLabelList`
    //     axios.get(url)
    //     .then((res: any) => setSettlementDataList(res.data))
    //     .catch((err: any) => console.log("err: ", err));
    // }, [])

    const handleStoreBtnClick = (id: number) => {
        let selectedStoreId = 0;
        for (let i = 0; i < activeStoreState.length; i++) {
            if (id === i) {
                activeStoreState[i] = true;
                selectedStoreId = i;
            } else {
                activeStoreState[i] = false;
            }
        }
        // let url = ''
        // Object.entries(category_map).map(([key, value]) => {
        //     if (value === id) {
        //         url = `/products/` + key;
        //     }
        // })
        
        setActiveStoreState([...activeStoreState]);
        // **axios 호출 다시**
    }

    const handleTermBtnClick = (id: number) => {
        let selectedTermId = 0;
        for (let i = 0; i < activeTermState.length; i++) {
            if (id === i) {
                activeTermState[i] = true;
                selectedTermId = i;
            } else {
                activeTermState[i] = false;
            }
        }
        setActiveTermState([...activeTermState]);

    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            // const url = 'http://localhost:8080/api/v1/hq/sale-management/list/date=1week/storeId=0/startDate=0/endDate=0';
            const url = mapToBE(`/api/v1/hq/sale-management/list/date=1week/storeId=0/startDate=0/endDate=0`);
            const response = await axios.get(url);
            setSettlementDataList(response.data);
          } catch (error) {
            console.log('Error fetching settlement data:', error);
          }
        };

        fetchData();

        const url_storeList = mapToBE(`/api/v1/manager/store-name`);
        axios.get(url_storeList)
        .then((res) => {
            console.log("res2: ", res);
            let resDataList = [{'id': 0, 'storeName': '전체'}, {'id': 9, 'storeName': '본점'}];
            for (let s = 0; s < res.data.length; s++) {
                if (res.data[s].storeName === '본점'){
                    continue;
                }
                resDataList.push(res.data[s]);
            }
            setStoreList(resDataList);
            let aStoreStateList: boolean[] = [true];
            for (let i = 0; i < res.data.length; i++) {
                aStoreStateList.push(false);
                setActiveStoreState([...aStoreStateList]);
            }
        })

        
        let aTermStateList: boolean[] = [];
        for (let i = 0; i < initTermDataList.length; i++) {
            // 처음엔 "1주일"이 기본선택되도록
            if (i===0) {
                aTermStateList.push(true);
            } else {
                aTermStateList.push(false);
            }
            setActiveTermState([...aTermStateList]);
        }
      }, []);

    return (
        <div className={styles.pageWrapper}>
        <Sidebar 
            selectedPageName="hq-sales"
        />
        <div className={styles.sidebarRight}>
            <div style={{ fontWeight: 'bold', color: 'white', fontSize: '20px' }}>
                매출관리
            </div>
            <div className={styles.storeListWrapper}>
                        <ul>
                            {
                                storeList.map((store: StoreType, index: number) => (
                                    <li key={index} onClick={() => handleStoreBtnClick(index)} className={activeStoreState[index] ? `${styles.active}` : `${styles.deactive}`}>
                                        {store.storeName}
                                    </li>
                                ))
                            }
                        </ul>
            </div>
            <div className={styles.storeListWrapper}>
                <ul>
                    {
                        termList.map((term: TermType, index: number) => (
                            <li key={index} onClick={() => handleTermBtnClick(index)} className={activeTermState[index] ? `${styles.active}` : `${styles.deactive}`}>
                                {term.name}
                            </li>
                        ))
                    }
                    
                        
                    <li className={styles.calendarStartDateInputBox}>
                            <Image
                            src="/images/calendar.png"
                            alt="cancel"
                            className={styles.calendarIcon}
                            width={20}
                            height={20}
                        />
                        <input type="text" size={10} value={startDate} onChange={handleStartDateChange} />
                    </li>
                    <li className={styles.calendarCenter}>
                    ~
                    </li>
                    <li className={styles.calendarEndDateInputBox}>
                    <Image
                            src="/images/calendar.png"
                            alt="cancel"
                            className={styles.calendarIcon}
                            width={20}
                            height={20}
                        />
                        <input type="text" size={10} value={endDate} onChange={handleEndDateChange} />
                    </li>
                </ul>
                </div>
            <div className={styles.chartContainer}>
                <HqSalesBarChart 
                    date={date}
                    storeId={storeId}
                    startDate={startDate}
                    endDate={endDate}
                />
                <HqSalesPieChart 
                    date={date}
                    storeId={storeId}
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
            {/* <div className={styles.settlementDataListWrapper}>

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
                </div> */}
            </div>
        </div>
    );
}

HqSales2.getLayout = function getLayout(page:React.ReactNode) {
    return (
        <MainLayout
            role='hq'
            name='권*진'
        >
            {page}
        </MainLayout>
    )
}
