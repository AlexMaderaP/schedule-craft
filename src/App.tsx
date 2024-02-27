import { createContext, useContext, useState } from "react";
import Calendar from "./Calendar";
import Header from "./Header";
import { useLocalStorage } from "./hooks/useLocalStorage";

export type Color = "blue" | "red" | "green";

type EventId = `${string}-${string}-${string}-${string}-${string}`;

export type EventType = {
  id: EventId;
  date: Date;
  name: string;
  allDay: boolean;
  endTime?: string;
  color: Color;
};

type ContextType = {
  events: EventType[];
  addEvent: (event: EventType) => void;
  deleteEvent: (id: EventId) => void;
  editEvent: (event: EventType) => void;
};

export const Context = createContext<ContextType | null>(null);

export function useEvents() {
  const eventContext = useContext(Context);
  if (eventContext == null) {
    throw new Error("Must use within provider");
  }

  return eventContext;
}

function App() {
  const [monthShowed, setMonthShowed] = useState(new Date());
  const [events, setEvents] = useLocalStorage<EventType[]>("EVENTS", []);

  function addEvent(event: EventType) {
    setEvents((prevEvents) => {
      return [...prevEvents, event];
    });
  }

  function deleteEvent(id: EventId) {
    setEvents((prevEvents) => {
      return prevEvents.filter((event) => event.id != id);
    });
  }

  function editEvent(event: EventType) {
    setEvents((prevEvents) => {
      return prevEvents.map((currEvent) => {
        if (currEvent.id === event.id) {
          return event;
        } else {
          return currEvent;
        }
      });
    });
  }

  return (
    <Context.Provider value={{ events, addEvent, deleteEvent, editEvent }}>
      <div className="calendar">
        <Header monthShowed={monthShowed} setMonthShowed={setMonthShowed} />
        <Calendar monthShowed={monthShowed} events={events} />
      </div>
    </Context.Provider>
  );
}

export default App;
