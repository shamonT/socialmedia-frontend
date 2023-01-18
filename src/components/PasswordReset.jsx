import { passwordReset } from "api/AuthRequest";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ForgotPassword from "./ForgotPassword";

const PasswordReset = () => {
  const [message, setMessage] = useState();
  const [email, setEmail] = useState("");
  // const [forPass,setForPass] =useState(false)
  const navigate = useNavigate();
  const setVal = (e) => {
    setEmail(e.target.value);
  };
  const sendLink = async (e) => {
    e.preventDefault();
    const res = await passwordReset(email, {
      headers: {
        "content-type": "application/json",
      },
    });
    // const res = await fetch("http://localhost:3001/users/reset-password", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({ email }),
    // });
    console.log(res, "fdfsfdsdfsds");
    const data = await res.json();
    console.log(data, "Gggg");
    if (data.success) {
      navigate("/Otp", { state: { data: data.response } });
    } else {
      toast.error("Invalid user");
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter Your Email</h1>
          </div>

          {message ? (
            <p style={{ color: "green", fontWeight: "bold" }}>
              pasword reset link send Succsfully in Your Email
            </p>
          ) : (
            ""
          )}
          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={setVal}
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>

            <button className="btn" onClick={sendLink}>
              Send
            </button>
          </form>
          <ToastContainer />

          {/* <ForgotPassword email={email}/>  */}
        </div>
      </section>
    </>
  );
};

export default PasswordReset;
