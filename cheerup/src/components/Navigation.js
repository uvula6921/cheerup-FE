import React from "react";
import styled from "styled-components";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/Person";
import ListIcon from "@material-ui/icons/List";
import { history } from "../redux/configureStore";

const Navigation = (props) => {
  return (
    <BottomNavigation
      //   value={value}
      //   onChange={handleChange}
      //   className={classes.root}
      style={{ background: "#fafafa" }}
    >
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
        icon={<PersonIcon />}
        onClick={() => {
          history.push("/login");
        }}
      />
    </BottomNavigation>
  );
};

export default Navigation;
