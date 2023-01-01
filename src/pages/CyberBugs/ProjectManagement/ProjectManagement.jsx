import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Space,
  Table,
  Tag,
  Divider,
  Avatar,
  Popover,
  AutoComplete,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { callProjectList } from "../../../redux/reducers/projectCyberBugsReducer";
import { callOpenForm } from "../../../redux/reducers/drawerCyberbugs";
import {
  callDeleteProject,
  callDeleteUserProject,
} from "../../../redux/reducers/projectCyberBugsReducer";
import {
  openVisible,
  closeVisible,
  openForm,
  titleName,
} from "../../../redux/reducers/drawerCyberbugs";
import { editProjact } from "../../../redux/reducers/projectReducer";
import {
  callGetUser,
  callAssignUser,
} from "../../../redux/reducers/userReducer/userReducer";

export default function ProjectManagement(props) {
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  const arrProjectList = useSelector(
    (state) => state.projectCyberBugsReducer.projectList
  );

  const { userSearch } = useSelector((state) => state.userReducer);

  const getProjectList = async () => {
    try {
      dispatch(callProjectList());
    } catch (err) {
      console.log(err);
    }
  };

  // const getApiUser = async () => {
  //   try {
  //     dispatch(callGetUser());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getOpenForm = async () => {
    dispatch(callOpenForm());
  };

  useEffect(() => {
    getProjectList();
    getOpenForm();
    // getApiUser();
  }, []);
  const [value, setValue] = useState("");

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
      render: (text, record, index) => {
        return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
      },
      sorter: (item1, item2) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 > projectName1) {
          return -1;
        }
        return 1;
      },
      width: 200,
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
      width: 220,
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
      width: 200,
    },
    {
      title: "members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="top"
                  title="Member"
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    style={{ borderRadius: "50%" }}
                                    width={30}
                                    height={30}
                                    src={item.avatar}
                                    alt=""
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  {/* <button className="btn btn-danger">X</button> */}
                                  <NavLink
                                    onClick={() => {
                                      dispatch(
                                        callDeleteUserProject({
                                          projectId: record.id,
                                          userId: item.userId,
                                        })
                                      );
                                    }}
                                    style={{ color: "red" }}
                                  >
                                    <DeleteOutlined />
                                  </NavLink>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            <Popover
              className="ml-1"
              placement="rightTop"
              title={"Add user"}
              content={() => {
                return (
                  <AutoComplete
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    onChange={(value) => {
                      setValue(value);
                    }}
                    onSelect={(value, option) => {
                      setValue(option.label);
                      dispatch(
                        callAssignUser({
                          projectId: record.id,
                          userId: value,
                        })
                      );
                    }}
                    style={{ width: "100%" }}
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch(callGetUser(value));
                      }, 300);
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: "50%" }}>+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NavLink
            onClick={() => {
              dispatch(titleName(record.projectName));
              dispatch(openVisible(), openForm());
              dispatch(editProjact(record));
              console.log(record);
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
    <div className="container mt-3">
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
