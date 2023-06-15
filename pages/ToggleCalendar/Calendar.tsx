import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import ArrowLeft from "@/public/images/arrow-left.svg";
import ArrowRight from "@/public/images/arrow-right.svg";

interface ICalendarComponent {
    getDate(date: Date | string): void
}

export const CalendarComponent = ( ) => {
    const [date, setDate] = useState(new Date());

  const handleCalendarClose = () => console.log("Calendar closed");
  const handleCalendarOpen = () => console.log("Calendar opened");

    return(
        <DatePicker 
            selected={date}
            onChange={(date: any) => setDate(date)}
            onCalendarClose={handleCalendarClose}
            onCalendarOpen={handleCalendarOpen}
        />
    )
}