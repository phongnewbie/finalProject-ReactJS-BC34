import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuCyberbugs() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require("../../assets/img/download.jfif")} alt="" />
        </div>
        <div className="account-info">
          <p>Jira</p>
        </div>
      </div>
    </div>
  );
}

{/* <div className="control">
        <div>
          <i className="mr-1 fa fa-credit-card" />
          <NavLink className="text-dark" to="/indexcyberbugs">
            Cyber Board
          </NavLink>
        </div>
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
      </div> */}