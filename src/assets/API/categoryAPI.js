import axiosClient from './axiosClient';

const categorysApi = {

    getAllCategory() {
        return axiosClient.get('Category')
    },

    getSubCategory() {
        return axiosClient.get("Category/sub_category?categoryID=1")
    },


    add(data) {

    },

    update(data) {

    },
    remove(id) {

    }
};

export default categorysApi;