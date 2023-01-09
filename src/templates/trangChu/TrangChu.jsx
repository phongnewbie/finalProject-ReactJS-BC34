import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { USER_LOGIN } from "../../utils/constant";

import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberbugs from "../../components/Cyberbugs/ModalCyberbugs/ModalCyberbugs";
import SiderBar from "../../components/Cyberbugs/SiderBar";
import { history } from "../../utils/history";
import LogIn from "../../Info/Account/LogIn";

export default function TrangChu() {
  const navigate = useNavigate();
  let isLogin = localStorage.getItem(USER_LOGIN);

  // if (!localStorage.getItem(USER_LOGIN)) {
  //   alert("Bạn cần đăng nhập đễ tạo Project");
  //   navigate("/login");
  //   // history.push("/login");
  // }

  return (
    <div>
      {isLogin ? (
        <div className="jira">
          <SiderBar />
          <MenuCyberbugs />
          <Outlet />
          <ModalCyberbugs />
        </div>
      ) : (
        <div>
          <LogIn />
        </div>
      )}
    </div>
  );
}
