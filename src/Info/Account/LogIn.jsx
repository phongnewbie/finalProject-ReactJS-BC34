import React, { useState } from "react";
import useRoute from "../../hooks/useRoute";
import { Button, Form, Input, notification } from "antd";
import { callSignIn } from "../../reducer/userReducer/userReducer";
import { USER_LOGIN } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";

export default function LogIn() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onSubmit = async (values) => {
    try {
      let { email, passWord } = values;
      const result = await dispatch(callSignIn({ email, passWord }));
      if (result.isError == true) {
        openNotificationWithIcon();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const openNotificationWithIcon = () => {
    notification["error"]({
      message: "Notification !",
      description: "Your email or password is incorrect !",
    });
  };
  return (
    <section className="vh-100 pt-5">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-6 ">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4">
            <Form
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              autoComplete="on"
            >
              <span id="dangNhap">Đăng Nhập</span>
              <div>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập ô này!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="passWord"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập ô này!",
                    },
                  ]}
                >
                  <Input type="password" placeholder="Mật khẩu" />
                </Form.Item>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Đăng nhập
                  </Button>
                </Form.Item>
                <span>
                  .
                  <a
                    onClick={() => {
                      navigate("/user/signup");
                    }}
                    className="fw-bolder text-black"
                  >
                    Đăng ký
                  </a>
                </span>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

// const {
//   params,
//   navigate,
//   searchParams: [searchParams, setSearchParams],
// } = useRoute();
// const login = () => {};
// let isLogin = localStorage.getItem(USER_LOGIN);
// let [comeBack, setComeback] = useState(0);
// let dispatch = useDispatch();
// const onFinish = async (info) => {
//   try {
//     let { account, password } = info;
//     const result = await dispatch(callSignIn({ account, password }));
//     if (result.checkingError == true) {
//       displayMessage(result.message);
//     }
//   } catch (err) {
//     alert(err);
//   }
// };
// const displayMessage = (message) => {
//   notification["success"]({
//     message: "Welcome",
//     description: message,
//   });
// };

// return (
//   <div className="container mt-5 text-center">
//     {isLogin ? (
//       <button
//         className=" bg-success btn-danger btn"
//         onClick={() => {
//           setComeback(comeBack + 1);
//           localStorage.removeItem(USER_LOGIN);
//         }}
//       >
//         LogOut
//       </button>
//     ) : (
//       <div className="mt-2">
//         <h2>Dang Nhap</h2>
//         <div className="login-warp">
//           <Form
//             name="basic"
//             labelCol={{
//               span: 8,
//             }}
//             wrapperCol={{
//               span: 8,
//             }}
//             initialValues={{
//               remember: true,
//             }}
//             onFinish={onFinish}
//             autoComplete="off"
//           >
//             <Form.Item
//               label="Tài khoản"
//               name="taiKhoan"
//               rules={[
//                 {
//                   required: true,
//                   message: "Hãy nhập tài khoản!",
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               label="Mật khẩu"
//               name="matKhau"
//               rules={[
//                 {
//                   required: true,
//                   message: "Hãy nhập mật khẩu khẩu!",
//                 },
//               ]}
//             >
//               <Input.Password />
//             </Form.Item>

//             <Form.Item
//               wrapperCol={{
//                 offset: 8,
//                 span: 8,
//               }}
//             >
//               <Button type="primary" htmlType="submit">
//                 Đăng nhập
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     )}
//   </div>
// );
