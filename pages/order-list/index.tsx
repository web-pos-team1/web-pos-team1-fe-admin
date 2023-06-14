import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../sidebar/Sidebar";
import styles from './orderList.module.css';
import { SettlementDataType } from "@/types/SettlementDataTyle";
import OrderCancleAlertModal from "@/components/alertModal/OrderCancleAlert";

export default function OrderList() {
    const [orderList, setOrderList] = useState<SettlementDataType[]>([]);
    const [mUid, setMUid] = useState<string>('');
    const [showOrderDelAlert, setShowOrderDelAlert] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement>(null);
    const handleInputChange = (e: any) => {
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
    useEffect(() => {
        if(ref.current) {
            ref.current.focus();
        }
        setShowOrderDelAlert(true);
    }, [])
    return(
        <>
            <OrderCancleAlertModal 
                show={showOrderDelAlert} 
                onClose={setShowOrderDelAlert} 
                mUid={mUid}
            />
            <div className={styles.pageWrapper}>
                <Sidebar />
                <div className={styles.sidebarRight}>

                    <h3>주문관리</h3>
                    <div className={styles.settlementDataListWrapper}>
                    m-uid:
                    <input value={mUid} ref={ref} autoFocus onChange={handleInputChange} type="text"/>
                    <button onClick={handleSearchBtnClick}>search</button>
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
                                orderList.map((item, index) => (
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
        </>
    
    )
}