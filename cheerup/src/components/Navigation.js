import React from "react";
import styled from "styled-components";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/Person";
import ListIcon from "@material-ui/icons/List";
import { history } from "../redux/configureStore";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { getCookie, deleteCookie } from "../shared/Cookie";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as LoginActions } from "../redux/modules/user";

const Navigation = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  return (
    <BottomNavigation style={{ background: "#fafafa" }}>
      <BottomNavigationAction
        label="Write"
        value="write"
        icon={<AddIcon />}
        onClick={() => {
          history.push("/");
        }}
      />
      <BottomNavigationAction
        label="List"
        value="list"
        icon={<ListIcon />}
        onClick={() => {
          history.push("/list");
        }}
      />
      <BottomNavigationAction
        label="Login"
        value="login"
        icon={is_login ? <ExitToAppIcon /> : <PersonIcon />}
        onClick={() => {
          if (is_login) {
            dispatch(LoginActions.logoutSV());
          } else {
            history.push("/login");
          }
        }}
      />
    </BottomNavigation>
  );
};

export default Navigation;
