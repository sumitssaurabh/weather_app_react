import React from 'react'
import moment from 'moment'

const Daytime = () => {

  return (
    <div>

   <h2 className='date'><b>{moment().format("MMMM Do YYYY, h:mm:ss a")}</b></h2>
    
    
    </div>
  )
}

export default Daytime