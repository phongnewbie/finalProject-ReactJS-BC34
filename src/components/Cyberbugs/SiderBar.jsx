import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { NavLink, Outlet, redirect, useNavigate } from "react-router-dom";
import { Layout, Menu, theme } from "antd";

const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  //   <NavLink to="/films"></NavLink>,
  // getItem(<NavLink to="films">Quản lý phim</NavLink>, <PieChartOutlined />),
  // getItem("Phim", "sub1", <UserOutlined />, [
  //   getItem(<NavLink to="films">Quản lý phim</NavLink>),
  //   getItem(<NavLink to="addnew">Thêm phim</NavLink>),
  // ]),
  // getItem("User", "sub2", <UserOutlined />, [
  //   getItem(<NavLink to="quanly">Quản lý người dùng</NavLink>),
  //   getItem(<NavLink to="adduser">Thêm người dùng</NavLink>),
  // ]),
  getItem("Search", "1", <SearchOutlined />),
  getItem("Create issue", "2", <PlusOutlined />),
];

export default function SiderBar() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className="mh-100 h-100 siderBar">
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div />
          <img
            className="m-3"
            width={50}
            style={{ borderRadius: "50%" }}
            src={require("../../assets/img/download.jfif")}
            alt=""
          />

          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
      </Layout>
    </div>
  );
}
