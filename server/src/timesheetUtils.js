const fs = require("fs");
const path = require("path");

const filepath = path.join(__dirname, "data.json");
let timesheetData = JSON.parse(fs.readFileSync(filepath));
function getTimesheetData(input) {
  const { user, weekStartDate } = input;

  const timesheet = timesheetData.find((entry) => {
  
    return entry.user === user && entry.weekStartDate === weekStartDate;
  });

  return timesheet || null;
}

function addTimesheetData(input) {
  timesheetData.push(input);
  const resp = fs.writeFileSync(
    filepath,
    JSON.stringify(timesheetData, null, 2)
  );
  return resp;
}

function updateTimesheetData(input) {
  try {
    const { user, weekStartDate } = input;
    const index = timesheetData.findIndex(
      (entry) => entry.user === user && entry.weekStartDate === weekStartDate
    );
  
    console.log(`index: ${index}`);
    if (index != -1) {
      console.log(`input: ${input}`, JSON.stringify(input, null, 2));
      timesheetData[index] = input;
      fs.writeFileSync(
        filepath,
        JSON.stringify(timesheetData, null, 2)
      )
      return true;
    }else{
        addTimesheetData(input);
        return true;
    }

    return false;
   
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getTimesheetData, addTimesheetData, updateTimesheetData };
