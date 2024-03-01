import React from "react";
import { EventType } from "../App";
import { format } from "date-fns";

type EventListProps = {
  event: EventType;
  setOpenEditEvent: React.Dispatch<React.SetStateAction<boolean>>;
  setEventToEdit: React.Dispatch<React.SetStateAction<EventType | undefined>>;
};

function EventItem({
  event,
  setOpenEditEvent,
  setEventToEdit,
}: EventListProps) {
  function handleSetEventToEdit(event: EventType) {
    setEventToEdit(event);
    setOpenEditEvent(true);
  }
  return (
    <button
      onClick={() => handleSetEventToEdit(event)}
      className={event.allDay ? `all-day-event ${event.color} event` : `event`}
    >
      {!event.allDay && (
        <>
          <div className={`color-dot ${event.color}`}></div>
          <div className="event-time">{format(event.date, "ha")}</div>
        </>
      )}
      <div className="event-name">{event.name}</div>
    </button>
  );
}

export default EventItem;
