import { useState } from "react";
import Calendar from "./Calendar";
import Header from "./Header";
import { EventsProvider } from "./context/EventsContext";

function App() {
  const [monthShowed, setMonthShowed] = useState(new Date());

  return (
    <EventsProvider>
      <div className="calendar">
        <Header monthShowed={monthShowed} setMonthShowed={setMonthShowed} />
        <Calendar monthShowed={monthShowed} />
      </div>
    </EventsProvider>
  );
}

export default App;
