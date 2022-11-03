import axiosClient from "./axiosClient";

const UserApi = {
  getAll() {
    // const token = axioClient.getToken();
    // if (token) {
    //     axioClient.setHeaderAuth(token)
    //     return axioClient.get('User')
    // }
    return axiosClient.get("user/get_users");
  },
  getUserByID(id) {
    return axiosClient.get(`user/detail?userID=${id}`, id);
  },
  UpdateStatus_Block(id) {
    return axiosClient.put( `http://esmpfree-001-site1.etempurl.com/api/user/Update_user_status?UserID=${id}&isActive=false`)
  },
  UpdateStatus_Active(id) {
    return axiosClient.put(`http://esmpfree-001-site1.etempurl.com/api/user/Update_user_status?UserID=${id}&isActive=true`)
  },
  add(data) {},

  update(data) {},
  remove(id) {
    return axiosClient.delete(`user/remove_user?UserID=${id}`);
  },
};
export default UserApi;
