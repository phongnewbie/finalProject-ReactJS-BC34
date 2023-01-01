import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Button, Menu, Switch } from "antd";

export default function HeaderMain() {
  // return {
  //   key,
  //   icon,
  //   children,
  //   label,
  //   type,
  // };

    const items = [
      HeaderMain("Navigation One", "sub1", <MailOutlined />, [
        HeaderMain("Option 1", "1"),
        HeaderMain("Option 2", "2"),
        HeaderMain("Option 3", "3"),
        HeaderMain("Option 4", "4"),
      ]),
      HeaderMain("Navigation Two", "sub2", <AppstoreOutlined />, [
        HeaderMain("Option 5", "5"),
        HeaderMain("Option 6", "6"),
        HeaderMain("Submenu", "sub3", null, [
          HeaderMain("Option 7", "7"),
          HeaderMain("Option 8", "8"),
        ]),
      ]),
      HeaderMain("Navigation Three", "sub4", <SettingOutlined />, [
        HeaderMain("Option 9", "9"),
        HeaderMain("Option 10", "10"),
        HeaderMain("Option 11", "11"),
        HeaderMain("Option 12", "12"),
      ]),
    ];
    const App = () => {
      const [theme, setTheme] = useState("dark");
      const [current, setCurrent] = useState("1");
      const changeTheme = (value) => {
        setTheme(value ? "dark" : "light");
      };
      const onClick = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
      };
    return (
      <>
        <Switch
          checked={theme === "dark"}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <br />
        <br />
        <Menu
          theme={theme}
          style={{
            width: 256,
          }}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </>
    );
  }
}
/* <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">USERS</li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Task
          </li>
        </ol>
      </nav>
    </div> */
