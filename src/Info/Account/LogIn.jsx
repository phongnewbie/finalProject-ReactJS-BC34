import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import useRoute from "../../hooks/useRoute";

import { useDispatch } from "react-redux";
import { USER_LOGIN } from "../../utils/constant";
import { getStringLocal } from "../../utils/config";
import "../../components/LayOut/main.css";
import { NavLink, useNavigate } from "react-router-dom";
import Register from "./Register";
import { callSignIn } from "../../reducer/userReducer/userReducer";

export default function LogIn() {
  const {
    params,
    navigate,
    searchParams: [searchParams, setSearchParams],
  } = useRoute();
  let [reset, setReset] = useState(0);
  let verifyLogin = localStorage.getItem(USER_LOGIN);
  let dispatch = useDispatch();
  // let navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      let { email, passWord } = values;
      const result = await dispatch(callSignIn({ email, passWord }));
      if (result.isError == true) {
        opentAlertMessage(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const opentAlertMessage = (message) => {
    notification["error"]({
      message: "Thong Bao !",
      description: message,
    });
  };

  return (
    <div className="container mt-3 text-left">
      <div>
        <div style={{ marginTop: "100px" }}>
          <h2 className="text-center mb-5">Đăng nhập</h2>
          <div className="login-warp">
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 8,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tài khoản!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="passWord"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu khẩu!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 8,
                }}
              >
                <span className="login-link">
                  <NavLink to="/register">Bạn chưa có tài khoản?</NavLink> |{""}
                  <a href="/">Trang Chủ</a>
                </span>
                <Button className="mt-2 ms-2" type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

// let navigate = useNavigate();
//   let dispatch = useDispatch();
//   const onSubmit = async (values) => {
//     try {
//       let { email, passWord } = values;
//       const result = await dispatch(callSignIn({ email, passWord }));
//       if (result.isError == true) {
//         openNotificationWithIcon();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const openNotificationWithIcon = () => {
//     notification["error"]({
//       message: "Notification !",
//       description: "Your Information is incorrect !",
//     });
//   };
//   return (
//     <section className="vh-100 pt-5">
//       <div className="container-fluid h-custom">
//         <div className="row d-flex justify-content-center align-items-center h-100">
//           <div className="col-6 ">
//             <img
//               src="data:image/jpeg;base64,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"
//               className="img-fluid"
//             />
//           </div>
//           <div className="col-md-8 col-lg-6 col-xl-4">
//             <Form
//               name="basic"
//               initialValues={{ remember: true }}
//               onFinish={onSubmit}
//               autoComplete="on"
//             >
//               <span
//                 id="login"
//                 style={{
//                   fontSize: "40px",
//                   color: "#4b6cb7",
//                   marginBottom: "25px",
//                   display: "block",
//                 }}
//               >
//                 Log in
//               </span>
//               <div>
//                 <Form.Item
//                   name="email"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please input your email !",
//                     },
//                     {
//                       type: "email",
//                     },
//                   ]}
//                 >
//                   <Input placeholder="Email" />
//                 </Form.Item>

//                 <Form.Item
//                   name="passWord"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please input your password!",
//                     },
//                     {
//                       type: "string",
//                       min: 0,
//                       max: 10,
//                     },
//                   ]}
//                 >
//                   <Input type="password" placeholder="Password" />
//                 </Form.Item>
//               </div>

//               <div className="text-center text-lg-start mt-4 pt-2">
//                 <Form.Item>
//                   <Button type="primary" htmlType="submit">
//                     Login
//                   </Button>
//                 </Form.Item>
//                 <span>
//                   Or{" "}
//                   <a
//                     onClick={() => {
//                       navigate("Account/Register");
//                     }}
//                     className="fw-bolder text-black"
//                   >
//                     Sign up now ?
//                   </a>
//                 </span>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//       <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
//         <div className="text-white mb-3 mb-md-0">
//           Copyright © 2022. All rights reserved.
//         </div>
//       </div>
//     </section>
//   );
