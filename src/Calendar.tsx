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
import { useMemo, useState } from "react";
import EventModal from "./modals/EventModal";
import { useEvents } from "./hooks/useEvents";
import Events from "./components/Events";
import EditEventForm from "./components/EditEventForm";

type CalendarProps = {
  monthShowed: Date;
};

function Calendar({ monthShowed }: CalendarProps) {
  const [openEventModal, setOpenEventModal] = useState(false);
  const [dateToCreateEvent, setDateToCreateEvent] = useState(new Date());

  const monthStart = startOfWeek(startOfMonth(monthShowed));

  const dateRange = useMemo(() => {
    return eachDayOfInterval({
      start: monthStart,
      end: endOfWeek(endOfMonth(monthShowed)),
    });
  }, [monthShowed]);

  return (
    <>
      <div className="days">
        {dateRange.map((day) => (
          <CalendarDay
            key={day.getTime()}
            day={day}
            setDateToCreateEvent={setDateToCreateEvent}
            monthShowed={monthShowed}
            setOpenEventModal={setOpenEventModal}
          />
        ))}
      </div>
      <EventModal openEventModal={openEventModal}>
        <EditEventForm
          dateToCreateEvent={dateToCreateEvent}
          closeEventModal={() => setOpenEventModal(false)}
        />
      </EventModal>
    </>
  );
}

type CalendarDayProps = {
  day: Date;
  monthShowed: Date;
  setOpenEventModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDateToCreateEvent: React.Dispatch<React.SetStateAction<Date>>;
};

function CalendarDay({
  day,
  monthShowed,
  setDateToCreateEvent,
  setOpenEventModal,
}: CalendarDayProps) {
  const { events } = useEvents();

  function handleMonthClass(day: Date) {
    let className = "day";
    if (!isSameMonth(day, monthShowed)) className += " non-month-day";
    if (isBefore(day, subDays(new Date(), 1))) className += " old-month-day";
    return className;
  }

  function isDayOfFirstWeek(day: Date) {
    return isSameWeek(day, startOfMonth(monthShowed));
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
    <div className={handleMonthClass(day)}>
      <div className="day-header">
        {isDayOfFirstWeek(day) && (
          <div className="week-name">{format(day, "iii")}</div>
        )}
        <div className={`day-number ${isToday(day) && "today"}`}>
          {format(day, "d")}
        </div>
        <button className="add-event-btn" onClick={() => handleAddEvent(day)}>
          +
        </button>
      </div>
      {containsEventInDate(day) && <Events events={getEventsInDate(day)} />}
    </div>
  );
}

export default Calendar;
