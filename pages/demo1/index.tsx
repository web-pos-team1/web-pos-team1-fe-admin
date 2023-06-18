import React, { useEffect, useState } from "react";
import styles from './index.module.css';
import axios from 'axios';
import { Chart } from 'chart.js';
import HqSalesBarChart from "../hq-sales-linechart";
import HqSalesPieChart from "../hq-sales-piechart";
import Sidebar from "../sidebar/Sidebar";
import { mapToBE } from "@/globalFunction/mapToBE";
import HqSalesBarChart1 from "../hq-sales-linechart-demo";
import HqSalesPieChart1 from "../hq-sales-piechart-demo";
import CSVDownloadButton from "../button2";

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
        const [chartDate, setChartDate] = useState("1week");
        const [storeId, setStoreId] = useState(0);
        const [inputStartDate, setInputStartDate] = useState<string>('');
        const [inputEndDate, setInputEndDate] = useState<string>('');
        
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

        // 일주일 버튼
        const handle1WeekBtnClick = () => {
          setChartDate("1week");
          setStartDate("0");
          setEndDate("0");
          setStoreId(0);
        }

        useEffect(() => {
        }, [chartDate, startDate, endDate, storeId]);

        // 1달 버튼
        const handle1MonthBtnClick = () => {
          setChartDate("1month");
          setStartDate("0");
          setEndDate("0");
          setStoreId(0);
          
        }

        // 3달 버튼
        const handle3MonthBtnClick = () => {
          setChartDate("3month");
          setStartDate("0");
          setEndDate("0");
          setStoreId(0);
        }

        // 기간별 버튼
        const handleTermBtnClick1 = () => {
          setChartDate("term");
          setStartDate("0");
          setEndDate("0");
          setStoreId(0);
        }

        useEffect(() => {
          console.log(chartDate);
          console.log(startDate);
          console.log(endDate);
          console.log(storeId);
        }, [chartDate, startDate, endDate, storeId]);

        const handleStartDateChange = (e: any) => {
          setStartDate(e.target.value);
        }
        const handleEndDateChange = (e: any) => {
          setEndDate(e.target.value);
        }

        useEffect(() => {
          const fetchData = async () => {
            try {
              const urlTotal = mapToBE(`/api/v1/hq/sale-management/list/date=${chartDate}/storeId=${storeId}/startDate=${startDate}/endDate=${endDate}`);
              const response = await axios.get(urlTotal);
              setSettlementDataList(response.data);
            } catch (error) {
              console.log('Error fetching settlement data:', error);
            }
          };
        
          fetchData();
        }, [chartDate, startDate, endDate, storeId]);
        

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
              <div className={styles.buttonContainer}>
              <span>
                <button onClick={handle1WeekBtnClick}>1주일</button>
              </span>
              <span>
                <button onClick={handle1MonthBtnClick}>1달</button>
              </span>
              <span>
                <button onClick={handle3MonthBtnClick}>3달</button>
              </span>
              <span>
                <input 
                  type="text" 
                  value={startDate} 
                  placeholder="시작 날짜를 입력하세요" 
                  onChange={handleStartDateChange} 
                  />
              </span>
              <span>
                <input 
                  type="text" 
                  value={endDate} 
                  placeholder="종료 날짜를 입력하세요" 
                  onChange={handleEndDateChange} />
              </span>
              <span>
                <button onClick={handleTermBtnClick1}>기간별 검색</button>
              </span>
              <CSVDownloadButton
                chartDate={chartDate}
                storeId={storeId}
                startDate={startDate}
                endDate={endDate}
              />
              </div>
            </div>
  
                <div className={styles.chartContainer}>

                  <div className={styles.chartWrapper1}>
                    <HqSalesBarChart1
                      chartDate={chartDate}
                      storeId={storeId}
                      startDate={startDate}
                      endDate={endDate}
                    />
                  </div>
                  <div className={styles.twowrapper}>
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
                            {settlementDataList.map((item, index) => (
                              <tr key={index} className={styles.orderListBody}>
                                <td>{item.settlementDate}</td>
                                <td>{item.storeName}</td>
                                <td>{item.charge}</td>
                                <td>{item.settlementPrice}</td>
                                <td>{item.originPrice}</td>
                                <td>{item.profit}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                  </div>

                  <div className={styles.chartContainer}>
                    <div className={styles.chartWrapper1}>
                      <HqSalesPieChart1
                        chartDate={chartDate}
                        startDate={startDate}
                        endDate={endDate}
                      />
                    </div>
                  </div>
                  </div>
                </div>
                </div>
                <div>

                </div>
                    </div>
                </div>
    );
}