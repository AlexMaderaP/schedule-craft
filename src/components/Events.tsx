import { EventType } from "../App";
import { useEffect, useRef, useState } from "react";
import EventModal from "../modals/EventModal";
import EditEventForm from "./EditEventForm";
import EventList from "./EventList";
import EventItem from "./EventItem";

type EventsProps = {
  events: EventType[];
};

function Events({ events }: EventsProps) {
  const myEvents = useRef<HTMLDivElement>(null);
  const [visibleEvents, setVisibleEvents] = useState(events.length);
  const [eventToEdit, setEventToEdit] = useState<EventType>();
  const [openMoreEvents, setOpenMoreEvents] = useState(false);
  const [openEditEvent, setOpenEditEvent] = useState(false);

  events.sort(compareDates);

  const eventsToShow = events.slice(0, visibleEvents);
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
          <EventItem
            event={event}
            setOpenEditEvent={setOpenEditEvent}
            setEventToEdit={setEventToEdit}
          />
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
      <EventModal openEventModal={openEditEvent}>
        <EditEventForm
          event={eventToEdit}
          dateToCreateEvent={events[0].date}
          closeEventModal={() => setOpenEditEvent(false)}
        />
      </EventModal>
      <EventModal openEventModal={openMoreEvents}>
        <EventList
          events={events}
          closeEventListModal={() => setOpenMoreEvents(false)}
          setOpenEditEvent={setOpenEditEvent}
          setEventToEdit={setEventToEdit}
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
