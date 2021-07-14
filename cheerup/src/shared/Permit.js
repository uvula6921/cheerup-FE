import React from "react";
import { useSelector } from "react-redux";
import { getCookie, setCookie, deleteCookie } from "./Cookie";
import jwt_decode from "jwt-decode";

const UserPermit = (props) => {
  const user_info = useSelector((state) => state.user.user_name);
  const is_login = useSelector((state) => state.user.is_login);

  if (is_login && user_info) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return null;
};

const MyContentPermit = (props) => {
  const user_info = useSelector((state) => state.user.user_name);
  const is_login = useSelector((state) => state.user.is_login);
  const token = getCookie("refresh_token");
  const decoded = jwt_decode(token);
  console.log(props.user_name, decoded.sub);
  if (is_login && props.user_name === decoded.sub) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return null;
};

export { UserPermit, MyContentPermit };
