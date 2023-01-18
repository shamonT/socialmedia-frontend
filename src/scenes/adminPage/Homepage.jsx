import React from 'react'
import Header from 'components/Header'

import Sidebar from 'components/Sidebar'

function Dashboard() {
  return (
    <div>
    <Header />
    <div className='adminhome-main'>
      <div className='adminhome-sidebar'>
        <Sidebar />
      </div>
      <div className='adminhome-graph'>
        {/* <AdminGraph /> */}
        Admin Home
      </ div>
    </div>
  </div>
   
   
  )
}

export default Dashboard