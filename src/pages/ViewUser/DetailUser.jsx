import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import UserApi from "~/assets/API/UserAPI";
import Moment from 'moment';
import "~/CSS/User.css";
import "~/CSS/Base.css";

DetailUser.propTypes = {
    
};

function DetailUser(props) {
    const [User, setUser] = useState({
        image: {},
        role: {},
        addresses: [{}],
      });
      const userID = useParams();
  const formatDate = Moment().format('DD-MM-YYYY')
  const fetchData = async () => {
    await axios
      .get(`http://esmpfree-001-site1.etempurl.com/api/user/detail?userID=${userID.id}`)
      .then((response) => setUser(response.data));
  };
  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

  const UpdateStatus_Active = async (e) => {
    await UserApi.UpdateStatus_Active(userID.id)
    fetchData();
  };
  const UpdateStatus_Block = async (e) => {
    await UserApi.UpdateStatus_Block(userID.id)
    fetchData();
  };
    return (
        <div class="container">
        <div id="user-profile-2" class="user-profile">
            <div class="tabbable">
              <div class="tab-content no-border padding-24">
                <div id="home" class="tab-pane in active">
                  <div class="row User_Profile">
                  <h3 class="title">Thông tin người dùng</h3>
                    <div class="col-xs-12 col-sm-3 center">
                      <span class="profile-picture">
                        <img class="editable" alt=" Avatar" id="avatar2" src={User.image.path}/>
                      </span>
        
                      <div class="space space-4"></div>
        
                   
                    </div>
        
                    <div class="col-xs-12 col-sm-9">
                      
                        
            
        
                      <div class="profile-user-info">
                        <div class="profile-info-row">
                          <div class="profile-info-name">Tên người dùng</div>
        
                          <div class="profile-info-value">
                            <span>{User.userName}</span>
                          </div>
                        </div>
                        <div class="profile-info-row">
                          <div class="profile-info-name">Số điện thoại</div>
        
                          <div class="profile-info-value">
                            <span>{User.phone}</span>
                          </div>
                        </div>
                        <div class="profile-info-row">
                          <div class="profile-info-name">Email</div>
        
                          <div class="profile-info-value">
                            <span>{User.email}</span>
                          </div>
                        </div>
                        <div class="profile-info-row">
                          <div class="profile-info-name">Ngày tháng năm sinh</div>
        
                          <div class="profile-info-value">
                            <span>{Moment(User.dateOfBirth).format('DD-MM-YYYY')}</span>
                          </div>
                        </div>
                        <div class="profile-info-row">
                          <div class="profile-info-name">Ngày tạo tài khoản</div>
        
                          <div class="profile-info-value">
                            <span>{Moment(User.crete_date).format('DD-MM-YYYY')}</span>
                          </div>
                        </div>
                        <div class="profile-info-row">
                          <div class="profile-info-name"> Địa chỉ </div>
                          <div class="profile-info-value">
                            {/* <i class="fa fa-map-marker light-orange bigger-110"></i> */}
                            {User.addresses.map((address) => (
                      <span>
                        {address.context +
                          ", " +
                          address.ward +
                          ", " +
                          address.district +
                          ", " +
                          address.province}
                      </span>
                    ))}
                          </div>
                        </div>
        
                        <div class="profile-info-row">
                          <div class="profile-info-name"> Role </div>
        
                          <div class="profile-info-value">
                            <span>{User.role.roleName}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="profile-info-row">
                          <div class="profile-info-name" > Trạng thái </div>
        
                          <div class="profile-info-value" style={{ color: User.isActive ? "green" : "red" }}>
                            <span> {User.isActive ? "Hoạt động" : "Đã khóa"}</span>
                            <Link
                  className="btn btn--primary"
                  onClick={() => {
                    User.isActive
                      ? UpdateStatus_Block()
                      : UpdateStatus_Active();
                  }}
                >
                  {User.isActive
                    ? "Khóa người dùng"
                    : "Mở khóa người dùng"}
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
    );
}

export default DetailUser;