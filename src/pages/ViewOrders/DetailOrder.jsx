import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import StoreApi from "~/assets/API/storeAPI";
import Moment from "moment";
import Table from "react-bootstrap/Table";
import "~/CSS/User.css";
import "~/CSS/Base.css";
DetailOrder.propTypes = {};

function DetailOrder(props) {
  const [order, setOrder] = useState({
    details: [{}],
    storeView: {},
    orderStatus: {},
  });
  const orderID = useParams();
  const formatDate = Moment().format("DD-MM-YYYY");
  const fetchData = async () => {
    await axios
      .get(
        `http://esmpfree-001-site1.etempurl.com/api/order/order_info?orderID=${orderID.id}`
      )
      .then((response) => setOrder(response.data));
  };
  console.log("data order", order);
  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

  let result =
    order?.details
      ?.map((detail) => detail?.pricePurchase)
      .reduce((total, currentValue) => (total = total + currentValue), 0) +
    order.feeShip;
  // const result = pricePurchaseDetailArr.reduce((total, currentValue) => total = total + currentValue,0);

  // console.log("result: ", result);

  return (
    <div class="container">
      <div id="user-profile-2" class="user-profile">
        <div class="tabbable">
          <div class="tab-content no-border padding-24">
            <div id="home" class="tab-pane in active">
              <div class="row User_Profile">
                <h3 class="title">Thông tin người đặt</h3>

                <div class="col-xs-12 col-sm-9">
                  <div class="profile-info-row">
                    <div class="profile-info-name">Tên khách hàng</div>

                    <div class="profile-info-value">
                      <span>{order.name}</span>
                    </div>
                  </div>
                  <div class="profile-info-row">
                    <div class="profile-info-name">Số điện thoại</div>
                    <div class="profile-info-value">
                      <span>{order.tel}</span>
                    </div>
                  </div>
                  <div class="profile-info-row">
                    <div class="profile-info-name"> Địa chỉ </div>
                    <div class="profile-info-value">
                      <span>
                        {order.address +
                          ", " +
                          order.ward +
                          ", " +
                          order.district +
                          ", " +
                          order.province}
                      </span>
                    </div>
                  </div>
                  <Link
                    className="btn btn--primary btn_detail_user"
                    to={`/detailUser/${order.userID}`}
                  >
                    Xem chi tiết thông tin
                  </Link>
                </div>
                <h3 className="title">Thông tin chi tiết đơn hàng</h3>

                <br></br>
                <div class="profile-user-info">
                  <div class="profile-info-row">
                    <div class="profile-info-name">Tên cửa hàng</div>

                    <div class="profile-info-value">
                      <span>{order.storeView.storeName}</span>
                    </div>
                  </div>

                  <div class="profile-info-row">
                    <div class="profile-info-name">Ngày đặt hàng</div>

                    <div class="profile-info-value">
                      <span>
                        {Moment(order.create_Date).format("DD-MM-YYYY")}
                      </span>
                    </div>
                  </div>
                  <div class="profile-info-row">
                    <div class="profile-info-name">Địa chỉ nhận hàng</div>

                    <div class="profile-info-value">
                      <span>
                        {order.pick_Address +
                          ", " +
                          order.pick_Ward +
                          ", " +
                          order.pick_Province +
                          ", " +
                          order.pick_District}
                      </span>
                    </div>
                  </div>
                  <div class="profile-info-row">
                    <div class="profile-info-name">Giá ship</div>

                    <div class="profile-info-value">
                      <span>{order.feeShip}</span>
                    </div>
                  </div>
                  <div class="profile-info-row">
                    <div class="profile-info-name">Số lượng sản phẩm</div>

                    <div class="profile-info-value">
                      <span>{order.details.length}</span>
                    </div>
                  </div>
                  <div class="profile-info-row">
                    <div class="profile-info-name ">Tổng số tiền</div>

                    <div class="profile-info-value total_bill">
                      <span>
                        {
                        result * 0.1
                        /* {order?.details
                          ?.map((detail) => detail?.pricePurchase)
                          .reduce(
                            (total, currentValue) =>
                              (total = total + currentValue),
                            0
                          ) + order.feeShip} */}
                      </span>
                    </div>
                  </div>
                  {order.details.map((detail) => (
                    <>
                      <div class="profile-info-row">
                        {
                          <>
                            <div class="profile-info-row">
                              <div>
                                <img
                                  className="bill_item_img"
                                  src={detail?.sub_ItemImage}
                                />
                              </div>
                            </div>
                          </>
                        }
                        <div class="profile-info-name">Tên sản phẩm</div>

                        <div class="profile-info-value">
                          <span>{detail.sub_ItemName}</span>
                        </div>
                      </div>
                      <div class="profile-info-row">
                        <div class="profile-info-name">Giá sản phẩm</div>

                        <div class="profile-info-value">
                          <span>{detail.pricePurchase}</span>
                        </div>
                      </div>

                      <div class="profile-info-row">
                        <div class="profile-info-name">Giảm giá</div>

                        <div class="profile-info-value">
                          <span>{detail.discountPurchase}%</span>
                        </div>
                      </div>
                    </>
                  ))}

                  <></>

                  {/* <div class="profile-info-row">
                  order?.details.discountPurchase > 0
                              ? order?.details.pricePurchase +
                                order.feeShip -
                                (order?.details.pricePurchase + order.feeShip) *
                                order?.details.discountPurchase
                              :
                    <div class="profile-info-name">Tổng đơn hàng</div>

                    <div class="profile-info-value">
                      <span>{totalSum}</span>
                    </div>
                  </div> */}
                </div>
              </div>

              <div class="space-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailOrder;
