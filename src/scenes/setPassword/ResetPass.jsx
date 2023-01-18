import React, { useState } from "react";
import "./ResetPass.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//  import { hideLoading, showLoading } from "../../redux/alertSlice";
//  import { USER_API_POST } from "../../axios";
import { useDispatch } from "react-redux";
// import Image from '../../img/purpleLike.png'

function ResetPass() {
  const location = useLocation();
  const [formData, setFormData] = useState({});
  const [confirmPass, setConfirmPass] = useState(false);
  const [passReset, setPassReset] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = location.state.id;
  console.log(userId);
  console.log(passReset,';;;;;;')
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPass } = formData;
    
    try {
      console.log(password,'co....',confirmPass)
      if (password !== confirmPass) {
        setConfirmPass((prev) => !prev);
        Array.from(document.querySelectorAll("input")).forEach(
          (input) => (input.value = "")
        );
      } else {
        // dispatch(showLoading());
        const response = await 
        // USER_API_POST
        (
          `/reset-password/${userId}`,
          formData
        );
        console.log(response,'response from server change')
        // dispatch(hideLoading());
        if (response.data.status) {
          toast.success(response.data.message);
          localStorage.clear();
          setPassReset((prev)=>!prev)
          setTimeout(()=>{
            navigate('/')
          },3000)
          toast("Please login")
        }
      }
    } catch (error) {
      // dispatch(hideLoading())
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="resetPass">
      {passReset && (
        <div className="resetForm">
          <h3>Password Reset</h3>
          <img src={Image} alt="" style={{width:'60px',height:'60px'}}/>
          <p>Your password has been reset successfully</p>
          <p style={{fontSize:'12px',marginTop:'-20px'}}>You will be redirected to Login page shorly.</p>
          <p style={{fontSize:'12px',marginTop:'-20px'}}><Link to={'/'}><span style={{color:'var(--violet)',textDecoration:'underline',cursor:'pointer'}}>Click here</span></Link> to redirect now.</p>

        </div>
      )}
      {!passReset && (<form className="resetForm" onSubmit={handleSubmit}>
        <h5>Create a new Password</h5>
        <div>
          <input
            type="password"
            placeholder="Enter new password"
            className="resetInput"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <p className="rules">Must be atleast 8 characters</p>
        {/* <div>
          <input
            type="password"
            placeholder="Confirm password"
            className="resetInput"
            name="confirmPass"
            onChange={handleChange}
            required
          />
        </div> */}
        {/* {confirmPass && (
          <span
            style={{
              color: "red",
              fontSize: "14px",
              alignSelf: "flex-start",
              marginLeft: "30px",
            }}
          >
            *Enter the same password
          </span>
        )} */}
        {/* {!confirmPass && <p className="rules">Both passwords must match</p>} */}
        <button className="button infoButton" type="submit">
          {" "}
          Submit
        </button>
      </form>)}
    </div>
  );
}

export default ResetPass;