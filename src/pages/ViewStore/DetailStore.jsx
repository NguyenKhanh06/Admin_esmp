import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import StoreApi from "~/assets/API/storeAPI";
import Moment from "moment";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "~/CSS/User.css";
import "~/CSS/Base.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import VisibilityIcon from '@mui/icons-material/Visibility';

DetailStore.propTypes = {};

function DetailStore(props) {
  const [Store, setStore] = useState({
    image: {},
    address: {},
    store_Status: {},
  });
  const [OrderList, setOrderList] = useState([]);
  const StoreID = useParams();
  const [current, setCurrent] = useState(0);
  const ItemID = useParams();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fetchData = async (e) => {
    await axios
      .get(
        `http://esmpfree-001-site1.etempurl.com/api/Store/store_detail?storeID=${StoreID.id}`
      )
      .then((response) => setStore(response.data));
  };
  const fetchDataOrders = async (id) => {
    await axios
      .get(
        `http://esmpfree-001-site1.etempurl.com/api/Order/get_order_status?storeID=${StoreID.id}`
      )
      .then((response) => setOrderList(response.data));
  };
  console.log('Orderid', Store.storeID)
  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);
  useEffect(() => {
    fetchDataOrders().catch((error) => {
      console.log(error);
    });
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
                <h3 class="title">Th??ng tin ch??? c???a h??ng</h3>

                <div class="col-xs-12 col-sm-9">
                  <div class="profile-info-row">
                    <div class="profile-info-name">T??n ch??? c???a h??ng</div>

                    <div class="profile-info-value">
                      <span>{Store.address.userName}</span>
                    </div>
                  </div>
                  <div class="profile-info-row">
                    <div class="profile-info-name">S??? ??i???n tho???i</div>
                    <div class="profile-info-value">
                      <span>{Store.address.phone}</span>
                    </div>
                  </div>
                  <div class="profile-info-row">
                    <div class="profile-info-name"> ?????a ch??? </div>
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
                  <Link
                    className="btn btn--primary btn_detail_user"
                    to={`/detailUser/${Store.userID}`}
                  >
                    Xem chi ti???t th??ng tin
                  </Link>
                </div>
                <h3 className="title">Th??ng tin c???a h??ng</h3>
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
                      <div class="profile-info-name">T??n c???a h??ng</div>

                      <div class="profile-info-value">
                        <span>{Store.storeName}</span>
                      </div>
                    </div>
                    <div class="profile-info-row">
                      <div class="profile-info-name">S??? ??i???n tho???i</div>

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
                      <div class="profile-info-name">Ng??y t???o t??i kho???n</div>

                      <div class="profile-info-value">
                        <span>
                          {Moment(Store.create_date).format("DD-MM-YYYY")}
                        </span>
                      </div>
                    </div>

                    <div class="profile-info-row">
                      <div class="profile-info-name"> Tr???ng th??i </div>

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
                            ? "Ho???t ?????ng"
                            : "???? kh??a"}
                        </span>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"B???n ch???c ch????"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              {Store.store_Status.statusName === "Active"
                                ? "B???n mu???n kh??a c???a h??ng"
                                : "B???n mu???n m??? kho?? c???a h??ng"}
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>H???y</Button>
                            <Button
                              onClick={() => {
                                Store.store_Status.statusName === "Active"
                                  ? UpdateStatus_Block().then(handleClose())
                                  : UpdateStatus_Active().then(handleClose());
                              }}
                              autoFocus
                            >
                              ?????ng ??
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <Button
                          className="status_btn btn btn--primary"
                          onClick={() => {
                            handleClickOpen();
                          }}
                        >
                          {Store.store_Status.statusName === "Active"
                            ? "Kh??a c???a h??ng"
                            : "M??? kh??a c???a h??ng"}
                        </Button>
                        {/* <Link
                              className="btn btn--primary"
                              onClick={() => {
                                Store.store_Status.statusName === "Active"
                                  ? UpdateStatus_Block()
                                  : UpdateStatus_Active();
                              }}
                            >
                              {Store.store_Status.statusName === "Active"
                                ? "Kh??a c???a h??ng"
                                : "M??? kh??a c???a h??ng"}
                            </Link> */}
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
        <h3 class="title">Danh s??ch ????n h??ng</h3>
        <Table striped bordered hover>
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>T??n kh??ch h??ng</th>
              <th>S??? ??i???n tho???i</th>
              <th>?????a ch???</th>
              <th>H??nh ?????ng</th>
            </tr>
          </thead>
          <tbody>
              {
               OrderList.map((order, index) =>{
                  return (
                    <tr>
                      <th>{index + 1}</th>
                    <td>{order.name}</td>
                    <td>{order.tel}</td>
                    <td>{order.address + "," + order.ward + "," + order.district + "," + order.province}</td>
                    
                    
                    <td>
    
                      <Link class="btn btn--primary" to={`/detailOrder/${order.orderID}`} ><VisibilityIcon/></Link>
                    </td>
                  </tr>
                  )
                    } )
              }
             
            </tbody>
        </Table>
      </div>
    </div>
  );
}

export default DetailStore;
