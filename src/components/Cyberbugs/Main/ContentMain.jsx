import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { callTaskDetail } from "../../../redux/reducers/taskDetailReducer";
import { getProjectDetail } from "../../../redux/reducers/projectCyberBugsReducer";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { callUpdateStatus } from "../../../redux/reducers/updateProject/updateProjectReducer";
import ModalCyberbugs from "../ModalCyberbugs/ModalCyberbugs";

export default function ContentMain(props) {
  const dispatch = useDispatch();
  const { projectDetail } = props;
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    dispatch(getProjectDetail(projectDetail));
  }, [counter]);

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

  const handleDragEnd = (result) => {
    console.log(result);
    let { projectId, taskId } = JSON.parse(result.draggableId);
    let { source, destination } = result;

    if (!result.destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    dispatch(
      callUpdateStatus({
        taskId: taskId,
        statusId: destination.droppableId,
        projectId: projectId,
      })
    );
    setCounter(counter + 1);

    window.location.reload();
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="content" style={{ display: "flex" }}>
        {projectDetail.lstTask?.map((taskListDetail, index) => {
          return (
            <Droppable key={index} droppableId={taskListDetail.statusId}>
              {(provider) => {
                return (
                  <div
                    className="card pd-2"
                    style={{
                      width: "17rem",
                      height: "auto",
                      minHeight: "25rem",
                    }}
                  >
                    <div className="card-header">
                      {taskListDetail.statusName}
                    </div>
                    <div
                      ref={provider.innerRef}
                      {...provider.droppableProps}
                      key={index}
                      style={{ height: "100%" }}
                      className="list-group list-group-flush"
                    >
                      {taskListDetail.lstTaskDeTail.map((task, index) => {
                        return (
                          <Draggable
                            key={task.taskId.toString()}
                            index={index}
                            draggableId={JSON.stringify({
                              projectId: task.projectId,
                              taskId: task.taskId,
                            })}
                          >
                            {(provider) => {
                              return (
                                <div
                                  ref={provider.innerRef}
                                  {...provider.draggableProps}
                                  {...provider.dragHandleProps}
                                  key={index}
                                  className="list-group-item"
                                  data-toggle="modal"
                                  data-target="#infoModal"
                                  onClick={() => {
                                    dispatch(callTaskDetail(task.taskId));
                                  }}
                                >
                                  <p className="font-weight-bold mb-4">
                                    {task.taskName}
                                  </p>
                                  <div
                                    className="block"
                                    style={{ display: "flex" }}
                                  >
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
                                              <img
                                                src={mem.avatar}
                                                alt={mem.avatar}
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provider.placeholder}
                    </div>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
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
