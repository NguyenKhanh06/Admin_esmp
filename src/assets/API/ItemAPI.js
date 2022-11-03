import axiosClient from "./axiosClient";

const ItemApi = {
  getAllItems(params) {
    // const token = axioClient.getToken();
    // if (token) {
    //     axioClient.setHeaderAuth(token)
    //     return axioClient.get('item')
    // }
    return axiosClient.get("Item");
  },
  UpdateStatus_Block(id) {
    return axiosClient.put( `http://esmpfree-001-site1.etempurl.com/api/Item/block_item?itemID=${id}`)
  },
  UpdateStatus_Active(id) {
    return axiosClient.put(`http://esmpfree-001-site1.etempurl.com/api/Item/active_item?itemID=${id}`)
  },
  removeItem(id) {
    return axiosClient.delete(`Item?itemID=${id}`)
  },
};
export default ItemApi;
