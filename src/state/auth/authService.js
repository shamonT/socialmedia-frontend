import axios from "axios";
// import { Navigate } from "react-router-dom";



//register admin


const register = async (userData) => {
    console.log('call reached register',userData)
    const response = await axios.post(
      "http://localhost:3001/admin/adminregister",
      userData
    );
    console.log(response,'responseeee')

    if (response.data) {
      localStorage.setItem("admin", JSON.stringify(response.data));
      
    }
    return response.data;
  };
  const login = async (userData) => {
  
    console.log(userData, "haiiiiiiiiiiiiiiiiiiiiiii");
    const response = await axios.post(
      "http://localhost:3001/admin/admin",
      userData
    );
      console.log(response,
      'responseeeee.....')
    if (response.data) {
        console.log('gggggggggg',response.data);
        localStorage.setItem('admin',JSON.stringify(response.data))
      
    }
    
    return response.data;
  };
  

  const logout=()=>{
    localStorage.removeItem('admin')
  }
const authService={
    
    register,logout,login
}
export default authService;