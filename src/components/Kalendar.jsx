import React, { useState } from 'react';
import './Kalendar.css';

const nazvyMesicu = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
];

const nazvyDnu = [
  'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'
];

function Kalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7; // 0 = Pondělí

  const today = new Date();

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const renderDates = () => {
    const dates = [];

    // Prázdné dny před začátkem měsíce
    for (let i = 0; i < firstDayOfMonth; i++) {
      dates.push(<div className="date empty" key={`empty-start-${i}`} />);
    }

    // Skutečné dny v měsíci
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      dates.push(
        <div className={`date ${isToday ? 'today' : ''}`} key={`day-${day}`}>
          {day}
        </div>
      );
    }

    // Prázdné dny za koncem měsíce
    const totalCells = firstDayOfMonth + daysInMonth;
    const remainingCells = 42 - totalCells;
    for (let i = 0; i < remainingCells; i++) {
      dates.push(<div className="date empty" key={`empty-end-${i}`} />);
    }

    return dates;
  };

  return (
    <div className="kalendar">
      <div className="header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <div>{`${nazvyMesicu[month]} ${year}`}</div>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>

      <div className="days">
        {nazvyDnu.map((day, idx) => (
          <div className="day" key={idx}>{day}</div>
        ))}
      </div>

      <div className="dates">
        {renderDates()}
      </div>
    </div>
  );
}

export default Kalendar;
