import { useState } from "react";
import Calendar from "./Calendar";
import Header from "./Header";

function App() {
  const [monthShowed, setMonthShowed] = useState(new Date());

  return (
    <div className="calendar">
      <Header monthShowed={monthShowed} setMonthShowed={setMonthShowed} />
      <Calendar monthShowed={monthShowed} />
    </div>
  );
}

export default App;
