import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { openVisible, closeVisible } from "../redux/reducers/drawerCyberbugs";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";

// const { Option } = Select;

export default function DrawerCyber(props) {
  const { visible, compomenContentDrawer, callBackSubmit, title } = useSelector(
    (state) => state.drawerCyberbugs
  );

  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch(openVisible());
  };
  const onClose = () => {
    dispatch(closeVisible());
  };
  return (
    <>
      {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button> */}
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        open={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {compomenContentDrawer}
      </Drawer>
    </>
  );
}
