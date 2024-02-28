import { createPortal } from "react-dom";
import AddEventForm from "../components/AddEventForm";
import { EventType } from "../App";
import EditEventForm from "../components/EditEventForm";
import { useLayoutEffect, useRef, useState } from "react";

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
  const [isClosing, setIsClosing] = useState(false);
  const prevIsOpen = useRef<boolean>();

  const isEditing = event != undefined;

  useLayoutEffect(() => {
    if (!openEventModal && prevIsOpen.current) {
      setIsClosing(true);
    }

    prevIsOpen.current = openEventModal;
  }, [openEventModal]);

  if (!openEventModal && !isClosing) return null;

  return createPortal(
    <div
      onAnimationEnd={() => {
        setIsClosing(false);
      }}
      className={`modal ${isClosing ? "closing" : ""}`}
    >
      <div className="overlay"></div>
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
    </div>,
    document.querySelector("#modals")!
  );
}

export default EventModal;
