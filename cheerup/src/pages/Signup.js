import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Button, Input, inputRef, TextField, Box } from "@material-ui/core";
import { Grid, Text } from "../components/Styles";

const Signup = (props) => {
  const { history } = props;
  const input = React.useRef(null);
  const [password, Setpassword] = React.useState("");
  const [passwordCheck, SetpasswordCheck] = React.useState("");
  const [is_same, Set_isSame] = React.useState(true);

  const is_SamePassword = () => {
    console.log(password, passwordCheck);
    console.log(is_same);
    if (password == passwordCheck) {
      Set_isSame(true);
    } else {
      Set_isSame(false);
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
          inputRef={input}
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
            // helperText="Write first"
            style={{ margin: "0px 0px 10px 0px" }}
            onClick={() => {
              Set_isSame(true);
            }}
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
            style={{ margin: "0px 0px 10px 0px" }}
          />
        ) : (
          <TextField
            error
            id="standard-error-helper-text"
            label="비밀번호가 서로 다릅니다"
            type="password"
            style={{ margin: "0px 0px 10px 0px" }}
            onClick={() => {
              Set_isSame(true);
            }}
          />
        )}

        {/* <Input inputRef={input} style={{ margin: "30px 0px" }}></Input> */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // moveToPhrase();
            is_SamePassword();
          }}
        >
          Sign Up
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Signup;
