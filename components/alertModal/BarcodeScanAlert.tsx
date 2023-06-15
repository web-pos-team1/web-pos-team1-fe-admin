import React, { useEffect, useState, Dispatch, SetStateAction, useRef } from 'react';
import style from './BarcodeScanAlert.module.css';
import Image from 'next/image';
import Link from 'next/link';


export default function BarcodeScaneAlertModal(
    props: { 
        show:boolean, 
        onClose:Dispatch<SetStateAction<boolean>>,
        setMuid: Dispatch<SetStateAction<string>>,
        onOpen: Dispatch<SetStateAction<boolean>>,
    }) {
    
    const [barcode, setBarcode] = useState<string>('');
    const ref = useRef<HTMLInputElement>(null);

    if(!props.show) return null
    const handleYesClick = () => {
        console.log("yes clicked!!")
        props.onClose(false);
    }
    const handleNoClick = () => {
        console.log("no clicked!");
        props.onClose(false);
    }
    const handleBarcodeScan = (e: any) => {
        console.log("e.target.value: ", e.target.value);
        const orderMuid = e.target.value;
        setBarcode(e.target.value);
        if (orderMuid.length === 18) {
            e.target.value = '';
            console.log("18/orderMuid: ", orderMuid);

            props.setMuid(orderMuid);
            props.onOpen(true);
            props.onClose(false);
        }
    }
    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                
                <div className={style.cancel}>
                    <button  onClick={()=>props.onClose(false)}>
                        <Image
                            src="/images/cancel.png"
                            alt="cancel"
                            className={style.cancel}
                            width={30}
                            height={30}
                        />
                    </button>
                </div>
                
                <div className={style.title}>
                    <p>주문 취소</p>    
                </div>

                <div className={style.bodyFirst}>
                <p>전자영수증을 스캔해주세요</p>
                </div>
                <input className={style.barcodeInputBox} value={barcode} onChange={handleBarcodeScan} ref={ref} autoFocus />
                {/* <div className={style.bodySecond}>
                    <div className={style.mUidLabel}>
                        mUid:
                    </div>
                    //                     
                </div> */}

                {/* <div className={style.footer}> */}
                
                    {/* <button>
                        <Image
                            src="/images/checkWhite.png"
                            alt="confirm"
                            className={style.conirm}
                            width={28}
                            height={28}
                        />
                        <p onClick={handleYesClick}>
                            예
                        </p>
                    </button>
                
                    <button>
                        <Image
                            src="/images/nopeWhite.png"
                            alt="confirm"
                            className={style.reject}
                            width={28}
                            height={28}
                        />
                        <p onClick={handleNoClick}>
                            아니오
                        </p>
                    </button> */}

                {/* </div> */}
            </div>
        </div>
    )
}