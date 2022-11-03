import axiosClient from "./axiosClient";

const OrderApi = {
  getAllOrders(params) {
    // const token = axioClient.getToken();
    // if (token) {
    //     axioClient.setHeaderAuth(token)
    //     return axioClient.get('item')
    // }
    return axiosClient.get("Order/get_order_staus");
  },
  getItemByID(id) {
    return axiosClient.get(`https://localhost:7026/api/Item/item_detail?itemID=${id}`);
  },
  UpdateStatus_Block(id) {
    return axiosClient.put( `https://localhost:7026/api/Item/block_item?itemID=${id}`)
  },
  UpdateStatus_Active(id) {
    return axiosClient.put(`https://localhost:7026/api/Item/active_item?itemID=${id}`)
  },
  removeItem(id) {
    return axiosClient.delete(`Item?itemID=${id}`)
  },
};
export default OrderApi;
