import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { callSubmitEdit } from "../../redux/reducers/drawerCyberbugs";
import { connect, useDispatch, useSelector } from "react-redux";
import { callProjectCategory } from "../../redux/reducers/projectCategoryReducer/proJectCategoryReducer";
import { callEditProject } from "../../redux/reducers/projectReducer";
import { closeVisible } from "../../redux/reducers/drawerCyberbugs";
import { callProjectList } from "../../redux/reducers/projectCyberBugsReducer";

import { withFormik } from "formik";
import * as Yup from "yup";

function FormEditProject(props) {
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

  const arrProjectCategory = useSelector(
    (state) => state.proJectCategoryReducer.arrProjectCategory
  );
  const dispatch = useDispatch();

  const getProjectCategory = async () => {
    try {
      dispatch(callProjectCategory());
    } catch (err) {
      console.log(err);
    }
  };
  // const getEditForm = async () => {
  //   dispatch(callEditForm());
  // };

  // const submitForm = (e) => {
  //   e.preventDefault();
  //   alert("submit edit");
  // };

  useEffect(() => {
    getProjectCategory();
    // getEditForm();
    // dispatch({ type: "SET_SUBMIT_EDIT", submitFunction: handleSubmit });
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <form
      className="container-fuild"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <button className="btn btn-outline-primary" type="submit">
        Create Project
      </button>
      <div className="row">
        <div className="col-4 ">
          <div className="form-group">
            <p className="font-weight-bold">Project Id</p>
            <input
              disabled
              className="form-control"
              name="id"
              value={values.id}
            />
          </div>
        </div>
        <div className="col-4 ">
          <div className="form-group">
            <p className="font-weight-bold">Project Name</p>
            <input
              value={values.projectName}
              className="form-control"
              name="projectName"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-4 ">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select
              className="form-control"
              value={values.categoryId}
              name="categoryId"
              onChange={handleChange}
            >
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12 mt-5">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="description"
              // onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={values.description}
              value={values.description}
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
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

const editProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit?.projectName,
      categoryId: projectEdit?.categoryId,
      description: projectEdit?.description,
    };
  },
  validationSchem: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("value", values);
    props.dispatch(callEditProject(values));
    props.dispatch(closeVisible());
    props.dispatch(callProjectList());
  },
  displayName: "editProjectForm",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.projectReducer.projectEdit,
  arrProjectCategory: state.proJectCategoryReducer.arrProjectCategory,
});

export default connect(mapStateToProps)(editProjectForm);
