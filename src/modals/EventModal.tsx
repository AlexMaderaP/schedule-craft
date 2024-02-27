import { createPortal } from "react-dom";
import AddEventForm from "../components/AddEventForm";
import { EventType } from "../App";
import EditEventForm from "../components/EditEventForm";

type EventModalProps = {
  openEventModal: boolean;
  closeEventModal: () => void;
  dateToCreateEvent: Date;
  event?: EventType | undefined;
  clearEvent: () => void;
};

function EventModal({
  openEventModal,
  closeEventModal,
  dateToCreateEvent,
  event,
  clearEvent,
}: EventModalProps) {
  const isEditing = event != undefined;

  return createPortal(
    <div className={`modal-overlay ${openEventModal ? "show" : ""}`}>
      <div className="modal">
        <div className="modal-body">
          {isEditing ? (
            <EditEventForm
              event={event}
              closeEventModal={closeEventModal}
              clearEvent={clearEvent}
            />
          ) : (
            <AddEventForm
              dateToCreateEvent={dateToCreateEvent}
              closeEventModal={closeEventModal}
            />
          )}
        </div>
      </div>
    </div>,
    document.querySelector("#modals")!
  );
}

export default EventModal;
