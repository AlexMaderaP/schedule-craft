import { EventType } from "../context/EventsContext";
import { useEffect, useMemo, useRef, useState } from "react";
import EventModal from "../modals/EventModal";
import EventList from "./EventList";
import EventItem from "./EventItem";

type EventsProps = {
  events: EventType[];
};

function Events({ events }: EventsProps) {
  const myEvents = useRef<HTMLDivElement>(null);
  const [visibleEvents, setVisibleEvents] = useState(events.length);
  const [openMoreEvents, setOpenMoreEvents] = useState(false);

  const sortedEvents = useMemo(() => {
    return [...events].sort(compareDates);
  }, [events]);

  const eventsToShow = sortedEvents.slice(0, visibleEvents);
  const EventsHidden = events.length - visibleEvents;

  useEffect(() => {
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

  return (
    <>
      <div ref={myEvents} className="events">
        {eventsToShow.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
        {EventsHidden > 0 && (
          <button
            className="events-view-more-btn"
            onClick={() => setOpenMoreEvents(true)}
          >
            +{EventsHidden} More
          </button>
        )}
      </div>
      <EventModal openEventModal={openMoreEvents}>
        <EventList
          events={events}
          closeEventListModal={() => setOpenMoreEvents(false)}
        />
      </EventModal>
    </>
  );
}

export function compareDates(a: EventType, b: EventType) {
  if (a.allDay && !b.allDay) {
    return -1;
  } else if (!a.allDay && b.allDay) {
    return 1;
  }

  if (a.date < b.date) {
    return -1;
  } else if (a.date > b.date) {
    return 1;
  }

  return 0;
}

export default Events;
