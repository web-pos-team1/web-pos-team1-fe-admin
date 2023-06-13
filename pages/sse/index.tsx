import React, { useEffect, useState } from "react";

export default function SSE() {

    const url = '/sse-subscribe';
    const eventSource = new EventSource(url);
    const parseMyEvent = (evt: Event) => {
        const messageEvent = (evt as MessageEvent);
        console.log("messageEvent: ", messageEvent);
        const data = JSON.parse(messageEvent.data);
        console.log("data: ", data);
    }
    
    useEffect(() => {
        // fetchEXPSSE();
    }, [])
    return(
        <div>

        </div>
    );
}