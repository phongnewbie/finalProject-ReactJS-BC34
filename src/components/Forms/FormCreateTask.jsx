import React, { useState, useEffect } from "react";
import { Radio, Select, Slider } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { callProjectList } from "../../redux/reducers/projectCyberBugsReducer";
import { callTaskTypeProjact } from "../../redux/reducers/taskTypeReducer";
import { callgetPriority } from "../../redux/reducers/priorityReducer";
import { callGetUser } from "../../redux/reducers/userReducer/userReducer";
import { getarrUserSearch } from "../../redux/reducers/userReducer/userReducer";
import { closeVisible } from "../../redux/reducers/drawerCyberbugs";
import { callCreateTask } from "../../redux/reducers/projectCyberBugsReducer";
import { callArrStatus } from "../../redux/reducers/statusReducer";
import { callUserByProjectId } from "../../redux/reducers/userReducer/userReducer";
import { setCallBackSubmit } from "../../redux/reducers/drawerCyberbugs";
import { withFormik } from "formik";
import * as Yup from "yup";

function FormCreateTask(props) {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
    setValues,
  } = props;

  const dispatch = useDispatch();
  const { projectList } = useSelector((state) => state.projectCyberBugsReducer);
  const { arrTaskType } = useSelector((state) => state.taskTypeReducer);
  const { arrPriority } = useSelector((state) => state.priorityReducer);
  const { arrUserSearch } = useSelector((state) => state.userReducer);
  const { arrStatus } = useSelector((state) => state.statusReducer);

  const userOption = arrUserSearch?.map((item, index) => {
    return { value: item.userId, label: item.name };
  });

  const handleEditorChange = (content, editor) => {
    // setFieldValue("description", content);
  };

  useEffect(() => {
    dispatch(callProjectList());
    dispatch(callTaskTypeProjact());
    dispatch(callgetPriority());
    dispatch(callGetUser(""));
    dispatch(callArrStatus());
    dispatch(setCallBackSubmit(handleSubmit));
  }, []);

  const options = [];

  // const handleChangee = (value) => {
  //   console.log(`Selected: ${value}`);
  // };

  const [size, setSize] = useState("middle");
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="form-group">
        <p className="mb-1">Project</p>
        <select
          name="projectId"
          className="form-control"
          onChange={(e) => {
            let { value } = e.target;
            dispatch(callUserByProjectId(value));
            setFieldValue("projectId", e.target.value);
          }}
        >
          {projectList.map((project, index) => {
            return (
              <option key={index} value={project.id}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <p className="mb-1">Task Name</p>
        <input
          onChange={handleChange}
          name="taskName"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <p className="mb-1">Status</p>
        <select
          onChange={handleChange}
          name="statusId"
          className="form-control"
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
      <div className="form-group mb-3">
        <div className="row">
          <div className="col-6">
            <p className="mb-1">Priority</p>
            <select
              name="priorityId"
              className="form-control"
              onChange={handleChange}
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
          <div className="col-6">
            <p className="mb-1">Task Type</p>
            <select
              name="typeId"
              className="form-control"
              onChange={handleChange}
            >
              {arrTaskType?.map((taskType, index) => {
                return (
                  <option key={index} value={taskType.id}>
                    {taskType.taskType}
                  </option>
                );
              })}
            </select>
          </div>{" "}
        </div>
      </div>
      <div className="form-group mb-3">
        <div className="row">
          <div className="col-6">
            <p>Assignees</p>
            <Select
              mode="multiple"
              size={size}
              placeholder="Please select"
              defaultValue={[]}
              onChange={(values) => {
                setFieldValue("listUserAsign", values);
              }}
              optionFilterProp="label"
              onSelect={(value) => {}}
              style={{
                width: "100%",
              }}
              options={userOption}
            />
            <div style={{ marginTop: "32px" }} className="row">
              <div className="col-12">
                <p>Original Estimate</p>
                <input
                  type={Number}
                  min={0}
                  name="originalEstimate"
                  defaultValue="0"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <p className="mb-1">Time Tracking</p>
            <Slider
              defaultValue={30}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
              value={timeTracking.timeTrackingSpent}
            />
            <div className="row">
              <div className="col-6 text-left">
                {timeTracking.timeTrackingSpent}h logged
              </div>
              <div className="col-6 text-right">
                {timeTracking.timeTrackingRemaining}h logged
              </div>
            </div>
            <hr />
            <div className="row mt-1">
              <div className="col-6">
                <p className="mb-1">Time spent</p>
                <input
                  type="number"
                  defaultValue="0"
                  min={0}
                  className="form-control"
                  name="timeTrackingSpent"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue("timeTrackingSpent", e.target.value);
                  }}
                />
              </div>
              <div className="col-6">
                <p className="mb-1">Time remaining</p>
                <input
                  type="number"
                  defaultValue="0"
                  min={0}
                  className="form-control"
                  name="timeTrackingRemaining"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    setFieldValue("timeTrackingRemaining", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group mb-3">
        <p className="mb-1">Description</p>
        <Editor
          name="description"
          // onInit={(evt, editor) => (editorRef.current = editor)}
          // initialValue={values.description}
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
            setFieldValue("description", content);
          }}
        />
      </div>
      {/* <button type="submit" className="btn btn-primary">
        Submit
      </button> */}
    </form>
  );
}

const formCreateTask = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectList, arrTaskType, arrPriority, arrStatus } = props;
    if (projectList.length > 0) {
      props.dispatch(callUserByProjectId(projectList[0]?.id));
    }

    return {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: projectList[0]?.id,
      typeId: arrTaskType[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
    };
  },
  validationSchem: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(callCreateTask(values));
    console.log("value ok", values);
  },
  displayName: "formCreateTask",
})(FormCreateTask);

const mapStateToProps = (state) => {
  return {
    projectList: state.projectCyberBugsReducer.projectList,
    arrTaskType: state.taskTypeReducer.arrTaskType,
    arrPriority: state.priorityReducer.arrPriority,
    arrStatus: state.statusReducer.arrStatus,
  };
};

export default connect(mapStateToProps)(formCreateTask);
