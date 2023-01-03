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

// <div className="info" style={{ display: "flex" }}>
//   <div className="search-block">
//     <input className="search" />
//     <i className="fa fa-search" />
//   </div>
//   <div className="avatar-group" style={{ display: "flex" }}>
//     <div className="avatar">
//       <img src={require("../../../assets/img/download (1).jfif")} alt="1" />
//     </div>
//     <div className="avatar">
//       <img src={require("../../../assets/img/download (2).jfif")} alt="2" />
//     </div>
//     <div className="avatar">
//       <img src={require("../../../assets/img/download (3).jfif")} alt="3" />
//     </div>
//   </div>
//   <div style={{ marginLeft: 20 }} className="text">
//     Only My Issues
//   </div>
//   <div style={{ marginLeft: 20 }} className="text">
//     Recently Updated
//   </div>
// </div>
