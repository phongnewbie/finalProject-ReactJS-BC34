import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../utils/baseUrl";
import { history } from "../../../utils/history";

const initialState = {
  dataNguoiDung: [],
  dsNguoiDung: [],
  thongTinNguoiDung: [
    {
      userId: 3683,
      name: "thành",
      avatar: "https://ui-avatars.com/api/?name=thành",
      email: "thanhsonhoc001@gmail.com",
      phoneNumber: "0003333",
    },
  ],
};

const listUser = createSlice({
  name: "listUser",
  initialState,
  reducers: {
    layDataNguoiDung: (state, { type, payload }) => {
      {
        state.dataNguoiDung = payload;
      }
    },
    laydsNguoiDung: (state, { type, payload }) => {
      {
        state.dsNguoiDung = payload;
      }
    },
    layThongTinNguoiDung: (state, { type, payload }) => {
      {
        state.thongTinNguoiDung = payload;
      }
    },
  },
});

export const { layDataNguoiDung, laydsNguoiDung, layThongTinNguoiDung } =
  listUser.actions;

export default listUser.reducer;

// export const getThongTinNguoiDung = (taiKhoan) => async (dispatch) => {
//   const getApiDsNguoiDung = await http.get(
//     `/Users/getUser?keyword=${taiKhoan}`
//   );
//   dispatch(laydsNguoiDung(getApiDsNguoiDung.data.content));
// };

export const getInfoUser = (taiKhoan) => async (dispatch) => {
  const getApiDsNguoiDung = await http.get(
    `/Users/getUser?keyword=${taiKhoan}`
  );
  console.log(getApiDsNguoiDung.data.content);
  dispatch(layThongTinNguoiDung(getApiDsNguoiDung.data.content));
};

export const getEditUser = (taiKhoan) => async (dispatch) => {
  console.log(taiKhoan);
  try {
    const getApiEditUser = await http.put("/Users/editUser", taiKhoan);
    console.log("ok", getApiEditUser.data.content);
    alert("Cập nhật thành công");
    window.location.reload(layThongTinNguoiDung());

    // dispatch(layThongTinNguoiDung(getApiEditUser.data.content));
  } catch (err) {
    console.log(err.response?.data);
  }
};

export const getDsNguoiDung =
  (taiKhoan = "") =>
  async (dispatch) => {
    if (taiKhoan.trim() != "") {
      const getApiDsNguoiDung = await http.get(
        `/Users/getUser?keyword=${taiKhoan}`
      );
      dispatch(laydsNguoiDung(getApiDsNguoiDung.data.content));
    } else {
      const getApiDsNguoiDung = await http.get("/Users/getUser");
      dispatch(laydsNguoiDung(getApiDsNguoiDung.data.content));
    }
  };

export const callApiXoaNguoiDung = (taiKhoan) => async (dispatch) => {
  try {
    const getApiXoaUser = await http.delete(`/Users/deleteUser?id=${taiKhoan}`);
    const getApiDsNguoiDung = await http.get("/Users/getUser");
    alert("Xóa người dùng thành công");
    dispatch(laydsNguoiDung(getApiDsNguoiDung.data.content));
  } catch (err) {
    alert("xóa", err.response?.data.content);
  }
};

///////////////////////
