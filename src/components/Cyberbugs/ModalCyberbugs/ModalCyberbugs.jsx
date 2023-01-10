import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { useFormik } from "formik";

import { Editor } from "@tinymce/tinymce-react";
import { Select, Form } from "antd";
import { callArrStatus } from "../../../redux/reducers/statusReducer";
import { callgetPriority } from "../../../redux/reducers/priorityReducer";
import { callTaskTypeProjact } from "../../../redux/reducers/taskTypeReducer";
import { callUpdateStatus } from "../../../redux/reducers/updateProject/updateProjectReducer";
import {
  callTaskDetail,
  callUpdateTask,
} from "../../../redux/reducers/taskDetailReducer";
import {
  callTaskModal,
  getTaskModal,
  getAssigness,
  getTaskDetailDelete,
  getUpdateTask,
} from "../../../redux/reducers/taskDetailReducer";
import {
  callContentComment,
  callInsertComment,
  callDeleteComment,
} from "../../../redux/reducers/commentReducer/commentReducer";
import { callGetProjectDetail } from "../../../redux/reducers/projectCyberBugsReducer";
import { getProjectDetail } from "../../../redux/reducers/projectCyberBugsReducer";

export default function ModalCyberbugs(props) {
  const dispatch = useDispatch();
  const { taskDetail } = useSelector((state) => state.taskDetailReducer);
  const { arrStatus } = useSelector((state) => state.statusReducer);
  const { arrPriority } = useSelector((state) => state.priorityReducer);
  const { arrTaskType } = useSelector((state) => state.taskTypeReducer);
  const { projectDetail } = useSelector(
    (state) => state.projectCyberBugsReducer
  );

  // console.log("taskDetail", taskDetail);
  // console.log("projectDetail", projectDetail);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      priorityTask: taskDetail.priorityTask,
      taskTypeDetail: taskDetail.taskTypeDetail,
      assigness: taskDetail.assigness,
      lstComment: taskDetail.lstComment,
      taskId: taskDetail.taskId,
      taskName: taskDetail.taskName,
      alias: taskDetail.alias,
      description: taskDetail.description,
      statusId: taskDetail.statusId,
      originalEstimate: taskDetail.originalEstimate,
      timeTrackingSpent: taskDetail.timeTrackingSpent,
      timeTrackingRemaining: taskDetail.timeTrackingRemaining,
      typeId: taskDetail.typeId,
      priorityId: taskDetail.priorityId,
      projectId: taskDetail.projectId,

      alias: projectDetail.alias,
      creator: projectDetail.creator,
      descriptiont: projectDetail.description,
      lstTask: projectDetail.lstTask,
      members: projectDetail.members,
      projectCategory: projectDetail.projectCategory,
      projectName: projectDetail.projectName,
    },
    onSubmit: (values) => {
      console.log("value", values);
      values.listUserAsign = taskDetail.assigness?.map((user, index) => {
        return user.id;
      });

      dispatch(callUpdateTask(values));
    },
  });
  const { contentComment } = useSelector((state) => state.commentReducer);
  // console.log("contentComment", contentComment);
  const [commentUp, setCommentUp] = useState(contentComment);

  const getApiComment = async () => {
    try {
      dispatch(callContentComment(taskDetail.taskId));
    } catch (err) {
      console.log(err);
    }
  };
  const getApiProjectDetail = async () => {
    try {
      dispatch(callGetProjectDetail(taskDetail.projectId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // dispatch(callTaskDetail());
    dispatch(callArrStatus());
    dispatch(callgetPriority());
    dispatch(callTaskTypeProjact());
    getApiComment();
    getApiProjectDetail();
  }, []);

  const [comment, setComment] = useState("");

  const [visibleEditer, setVisibleEditer] = useState(false);
  const [historyContent, setHistoryContent] = useState(taskDetail.description);
  const [content, setContent] = useState(taskDetail.description);

  const renderDescription = () => {
    const jsxDescription = parse(taskDetail?.description);
    return (
      <div>
        {visibleEditer ? (
          <div>
            <Editor
              name="description"
              // onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={taskDetail.description}
              init={{
                height: 350,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch(
                  getTaskModal({
                    name: "description",
                    value: content,
                  })
                );
                setVisibleEditer(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                // setHistoryContent(taskDetail.description);
                setVisibleEditer(false);
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              setVisibleEditer(!visibleEditer);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  const handleChangeTh = (e) => {
    const { name, value } = e.target;

    dispatch(
      getTaskModal({
        name,
        value,
      })
    );
  };

  const [componentSize, setComponentSize] = useState("default");
  const [component, setComponent] = useState(0);
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const renderTimeTracking = () => {
    const { originalEstimate, timeTrackingSpent, timeTrackingRemaining } =
      taskDetail;

    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);
    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "6px",
              }}
            >
              <p className="logged">{Number(timeTrackingSpent)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              onChange={handleChangeTh}
              className="form-control"
              name="timeTrackingSpent"
            />
          </div>
          <div className="col-6">
            <input
              onChange={handleChangeTh}
              className="form-control"
              name="timeTrackingRemaining"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="searchModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-search">
          <div className="modal-content">
            <div className="modal-header">
              <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>RECENT ISSUES</p>
              <div style={{ display: "flex" }}>
                <div className="icon">
                  <i className="fa fa-bookmark" />
                </div>
                <div>
                  <p>cyberlearn</p>
                  <p>BUG-238066</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Info Modal */}
      <div
        className="modal fade"
        id="infoModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="infoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-info">
          <form
            onSubmit={formik.handleSubmit}
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            className="modal-content"
          >
            <div className="modal-header">
              <div className="task-title">
                <i className="fa fa-bookmark" />

                <span>{taskDetail?.taskName}</span>
              </div>
              <div style={{ display: "flex" }} className="task-click">
                <div>
                  <i className="fab fa-telegram-plane" />
                  <span style={{ paddingRight: 20 }}>Give feedback</span>
                </div>
                <div>
                  <i className="fa fa-link" />
                  <span style={{ paddingRight: 20 }}>Copy link</span>
                </div>
                <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-8">
                    <p className="issue">This is an issue of type: Task.</p>
                    <div className="description">
                      <p>Description</p>
                      {renderDescription()}
                    </div>
                    {/* <div style={{ fontWeight: 500, marginBottom: 10 }}>
                      Jira Software (software projects) issue types:
                    </div>
                    <div className="title">
                      <div className="title-item">
                        <h3>
                          BUG <i className="fa fa-bug" />
                        </h3>
                        <p>
                          A bug is a problem which impairs or prevents the
                          function of a product.
                        </p>
                      </div>
                      <div className="title-item">
                        <h3>
                          STORY <i className="fa fa-book-reader" />
                        </h3>
                        <p>
                          A user story is the smallest unit of work that needs
                          to be done.
                        </p>
                      </div>
                      <div className="title-item">
                        <h3>
                          TASK <i className="fa fa-tasks" />
                        </h3>
                        <p>A task represents work that needs to be done</p>
                      </div>
                    </div> */}
                    <div className="comment">
                      <h6>Comment</h6>
                      <div
                        className="block-comment"
                        style={{ display: "flex" }}
                      >
                        <div className="avatar">
                          <img
                            src={contentComment?.map((user, index) => {
                              return user.avatar;
                            })}
                            alt="1"
                          />
                        </div>
                        <div className="input-comment">
                          <input
                            id="inputComment"
                            value={comment}
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                            type="text"
                            placeholder="Add a comment ..."
                          />
                          <div
                            onClick={(e) => {
                              dispatch(
                                callInsertComment({
                                  taskId: taskDetail.taskId,
                                  contentComment:
                                    document.getElementById("inputComment")
                                      .value,
                                })
                              );
                              setCommentUp(commentUp);
                              setComment("");
                            }}
                          >
                            Submit
                          </div>
                          <p>
                            <span style={{ fontWeight: 500, color: "gray" }}>
                              Protip:
                            </span>
                            <span>
                              press
                              <span
                                style={{
                                  fontWeight: "bold",
                                  background: "#ecedf0",
                                  color: "#b4bac6",
                                }}
                              >
                                M
                              </span>
                              to comment
                            </span>
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="lastest-comment">
                        <div className="comment-item">
                          {taskDetail?.lstComment.map((user, index) => {
                            return (
                              <div
                                className="display-comment mt-2"
                                style={{ display: "flex" }}
                              >
                                <div className="avatar">
                                  <img src={user.avatar} alt="1" />
                                </div>
                                <div>
                                  <h5 style={{ marginBottom: 5 }}>
                                    {user.name}
                                  </h5>
                                  <p style={{ marginBottom: 5 }}>
                                    {user.commentContent}
                                  </p>
                                  <div>
                                    <span style={{ color: "#929398" }}>
                                      Edit
                                    </span>
                                    •
                                    <span
                                      onClick={() => {
                                        dispatch(callDeleteComment(user.id));
                                        // window.location.reload(user);
                                      }}
                                      style={{
                                        color: "#929398",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Delete
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="status">
                      <h6>STATUS</h6>
                      <select
                        name="statusId"
                        className="custom-select"
                        value={taskDetail?.statusId}
                        onChange={(e) => {
                          handleChangeTh(e);
                          // const action = {
                          //   taskId: taskDetail?.taskId,
                          //   statusId: e.target.value,
                          //   projectId: taskDetail.projectId,
                          // };
                          // dispatch(callUpdateStatus(action));
                          // console.log("UpdateStatus", action);
                        }}
                      >
                        {arrStatus?.map((status, index) => {
                          return (
                            <option key={index} value={status.statusId}>
                              {status.statusName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="assignees">
                      <h6>ASSIGNEES</h6>
                      <div className="row">
                        {taskDetail?.assigness.map((user, index) => {
                          return (
                            <div className="col-12 mt-2">
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                className="item"
                              >
                                <div className="avatar">
                                  <img src={user.avatar} alt={user.avatar} />
                                </div>
                                <p className="name ml-2">{user.name}</p>
                                <i
                                  className="fa fa-times"
                                  style={{
                                    marginLeft: "auto",
                                    marginRight: "4px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    dispatch(getTaskDetailDelete(user.id));
                                    // dispatch(getUpdateTask());
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}

                        <div className="col-12 mt-2">
                          {/* <span>Add more</span> */}
                          <Select
                            value="+ Add more"
                            name="lstUser"
                            optionFilterProp="label"
                            style={{
                              width: "100%",
                            }}
                            onSelect={(value) => {
                              // const value = e.target.value;
                              if (value == "0") {
                                return;
                              }
                              let userSelect = projectDetail.members.find(
                                (mem) => mem.userId == value
                              );
                              userSelect = {
                                ...userSelect,
                                id: userSelect.userId,
                              };
                              dispatch(getAssigness(userSelect));
                              // dispatch(getUpdateTask());
                            }}
                          >
                            {projectDetail.members
                              ?.filter((mem) => {
                                let index = taskDetail.assigness?.findIndex(
                                  (us) => us.id === mem.userId
                                );
                                if (index !== -1) {
                                  return false;
                                }
                                return true;
                              })
                              .map((mem, index) => {
                                return (
                                  <option key={index} value={mem.userId}>
                                    {mem.name}
                                  </option>
                                );
                              })}
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="priority mt-3" style={{ marginBottom: 20 }}>
                      <h6>PRIORITY</h6>
                      <select
                        name="priorityId"
                        className="form-control"
                        value={taskDetail?.priorityId}
                        onChange={(e) => {
                          handleChangeTh(e);
                        }}
                      >
                        {arrPriority?.map((priority, index) => {
                          return (
                            <option key={index} value={priority.priorityId}>
                              {priority.priority}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="estimate">
                      <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                      <input
                        name="originalEstimate"
                        type="text"
                        className="estimate-hours"
                        value={taskDetail?.originalEstimate}
                        onChange={(e) => {
                          handleChangeTh(e);
                        }}
                      />
                    </div>
                    <div className="time-tracking">
                      <h6>TIME TRACKING</h6>
                      {renderTimeTracking()}
                    </div>
                    <div style={{ color: "#929398" }}>
                      Create at a month ago
                    </div>
                    <div style={{ color: "#929398" }}>
                      Update at a few seconds ago
                    </div>
                  </div>
                  <button className="btn btn-success" type="submit">
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
