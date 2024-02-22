import { addMonths, format, subMonths } from "date-fns";

type HeaderProps = {
  monthShowed: Date;
  setMonthShowed: React.Dispatch<React.SetStateAction<Date>>;
};

function Header({ monthShowed, setMonthShowed }: HeaderProps) {
  return (
    <div className="header">
      <button className="btn" onClick={() => setMonthShowed(new Date())}>
        Today
      </button>
      <div>
        <button
          className="month-change-btn"
          onClick={() => setMonthShowed((curr) => subMonths(curr, 1))}
        >
          &lt;
        </button>
        <button
          className="month-change-btn"
          onClick={() => setMonthShowed((curr) => addMonths(curr, 1))}
        >
          &gt;
        </button>
      </div>
      <span className="month-title">{format(monthShowed, "MMMM yyyy")}</span>
    </div>
  );
}

export default Header;
