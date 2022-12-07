import React, { useState } from "react";
import { Form, Button, Select, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callSignUp } from "../../reducer/userReducer/userReducer";
export default function Register() {
  const dispatch = useDispatch();
  const inFormation = (value) => {
    dispatch(callSignUp(value));
  };

  const websiteLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <div style={{ width: "600px", marginTop: "100px" }} className="container">
      <h2 className="text-center mb-5">Đăng ký</h2>
      <div className="signup-warp">
        <Form {...websiteLayout} name="register" onFinish={inFormation}>
          <Form.Item
            name="taiKhoan"
            label="Tài Khoản"
            rules={[
              {
                required: true,
                message: "Hãy nhập tài khoản !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="matKhau"
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
            name="matKhau"
            label="Nhập lại mật khẩu"
            dependencies={["matKhau"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Mật khẩu không khớp!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("matKhau") === value) {
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
            name="email"
            label="E-mail"
            rules={[
              // {
              //   type: "email",
              //   message: "Email không đúng định dạng !",
              // },
              {
                required: true,
                message: "Hãy nhập Email !",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="soDt"
            label="Điện thoại"
            rules={[
              {
                required: true,
                message: "Hãy nhập số điện thoại",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="hoTen"
            label="Họ tên"
            rules={[
              {
                required: true,
                message: "Hãy nhập họ tên",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...websiteLayout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
