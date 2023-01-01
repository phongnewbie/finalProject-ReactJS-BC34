import React from "react";
import parse from "html-react-parser";

export default function InfoMain(props) {
  const { projectDetail } = props;
  return (
    <>
      {/* <p>{parse(projectDetail.description)}</p> */}
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {projectDetail.members?.map((user, index) => {
            return (
              <div key={index} className="avatar">
                <img src={user.avatar} alt={user.avatar} />
              </div>
            );
          })}
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
}
