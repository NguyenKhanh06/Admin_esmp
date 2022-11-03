import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import StoreApi from "~/assets/API/storeAPI";
import Moment from "moment";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css'
import "~/CSS/User.css";
import "~/CSS/Base.css";

DetailStore.propTypes = {
    
};

function DetailStore(props) {
    const [Store, setStore] = useState({
        image: {},
        address: {},
        store_Status: {},
      });
      const [OrderList, setOrderList] = useState([])
      const StoreID = useParams();
      const fetchData = async (e) => {
        await axios
          .get(
            `http://esmpfree-001-site1.etempurl.com/api/Store/store_detail?storeID=${StoreID.id}`
          )
          .then((response) => setStore(response.data));
      };
      const fetchDataOrders = async (e) => {
        await axios
          .get(
            `http://esmpfree-001-site1.etempurl.com/api/Order/get_order_staus?userID${Store.userID}`
          )
          .then((response) => setOrderList(response.data));
      };
      useEffect(() => {
        fetchData().catch((error) => {
          console.log(error);
        });
      }, []);
      useEffect(() => {
        fetchDataOrders()
          .catch((error) => {
            console.log(error);
          })
      }, []);
      const UpdateStatus_Active = async () => {
        await StoreApi.UpdateStatus_Active(StoreID.id);
        fetchData();
      };
      const UpdateStatus_Block = async () => {
        await StoreApi.UpdateStatus_Block(StoreID.id);
        fetchData();
      };
      return (
        <div class="container">
          <div id="user-profile-2" class="user-profile">
            <div class="tabbable">
              <div class="tab-content no-border padding-24">
                <div id="home" class="tab-pane in active">
                  <div class="row User_Profile">
                    <h3 class="title">Thông tin chủ cửa hàng</h3>
                   
                    <div class="col-xs-12 col-sm-9">
                    <div class="profile-info-row">
                        <div class="profile-info-name">Tên chủ cửa hàng</div>
    
                        <div class="profile-info-value">
                          <span>{Store.address.userName}</span>
                        </div>
                      </div>
                      <div class="profile-info-row">
                        <div class="profile-info-name">Số điện thoại</div>
                        <div class="profile-info-value">
                          <span>{Store.address.phone}</span>
                        </div>
                      </div>
                      <div class="profile-info-row">
                          <div class="profile-info-name"> Địa chỉ </div>
                          <div class="profile-info-value">
                            <span>
                              {Store.address.context +
                                ", " +
                                Store.address.ward +
                                ", " +
                                Store.address.district +
                                ", " +
                                Store.address.province}
                            </span>
                          </div>
                        </div>
                        <Link className="btn btn--primary btn_detail_user" to={`/detailUser/${Store.userID}`}>Xem chi tiết thông tin</Link>
                        
                    </div>
                    <h3 className="title">Thông tin cửa hàng</h3>
                    <div className="col-xs-12 col-sm-9 Store_info">
                     
                      
                      <div class="col-xs-12 col-sm-3 center">
                      <span class="profile-picture">
                        <img
                          class="editable"
                          alt=" Avatar"
                          id="avatar2"
                          src={Store.image.path}
                        />
                      </span>
    
                      <div class="space space-4"></div>
                    </div>
                      <div class="profile-user-info">
                        <div class="profile-info-row">
                          <div class="profile-info-name">Tên cửa hàng</div>
    
                          <div class="profile-info-value">
                            <span>{Store.storeName}</span>
                          </div>
                        </div>
                        <div class="profile-info-row">
                          <div class="profile-info-name">Số điện thoại</div>
    
                          <div class="profile-info-value">
                            <span>{Store.phone}</span>
                          </div>
                        </div>
                        <div class="profile-info-row">
                          <div class="profile-info-name">Email</div>
    
                          <div class="profile-info-value">
                            <span>{Store.email}</span>
                          </div>
                        </div>
                        <div class="profile-info-row">
                          <div class="profile-info-name">Ngày tạo tài khoản</div>
    
                          <div class="profile-info-value">
                            <span>
                              {Moment(Store.create_date).format("DD-MM-YYYY")}
                            </span>
                          </div>
                        </div>
    
                     
    
                        <div class="profile-info-row">
                          <div class="profile-info-name"> Trạng thái </div>
    
                          <div
                            class="profile-info-value"
                            style={{
                              color:
                                Store.store_Status.statusName === "Active"
                                  ? "green"
                                  : "red",
                            }}
                          >
                            <span>
                              {" "}
                              {Store.store_Status.statusName === "Active"
                                ? "Hoạt động"
                                : "Đã khóa"}
                            </span>
                            <Link
                              className="btn btn--primary"
                              onClick={() => {
                                Store.store_Status.statusName === "Active"
                                  ? UpdateStatus_Block()
                                  : UpdateStatus_Active();
                              }}
                            >
                              {Store.store_Status.statusName === "Active"
                                ? "Khóa cửa hàng"
                                : "Mở khóa cửa hàng"}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
    
                    <div class="space-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="List_order">
          <h3 class="title">Danh sách đơn hàng</h3>
          <Table striped bordered hover>
          <thead class="table-dark">
               
              <tr>
                <th>#</th>
                <th>Tên khách hàng</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Tên sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Hành động</th>
              </tr>
            </thead>
            {/* <tbody>
              {
               OrderList.map((order, index) =>{
                  return (
                    <tr>
                      <th>{index + 1}</th>
                    <td>{order.name}</td>
                    <td>{order.tel}</td>
                    <td>{order.address + "," + order.ward + "," + order.district + "," + order.province}</td>
                   {order.details.map((details, index) =>(
                    <td>{details.sub_ItemName}</td>
                  
                   ))}
                    {order.details.map((details, index) =>(
                    <td>{details.pricePurchase + "đ"}</td>
                  
                   ))}
                    
                    
                    <td>
    
                      <Link class="btn btn--primary" to={`/order/${order.orderID}`} ><FontAwesomeIcon icon={faEye}/></Link>
                    </td>
                  </tr>
                  )
                    } )
              }
             
            </tbody> */}
          </Table>
        </div>
        </div>
      );
}

export default DetailStore;