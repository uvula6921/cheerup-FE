import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Button, Input, inputRef, TextField, Box } from "@material-ui/core";
import { Grid, Text } from "../components/Styles";
import instance from "../shared/Request";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const Signup = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  // const input = React.useRef(null);
  const [input, SetInput] = React.useState("");
  const [password, Setpassword] = React.useState("");
  const [passwordCheck, SetpasswordCheck] = React.useState("");
  const [is_same, Set_isSame] = React.useState(true);

  const is_SamePassword = () => {
    if (password === passwordCheck) {
      Set_isSame(true);
      return true;
    } else {
      Set_isSame(false);
      return false;
    }
  };

  const moveToPhrase = () => {
    history.push("/phrase");
    localStorage.setItem("inputText", input.current.value);
  };

  return (
    <React.Fragment>
      <Grid padding="50px 0px 0px 0px" flex_direction="column">
        <Box component="h1" color="#616161">
          회원가입
        </Box>

        {/* <Maininput ref={input}></Maininput> */}
        <TextField
          onChange={(e) => {
            SetInput(e.target.value);
          }}
          autoComplete={"off"}
          id="standard-basic"
          label="ID"
          style={{ margin: "0px 0px 10px 0px" }}
        ></TextField>
        {is_same ? (
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            onChange={(e) => {
              Setpassword(e.target.value);
            }}
            autoComplete="current-password"
            style={{ margin: "0px 0px 10px 0px" }}
          />
        ) : (
          <TextField
            error
            id="standard-error-helper-text"
            label="비밀번호가 서로 다릅니다"
            type="password"
            style={{ margin: "0px 0px 10px 0px" }}
            // onClick={() => {
            //   Set_isSame(true);
            // }}
          />
        )}

        {is_same ? (
          <TextField
            id="standard-password-input"
            label="Password Check"
            type="password"
            onChange={(e) => {
              SetpasswordCheck(e.target.value);
            }}
            autoComplete="current-password"
            style={{ margin: "0px 0px 40px 0px" }}
          />
        ) : (
          <TextField
            error
            id="standard-error-helper-text"
            label="비밀번호가 서로 다릅니다"
            type="password"
            style={{ margin: "0px 0px 40px 0px" }}
            // onClick={() => {
            //   Set_isSame(true);
            // }}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (is_SamePassword()) {
              dispatch(userActions.signupSV(input, password, passwordCheck));
            } else {
              alert("비밀번호가 일치하지 않습니다");
            }
          }}
        >
          Sign Up
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Signup;
