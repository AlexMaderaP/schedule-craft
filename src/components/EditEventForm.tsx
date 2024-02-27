import { useEffect, useState } from "react";
import { type Color, useEvents, EventType } from "../App";
import { format, set } from "date-fns";

type EditEventFormProps = {
  event: EventType;
  closeEventModal: () => void;
  clearEvent: () => void;
};

function EditEventForm({
  event,
  closeEventModal,
  clearEvent,
}: EditEventFormProps) {
  const { editEvent, deleteEvent } = useEvents();

  const [name, setName] = useState(event.name);
  const [allDay, setAllDay] = useState(event.allDay);
  const [startTime, setStartTime] = useState(
    event.allDay ? "" : format(event.date, "HH:mm")
  );
  const [endTime, setEndTime] = useState(event.allDay ? "" : event.endTime);
  const [color, setColor] = useState<Color>(event.color);
  const [timeError, setTimeError] = useState("");

  const isValidTime = timeError === "";

  useEffect(() => {
    if (startTime && endTime) {
      if (startTime >= endTime) {
        setTimeError("End Time should be after Start Time");
      } else {
        setTimeError("");
      }
    }
  }, [startTime, endTime]);

  function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    setColor(e.target.value as Color);
  }

  function handleAllDayChange() {
    setAllDay((d) => !d);
    setStartTime("");
    setEndTime("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isValidTime) {
      let editedEvent: EventType;

      const commonProperties = {
        id: event.id,
        date: event.date,
        name: name,
        allDay: allDay,
        color: color,
      };

      if (allDay) {
        editedEvent = {
          ...commonProperties,
        };
      } else {
        const hours = +startTime.slice(0, 2);
        const mins = +startTime.slice(3);
        const dateWithStartTime = set(event.date, {
          hours: hours,
          minutes: mins,
        });
        editedEvent = {
          ...commonProperties,
          date: dateWithStartTime,
          endTime: endTime,
        };
      }
      editEvent(editedEvent);
      handleClose();
    }
  }

  function handleClose() {
    clearEvent();
    closeEventModal();
  }

  function handleDelete() {
    deleteEvent(event.id);
    handleClose();
  }
  return (
    <>
      <div className="modal-title">
        <div>Edit Event</div>
        <small>{format(event.date, "MM/dd/yyyy")}</small>
        <button className="close-btn" onClick={handleClose}>
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group checkbox">
          <input
            type="checkbox"
            name="all-day"
            id="all-day"
            checked={allDay}
            onChange={handleAllDayChange}
          />
          <label htmlFor="all-day">All Day?</label>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="start-time">Start Time</label>
            <input
              type="time"
              name="start-time"
              id="start-time"
              disabled={allDay}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required={!allDay}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-time">End Time</label>
            <input
              type="time"
              name="end-time"
              id="end-time"
              disabled={allDay}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required={!allDay}
            />
          </div>
        </div>
        {!isValidTime && (
          <div className="row">
            <label className="label-error">{timeError}</label>
          </div>
        )}
        <div className="form-group">
          <label>Color</label>
          <div className="row left">
            <input
              type="radio"
              name="color"
              value="blue"
              id="blue"
              checked={color === "blue"}
              className="color-radio"
              onChange={handleColorChange}
            />
            <label htmlFor="blue">
              <span className="sr-only">Blue</span>
            </label>
            <input
              type="radio"
              name="color"
              value="red"
              id="red"
              checked={color === "red"}
              className="color-radio"
              onChange={handleColorChange}
            />
            <label htmlFor="red">
              <span className="sr-only">Red</span>
            </label>
            <input
              type="radio"
              name="color"
              value="green"
              id="green"
              checked={color === "green"}
              className="color-radio"
              onChange={handleColorChange}
            />
            <label htmlFor="green">
              <span className="sr-only">Green</span>
            </label>
          </div>
        </div>
        <div className="row">
          <button
            className="btn btn-success"
            type="submit"
            disabled={!isValidTime}
          >
            Edit
          </button>
          <button
            className="btn btn-delete"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </>
  );
}

export default EditEventForm;
