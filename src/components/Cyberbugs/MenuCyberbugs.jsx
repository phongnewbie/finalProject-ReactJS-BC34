import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { removeLocal } from "../../utils/config";
import { USER_LOGIN } from "../../utils/constant";

export default function MenuCyberbugs() {
  const [srHeader, setSrHeader] = useState(1);

  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require("../../assets/img/download.jfif")} alt="" />
        </div>
        <div className="account-info">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="mr-1 fa fa-cog" />
          <NavLink className="text-dark" to="/">
            Project management
          </NavLink>
        </div>
        <div>
          <i className="mr-1 fa fa-cog" />
          <NavLink className="text-dark" to="/createproject">
            Create project
          </NavLink>
        </div>
        <div>
          <i className="mr-1 fa fa-credit-card" />
          <NavLink
            className="text-dark"
            onClick={() => {
              removeLocal(USER_LOGIN);
              setSrHeader(srHeader + 1);
            }}
          >
            LogOut
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="mr-1 fa fa-truck" />
          <span>Releases</span>
        </div>
        <div>
          <i className="mr-1 fa fa-equals" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="mr-1 fa fa-paste" />
          <span>Pages</span>
        </div>
        <div>
          <i className="mr-1 fa fa-location-arrow" />
          <span>Reports</span>
        </div>
        <div>
          <i className="mr-1 fa fa-box" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
