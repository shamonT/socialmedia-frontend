import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import Userlist from 'components/userlist'
import React from 'react'

function Userlists() {
  return (
    <div>
      <Header />
      <div className='adminUser-main'>
        <div className='adminUser-sidebar'>
          <Sidebar />
        </div>
        <div className='adminhome-graph'>
          <Userlist />
        </ div>
      </div>
    </div>
  )
}

export default Userlists