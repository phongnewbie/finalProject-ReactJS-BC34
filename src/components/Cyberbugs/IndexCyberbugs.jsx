import React, { useEffect, useState } from "react";
import { http } from "../../utils/baseUrl.js";
import ContentMain from "../../components/Cyberbugs/Main/ContentMain";
import HeaderMain from "../../components/Cyberbugs/Main/HeaderMain";
import InfoMain from "../../components/Cyberbugs/Main/InfoMain";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function IndexCyberbugs(props) {
  const dispatch = useDispatch;
  const params = useParams();

  const [state, setState] = useState({});
  const getApiChiTiet = async () => {
    const apigetProjectDetail = await http.get(
      `/Project/getProjectDetail?id=${params.id}`
    );
    setState(apigetProjectDetail.data.content);
  };

  useEffect(() => {
    getApiChiTiet();

    window.scrollTo(0, 0);
  }, [params.id]);

  return (
    <div className="main">
      <HeaderMain projectDetail={state} />
      <h3>{state.projectName}</h3>
      <InfoMain projectDetail={state} />
      <ContentMain projectDetail={state} />
    </div>
  );
}
