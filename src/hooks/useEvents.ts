import { useContext } from "react";
import { Context } from "../context/EventsContext";

export function useEvents() {
  const eventContext = useContext(Context);
  if (eventContext == null) {
    throw new Error("Must use within provider");
  }

  return eventContext;
}
