import React, { Dispatch, SetStateAction, useEffect } from "react";
// import style from "./AlertModal.module.css";
import style from "./CancelCheckAlertModal.module.css";
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/router";

export default function CancelCheckAlertModal(
    props: {
        show:boolean, 
        onClose:Dispatch<SetStateAction<boolean>>,
        mUid: string,
    }) {
    // const [couponUseAmount, setCouponUseAmount] = useRecoilState(CouponUseState);
    const router = useRouter();
    if(!props.show) return null
    useEffect(() => {
        router.push(`/cancel-recipt/${props.mUid}`);
        return;
    }, [])
    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <div className={style.body}>
                    <p>취소 완료되었습니다</p>
                </div>
                <div className={style.footer}>
                    <button>
                        <Image
                            src="/images/checkPurple.png"
                            alt="confirm"
                            className={style.conirm}
                            width={28}
                            height={28}
                        />
                        <p onClick={()=>props.onClose(false)}>확인</p>
                    </button>
                </div>
            </div>
        </div>
    )
}