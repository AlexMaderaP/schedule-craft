import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useState } from "react";

function Calendar() {
  const [monthShowed, setMonthShowed] = useState(new Date());

  const dateRange = eachDayOfInterval({
    start: startOfWeek(startOfMonth(monthShowed)),
    end: endOfWeek(endOfMonth(monthShowed)),
  });

  return (
    <div className="calendar">
      <div className="header">
        <button className="btn">Today</button>
        <div>
          <button className="month-change-btn">&lt;</button>
          <button className="month-change-btn">&gt;</button>
        </div>
        <span className="month-title">{format(monthShowed, "MMMM yyyy")}</span>
      </div>
      <div className="days">
        {dateRange.map((day) => (
          <div className="day ">
            <div className="day-header">
              <div className="day-number">{format(day, "d")}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
