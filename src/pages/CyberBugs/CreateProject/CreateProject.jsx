import React, { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  callProjectCategory,
  callcreateProject,
} from "../../../redux/reducers/projectCategoryReducer/proJectCategoryReducer";
import { withFormik } from "formik";
import * as Yup from "yup";

function CreateProject(props) {
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

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  const arrProjectCategory = useSelector(
    (state) => state.proJectCategoryReducer.arrProjectCategory
  );
  let dispatch = useDispatch();

  const getProjectCategory = async () => {
    try {
      dispatch(callProjectCategory());
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProjectCategory();
  }, []);

  return (
    <div className="container mt-5">
      <h3>Create Project</h3>
      <form
        className="container"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p>Description</p>
          <Editor
            name="description"
            // onInit={(evt, editor) => (editorRef.current = editor)}
            // initialValue="<p>This is the initial content of the editor.</p>"
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
        <div className="form-group">
          <select
            className="form-control"
            name="categoryId"
            onChange={handleChange}
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-outline-primary" type="submit">
          Create Project
        </button>
      </form>
    </div>
  );
}
const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id,
    };
  },
  validationSchem: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values);
    props.dispatch(callcreateProject(values));
  },
  displayName: "CreateProjectFormik",
})(CreateProject);

const mapStateToProps = (state) => ({
  arrProjectCategory: state.proJectCategoryReducer.arrProjectCategory,
});

export default connect(mapStateToProps)(createProjectForm);
