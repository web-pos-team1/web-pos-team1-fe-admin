export interface SettlementDataType {
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