import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserOutlined, ShopOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import "antd/dist/antd.css";
import ItemApi from "~/assets/API/ItemAPI";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "~/CSS/Item.css";
import "~/CSS/Base.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";

DetailItem.propTypes = {};

function DetailItem(props) {
  const [Item, setItem] = useState({
    item_Status: {},
    list_Image: [{}],
    specification_Tag: [{}],
    store: {},
    listModel: [{}],
    listSubItem: [
      {
        image: {},
      },
    ],
  });
  const [feedbackList, setFeedbackList] = useState([]);

  const [current, setCurrent] = useState(0);
  const ItemID = useParams();
  const [open, setOpen] = useState(false);

 

  const fetchData = async (e) => {
    await axios
      .get(
        `http://esmpfree-001-site1.etempurl.com/api/Item/item_detail?itemID=${ItemID.id}`
      )
      .then((response) => setItem(response.data));
  };
  const fetchDataFeedback = async (e) => {
    await axios
      .get(
        `http://esmpfree-001-site1.etempurl.com/api/Item/item_feedback?itemID=${ItemID.id}`
      )
      .then((response) => setFeedbackList(response.data));
  };
  useEffect(() => {
    fetchData()
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);
  useEffect(() => {
    fetchDataFeedback()
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);
  const length = Item.list_Image.length;
  const UpdateStatus_Active = async (e) => {
    await ItemApi.UpdateStatus_Active(ItemID.id);
    fetchData();
  };
  const UpdateStatus_Block = async (e) => {
    await ItemApi.UpdateStatus_Block(ItemID.id);
    fetchData();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(Item.list_Image) || Item.list_Image.length <= 0) {
    return null;
  }

  return (
    <div class="item_content">
      <div className="item_content-top">
        <section className="slider">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="leftIcon"
            onClick={() => {
              prevSlide();
            }}
          />
          <FontAwesomeIcon
            icon={faArrowRight}
            className="rightIcon"
            onClick={() => {
              nextSlide();
            }}
          />
          {Item.list_Image.map((image_path, index) => {
            return (
              <div
                className={index === current ? "slide active" : "slide"}
                key={index}
              >
                {index === current && (
                  <img
                    className="item_image"
                    src={image_path.path}
                    alt="Card image cap"
                  />
                )}
              </div>
            );
          })}
        </section>
        <p className="item_name">{Item.name}</p>
        <div className="item_infor-sell">
          <div className="item_price">
            Giá: {Item.minPrice} - {Item.maxPrice}
          </div>
          <div className="item_sold">Đã bán: {Item.num_Sold}</div>
        </div>
      </div>

      <div className="item_information">
        <h3 class="title">Thông tin chung</h3>
        {Item.specification_Tag.map((spe) => (
          <table>
            <tr>
              <th className="Item-specification_value">
                {spe.specificationName + " "}:
              </th>
              <td className="Item-specification_value">{spe.value}</td>
            </tr>
          </table>
        ))}
        <div>
          <p className="model_des">Phù hợp với</p>
          <div className="Item_model">
            {Item.listModel.map((model) => (
              <ul>
                <li>{model.name},</li>
              </ul>
            ))}
          </div>
        </div>
      </div>

      <h3 className="title">Thông tin mẫu mã</h3>
      {Item.listSubItem.map((subitem) => (
        <div class="item_sub_information">
          <ul class="sub_list_info">
            <li>
              <img class="subitem_image" src={subitem.image.path} />
            </li>
            <li>Tên: {subitem.sub_ItemName}</li>
            <li>Số lượng: {subitem.amount}</li>
            <li className="item_price">Giá: {subitem.price}</li>
          </ul>
        </div>
      ))}
      <h3 className="title">Thông tin cửa hàng</h3>
      <div className="Store_information">
        <div className="store_avt">
          <Avatar
            size={64}
            shape="circle"
            icon={<UserOutlined />}
            className="store_img"
            src={Item.store.imagepath}
          />
        </div>
        <div className="store_left">
          <div className="store_name">{Item.store.storeName}</div>
          <div>
            <Link
              className="btn btn--primary store_view"
              to={`/detailStore/${Item.store.storeID}`}
            >
              <ShopOutlined />
              Xem shop
            </Link>
          </div>
        </div>
      </div>
      <h3 className="title">Trạng thái sản phẩm</h3>
      <div
        className="item_status"
        style={{
          color: Item.item_Status.statusName === "Active" ? "green" : "red",
        }}
      >
        {Item.item_Status.statusName === "Active" ? "Hoạt động" : "Đã khóa"}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Bạn chắc chứ?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {Item.item_Status.statusName === "Active"
                ? "Bạn muốn khóa sản phẩm"
                : "Bạn muốn mở khoá sản phẩm"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button
              onClick={() => {
                Item.item_Status.statusName === "Active"
                  ? UpdateStatus_Block().then(handleClose())
                  : UpdateStatus_Active().then(handleClose());
              }}
              autoFocus
            >
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          className="status_btn btn btn--primary"
          onClick={() => {
            handleClickOpen();
          }}
        >
          {Item.item_Status.statusName === "Active"
            ? "Khóa sản phẩm"
            : "Mở khoá sản phẩm"}
        </Button>
      </div>
      <div>
        {feedbackList.map((feedback) => (
          <div>
            <div>
              <Stack
                direction="row"
                spacing={2}
                className="feedback_user_infor"
              >
                <Avatar alt="Remy Sharp" src={feedback.userAvatar} />
                <h4>{feedback.userName}</h4>
                <span>
                  {feedback.rate}
                  <StarIcon />
                </span>
              </Stack>
              <div className="list_img_fb">
                {feedback.imagesFB.map((image) => (
                  <img className="img_fb" src={image.path} />
                ))}
              </div>

              <br />
              <p>{feedback.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailItem;
