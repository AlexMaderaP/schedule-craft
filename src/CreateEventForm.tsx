import React from "react";
import { createPortal } from "react-dom";

type CreateEventProps = {
  openCreateEvent: boolean;
  setOpenCreateEvent: React.Dispatch<React.SetStateAction<boolean>>;
};
function CreateEventForm({
  openCreateEvent,
  setOpenCreateEvent,
}: CreateEventProps) {
  return createPortal(
    <div className={`modal-overlay ${openCreateEvent ? "show" : ""}`}>
      <div className="modal">
        <div className="modal-body">
          <p>This is where the form would be</p>
          <button
            onClick={() => {
              setOpenCreateEvent(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.querySelector("#modals")!
  );
}

export default CreateEventForm;
