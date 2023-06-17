export interface OrderDataType {
    charge: number,
    couponUsePrice: number,
    orderDate: string,
    orderStatus: string,
    payMethod: string,
    pointUsePrice: number,
    profit: number,
    serialNumber?: string,
    merchantUid?: string,
    storeName: string,
    totalOriginPrice: number,
    totalPrice: number
}