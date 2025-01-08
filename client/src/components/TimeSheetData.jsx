import React from "react";
import { daysOfWeek } from "../util";
export default function TimeSheetData({ formData, handleInputChange,addNewRow,deleteRow }) {
  const timeSheetDataElements = formData.timesheetData.map(
    (timesheet, index) => {
      return (
        <tr key={index}>
          <td>
            <select
              name="project"
              value={timesheet.project}
              onChange={(e) => handleInputChange(index, "project", e.target.value)}
            >
              <option value="">Select Value</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
            </select>
          </td>

          <td>
            <input
              type="text"
              name="activity"
              value={timesheet.activity}
              onChange={(e) =>
                handleInputChange(index, "activity", e.target.value)
              }
            />
          </td>

          {daysOfWeek.map((day, dayIndex) => (
            <td key={day}>
              <input
                type="number"
                maxLength="2"
                size="2"
                name={day}
                value={timesheet.details[dayIndex]?.[day] || 0}
                onChange={(e) => handleInputChange(index, day, e.target.value)}
              />
            </td>
          ))}

          {/* Description */}
          <td>
            <input
              type="text"
              value={timesheet.description}
              name="description"
              onChange={(e) =>
                handleInputChange(index, "description", e.target.value)
              }
            />
          </td>
          <td>
            <button type="button" onClick={addNewRow}><i class="fa-solid fa-plus"></i></button>
            <button type="button" className="delete" onClick={()=>deleteRow(index)}><i class="fa-solid fa-trash-can"></i></button>
            
          </td>
        </tr>
      );
    }
  );

  return (
    <div className="timesheet-table">
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Activity</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thur</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
            <th>Des</th>
          </tr>
        </thead>
        <tbody>{timeSheetDataElements}</tbody>
      </table>
    </div>
  );
}
