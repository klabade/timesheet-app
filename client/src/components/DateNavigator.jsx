import React from 'react'

export default function DateNavigator({weekStartDate,user,handlWeekStart}) {
  return (
   <section>
  <label> User</label>
      <input type="text" readonly value={user} />

      <label> Week Start Date</label>
      <input type="text" value={weekStartDate}  />

      <button onClick={()=>{handlWeekStart(weekStartDate,'prev')}}>Prev</button>
      <button onClick={()=>{handlWeekStart(weekStartDate,'next')}}>Next</button>

   </section>
  )
}
