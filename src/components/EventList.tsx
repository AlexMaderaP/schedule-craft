import { EventType } from "../context/EventsContext";
import { format } from "date-fns";
import EventItem from "./EventItem";
import { compareDates } from "./Events";

type EventListProps = {
  events: EventType[];
  closeEventListModal: () => void;
};

function EventList({ events, closeEventListModal }: EventListProps) {
  events.sort(compareDates);

  return (
    <>
      <div className="modal-title">
        {format(events[0].date, "MM/dd/yyyy")}
        <button className="close-btn" onClick={() => closeEventListModal()}>
          &times;
        </button>
      </div>
      <div className="events">
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </>
  );
}

export default EventList;
