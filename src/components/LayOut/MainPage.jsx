import React, { useState } from "react";
// import AllBody from "./AllBody";
import LogIn from "../../Info/Account/LogIn";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import "./main.css";

export default function MainPage(props) {
  let isLogin = localStorage.getItem("user");
  let [reset, setReset] = useState(0);
  let navigate = useNavigate();
  return (
    <div
      style={{ height: "200px", width: "600px" }}
      className="container mt-3  border border-success  text-danger"
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="userName"
          name="userName"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            className="bg-danger ms-1"
            htmlType="button"
            onClick={() => {
              navigate("../../Info/Account/Register.jsx");
            }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
