import { createContext, useContext, useState } from "react";
import Calendar from "./Calendar";
import Header from "./Header";

type EventType = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  date: Date;
  name: string;
  allDay: boolean;
  startTime: string | undefined;
  endTime: string | undefined;
  color: Color;
};

export type Color = "blue" | "red" | "green";

type ContextType = {
  events: EventType[];
  addEvent: (event: EventType) => void;
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
  const [events, setEvents] = useState<EventType[]>([]);

  function addEvent(event: EventType) {
    setEvents((prevEvents) => {
      return [...prevEvents, event];
    });
    console.log(events);
  }

  return (
    <Context.Provider value={{ events, addEvent }}>
      <div className="calendar">
        <Header monthShowed={monthShowed} setMonthShowed={setMonthShowed} />
        <Calendar monthShowed={monthShowed} />
      </div>
    </Context.Provider>
  );
}

export default App;
