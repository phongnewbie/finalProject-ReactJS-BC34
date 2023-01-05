import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import useRoute from "../../hooks/useRoute";

import { useDispatch } from "react-redux";
import { USER_LOGIN } from "../../utils/constant";
import { getStringLocal } from "../../utils/config";
import "../../components/LayOut/main.css";
import { NavLink, useNavigate } from "react-router-dom";
import Register from "./Register";
import { callSignIn } from "../../reducer/userReducer/userReducer";

export default function LogIn() {
  const {
    params,
    navigate,
    searchParams: [searchParams, setSearchParams],
  } = useRoute();
  let [reset, setReset] = useState(0);
  let isLogin = localStorage.getItem(USER_LOGIN);
  let dispatch = useDispatch();
  //let navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      let { email, passWord } = values;
      const result = await dispatch(callSignIn({ email, passWord }));
      if (result.isError == true) {
        opentAlertMessage(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const opentAlertMessage = (message) => {
    notification["error"]({
      message: "Thong Bao !",
      description: message,
    });
  };

  return (
    <div className="container mt-3 text-left">
      {isLogin ? (
        <button
          className="btn btn-danger"
          onClick={() => {
            setReset(reset + 1);
            localStorage.removeItem(USER_LOGIN);
          }}
        >
          Logout
        </button>
      ) : (
        <div>
          <div style={{ marginTop: "100px" }}>
            <h2 className="text-center mb-5">Đăng nhập</h2>
            <div className="login-warp">
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
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập tài khoản!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="passWord"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập mật khẩu khẩu!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 8,
                  }}
                >
                  <span className="login-link">
                    <NavLink to="/Register">Bạn chưa có tài khoản?</NavLink> |
                    {""}
                    <a href="/">Trang Chủ</a>
                  </span>
                  <Button
                    className="mt-2 ms-2"
                    type="primary"
                    htmlType="submit"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
