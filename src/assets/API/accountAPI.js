
import axiosClient from './axiosClient';

const accountApi = {
    loginByGoogle(data) {
        const url = '/accounts/login_by_email/?firebaseToken=' + data;
        return axiosClient.post(url, data);
    },
    login(data) {
        const url = '/user/adminsign_in';
        return axiosClient.post(url, data);
    },

    getDetailAccountById(id) {
        const token = axiosClient.getToken();
        if (token) {
            axiosClient.setHeaderAuth(token)
            return axiosClient.get('/accounts/detail', id)
        }
    },

    getAll() {
        const token = axiosClient.getToken();
        if (token) {
            axiosClient.setHeaderAuth(token)
            return axiosClient.get('/accounts')
        }
    },
    add(data) {

    },

    update(data) {

    },
    remove(id) {

    }
};

export default accountApi;