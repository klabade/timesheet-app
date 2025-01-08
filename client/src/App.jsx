import { useEffect, useState } from "react";
import DateNavigator from "./components/DateNavigator";
import {
  initializeForm,
  getMondayForDate,
  daysOfWeek,
  initialObject
} from "./util";
import TimeSheetData from "./components/TimeSheetData";

function App() {
  const [weekStartDate, setWeekStartDate] = useState("2025-01-13");

  const [formData, setFormData] = useState(() => initializeForm());
  const [status,setStatus] = useState('')

  const user = "2";

  useEffect(() => {
    console.log("useeffect");
    setStatus('')
    fetch(
      `http://localhost:3031/timesheet?user=${user}&weekStartDate=${weekStartDate}`
    )
      .then((res) => {
        console.log(res.status);
        if (res.status === 404) {
          const data = initializeForm();

          setFormData({ ...data });
          return null;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data) {
          setFormData({ ...data });
        }
      })
      .catch((error) => console.error(error));
  }, [weekStartDate]);
  const addNewRow = () => {
    setFormData((prevFormData) => {
      const newRow = initialObject;
      return {
        prevFormData,
        timesheetData: [...prevFormData.timesheetData, newRow]
      };
    });
  };

  const deleteRow = (index) => {
    setFormData((prevFormData) => {
      if (prevFormData.timesheetData.length > 1) {
        const updatedTimesheetData = prevFormData.timesheetData.filter(
          (_, pindex) => pindex !== index
        );
        return { prevFormData, timesheetData: updatedTimesheetData };
      } else {
        return { ...prevFormData };
      }
    });
  };

  const handlWeekStart = (date, direction) => {
    let mondayDate = getMondayForDate(date, direction);
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
    const timesheet = {
      user,
      weekStartDate,
      timesheetData: formData.timesheetData
    };

    fetch("http://localhost:3031/timesheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(timesheet)
    }).then((res) =>{
      console.log(res.status)
      if(res.status===200)
       setStatus('Successfully saved!!')
    }
    ).catch((error) => console.error(error))
     
    

    
  }

  return (
    <>
     <div style={{color:'green'}}>
       { status!==""?status:""}
     </div>
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
          addNewRow={addNewRow}
          deleteRow={deleteRow}
        />
        <div>
          <button onClick={(e) => handleSave(e)}> Save</button>
        </div>
      </form>
    </>
  );
}

export default App;
