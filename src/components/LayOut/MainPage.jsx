import React from "react";
import main from "./main.scss";
import { Col, Row } from "antd";

export default function MainPage() {
  return (
    <div>
      <Row>
        <Col span={12}>
          <div>{main.img}</div>
        </Col>
      </Row>
    </div>
  );
}
