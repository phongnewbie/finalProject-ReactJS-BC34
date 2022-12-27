import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { USER_LOGIN } from "../../utils/constant";

import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberbugs from "../../components/Cyberbugs/ModalCyberbugs/ModalCyberbugs";
import SiderBar from "../../components/Cyberbugs/SiderBar";

export default function TrangChu() {
  const navigate = useNavigate();

  // if (!localStorage.getItem(USER_LOGIN)) {
  //   alert("Bạn cần đăng nhập đễ tạo Project");
  //   navigate("/login");
  // }

  return (
    <div className="jira">
      <SiderBar />
      <MenuCyberbugs />
      <Outlet />
      <ModalCyberbugs />
    </div>
  );
}
