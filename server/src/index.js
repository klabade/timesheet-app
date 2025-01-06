const express = require("express");
const cors = require("cors");
const {
  getTimesheetData,

  updateTimesheetData
} = require("./timesheetUtils");
const app = express();
const PORT = 3031;

app.use(cors());
app.use(express.json());

app.get("/timesheet", (req, res) => {
  const { user, weekStartDate } = req.query;

  const timesheetData = getTimesheetData(req.query);

  if (timesheetData) {
    res.send(timesheetData);
  } else {
    const errorObj = {
      status: 404,
      message: `Requested data for User: ${user} and weekStartDate: ${weekStartDate} was not found`
    };
    res.status(404).json(errorObj);
  }
});

app.post("/timesheet", (req, res) => {
  // const { user, weekStartDate } = req.body;
  // console.log(`${user} and ${weekStartDate} `);
  // const timesheetData =  getTimesheetData({ user, weekStartDate });

  // if (timesheetData) {
  //     const errorObj = {"status": 409, "message" :`Already data exists for User: ${user} and weekStartDate: ${weekStartDate} .`}
  //     res
  //       .status(404)
  //       .json( errorObj);
  // } else {

  const success = updateTimesheetData(req.body);
  console.log(`success: ${success}`)
   const {user,weekStartDate } = req.body
  if (success) {
    res.send(req.body);
  } else {
    const errorObj = {
      status: 500,
      message: `Failed while updating User: ${user} and weekStartDate: ${weekStartDate} .`
    };
    res.status(500).json(errorObj);
  }
  //}
});

app.patch("/timesheet", (req, res) => {
  const success = updateTimesheetData(req.body);
  try {
    if (success) {
      res.json(req.body);
    } else {
      const errorObj = {
        status: 404,
        message: ` Record not found for the give data`
      };
      res.status(404).json(errorObj);
    }
  } catch (error) {
    const errorObj = {
      status: 500,
      message: error.message
    };
    res.status(500).json(errorObj);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
