import { format } from "date-fns";
import { EventType } from "../App";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type EventsProps = {
  events: EventType[];
  setOpenEditEvent: () => void;
  setEventToEdit: React.Dispatch<React.SetStateAction<EventType | undefined>>;
};

function Events({ events, setOpenEditEvent, setEventToEdit }: EventsProps) {
  const myEvents = useRef<HTMLDivElement>(null);
  const [visibleEvents, setVisibleEvents] = useState(events.length);

  events.sort(compareDates);
  const eventsToShow = events.slice(0, visibleEvents);
  const EventsHidden = events.length - visibleEvents;

  function handleEditEvent(event: EventType) {
    setOpenEditEvent();
    setEventToEdit(event);
  }

  useLayoutEffect(() => {
    if (!myEvents.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let count = 0;

        for (const entry of entries) {
          if (entry.isIntersecting) {
            count++;
          }
        }

        setVisibleEvents(count);
      },
      { threshold: 1 }
    );

    myEvents.current.querySelectorAll(".event").forEach((event) => {
      observer.observe(event);
    });
  }, []);

  useEffect(() => {
    console.log(visibleEvents);
  }, [visibleEvents]);

  //Check If everything is displaying
  //If Something is not displaying don't render it, instead render button view more

  return (
    <>
      <div ref={myEvents} className="events">
        {eventsToShow.map((event) => (
          <button
            key={event.id}
            onClick={() => handleEditEvent(event)}
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
        {EventsHidden > 0 && (
          <button className="events-view-more-btn">+{EventsHidden} More</button>
        )}
      </div>
    </>
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
