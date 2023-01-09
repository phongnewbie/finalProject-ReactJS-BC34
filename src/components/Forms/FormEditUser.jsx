import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select, Button } from "antd";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getInfoUser,
  getEditUser,
  layThongTinNguoiDung,
} from "../../redux/reducers/userReducer/listUser";
import jwt_decode from "jwt-decode";

import {
  closeVisible,
  setCallBackSubmit,
} from "../../redux/reducers/drawerCyberbugs";

export default function FormEditUser(props) {
  const { thongTinNguoiDung } = useSelector((state) => state.listUser);
  console.log("info", thongTinNguoiDung);
  const dispatch = useDispatch();

  const infoUser = thongTinNguoiDung?.find((user) => {
    return user.userId;
  });
  console.log("infoUser", infoUser.userId);

  const getApiInfoUser = async () => {
    try {
      dispatch(getInfoUser(infoUser.userId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApiInfoUser(infoUser?.userId);
  }, [infoUser.userId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      avatar: infoUser.avatar,
      name: infoUser.name,
      email: infoUser.email,
      phoneNumber: infoUser.phoneNumber,
      userId: infoUser.userId,
    },
    onSubmit: (values) => {
      console.log("value", values);

      dispatch(getEditUser(values));
      dispatch(setCallBackSubmit(values));
    },
  });

  return (
    <div style={{ width: "600px" }} className="container">
      <h2 className="text-center mb-5">Cập nhật người dùng</h2>

      <Form
        name="register"
        //  onFinish={onFinish}

        onSubmitCapture={formik.handleSubmit}
      >
        <Form.Item
          label="ID"
          rules={[
            {
              required: true,
              message: "Hãy nhập tài khoản !",
            },
          ]}
        >
          <Input
            disabled={true}
            name="userId"
            onChange={formik.handleChange}
            value={formik.values.userId}
          />
        </Form.Item>

        <Form.Item
          label="E-mail"
          rules={[
            {
              required: true,
              message: "Hãy nhập Email !",
            },
          ]}
        >
          <Input
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Item>

        <Form.Item
          label="Name"
          rules={[
            {
              required: true,
              message: "Hãy nhập họ tên !",
            },
          ]}
        >
          <Input
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </Form.Item>

        <Form.Item
          label="Điện thoại"
          rules={[
            {
              required: true,
              message: "Hãy nhập số điện thoại",
            },
          ]}
        >
          <Input
            name="phoneNumber"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form>
    </div>
  );
}
