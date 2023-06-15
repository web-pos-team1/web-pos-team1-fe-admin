import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainHeader from "../MainHeader";

export default function Layout(props:{children:React.ReactNode}) {
    return (
        <div>
            <MainHeader />
            {props.children}
            <Footer />
        </div>
    )
}
