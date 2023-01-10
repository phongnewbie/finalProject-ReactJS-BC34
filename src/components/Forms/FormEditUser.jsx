import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { callSubmitEdit } from "../../redux/reducers/drawerCyberbugs";
import { connect, useDispatch, useSelector } from "react-redux";
import { callProjectCategory } from "../../redux/reducers/projectCategoryReducer/proJectCategoryReducer";
import { callEditProject } from "../../redux/reducers/projectReducer";
import {
  closeVisible,
  setCallBackSubmit,
} from "../../redux/reducers/drawerCyberbugs";
import { callProjectList } from "../../redux/reducers/projectCyberBugsReducer";
import { getEditUser } from "../../redux/reducers/userReducer/listUser";

import { withFormik } from "formik";
import * as Yup from "yup";

function FormEditUser(props) {
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

  const getProjectCategory = async () => {
    try {
      dispatch(callProjectCategory());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProjectCategory();
    dispatch(setCallBackSubmit(handleSubmit));
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
      <div className="row">
        <div className="col-12 ">
          <div className="form-group">
            <p className="font-weight-bold">UserId</p>
            <input
              disabled
              className="form-control"
              name="id"
              value={values.id}
            />
          </div>
        </div>
        <div className="col-12 ">
          <div className="form-group">
            <p className="font-weight-bold">Name</p>
            <input
              value={values.name}
              className="form-control"
              name="name"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-12 ">
          <div className="form-group">
            <p className="font-weight-bold">Email</p>
            <input
              value={values.email}
              className="form-control"
              name="email"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-12 ">
          <div className="form-group">
            <p className="font-weight-bold">Phone Number</p>
            <input
              value={values.phoneNumber}
              className="form-control"
              name="phoneNumber"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

const editUserForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { thongTinNguoiDung } = props;
    const info = thongTinNguoiDung.find((user) => {
      return user;
    });
    return {
      id: info?.userId,
      name: info?.name,
      email: info?.email,
      phoneNumber: info?.phoneNumber,
      avatar: info?.avatar,
    };
  },
  validationSchem: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("value", values);
    props.dispatch(getEditUser(values));
    props.dispatch(closeVisible());
  },
  displayName: "editUserForm",
})(FormEditUser);

const mapStateToProps = (state) => ({
  thongTinNguoiDung: state.listUser.thongTinNguoiDung,
});

export default connect(mapStateToProps)(editUserForm);
