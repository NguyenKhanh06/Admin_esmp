import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

function SubMenu({ item, openNavigation }) {
  const [openSubNav, setOpenSubNav] = useState(false);
  const toggleSubNav = () => setOpenSubNav(!openSubNav);

  return (
    <div className={cx("nav-box")}>
      <div
        className={
          openNavigation ? cx("nav-item", "nav-item-res") : cx("nav-item")
        }
        onClick={toggleSubNav}
      >
        <NavLink to={item.path} className={cx("nav-title")}>
          <div className={cx("icon")}>{item.icon}</div>
          <div
            className={openNavigation ? cx("title", "display") : cx("title")}
          >
            {item.title}
          </div>
        </NavLink>
      </div>

    </div>
  );
}

SubMenu.propTypes = {
  item: PropTypes.object.isRequired,
  openNavigation: PropTypes.bool.isRequired,
};

export default SubMenu;
