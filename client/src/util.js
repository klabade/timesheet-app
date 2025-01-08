  
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
  

  export const getMondayForDate = (dateString, direction) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      throw new Error("Invalid date format. Please use 'YYYY-MM-DD'.");
    }
  
    // Adjust date directly based on the direction
    const offset = direction === "next" ? 7 : -7;
    const resultDate = new Date(date);
    resultDate.setDate(resultDate.getDate() + offset);
  
    // Format the result to 'YYYY-MM-DD'
    return resultDate.toISOString().split("T")[0];
  };
  
  export const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  export const initialObject = {
    project: "",
    activity: "test",
    description: "This is a test",
    details:daysOfWeek.map((day,_)=>({[day]:0}))
  };
  export const  initializeForm =()=>{
  return {
      timesheetData: Array(1).fill({
        project: "",
        activity: "test",
        description: "This is a test",
        details:daysOfWeek.map((day,_)=>({[day]:0}))
      })
    }
  }
  
 
  