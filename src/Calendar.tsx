import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isSameWeek,
  isToday,
  startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";
import { useState } from "react";
import EventModal from "./modals/EventModal";
import { EventType } from "./App";
import Events from "./components/Events";

type CalendarProps = {
  monthShowed: Date;
  events: EventType[];
};

function Calendar({ monthShowed, events }: CalendarProps) {
  const [openEventModal, setOpenEventModal] = useState(false);
  const [dateToCreateEvent, setDateToCreateEvent] = useState(new Date());
  const [eventToEdit, setEventToEdit] = useState<EventType>();

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
    setOpenEventModal(true);
    setDateToCreateEvent(day);
  }

  function containsEventInDate(day: Date) {
    return events.some((event) => isSameDay(event.date, day));
  }

  function getEventsInDate(day: Date) {
    return events.filter((event) => isSameDay(event.date, day));
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
            {containsEventInDate(day) && (
              <Events
                events={getEventsInDate(day)}
                setOpenEditEvent={() => setOpenEventModal(true)}
                setEventToEdit={setEventToEdit}
              />
            )}
          </div>
        ))}
      </div>
      <EventModal
        openEventModal={openEventModal}
        closeEventModal={() => setOpenEventModal(false)}
        dateToCreateEvent={dateToCreateEvent}
        event={eventToEdit}
        clearEvent={() => setEventToEdit(undefined)}
      />
    </>
  );
}

export default Calendar;
