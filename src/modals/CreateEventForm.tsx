import { createPortal } from "react-dom";
import AddEventForm from "../components/AddEventForm";

type CreateEventProps = {
  openCreateEvent: boolean;
  closeCreateEventModal: () => void;
  dateToCreateEvent: Date;
};

function CreateEventForm({
  openCreateEvent,
  closeCreateEventModal,
  dateToCreateEvent,
}: CreateEventProps) {
  return createPortal(
    <div className={`modal-overlay ${openCreateEvent ? "show" : ""}`}>
      <div className="modal">
        <div className="modal-body">
          <AddEventForm
            dateToCreateEvent={dateToCreateEvent}
            closeCreateEventModal={closeCreateEventModal}
          />
        </div>
      </div>
    </div>,
    document.querySelector("#modals")!
  );
}

export default CreateEventForm;
