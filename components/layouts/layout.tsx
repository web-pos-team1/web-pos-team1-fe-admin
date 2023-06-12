import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout(props:{children:React.ReactNode}) {
    return (
        <div>
            <Header />
            {props.children}
            <Footer />
        </div>
    )
}
