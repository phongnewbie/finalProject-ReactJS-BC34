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

export default function HeaderMain(props) {
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">USERS</li>
          <li className="breadcrumb-item active" aria-current="page">
            {props.projectDetail.projectName}
          </li>
        </ol>
      </nav>
    </div>
  );
}
