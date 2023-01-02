import React, { useState, useEffect } from "react";
import { Button, Space, Table, Tag, Divider } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { callProjectList } from "../../../redux/reducers/projectCyberBugsReducer";
import { callOpenForm } from "../../../redux/reducers/drawerCyberbugs";
import { callDeleteProject } from "../../../redux/reducers/projectCyberBugsReducer";
import {
  openVisible,
  closeVisible,
  openForm,
} from "../../../redux/reducers/drawerCyberbugs";
import { editProjact } from "../../../redux/reducers/projectReducer";

export default function ProjectManagement(props) {
  const dispatch = useDispatch();

  const arrProjectList = useSelector(
    (state) => state.projectCyberBugsReducer.projectList
  );

  const getProjectList = async () => {
    try {
      dispatch(callProjectList());
    } catch (err) {
      console.log(err);
    }
  };

  const getOpenForm = async () => {
    dispatch(callOpenForm());
  };

  useEffect(() => {
    getProjectList();
    getOpenForm();
  }, []);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (item1, item2) => {
        return item2.id - item1.id;
      },
      //   sortDirections: ["descend"],
    },
    {
      title: "ProjectName",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (item1, item2) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 > projectName1) {
          return -1;
        }
        return 1;
      },
    },
    // {
    //   title: "description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text, record, index) => {
    //     let jsxContent = window.HTMLReactParser(text);
    //     return <div key={index}>{jsxContent}</div>;
    //   },
    // },
    {
      title: "Creator",
      //   dataIndex: "categoryName",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item1, item2) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 > creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "CategoryName",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item1, item2) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 > categoryName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NavLink
            onClick={() => {
              dispatch(openVisible(), openForm());
              dispatch(editProjact(record));
            }}
            style={{ color: "blue" }}
          >
            <EditOutlined />
          </NavLink>
          <NavLink
            style={{ color: "red" }}
            onClick={() => {
              dispatch(callDeleteProject(record.id));
              console.log("id", record.id);
            }}
          >
            <DeleteOutlined />
          </NavLink>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ overflow: "hidden" }} className="container mt-3">
      <h3>Project Management</h3>
      {/* <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space> */}
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={arrProjectList}
        onChange={handleChange}
      />
    </div>
  );
}
