import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Button, Input, inputRef, TextField, Box } from "@material-ui/core";
import { Grid, Text } from "../components/Styles";

const Main = (props) => {
  const { history } = props;
  const input = React.useRef(null);
  const moveToPhrase = () => {
    if (input.current.value == "") {
      window.alert("고민을 입력해주세요");
    } else {
      history.push("/phrase");
      localStorage.setItem("inputText", input.current.value);
    }
  };

  return (
    <React.Fragment>
      <Grid justify_contents="center" flex_direction="column">
        <Box component="h1" color="text.primary">
          해결해드립니다
        </Box>

        {/* <Maininput ref={input}></Maininput> */}
        <TextField
          inputRef={input}
          autoComplete={"off"}
          id="standard-basic"
          label="고민을 적어보세요"
          style={{ margin: "30px 0px" }}
        ></TextField>
        {/* <Input inputRef={input} style={{ margin: "30px 0px" }}></Input> */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            moveToPhrase();
          }}
        >
          조언듣기
        </Button>
      </Grid>
    </React.Fragment>
  );
};

const Maininput = styled.input`
  border: none;
  border-bottom: 1px solid #616161;
  margin: 20px 0px;
  :focus {
    outline: none;
  }
`;

export default Main;
