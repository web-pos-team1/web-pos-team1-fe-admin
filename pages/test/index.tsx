import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CancelCheckAlertModal from '@/components/alertModal/CancelCheckAlertModal';
import OrderCancleAlertModal from '@/components/alertModal/OrderCancleAlert';

export default function Test() {
    const [mUid, setMUid] = useState<string>('202306141120440201');
    const [show, setShow] = useState<boolean>(false);
    useEffect(()=> {
        setShow(true);
    })
    return (
        <div>
            <OrderCancleAlertModal 
                show={show}
                mUid={mUid}
                onClose={setShow}
                onOpen={setShow}
            />
            
        </div>
    )
}