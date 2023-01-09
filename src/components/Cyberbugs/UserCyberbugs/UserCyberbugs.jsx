import React, { useEffect, useState, Fragment } from "react";
import { Table } from "antd";
import { Input, Space, Button } from "antd";
import {
  AudioOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getDsNguoiDung,
  callApiXoaNguoiDung,
  getEditUser,
  getInfoUser,
} from "../../../redux/reducers/userReducer/listUser";
import { history } from "../../../utils/history";
import {
  callOpenFormEditUser,
  openVisible,
} from "../../../redux/reducers/drawerCyberbugs";

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function UserCyberbugs() {
  const apiDsNguoiDung = useSelector((state) => state.listUser.dsNguoiDung);
  let dispatch = useDispatch();

  const onSearch = (value) => {
    dispatch(getDsNguoiDung(value));
  };

  const getApiUser = async () => {
    try {
      dispatch(getDsNguoiDung());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApiUser();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, user) => {
        return (
          <Fragment>
            {user.email.length > 30
              ? user.email.substr(0, 30) + "..."
              : user.email}
          </Fragment>
        );
      },
    },

    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, user) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              style={{ color: "blue" }}
              className="mr-2"
              onClick={() => {
                dispatch(callOpenFormEditUser());
                dispatch(openVisible());
                dispatch(getInfoUser(user.userId));
                console.log("ihhhh", user.userId);
              }}
            >
              <EditOutlined />{" "}
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (window.confirm("bạn muốn xóa tài khoản " + user.name)) {
                  dispatch(callApiXoaNguoiDung(user.userId));
                }
              }}
              key={2}
              className=""
              to="/"
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>
          </Fragment>
        );
      },
    },
  ];

  const data = apiDsNguoiDung;

  return (
    <div className="container">
      <h3 className="mb-4">Quản lý người dùng</h3>

      <Search
        className="mb-3"
        placeholder="tìm kiếm người dùng"
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"taiKhoan"}
      />
    </div>
  );
}
