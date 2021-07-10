import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Button, Input, inputRef, TextField, Box } from "@material-ui/core";
import { Grid, Text } from "../components/Styles";
import { InputStyle } from "../common-style/style";
import { history } from "../redux/configureStore";

const Login = (props) => {
  const { history } = props;
  const input = React.useRef(null);
  const moveToPhrase = () => {
    history.push("/phrase");
    localStorage.setItem("inputText", input.current.value);
  };

  return (
    <React.Fragment>
      <Grid justify_contents="center" flex_direction="column">
        <Box component="h1" color="text.primary">
          로그인
        </Box>

        {/* <Maininput ref={input}></Maininput> */}
        <TextField
          inputRef={input}
          autoComplete={"off"}
          id="standard-basic"
          label="Email"
          style={{ margin: "30px 0px" }}
        ></TextField>
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          style={{ margin: "0px 0px 50px 0px" }}
        />
        {/* <Input inputRef={input} style={{ margin: "30px 0px" }}></Input> */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            moveToPhrase();
          }}
        >
          Login
        </Button>
        <Box
          component="span"
          m={3}
          color="#bdbdbd"
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => {
            history.push("/signup");
          }}
        >
          회원가입
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
