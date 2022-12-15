import React from "react";
import { Outlet } from "react-router-dom";

import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberbugs from "../../components/Cyberbugs/ModalCyberbugs/ModalCyberbugs";
import SiderBar from "../../components/Cyberbugs/SiderBar";

export default function TrangChu() {
  return (
    <div className="jira">
      <SiderBar />
      <MenuCyberbugs />
      <Outlet />
      <ModalCyberbugs />
    </div>
  );
}
