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
import {
  openVisible,
  closeVisible,
  openForm,
  titleName,
} from "../../redux/reducers/drawerCyberbugs";
import { useDispatch, useSelector } from "react-redux";
import FormCreateTask from "../Forms/FormCreateTask";

const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// const items = [
//   //   <NavLink to="/films"></NavLink>,
//   // getItem(<NavLink to="films">Quản lý phim</NavLink>, <PieChartOutlined />),
//   // getItem("Phim", "sub1", <UserOutlined />, [
//   //   getItem(<NavLink to="films">Quản lý phim</NavLink>),
//   //   getItem(<NavLink to="addnew">Thêm phim</NavLink>),
//   // ]),
//   // getItem("User", "sub2", <UserOutlined />, [
//   //   getItem(<NavLink to="quanly">Quản lý người dùng</NavLink>),
//   //   getItem(<NavLink to="adduser">Thêm người dùng</NavLink>),
//   // ]),
//   getItem("Search", "1", <SearchOutlined />),
//   getItem(
//     "Create Task",
//     "2",
//     <button
//       onClick={() => {
//         useDispatch(openVisible(), openForm());
//       }}
//     >
//       <PlusOutlined />
//     </button>
//   ),
// ];

export default function SiderBar() {
  const dispatch = useDispatch();

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
    getItem(
      "Create Task",
      "2",
      <NavLink
        onClick={() => {
          dispatch(openForm(<FormCreateTask />));
          dispatch(openVisible());
          dispatch(titleName("Create Task"));
        }}
      >
        <PlusOutlined />
      </NavLink>
    ),
  ];

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
