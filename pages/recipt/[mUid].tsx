import React, { useEffect, useState } from "react";
import styles from './receipt.module.css';
import axios from "axios";
import JsBarcode from "jsbarcode";
import { mapToBE } from "@/globalFunction/mapToBE";
import { useRouter } from "next/router";
export default function Receipt() {
  const [mUid, setMUid] = useState<string>('202306161822190201');
  const [orderDate, setOrderDate] = useState<string>('');
  const [orderSerialNumber, setOrderSerialNumber] = useState<string>('');
  const [productList, setProductList] = useState<any[]>([]);
  const [finalTotalPrice, setFinalTotalPrice] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [userPoint, setUserPoint] = useState<number>(0);
  const [productPrice, setProductPrice] = useState<number>(0);
  const [vat, setVat] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [couponUsePrice, setCouponUsePrice] = useState<number>(0);
  const [pointUsePrice, setPointUsePrice] = useState<number>(0);
  const [pointSaveAmount, setPointSaveAmount] = useState<number>(0);

  const router = useRouter();

  // 
  const [cardName, setCardName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');


  useEffect(() => {
    const url = mapToBE(`/api/v1/manager/orders-detail?merchantUid=${router.query.mUid}`);
    console.log("router.query.mUid: ", router.query.mUid);
    // const url = `http://localhost:8080/api/v1/manager/orders-detail?merchantUid=${mUid}`;
    axios.get(url)
      .then((res) => {
        const { orderDate,
           orderSerialNumber,
           orderDetailProductResponseDTOList,
           userName,
           userPoint,
           productPrice,
           vat,
           finalTotalPrice,
           totalPrice,
           cardName,
           cardNumber,
           couponUsePrice,
           pointUsePrice,
           pointSaveAmount
           } = res.data;
        console.log("res.data: ", res.data);
        console.log("[before]orderDate: ", orderDate);
        // 2023-06-13T10:36:54.415664
        const orderDateList = orderDate.split('T');
        console.log("[mid]orderDate: ", orderDateList);
        const timeList = orderDateList[1].split('.')[0].split(':');
        const hhMM = (Number(timeList[0]) + 9) + ":" + timeList[1]; 
        setOrderDate(orderDateList[0] + " " + hhMM);
        setOrderSerialNumber(orderSerialNumber);
        setProductList(orderDetailProductResponseDTOList);
        setUserName(userName);
        setUserPoint(userPoint);
        setProductPrice(productPrice);
        setVat(vat);
        setFinalTotalPrice(finalTotalPrice);
        setTotalPrice(totalPrice);
        setCardName(cardName);
        setCardNumber(cardNumber);
        setCouponUsePrice(couponUsePrice);
        setPointUsePrice(pointUsePrice);
        setPointSaveAmount(pointSaveAmount)
        setMUid(router.query.mUid);
        console.log("res: ", res);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
      JsBarcode("#barcode", mUid, {
        width: 300,
        height: 60
      });
  }, [router.query.mUid]);
    return (
        <div className={styles.receiptWrapper}>
        <div className={styles.receiptContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>SHINSEGAE</h1>
            {/* <div className={styles.barcode}>바코드 자리</div> */}
            <img className={styles.barcode} id="barcode"/>
            <div className={styles.mUid}>{mUid}</div>
            <div className={styles.branchInfo}>
                <div className={styles.storeName}>(주)신세계 센텀시티점 &nbsp;</div>
                <div className={styles.telePhone}>T.1588-1234</div>
            </div>
            <div className={styles.storeAddress}>부산광역시 해운대구 센텀남대로35(우동)</div>
            <div className={styles.componyInfo}>
                <div className={styles.businessNumber}>201-81-32195 &nbsp; 손영식</div>
                {/* <div className={styles.ceoName}>손영식</div> */}
            </div>
            <div className={styles.orderInfo}>
                <div className={styles.orderDate}>구매: {orderDate}</div>
                <div className={styles.orderSerialNumber}>거래번호: {orderSerialNumber}</div>
            </div>
           
          </div>
          <table className={styles.receiptTable}>
            <thead>
              <tr>
                <th>상품명</th>
                <th>단가</th>
                <th className={styles.qty}>수량</th>
                <th className={styles.rightAligned}>금액</th>
              </tr>
            </thead>
            <tbody>
            {productList && productList.map((product, index) => (
                <tr key={index}>
                  <td>{product.productName}</td>
                  <td>{product.productSalePrice}</td>
                  <td className={styles.qty}>{product.cartQty}</td>
                  <td>{product.productSalePrice * product.cartQty}</td>
                </tr>
              ))}
               <tr>
                <td className={styles.sum} colSpan={2}>합  계</td>
                <td></td>
                <td className={styles.sum}><span>{totalPrice}</span></td>
              </tr>
              <tr>
                <td className={styles.coupon} colSpan={2}>상품권 사용</td>
                <td></td>
                <td className={styles.coupon}><span>-{couponUsePrice}</span></td>
              </tr>
              <tr>
                <td className={styles.coupon} colSpan={2}>포인트 사용</td>
                <td></td>
                <td className={styles.coupon}><span>-{pointUsePrice}</span></td>
              </tr>
              
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>과세물품가액</td>
                <td></td>
                <td><span>{productPrice}</span></td>
              </tr>
              <tr className={styles.dashedLine}>
                <td colSpan={2}>부가세</td>
                <td></td>
                <td><span>{vat}</span></td>
              </tr>
            </tfoot>
          </table>
    
          <table className={styles.cardTable}>
            <tbody>
              <tr className={styles.finalTotalPrice}>
                <td>카드결제액</td>
                <td><span>{finalTotalPrice}</span></td>
              </tr>
              <tr className={styles.card}>
                <td>{cardName}</td>
                <td><span>{cardNumber}</span></td>
              </tr>
              <tr className={styles.cardInfo}>
                <td>승인번호 30015986</td>
                <td><span>일시불</span></td>
              </tr>
            </tbody>
          </table>

             <div className={styles.pointInfo}>
                {userName}님의 포인트 현황입니다.
                </div>
          <table className={styles.pointTable}>
            <tbody>
              <tr className={styles.pointSaveAmount}>
                <td>금회적립포인트</td>
                <td>{pointSaveAmount}</td>
              </tr>
              <tr className={styles.userPoint}>
                <td>누적포인트</td>
                <td>{userPoint}</td>
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