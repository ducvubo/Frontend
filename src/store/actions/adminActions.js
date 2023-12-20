import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService
} from "../../services/userService";
import { toast } from "react-toastify"
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart error: ", e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILDED,
});
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchRoleStart error: ", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILDED,
});
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleStart error: ", e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILDED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Thêm người dùng thành công!")
        dispatch(saveUserSuccess(res.data));
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("saveUserFailed error: ", e);
    }
  };
};
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILDED,
});
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCCES,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
      toast.error("Lấy danh sách người dùng không thành công!")
        dispatch(fetchAllUserFailed());
      }
    } catch (e) {
      toast.error("Lấy danh sách người dùng không thành công!")
      dispatch(fetchAllUserFailed());
      console.log("fetchAllUserFailed error: ", e);
    }
  };
};
export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILDED,
});
export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Xóa người dùng thành công!")
        dispatch(saveUserSuccess(res.data));
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Xóa người dùng không thành công!")
        dispatch(saveUserFailed());
      }
    } catch (e) {
      toast.error("Xóa người dùng không thành công!")
      dispatch(saveUserFailed());
      console.log("saveUserFailed error: ", e);
    }
  };
};
export const deleteUserSuccess = (data) => ({
  type: actionTypes.DELETE_USER_SUCCCES,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILDED,
});
export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Sửa người dùng thành công!")
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Sửa người dùng không thành công!")
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Sửa người dùng không thành công!")
      dispatch(editUserFailed());
      console.log("editUserFailed error: ", e);
    }
  };
};
export const editUserSuccess = (data) => ({
  type: actionTypes.EDIT_USER_SUCCCES,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILDED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
    let res = await getTopDoctorHomeService('')
    if(res && res.errCode === 0){
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
        dataDoctors: res.data
      })
    }else{
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
      })
    }
    } catch (e) {
      console.log('FETCH_ALL_USERS_FAILDED: ',e)
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
      }) 
    }
  };
}