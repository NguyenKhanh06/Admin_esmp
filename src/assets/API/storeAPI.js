import axiosClient from "./axiosClient";

const StoreApi = {
  getAll() {
    // const token = axioClient.getToken();
    // if (token) {
    //     axioClient.setHeaderAuth(token)
    //     return axioClient.get('item')
    // }
    return axiosClient.get("Store");
  },
  add(data) {},

  UpdateStatus_Active(id) {
    return axiosClient.put(`http://esmpfree-001-site1.etempurl.com/api/Store/active_store?storeID=${id}`)
  },
  UpdateStatus_Block(id) {
return axiosClient.put( `http://esmpfree-001-site1.etempurl.com/api/Store/block_store?storeID=${id}`)
  }

};
export default StoreApi;
