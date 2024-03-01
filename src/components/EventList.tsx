import { EventType } from "../App";
import { format } from "date-fns";
import EventItem from "./EventItem";
import { compareDates } from "./Events";

type EventListProps = {
  events: EventType[];
  closeEventListModal: () => void;
  setOpenEditEvent: React.Dispatch<React.SetStateAction<boolean>>;
  setEventToEdit: React.Dispatch<React.SetStateAction<EventType | undefined>>;
};

function EventList({
  events,
  closeEventListModal,
  setOpenEditEvent,
  setEventToEdit,
}: EventListProps) {
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
          <EventItem
            event={event}
            setOpenEditEvent={setOpenEditEvent}
            setEventToEdit={setEventToEdit}
          />
        ))}
      </div>
    </>
  );
}

export default EventList;
