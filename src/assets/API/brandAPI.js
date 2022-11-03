import axiosClient from "./axiosClient";

const BrandApi = {
    getAllBrands() {
        return axiosClient.get('Brand')
    },

    getBrandByModel(model) {
        return axiosClient.get('Brand/brand_model', model)
    },
    getBrandByItem(item) {
        return axiosClient.get('Brand/item', item)
    },
    
    add(data) {

    },

    update(data) {

    },
    remove(id) {

    }
};
export default BrandApi;

