import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { resetPassword } from 'api/AuthRequest';
import { useLocation, useNavigate } from 'react-router-dom';

const ForgotPassword = 


 () => {
  const navigate=useNavigate()
  const location = useLocation();
  const email = location.state.email;
   console.log(email,'emailemail');
  const onFinish = async(values) => {
    console.log(values,email,'hhhh');
   const response= await resetPassword(values.password,email)
   console.log(response,'jnjnhbh,');
   if(response.status===201){
    navigate('/home')
   }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='forgot'>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      padding-top="18rem"
    >
     

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your new password!' }]}
      >
        <Input.Password />
      </Form.Item>

     

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};



export default ForgotPassword