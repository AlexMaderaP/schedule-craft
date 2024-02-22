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

type CalendarProps = {
  monthShowed: Date;
};

function Calendar({ monthShowed }: CalendarProps) {
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

  return (
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
            <button className="add-event-btn">+</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Calendar;
