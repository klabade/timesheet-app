export  const  getMondayForDate =(date, direction = "current") =>{
    const options = { year: "numeric", month: "short", day: "numeric" };
  
    const givenDate = new Date(date);
  
    const dayOfWeek = givenDate.getDay();
  
    let diffToMonday = dayOfWeek === 0 ? -7 : 1 - dayOfWeek;
  
    // Adjust for "Prev" (previous Monday) or "Next" (next Monday)
    if (direction === "prev") {
      diffToMonday -= 7; // Subtract 7 days to get the previous Monday
    } else if (direction === "next") {
      diffToMonday += 7; // Add 7 days to get the next Monday
    }
  
    // Set the date to the calculated Monday
    givenDate.setDate(givenDate.getDate() + diffToMonday);
   // let weekStart = new Intl.DateTimeFormat("en-US", options).format(givenDate);
    // Format date as YYYY-MM-DD
    const weekStart = givenDate.toISOString().split("T")[0];
  
    return weekStart;
  }
  
  export const  getMonday =(option = 'current') => {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
      console.log(dayOfWeek)
      // Calculate the current Monday
      const currentMonday = new Date(today);
      currentMonday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
      console.log(currentMonday)
      // Calculate the previous Monday
      const previousMonday = new Date(currentMonday);
      previousMonday.setDate(currentMonday.getDate() - 7);
  
      // Calculate the next Monday
      const nextMonday = new Date(currentMonday);
      nextMonday.setDate(currentMonday.getDate() + 7);
  
      // Format the dates as "YYYY-MM-DD"
      const formatDate = (date) => date.toISOString().split("T")[0];
  
      // Return the selected option
      if (option === 'prev') {
          return formatDate(previousMonday);
      } else if (option === 'next') {
          return formatDate(nextMonday);
      } else {
          return formatDate(currentMonday);
      }
  }
  
  
  export const  initializeForm =()=>{
  return {
      timesheetData: Array(1).fill({
        project: "",
        activity: "test",
        description: "This is a test",
        details: [
          {
            Monday: 0
          },
          {
            Tuesday: 0
          },
          {
            Wednesday: 0
          },
          {
            Thursday: 0
          },
          {
            Friday: 0
          },
          {
            Saturday: 0
          },
          {
            Sunday: 0
          }
        ]
      })
    }
  }
  
  export const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  