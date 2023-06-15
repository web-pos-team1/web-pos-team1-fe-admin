import React, { useEffect, useState } from "react";
import styles from './Sidebar.module.css';
import { useRouter } from "next/router";

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const router = useRouter();
    const toggleSide = () => {
        setSidebarOpen(false);
    }
    const handleSalesManageBtnClick = () => {
        console.log("매출관리 clicked!!");
    }
    const handleSettlementManageBtnClick = () => {
        console.log("정산관리 clicked!!");
    }
    const handleRequestProductManageBtnClick = () => {
        console.log("발주관리 clicked!!");
    }
    const handleStockManageBtnClick = () => {
        console.log("재고관리 clicked!!");
    }
    const handleOrderManageBtnClick = () => {
        console.log("주문관리 clicked!!");
        router.push("/order-list");
    }
    const sidebarMenuList = [
        {
            name: "종합대시보드"
        },
        {
            name: "매출관리",
            handleClick: () => handleSalesManageBtnClick()
        },
        {
            name: "정산관리",
            handleClick: () => handleSettlementManageBtnClick()
        },
        {
            name: "발주관리",
            handleClick: () => handleRequestProductManageBtnClick()
        },
        {
            name: "재고관리",
            handleClick: () => handleStockManageBtnClick()
        },
        {
            name: "주문관리",
            handleClick: () => handleOrderManageBtnClick()
        },

    ]
    useEffect(() => {
        console.log("Sidebar.tsx/useEffect() called");
    }, [])
    return(
        <div className={styles.sidebarWrapper}>
            {/* <div onClick={toggleSide}>x</div> */}
            <ul className={styles.menuWrapper}>
                {
                    sidebarMenuList.map((menu, index) => (
                        <li className={styles.menu} onClick={menu.handleClick} key={index}>{menu.name}</li>
                        
                    ))
                }
            </ul>
        </div>
    );
}