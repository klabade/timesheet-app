import { useState } from "react";
import DateNavigator from "./components/DateNavigator";
import {
  initializeForm,
  getMonday,
  daysOfWeek
} from "./util";
import TimeSheetData from "./components/TimeSheetData";

function App() {
  const [weekStartDate, setWeekStartDate] = useState("2024-12-30");

  const [formData, setFormData] = useState(() => initializeForm());

  const user = "2";

  const handlWeekStart = (date, direction) => {
    let mondayDate = getMonday(direction);
    console.log("New Week Start:", mondayDate);
    setWeekStartDate(mondayDate);
  };

  const handleInputChange = (index, field, value) => {
    setFormData((prevdata) => {
      const updatedTimesheetData = [...prevdata.timesheetData];

      if (daysOfWeek.includes(field)) {
        const updDetails = [...updatedTimesheetData[index].details];

        let dateIndex = daysOfWeek.indexOf(field);

        const intValue = value === "" || isNaN(value) ? 0 : parseInt(value, 10);
        if (intValue >= 24) {
          alert(" Hours entered cannot be 24");
          return prevdata;
        }

        if (updDetails[dateIndex]) {
          updDetails[dateIndex] = {
            ...updDetails[dateIndex],
            [field]: intValue
          };
        } else {
          updDetails[dateIndex] = { [field]: value };
        }
        console.log(updDetails[dateIndex]);

        updatedTimesheetData[index].details = updDetails;
      } else {
        updatedTimesheetData[index] = {
          ...updatedTimesheetData[index],
          [field]: value
        };

        console.log(updatedTimesheetData[index][field]);
      }
      return { ...prevdata, timesheetData: updatedTimesheetData };
    });
  };

  function handleSave(e) {
    e.preventDefault();
  }

  return (
    <>
      <DateNavigator
        weekStartDate={weekStartDate}
        user={user}
        handlWeekStart={handlWeekStart}
      />
      <form>
        <TimeSheetData
          formData={formData}
          handleInputChange={handleInputChange}
          daysOfWeek={daysOfWeek}
        />
        <div>
          <button onClick={(e) => handleSave(e)}> Save</button>
        </div>
      </form>
    </>
  );
}

export default App;
