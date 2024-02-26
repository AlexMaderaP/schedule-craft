import { useEffect, useState } from "react";
import { type Color, useEvents } from "../App";
import { format, set } from "date-fns";

type AddEventFormProps = {
  dateToCreateEvent: Date;
  closeCreateEventModal: () => void;
};

function AddEventForm({
  dateToCreateEvent,
  closeCreateEventModal,
}: AddEventFormProps) {
  const { addEvent } = useEvents();

  const [name, setName] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState<Color>("blue");
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
      if (allDay) {
        const event = {
          id: crypto.randomUUID(),
          date: dateToCreateEvent,
          name: name,
          allDay: allDay,
          color: color,
        };
        addEvent(event);
        handleClose();
      } else {
        const hours = +startTime.slice(0, 2);
        const mins = +startTime.slice(3);
        const dateWithStartTime = set(dateToCreateEvent, {
          hours: hours,
          minutes: mins,
        });
        const event = {
          id: crypto.randomUUID(),
          date: dateWithStartTime,
          name: name,
          allDay: allDay,
          endTime: endTime,
          color: color,
        };
        addEvent(event);
        handleClose();
      }
    }
  }

  function handleClose() {
    setName("");
    setAllDay(false);
    setStartTime("");
    setEndTime("");
    setColor("blue");
    setTimeError("");
    closeCreateEventModal();
  }
  return (
    <>
      <div className="modal-title">
        <div>Add Event</div>
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
            Add
          </button>
          <button
            className="btn btn-delete"
            type="button"
            onClick={handleClose}
          >
            Delete
          </button>
        </div>
      </form>
    </>
  );
}

export default AddEventForm;
