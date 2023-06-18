import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import style from './OrderCancleAlert.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { mapToBE } from '@/globalFunction/mapToBE';
import axios from 'axios';

export default function OrderCancleAlertModal(props:
    { show:boolean, 
      onClose:Dispatch<SetStateAction<boolean>>,
      mUid: string,
      onOpen: Dispatch<SetStateAction<boolean>>,
    }) {

    if(!props.show) return null
    const handleYesClick = () => {
        console.log("yes clicked!!")
        /* 주문 취소 API */
        const url = mapToBE(`/api/v1/manager/order-cancel2?merchantUid=${props.mUid}`);
        axios.get(url)
        .then((res: any) => {
            console.log("res: ", res);
            if (res.status >= 200 && res.status < 300) {
                props.onOpen(true);
                props.onClose(false);
            }
        })
        .catch((err: any) => {
            console.log("err: ", err);
            console.log("주문 취소에 실패했습니다ㅠ")
            props.onOpen(true);
            props.onClose(false);
        })
        
    }
    const handleNoClick = () => {
        console.log("no clicked!");
        props.onClose(false);
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
                <p>mUid: {props.mUid}</p>
                </div>
                <div className={style.bodySecond}>
                     <p> 해당 주문을 취소하시겠습니까?</p>
                </div>

                <div className={style.footer}>
                
                    <button>
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
                    </button>

                </div>
            </div>
        </div>
    )
}