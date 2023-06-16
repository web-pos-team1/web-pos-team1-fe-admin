import React, { useEffect, useState } from "react";
import { Chart } from 'chart.js';
import styles from './index.module.css';
import axios from 'axios';
import HqSalesBarChart from "../hq-sales-linechart";
import HqSalesPieChart from "../hq-sales-piechart";
import Sidebar from "../sidebar/Sidebar";
import { mapToBE } from "@/globalFunction/mapToBE";



        // let url = ''
        // Object.entries(category_map).map(([key, value]) => {
        //     if (value === id) {
        //         url = `/products/` + key;
        //     }
        // })
        

        // **axios 호출 다시**
    

    // useEffect(() => {
    //     const url = `http://localhost:4000/salesBarChartLabelList`
    //     axios.get(url)
    //     .then((res: any) => setSettlementDataList(res.data))
    //     .catch((err: any) => console.log("err: ", err));
    // }, [])
    interface SettlementDataType {
        settlementDate: string, // 정산일자
        storeName: string, // 가게이름
        charge: number, // 수수료
        settlementPrice: number, // 정산가격
        originPrice: number, // 원가
        profit: number, // 이익
        orderDate: string,
        orderStatus: string,
      }
      
      interface StoreType {
        id: number,
        storeName: string
      }
      interface TermType {
        name: string;
      }
      
      
      export default function HqSales() {
        const [settlementDataList, setSettlementDataList] = useState<SettlementDataType[]>([]);
        const [activeStoreState, setActiveStoreState] = useState<boolean[]>([]);
        const [storeList, setStoreList] = useState<StoreType[]>([]);
        const [termList, setTermList] = useState<TermType[]>([]); // Add termList state
        const [activeTermState, setActiveTermState] = useState<boolean[]>([]); // Add activeTermState state
        const [startDate, setStartDate] = useState<string>('0');
        const [endDate, setEndDate] = useState<string>('0');
        
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
            handleClick: handleSalesManageBtnClick
          },
          {
            name: "정산관리",
            handleClick: handleSettlementManageBtnClick
          },
          {
            name: "발주관리",
            handleClick: handleRequestProductManageBtnClick
          },
          {
            name: "재고관리",
            handleClick: handleStockManageBtnClick
          },
        ];
      
        useEffect(() => {
          const fetchStoreList = async () => {
            try {
              const response = await axios.get('http://localhost:8080/api/v1/manager/store-name');
              const storeListData: StoreType[] = response.data;
              setStoreList(storeListData);
              const aStoreStateList: boolean[] = storeListData.map(store => store.storeName === '센텀시티점');
              setActiveStoreState(aStoreStateList);
            } catch (error) {
              console.log('Error fetching store list:', error);
            }
          };
      
          fetchStoreList();
        }, []);
        const handleStartDateChange = (e: any) => {
            setStartDate(e.target.value);
        }
        const handleEndDateChange = (e: any) => {
            setEndDate(e.target.value);
        }
      
        const handleStoreBtnClick = (id: number) => {
          const updatedStoreState = activeStoreState.map((state, index) => index === id);
          setActiveStoreState(updatedStoreState);
          // TODO: Make axios call using selected store id
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
                    <div className={styles.termListWrapper}>
          <ul>
            {termList.map((term: TermType, index: number) => (
              <li
                key={index}
                onClick={() => handleTermBtnClick(index)}
                className={activeTermState[index] ? `${styles.active}` : `${styles.deactive}`}
              >
                {term.name}
              </li>
            ))}
            <div className={styles.calendarInputBoxWrapper}>
              <li className={styles.calendarStartDateInputBox}>
                <input type="text" value={startDate} onChange={handleStartDateChange} />
              </li>
              <li className={styles.calendarEndDateInputBox}>
                <input type="text" value={endDate} onChange={handleEndDateChange} />
              </li>
            </div>
          </ul>
        </div>
                <div className={styles.chartContainer}>
                    <HqSalesBarChart />
                    
                </div>
             
                <div className={styles.settlementDataListWrapper}>


                    <div className={styles.orderListTableContainer}>
                    <div className={styles.settlementDataListTitle}>매출 목록</div>
                    <table className={styles.orderListTable}>
                        <thead className={styles.orderListHead}>
                            <tr>
                                <th className={styles.settlementDate}>정산일자</th>
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
                                <div className={styles.piechartcontainer}>
                    <HqSalesPieChart />
                    </div>
                    </div>
                    
            </div>

        </div>
    );
}