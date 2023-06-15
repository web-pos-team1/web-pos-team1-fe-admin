import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainHeader from "../MainHeader";

export default function Layout(
    props: { children: React.ReactNode, role: string, name: string }) {
        const [role, setRole] = useState<string>('');
        const [name, setName] = useState<string>('');
        useEffect(() => {
            console.log("props.role: ", props.role);
            console.log("props.name: ", props.name);
            setRole(props.role);
            setName(props.name);
        }, [props.name])
    return (
        <div>
            <MainHeader
                role={role}
                name={name}
             />
            {props.children}
            <Footer />
        </div>
    )
}
