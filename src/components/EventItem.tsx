import { useState } from "react";
import { EventType } from "../context/EventsContext";
import { format } from "date-fns";
import EventModal from "../modals/EventModal";
import EditEventForm from "./EditEventForm";

type EventListProps = {
  event: EventType;
};

function EventItem({ event }: EventListProps) {
  const [openEditEvent, setOpenEditEvent] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenEditEvent(true)}
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
      <EventModal openEventModal={openEditEvent}>
        <EditEventForm
          event={event}
          dateToCreateEvent={event.date}
          closeEventModal={() => setOpenEditEvent(false)}
        />
      </EventModal>
    </>
  );
}

export default EventItem;
