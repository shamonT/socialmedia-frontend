import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { BlockUser, getUser, UnBlockUser } from 'api/AuthRequest'


function Userlist() {
 
  const [user,setUser]=useState([])
  useEffect(()=>{
    async function getUsers(){
      const userData= await getUser()
      // const userData= await axios.get('http://localhost:3001/admin/getUser'
      //   // withCredentials: true
      // )
      console.log(userData);
      if(userData.status===200){
        setUser(userData.data)
      }else{
        alert('error')
      }
    }
    getUsers()
  },[user])
  
  const blockUser= async (userId)=>{
await BlockUser({userId})
    
     console.log(blockUser,'blockUser');
     if(blockUser.data===true){
      setUser((user)=>{
        user.map((val)=>{
          if(val._id===userId){
            return{...val,Active:false}
          }
          return val
        })
      })
     }
  }
  
  const unblockUser= async (userId)=>{
    console.log(userId,'hjgygyugkyu');
    const response= await UnBlockUser({userId});

console.log(response);
    if(unblockUser.data===true){
     setUser((user)=>{
       user.map((val)=>{
         if(val._id===userId){
           return{...val,Active:false}
         }
         return val
       })
     })
    }
 }
  console.log(user,'jhuhiuhiu');
  return (
<React.Fragment>
    <div className='userTable-main' >
        <div className="usersList">
            <Table striped bordered hover style={{width:'100%'}}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        {/* <th>Phone</th> */}
                        <th>Status</th>
                        <th style={{textAlign:'start'}}>Action</th>
                    </tr>
                </thead>
                <tbody style={{textAlign:'center'}}>

                   {user?.map((obj,index, id) => {
                    console.log(obj,'hdfj');
                      return (
                            <tr key={id}>
                                <td>{index + 1}</td>
                                <td>{obj?.firstName}</td>
                                <td>{obj?.email}</td>
                                {/* <td>{obj.mobile}</td> */}
                                 <td>{obj.Active ? 'Active' : 'Blocked'}</td> 
                                <td>{obj.Active
                                  ? <Button variant="danger" onClick={() => { if (window.confirm('Do you want to block this user?')) { blockUser(obj._id) } }} >Block</Button>
                                  : <Button variant="warning" onClick={() => { if (window.confirm('Do you want to unblock this user?')) { unblockUser(obj._id) } }} >Unblock</Button>}
                                </td> 

                            </tr>
                      )
                    })}

                </tbody>
            </Table>
        </div>
    </div>

</React.Fragment>
  )
}

export default Userlist