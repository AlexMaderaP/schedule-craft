import { useEffect, useId, useState } from "react";
import { format, set } from "date-fns";
import { Color, EventType } from "../context/EventsContext";
import { useEvents } from "../hooks/useEvents";

type EditEventFormProps = {
  dateToCreateEvent: Date;
  event?: EventType;
  closeEventModal: () => void;
};

function EditEventForm({
  dateToCreateEvent,
  event,
  closeEventModal,
}: EditEventFormProps) {
  const { addEvent, editEvent, deleteEvent } = useEvents();
  const id = useId();

  const [name, setName] = useState(event?.name || "");
  const [allDay, setAllDay] = useState(event?.allDay || false);
  const [startTime, setStartTime] = useState(() => {
    if (!event) return "";
    return event.allDay ? "" : format(event.date, "HH:mm");
  });
  const [endTime, setEndTime] = useState(() => {
    if (!event) return "";
    return event.allDay ? "" : event.endTime;
  });
  const [color, setColor] = useState<Color>(event?.color || "blue");
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
      let newEvent: EventType;

      const commonProperties = {
        id: event?.id || crypto.randomUUID(),
        date: event?.date || dateToCreateEvent,
        name: name,
        allDay: allDay,
        color: color,
      };

      if (allDay) {
        newEvent = {
          ...commonProperties,
        };
      } else {
        const hours = +startTime.slice(0, 2);
        const mins = +startTime.slice(3);
        const dateWithStartTime = set(commonProperties.date, {
          hours: hours,
          minutes: mins,
        });
        newEvent = {
          ...commonProperties,
          date: dateWithStartTime,
          endTime: endTime,
        };
      }
      if (event) {
        editEvent(newEvent);
      } else {
        addEvent(newEvent);
      }

      handleClose();
    }
  }

  function handleClose() {
    closeEventModal();
  }

  function handleDelete() {
    if (event) deleteEvent(event.id);
    handleClose();
  }
  return (
    <>
      <div className="modal-title">
        <div>{event ? "Edit" : "Add"} Event</div>
        <small>{format(dateToCreateEvent, "MM/dd/yyyy")}</small>
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
            id={`${id}all-day`}
            checked={allDay}
            onChange={handleAllDayChange}
          />
          <label htmlFor={`${id}all-day`}>All Day?</label>
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
              id={`${id}blue`}
              checked={color === "blue"}
              className="color-radio"
              onChange={handleColorChange}
            />
            <label htmlFor={`${id}blue`}>
              <span className="sr-only">Blue</span>
            </label>
            <input
              type="radio"
              name="color"
              value="red"
              id={`${id}red`}
              checked={color === "red"}
              className="color-radio"
              onChange={handleColorChange}
            />
            <label htmlFor={`${id}red`}>
              <span className="sr-only">Red</span>
            </label>
            <input
              type="radio"
              name="color"
              value="green"
              id={`${id}green`}
              checked={color === "green"}
              className="color-radio"
              onChange={handleColorChange}
            />
            <label htmlFor={`${id}green`}>
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
            {event ? "Edit" : "Add"}
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
