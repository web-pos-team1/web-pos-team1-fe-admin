import React, { useEffect, useState } from "react";
import styles from './recipt.module.css';
import axios from "axios";
export default function Recipt() {
    const [mUid, setMUid] = useState<string>('202306011011410202');
    
    useEffect(() => {
        const url = `http://localhost:8080/api/v1/manager/orders-detail/${mUid}`;
        axios.get(url)
        .then((res) => {
            console.log("res: ", res);
        })
        .catch((err) => {
            console.log("err: ", err);
        })
    }, [])
    return (
        <div className={styles.reciptWrapper}>
        <div className={styles.reciptContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>SHINSEGAE</h1>
            <div className={styles.barcode}>바코드 자리</div>
            <div className={styles.mUid}>{mUid}</div>
            <div className={styles.branchInfo}>
                <div className={styles.storeName}>(주)신세계 센텀시티점 &nbsp;</div>
                <div className={styles.telePhone}>T.1588-1234</div>
            </div>
            <div className={styles.storeAddress}>부산광역시 해운대구 센텀남대로35(우동)</div>
            <div className={styles.componyInfo}>
                <div className={styles.businessNumber}>201-81-32195 &nbsp; </div>
                <div className={styles.ceoName}>손영식</div>
            </div>
            <div className={styles.orderInfo}>
                <div className={styles.orderDate}>구매: 2023-06-23 12:09</div>
                <div className={styles.orderSerialNumber}>거래번호: 1820-6969</div>
            </div>
           
          </div>
          <table className={styles.receiptTable}>
            <thead>
              <tr>
                <th>상품명</th>
                <th className={styles.qty}>수량</th>
                <th className={styles.rightAligned}>금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>복숭아젤리</td>
                <td className={styles.qty}>1</td>
                <td>1,500</td>
              </tr>
              <tr>
                <td>사과젤리</td>
                <td className={styles.qty}>2</td>
                <td>3,000</td>
              </tr>
              <tr>
                <td className={styles.sum} colSpan={2}>합  계</td>
                <td className={styles.sum}><span>4,500</span></td>
              </tr>
            </tbody>
            <tfoot>
              
              <tr>
                <td colSpan={2}>과세물품가액</td>
                <td><span>4,050</span></td>
              </tr>
              <tr className={styles.dashedLine}>
                <td colSpan={2}>부가세</td>
                <td><span>450</span></td>
              </tr>
            </tfoot>
          </table>
    
          <table className={styles.cardTable}>
            <tbody>
              <tr className={styles.finalTotalPrice}>
                <td>카드결제액</td>
                <td><span>4,500</span></td>
              </tr>
              <tr className={styles.card}>
                <td>국민</td>
                <td><span>11111111****1111</span></td>
              </tr>
              <tr className={styles.cardInfo}>
                <td>승인번호<span>3000000</span></td>
                <td><span>일시불</span></td>
              </tr>
            </tbody>
          </table>
             <div className={styles.pointInfo}>
                <span className={styles.userName}>홍*동</span>님의 포인트 현황입니다.
                </div>
          <table className={styles.pointTable}>
            <tbody>
              <tr className={styles.pointSaveAmount}>
                <td>금회적립포인트</td>
                <td><span>1</span></td>
              </tr>
              <tr className={styles.userPoint}>
                <td>누적(가용)포인트</td>
                <td><span>196(195)</span></td>
              </tr>
              <tr className={styles.expirationPeriodInfo}>
                <td>*신세계포인트 유효기간은 2년입니다.</td>
              </tr>
              
            </tbody>
          </table>
          <div className={styles.paymentsInfo}>
                교환, 환불, 결제변경은 7일내 결제카드 지참하시고,<br></br>환불 시 증정사은품은 반납하셔야 합니다. (일부 브랜드 제외)
              </div>
        </div>
            </div>
    )
    
}