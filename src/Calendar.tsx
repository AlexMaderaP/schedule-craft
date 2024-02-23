import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameMonth,
  isSameWeek,
  isToday,
  startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";
import { useState } from "react";
import CreateEventForm from "./modals/CreateEventForm";

type CalendarProps = {
  monthShowed: Date;
};

function Calendar({ monthShowed }: CalendarProps) {
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [dateToCreateEvent, setDateToCreateEvent] = useState(new Date());

  const monthStart = startOfWeek(startOfMonth(monthShowed));

  const dateRange = eachDayOfInterval({
    start: monthStart,
    end: endOfWeek(endOfMonth(monthShowed)),
  });

  function handleMonthClass(day: Date) {
    let className = "day";
    if (!isSameMonth(day, monthShowed)) className += " non-month-day";
    if (isBefore(day, subDays(new Date(), 1))) className += " old-month-day";
    return className;
  }

  function isDayOfFirstWeek(day: Date) {
    return isSameWeek(day, monthStart);
  }

  function handleAddEvent(day: Date) {
    setOpenCreateEvent(true);
    setDateToCreateEvent(day);
  }

  return (
    <>
      <div className="days">
        {dateRange.map((day) => (
          <div key={day.getTime()} className={handleMonthClass(day)}>
            <div className="day-header">
              {isDayOfFirstWeek(day) && (
                <div className="week-name">{format(day, "iii")}</div>
              )}
              <div className={`day-number ${isToday(day) && "today"}`}>
                {format(day, "d")}
              </div>
              <button
                className="add-event-btn"
                onClick={() => handleAddEvent(day)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <CreateEventForm
        openCreateEvent={openCreateEvent}
        closeCreateEventModal={() => setOpenCreateEvent(false)}
        dateToCreateEvent={dateToCreateEvent}
      />
    </>
  );
}

export default Calendar;
