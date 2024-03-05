import { EventType } from "../context/EventsContext";
import { useMemo, useState } from "react";
import EventModal from "../modals/EventModal";
import EventList from "./EventList";
import EventItem from "./EventItem";
import OverFlowContainer from "./OverFlowContainer";
import { isAfter, isBefore } from "date-fns";

type EventsProps = {
  events: EventType[];
};

function Events({ events }: EventsProps) {
  const [openMoreEvents, setOpenMoreEvents] = useState(false);

  const sortedEvents = useMemo(() => {
    return [...events].sort(compareDates);
  }, [events]);

  return (
    <>
      <OverFlowContainer
        className="events"
        items={sortedEvents}
        getKey={(event) => event.id}
        renderItem={(event) => <EventItem event={event} />}
        renderOverflow={(amount) => (
          <button
            className="events-view-more-btn"
            onClick={() => setOpenMoreEvents(true)}
          >
            +{amount} More
          </button>
        )}
      />

      <EventModal openEventModal={openMoreEvents}>
        <EventList
          events={sortedEvents}
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

  if (isBefore(a.date, b.date)) {
    return -1;
  } else if (isAfter(a.date, b.date)) {
    return 1;
  }

  return 0;
}

export default Events;
