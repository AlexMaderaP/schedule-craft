import { format } from "date-fns";
import { EventType } from "../App";

function Events({ events }: { events: EventType[] }) {
  events.sort(compareDates);

  return (
    <div className="events">
      {events.map((event) => (
        <button
          key={event.id}
          className={
            event.allDay ? `all-day-event ${event.color} event` : `event`
          }
        >
          {!event.allDay && (
            <>
              <div className={`color-dot ${event.color}`}></div>
              <div className="event-time">{format(event.date, "ha")}</div>
            </>
          )}
          <div className="event-name">{event.name}</div>
        </button>
      ))}
    </div>
  );
}

function compareDates(a: EventType, b: EventType) {
  if (a.allDay) {
    return -1;
  } else if (b.allDay) {
    return 1;
  } else if (a.date < b.date) {
    return -1;
  } else if (b.date < a.date) {
    return 1;
  }
  return 0;
}

export default Events;
