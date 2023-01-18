
// import AdminPostReportList from 'components/AdminreporterList'
import Header from 'components/Header'
import Reporterlist from 'components/reporterlist'

import Sidebar from 'components/Sidebar'

import React from 'react'

function UserreporterList() {
  return (
    <div>
    <Header />
    <div className='adminUser-main'>
      <div className='adminUser-sidebar'>
        <Sidebar />
      </div>
      <div className='adminhome-graph'>
          <Reporterlist/>
        </ div>
    </div>
  </div>
  )
}

export default UserreporterList