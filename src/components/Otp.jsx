import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

const Otp = () => {
  const location = useLocation();
  const navigate=useNavigate()
  console.log(location.state.data,' email:data.response.envelope.to[0]');
  const data = location.state.data;
  const onFinish = (value) => {
    console.log(data, "dsadassadas", value);
    try {
      if (data.otp === value.otp) {
        navigate('/forgotpassword',{state:{ email:data.envelope.to[0]}})
      } else {
        console.log("error");
      }
    } catch (error) {}
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter The Otp</h1>
          </div>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={<label style={{ color: "white" }}>ENTER YOUR OTP</label>}
              name="otp"
            >
              <Input placeholder="Enter OTP " />
            </Form.Item>

            <div className="d-flex flex-column">
              <Button className="primary-button my-2" htmlType="submit">
                Register
              </Button>
            </div>
          </Form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default Otp;
