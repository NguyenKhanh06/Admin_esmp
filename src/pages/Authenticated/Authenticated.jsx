import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Login from "./Login/Login";
import { Navigate } from "react-router-dom";

Authenticated.propTypes = {};
function Authenticated({reload}) {

  // const [reload, setReload] = useState(false);

  const currentAccount = useSelector((state) => state.account.current);

  console.log("currentAccount: ", currentAccount);

  return <Login reload={reload}/>;
}

export default Authenticated;
