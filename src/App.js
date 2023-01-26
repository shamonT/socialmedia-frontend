import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import AdminPage from "scenes/adminPage";
import HomePage from "scenes/homePage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import Dashboard from "scenes/adminPage/Homepage";

import Admin from "scenes/adminPage/Admin";
import Userlists from "scenes/adminPage/Userlist";
import Chat from "scenes/Chat/Chat";

import Report from "components/Report";

import UserreporterList from "scenes/adminPage/Userreporterlist";
import OtpFormm from "scenes/loginPage/OtpFormm";
import ResetPass from "scenes/setPassword/ResetPass";
import ForgotPassword from "components/ForgotPassword";
import PasswordReset from "components/PasswordReset";
import Otp from "components/Otp";
import AdminProtectedRoute from "components/protectedRoute";
//import { StarRateRounded } from "@mui/icons-material";

function App() {
  const mode = useSelector((state) => state.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const iisAuth = Boolean(useSelector((state) => state.adminAuth.admin));
  console.log(iisAuth,'bhbhbhbhbbb');
  return (
    <div className="App">
      
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isAuth===false?<LoginPage />:<HomePage />} />
            <Route path="/otp-page" element={<OtpFormm />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/Otp" element={<Otp />} />
            {/* <Route path="/home" element={<HomePage />} /> */}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
               {/* <Route path='/admin/dashboard' element={<Dashboard/>}/> */}
               {/* <Route path='/register' element={<Register/>}/> */}
               <Route path='/admin' element={<Admin/>}/>
               <Route
              path="/admin/dashboard"
              element={iisAuth ? <Dashboard /> : <Navigate to="/admin" />}
            />
            <Route
              path="/admin/user-list"
              element={iisAuth ? <Userlists/> : <Navigate to="/admin" />}
            />
               {/* <Route path='/admin/user-list' element={<Userlists/>}/>    */}
               <Route
              path="/admin/report-list"
              element={iisAuth ? <UserreporterList/>: <Navigate to="/admin" />}
            />
               {/* <Route path='/admin/report-list' element={<UserreporterList/>}/>    */}
               <Route
              path="/chat"
              element={isAuth ? <Chat/> : <Navigate to="/" />}
             
            />   
               <Route path="/reset-password" element= {<ResetPass />} />
            <Route path='/report-post' element={<Report/>}/>     
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}
export default App;
