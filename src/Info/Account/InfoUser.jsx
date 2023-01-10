import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { callGetProjectDetail } from "../../redux/reducers/projectCyberBugsReducer";

export default function InfoUser() {
  const dispatch = useDispatch();
  const { projectDetail } = useSelector(
    (state) => state.projectCyberBugsReducer
  );
  console.log("info", projectDetail);

  useEffect(() => {
    dispatch(callGetProjectDetail());
  }, []);
  return <div>InfoUser</div>;
}
