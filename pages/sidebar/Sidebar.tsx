import React, { useEffect, useState } from "react";
import styles from './Sidebar.module.css';
import { useRouter } from "next/router";

export default function Sidebar(
    props: {
        selectedPageName?: string
    }) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [activeSidebarState, setActiveSidebarState] = useState<boolean[]>([false, false, false, false, false, false]);
    const router = useRouter();
    const toggleSide = () => {
        setSidebarOpen(false);
    }
    const handleSalesManageBtnClick = () => {
        console.log("매출관리 clicked!!");
        router.push("/hq-sales");
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
    const handleTotalDashBoardBtnClick = () => {
        console.log("종합대시보드 clikced!!");

    }
    
    const sidebarMenuList = [
        {
            name: "종합대시보드",
            pageName: "total-dashboard",
            handleClick: () => handleTotalDashBoardBtnClick()
        },
        {
            name: "매출관리",
            pageName: "hq-sales",
            handleClick: () => handleSalesManageBtnClick()
        },
        {
            name: "정산관리",
            pageName: "settlement-manage",
            handleClick: () => handleSettlementManageBtnClick()
        },
        {
            name: "발주관리",
            pageName: "request-product-manage",
            handleClick: () => handleRequestProductManageBtnClick()
        },
        {
            name: "재고관리",
            pageName: "stock-manage",
            handleClick: () => handleStockManageBtnClick()
        },
        {
            name: "주문관리",
            pageName: "order-list",
            handleClick: () => handleOrderManageBtnClick()
        },

    ]
    useEffect(() => {
        console.log("Sidebar.tsx/useEffect() called");
        if (props.selectedPageName === undefined) {
            return;
        }
        for (let i = 0; i < sidebarMenuList.length; i++) {
            if (sidebarMenuList[i].pageName === props.selectedPageName) {
                activeSidebarState[i] = true;
            } else {
                activeSidebarState[i] = false;
            }
            setActiveSidebarState([...activeSidebarState]);
        }
    }, [props.selectedPageName])
    return(
        <div className={styles.sidebarWrapper}>
            {/* <div onClick={toggleSide}>x</div> */}
            <ul className={styles.menuWrapper}>
                {
                    sidebarMenuList.map((menu, index) => (
                        <li className={activeSidebarState[index] ? `${styles.active}` : `${styles.deactive}`} onClick={menu.handleClick} key={index}>
                            {menu.name}
                        </li>
                        
                    ))
                }
            </ul>
        </div>
    );
}