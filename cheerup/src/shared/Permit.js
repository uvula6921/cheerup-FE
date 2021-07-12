import React from "react";
import { useSelector } from "react-redux";
import { getCookie, setCookie, deleteCookie } from "./Cookie";

const UserPermit = (props) => {
  const user_info = useSelector((state) => state.user.user);
  const is_cookie = getCookie("is_login");

  if (is_cookie === "success" && user_info) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return null;
};

const MyContentPermit = (props) => {
  const user_info = useSelector((state) => state.user.user);
  const is_cookie = getCookie("is_login");
  if (is_cookie === "success" && user_info) {
    if (user_info?.user_name === props.user_name) {
      return <React.Fragment>{props.children}</React.Fragment>;
    }
  }

  return null;
};

export { UserPermit, MyContentPermit };
