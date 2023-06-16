import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../sidebar/Sidebar";
import styles from './orderList.module.css';
import { SettlementDataType } from "@/types/SettlementDataTyle";
import OrderCancleAlertModal from "@/components/alertModal/OrderCancleAlert";
import { mapToBE } from "@/globalFunction/mapToBE";
import axios from 'axios';
import { formatMoney } from "@/globalFunction/formatMoney";
// import { style } from "d3";
import BarcodeScaneAlertModal from "@/components/alertModal/BarcodeScanAlert";
import CancelCheckAlertModal from "@/components/alertModal/CancelCheckAlertModal";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/layouts/mainLayout";

interface OrderDataType {
    charge: number,
    couponUsePrice: number,
    orderDate: string,
    orderStatus: string,
    payMethod: string,
    pointUsePrice: number,
    profit: number,
    serialNumber?: string,
    storeName: string,
    totalOriginPrice: number,
    totalPrice: number
}
interface StoreType {
    id: number,
    storeName: string
}

interface TermType {
    id: number,
    name: string
}

const initStoreDataList = [
    {
        "id": 1,
        "name": "강남점",
    },
    {
        "id": 2,
        "name": "경기점",
    },
    {
        "id": 3,
        "name": "광주신세계",
    }
];

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

const OrderList: NextPageWithLayout = () => {
    const [orderList, setOrderList] = useState<SettlementDataType[]>([]);
    const [mUid, setMUid] = useState<string>('');
    const [showOrderDelAlert, setShowOrderDelAlert] = useState<boolean>(false);
    const [showBarcodeAlert, setShowBarcodeAlert] = useState<boolean>(false);
    const [showCancelCheckAlert, setShowCancelCheckAlert] = useState<boolean>(false);
    const [state, setState] = useState<boolean>(false);

    const [date, setDate] = useState<string>('1week'); // 1week, 1month, 3month, term(기간별)
    const [storeId, setStoreId] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('0');
    const [endDate, setEndDate] = useState<string>('0');

    const [orderDataList, setOrderDataList] = useState<OrderDataType[]>([]);
    const [storeList, setStoreList] = useState<StoreType[]>([]); // ['강남점', '광주신세계' ...]
    const [termList, setTermList] = useState<TermType[]>(initTermDataList);
    const [activeStoreState, setActiveStoreState] = useState<boolean[]>([])
    const [activeTermState, setActiveTermState] = useState<boolean[]>([]);
    // let activeStoreState: boolean[] = [];
    

    const ref = useRef<HTMLInputElement>(null);

    const handleBarcodeScan = (e: any) => {
        setMUid(e.target.value);
        console.log("e.target.value: ", e.target.value);
        const orderMuid = e.target.value;
        if (orderMuid.length === 18) {
            e.target.value = '';
            console.log("18/orderMuid: ", orderMuid);
            setMUid(orderMuid);
            setShowOrderDelAlert(true);
        }
    }
    const handleSearchBtnClick = ( ) => {
        console.log("handleSearchBtnclick!!");
        if (mUid.length < 18) {
            alert("m-uid가 유효하지 않습니다");
            return;
        }
        setShowOrderDelAlert(true)
    }
    const convertToYYYYMMDD_HHMMSS = (rawDate: string) => {
        if (rawDate === '' || rawDate == undefined) {
            return '';
        }
        const dateList = rawDate.split('T');
        const timeList = dateList[1].split('.')[0].split(':');
        const hhMM = (Number(timeList[0]) + 9) + ":" + timeList[1]; 
        return dateList[0] + " " + hhMM;
    }
    const handleStartDateChange = (e: any) => {
        setStartDate(e.target.value);
    }
    const handleEndDateChange = (e: any) => {
        setEndDate(e.target.value);
    }
    const handleStoreBtnClick = (id:number) => {
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
    const handleBarcodeCancelBtnClick = () => {
        console.log("barcode 취소 클릭!!");
        setShowBarcodeAlert(true);
    }

    const handleCancelBtnClick = (index: number) => {

        console.log("주문 취소 버튼 클릭!: ", index);
    }
    const handleFinalCancelYesBtnClick = () => {
        setState(!state);
        setShowCancelCheckAlert(false);
    }

    useEffect(() => {
        if(ref.current) {
            ref.current.focus();
        }
        const url = mapToBE(`/api/v1/hq/sale-management/list-orders/date=${date}/storeId=${storeId}/startDate=${startDate}/endDate=${endDate}`);
        // const url = `http://localhost:8080/api/v1/hq/sale-management/list-orders/date=${date}/storeId=${storeId}/startDate=${startDate}/endDate=${endDate}`;
        axios.get(url)
        .then((res) => {
            console.log("res: ", res);
            setOrderDataList(res.data);
        })
        .catch((err) => {
            console.log("err: ", err);
        })

        // const url_storeList = `http://localhost:8080/api/v1/manager/store-name`;
        const url_storeList = mapToBE(`/api/v1/manager/store-name`);
        axios.get(url_storeList)
        .then((res) => {
            console.log("res2: ", res);
            // setStoreList(res.data);
            let aStoreStateList: boolean[] = [];
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].storeName === '센텀시티점'){
                    aStoreStateList.push(true);
                    setStoreList([res.data[i]]);
                } else {
                    // aStoreStateList.push(false);
                }
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

    }, [state])
    return(
        <>
            <BarcodeScaneAlertModal 
                show={showBarcodeAlert}
                onClose={setShowBarcodeAlert}
                setMuid={setMUid}
                onOpen={setShowOrderDelAlert}
            />
            <OrderCancleAlertModal 
                show={showOrderDelAlert} 
                onClose={setShowOrderDelAlert} 
                onOpen={setShowCancelCheckAlert}
                mUid={mUid}
            />
            <CancelCheckAlertModal 
                show={showCancelCheckAlert}
                onClose={setShowCancelCheckAlert}
            />
            <div className={styles.pageWrapper}>
                <Sidebar 
                    selectedPageName="order-list"
                />
                <div className={styles.sidebarRight}>

                    <h3 style={{ color: "white" }}>주문관리</h3>
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
                            {
                                termList.map((term: TermType, index: number) => (
                                    <li key={index} onClick={() => handleTermBtnClick(index)} className={activeTermState[index] ? `${styles.active}` : `${styles.deactive}`}>
                                        {term.name}
                                    </li>
                                ))
                            }
                            {/* <div className={styles.calendarInputBoxWrapper}>
                                
                                <li className={styles.calendarStartDateInputBox}>
                                    <input type="text" value={startDate} onChange={handleStartDateChange} />
                                </li>
                                <li className={styles.calendarCenter}>
                                ~
                                </li>
                               <li className={styles.calendarEndDateInputBox}>
                                    <input type="text" value={endDate} onChange={handleEndDateChange} />
                                </li>
                            </div> */}
                            
                            
                        </ul>
                    </div>
                    <div className={styles.settlementDataListWrapper}>
                    
                    
                    <div className={styles.middleWrapper}>
                        <div className={styles.settlementDataListTitle}>주문 목록</div>
                    
                        <div className={styles.cancelBarcodeBtn} onClick={handleBarcodeCancelBtnClick}>
                            바코드 취소
                        </div>
                    </div>
                    

                    <table className={styles.orderListTable}>
                        <thead className={styles.orderListHead}>
                            <tr>
                                <th>주문번호</th>
                                <th>주문일자</th>
                                <th>결제상태</th>
                                <th>결제수단</th>
                                <th>총주문금액(원)</th>
                                <th>상품권금액(원)</th>
                                <th>포인트사용액(p)</th>
                                <th>최중주문금액(원)</th>
                                <th>수수료(원)</th>
                                <th>총원가(원)</th>
                                <th>영업이익(원)</th>
                                <th>주문취소</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderDataList.map((item, index) => {
                                    if (item.orderStatus === 'SUCCESS') {
                                        return(
                                            <tr key={index} className={styles.orderListBody}>
                                            <td>
                                                {item.serialNumber}
                                            </td>
                                            {/* <td>{item.storeName}</td> */}
                                            <td>
                                                {convertToYYYYMMDD_HHMMSS(item.orderDate)}
                                            </td>
                                            <td>{item.orderStatus}</td>
                                            <td>{item.payMethod}</td>
                                            <td className={styles.number}>
                                                {formatMoney(item.totalPrice)}
                                            </td>                      
                                            <td className={styles.number}>
                                                {formatMoney(item.couponUsePrice)}
                                            </td>
                                            <td className={styles.number}>
                                                {item.pointUsePrice}</td>
                                            <td className={styles.number}>
                                                {formatMoney(item.totalPrice)}
                                            </td>
                                            <td className={styles.number}>
                                                {formatMoney(item.charge)}
                                            </td>
                                            <td className={styles.number}>
                                                {formatMoney(item.totalOriginPrice)}
                                            </td>
                                            <td className={styles.number}>
                                                {formatMoney(item.profit)}
                                            </td>
                                            <td>
                                                <div className={styles.cancelBtnWrapper}>
                                                    <div className={styles.cancelBtn} onClick={() => handleCancelBtnClick(index)}>
                                                        취소
                                                    </div>
                                                </div>
                                                
                                            </td>
                                        </tr>
                                        )
                                    } else {
                                        return(
                                            <tr key={index} className={styles.orderListBody}>
                                            <td>{item.serialNumber}</td>
                                            {/* <td>{item.storeName}</td> */}
                                            <td>
                                                {convertToYYYYMMDD_HHMMSS(item.orderDate)}
                                            </td>
                                            <td>{item.orderStatus}</td>
                                            <td>{item.payMethod}</td>
                                            <td className={styles.number}>
                                                {formatMoney(item.totalPrice)}
                                            </td>                      
                                            <td className={styles.number}>
                                                {formatMoney(item.couponUsePrice)}
                                            </td>
                                            <td className={styles.number}>
                                                {item.pointUsePrice}</td>
                                            <td className={styles.number}>
                                                {formatMoney(item.totalPrice)}
                                            </td>
                                            <td className={styles.number}>
                                                {formatMoney(item.charge)}
                                            </td>
                                            <td className={styles.number}>
                                                {formatMoney(item.totalOriginPrice)}
                                            </td>
                                            <td className={styles.number}>
                                                {formatMoney(item.profit)}
                                            </td>
                                            <td>
                                                <div className={styles.cancelBtnWrapper}>
                                                    <div className={styles.cancelBtn} onClick={() => handleCancelBtnClick(index)}>
                                                    </div>
                                                </div>
                                                
                                            </td>
                                        </tr>
                                        )
                                    }
                                    
                                })
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            <input type="text" ref={ref} value={mUid} onInput={handleBarcodeScan} autoFocus className={styles.barcodeInputBox}/>
        </>
    
    )
}

OrderList.getLayout = function getLayout(page:React.ReactNode) {
    return (
        <MainLayout
            role='branch'
            name='김*아'
        >
            {page}
        </MainLayout>
    )
}

export default OrderList;