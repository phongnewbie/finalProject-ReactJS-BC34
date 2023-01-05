import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { callSignUp } from "../../redux/reducers/userReducer/userReducer";
import { useNavigate } from "react-router-dom";
import { getStringLocal } from "../../utils/config";
import { USER_LOGIN } from "../../utils/constant";
import { Form, notification, Input, Button } from "antd";
export default function Register() {
  let navigate = useNavigate();
  let isLogin = getStringLocal(USER_LOGIN);
  let dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(callSignUp(values));
    console.log(callSignUp);
  };
  const openNotificationWithIcon = () => {
    notification["error"]({
      message: "Notification !",
      description: "Email already in use!",
    });
  };
  return (
    // <h1>hi</h1>
    <section className="vh-100 pt-5">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onSubmit}
              autoComplete="on"
            >
              <span id="signup" className="">
                Sign up
              </span>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email !",
                  },
                  {
                    type: "email",
                  },
                ]}
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="passWord"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    type: "string",
                    min: 0,
                    max: 10,
                  },
                ]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    type: "string",
                    min: 10,
                    max: 10,
                  },
                ]}
              >
                <Input placeholder="Phone number" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Sign up
                </Button>
              </Form.Item>
              <span>
                Already have account??{" "}
                <a
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="fw-bolder text-black"
                >
                  Log in
                </a>
              </span>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
