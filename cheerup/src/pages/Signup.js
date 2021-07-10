import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Button, Input, inputRef, TextField, Box } from "@material-ui/core";
import { Grid, Text } from "../components/Styles";

const Signup = (props) => {
  const { history } = props;
  const input = React.useRef(null);
  const moveToPhrase = () => {
    history.push("/phrase");
    localStorage.setItem("inputText", input.current.value);
  };

  return (
    <React.Fragment>
      <Grid padding="30px 0px 0px 0px" flex_direction="column">
        <Box component="h1" color="#616161">
          회원가입
        </Box>

        {/* <Maininput ref={input}></Maininput> */}
        <TextField
          inputRef={input}
          autoComplete={"off"}
          id="standard-basic"
          label="Email"
          style={{ margin: "0px 0px 10px 0px" }}
        ></TextField>
        <TextField
          inputRef={input}
          autoComplete={"off"}
          id="standard-basic"
          label="Username"
          style={{ margin: "0px 0px 10px 0px" }}
        ></TextField>
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          style={{ margin: "0px 0px 10px 0px" }}
        />
        <TextField
          id="standard-password-input"
          label="Password Check"
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
          Sign Up
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Signup;
