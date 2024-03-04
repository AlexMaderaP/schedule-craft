import { ReactNode, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type Color = "red" | "blue" | "green";

export type EventType = {
  id: String;
  date: Date;
  name: string;
  allDay: boolean;
  endTime?: string;
  color: Color;
};

type ContextType = {
  events: EventType[];
  addEvent: (event: EventType) => void;
  deleteEvent: (id: String) => void;
  editEvent: (event: EventType) => void;
};

export const Context = createContext<ContextType | null>(null);

type EventsProviderProps = {
  children: ReactNode;
};

export function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useLocalStorage<EventType[]>("EVENTS", []);

  function addEvent(event: EventType) {
    setEvents((prevEvents) => {
      return [...prevEvents, event];
    });
  }

  function deleteEvent(id: String) {
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
      {children}
    </Context.Provider>
  );
}
