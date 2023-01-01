import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callTaskDetail } from "../../../redux/reducers/taskDetailReducer";

export default function ContentMain(props) {
  const dispatch = useDispatch();
  const { projectDetail } = props;

  const taskColor = (color) => {
    if (color == "High") {
      return <p style={{ color: "red" }}>High</p>;
    } else if (color == "Medium") {
      return <p style={{ color: "green" }}>Medium</p>;
    } else if (color == "Low") {
      return <p style={{ color: "blue" }}>Low</p>;
    } else {
      return <p style={{ color: "#666" }}>Lowest</p>;
    }
  };

  return (
    <div className="content" style={{ display: "flex" }}>
      {projectDetail.lstTask?.map((taskListDetail, index) => {
        return (
          <div
            key={index}
            className="card pd-2"
            style={{ width: "17rem", height: "auto", minHeight: "25rem" }}
          >
            <div className="card-header">{taskListDetail.statusName}</div>
            <ul className="list-group list-group-flush">
              {taskListDetail.lstTaskDeTail.map((task, index) => {
                return (
                  <li
                    key={index}
                    className="list-group-item"
                    data-toggle="modal"
                    data-target="#infoModal"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch(callTaskDetail(task.taskId));
                    }}
                  >
                    <p className="font-weight-bold mb-4">{task.taskName}</p>
                    <div className="block" style={{ display: "flex" }}>
                      <div className="block-left">
                        {taskColor(task.priorityTask.priority)}
                      </div>
                      <div className="block-right">
                        <div
                          className="avatar-group"
                          style={{ display: "flex" }}
                        >
                          {task.assigness.map((mem, index) => {
                            return (
                              <div className="avatar">
                                <img src={mem.avatar} alt={mem.avatar} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

{
  /* <div className="card" style={{ width: "17rem", height: "25rem" }}>
        <div className="card-header">BACKLOG 3</div>
        <ul className="list-group list-group-flush">
          <li
            className="list-group-item"
            data-toggle="modal"
            data-target="#infoModal"
            style={{ cursor: "pointer" }}
          >
            <p>
              Each issue has a single reporter but can have multiple assignees
            </p>
            <div className="block" style={{ display: "flex" }}>
              <div className="block-left">
                <i className="fa fa-bookmark" />
                <i className="fa fa-arrow-up" />
              </div>
              <div className="block-right">
                <div className="avatar-group" style={{ display: "flex" }}>
                  <div className="avatar">
                    <img
                      src={require("../../../assets/img/download (1).jfif")}
                      alt
                    />
                  </div>
                  <div className="avatar">
                    <img
                      src={require("../../../assets/img/download (2).jfif")}
                      alt
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <p>
              Each issue has a single reporter but can have multiple assignees
            </p>
            <div className="block" style={{ display: "flex" }}>
              <div className="block-left">
                <i className="fa fa-check-square" />
                <i className="fa fa-arrow-up" />
              </div>
              <div className="block-right">
                <div className="avatar-group" style={{ display: "flex" }}>
                  <div className="avatar">
                    <img
                      src={require("../../../assets/img/download (1).jfif")}
                      alt
                    />
                  </div>
                  <div className="avatar">
                    <img
                      src={require("../../../assets/img/download (2).jfif")}
                      alt
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div> */
}
{
  /* <div className="card" style={{ width: "17rem", height: "25rem" }}>
        <div className="card-header">SELECTED FOR DEVELOPMENT 2</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
        </ul>
      </div>
      <div className="card" style={{ width: "17rem", height: "25rem" }}>
        <div className="card-header">IN PROGRESS 2</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
        </ul>
      </div>
      <div className="card" style={{ width: "17rem", height: "25rem" }}>
        <div className="card-header">DONE 3</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div> */
}
