import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { callSignUp } from "../../redux/reducers/userReducer/userReducer";
export default function Register() {
  let dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(callSignUp(values));
    console.log(values);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <div style={{ width: "600px", marginTop: "100px" }} className="container">
      <h2 className="text-center mb-5">Đăng ký</h2>
      <div className="signup-warp">
        <Form {...layout} name="register" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Hãy nhập Email !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="passWord"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="passWord"
            label="Nhập lại mật khẩu"
            dependencies={["passWord"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Mật khẩu không khớp!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("passWord") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[
              // {
              //   type: "email",
              //   message: "Email không đúng định dạng !",
              // },
              {
                required: true,
                message: "Hãy nhập Name !",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Hãy nhập số điện thoại",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <div style={{ textAlign: "right" }} className="mt-2">
            <NavLink to="/login" className="signup-link">
              Bạn đã có tài khoản
            </NavLink>
          </div>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
