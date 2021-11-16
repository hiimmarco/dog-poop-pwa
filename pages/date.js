import { format } from 'date-fns';
import { useState } from 'react';

export default function ShowDate() {
  const [currentDate, setCurrentDate] = useState('');

  function getCurrentDate() {
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const wholeDate = `${date}.${month}.${year}`;
    setCurrentDate(wholeDate);
  }
  console.log(currentDate);

  return (
    <div>
      <button onClick={getCurrentDate}>Klick here</button>
    </div>
  );
}
