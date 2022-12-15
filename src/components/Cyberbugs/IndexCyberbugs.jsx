import React from "react";
import ContentMain from "../../components/Cyberbugs/Main/ContentMain";
import HeaderMain from "../../components/Cyberbugs/Main/HeaderMain";
import InfoMain from "../../components/Cyberbugs/Main/InfoMain";

export default function IndexCyberbugs() {
  return (
    <div className="main">
      <HeaderMain />
      <h3>Cyber Board</h3>
      <InfoMain />
      <ContentMain />
    </div>
  );
}
