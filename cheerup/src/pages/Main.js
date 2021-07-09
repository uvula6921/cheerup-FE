import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Button, Input } from "@material-ui/core";
import { Grid, Text } from "../components/Styles";
import { InputStyle } from "../common-style/style";

const Main = (props) => {
  const { history } = props;
  const input = React.useRef(null);
  const moveToPhrase = () => {
    history.push("/phrase");
    localStorage.setItem("inputText", input.current.value);
  };

  return (
    <React.Fragment>
      <Grid justify_contents="center" flex_direction="column">
        <Text type="title">고민을 알려주세요</Text>
        <Maininput ref={input}></Maininput>
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
