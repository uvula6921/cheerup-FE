import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Button, Input, inputRef, TextField, Box } from "@material-ui/core";
import { Grid, Text } from "../components/Styles";

const Main = (props) => {
  const { history } = props;
  const input = React.useRef(null);
  const [checkInput, SetCheckInput] = useState(true);
  const moveToPhrase = () => {
    if (!checkInput) {
      return;
    }
    if (input.current.value == "") {
      SetCheckInput(false);
    } else {
      history.push("/phrase");
      localStorage.setItem("inputText", input.current.value);
    }
  };

  return (
    <React.Fragment>
      <Grid padding="100px 0px 0px 0px" flex_direction="column">
        <Box component="h1" color="text.primary">
          해결해드립니다
        </Box>

        {/* <Maininput ref={input}></Maininput> */}
        {checkInput ? (
          <TextField
            inputRef={input}
            autoComplete={"off"}
            id="standard-basic"
            label="고민을 적어보세요"
            style={{ margin: "30px 0px" }}
          />
        ) : (
          <TextField
            error
            id="standard-error-helper-text"
            label="고민을 먼저 입력해주세요"
            // helperText="Write first"
            style={{ margin: "30px 0px" }}
            onClick={() => {
              SetCheckInput(true);
            }}
          />
        )}

        {/* <Input inputRef={input} style={{ margin: "30px 0px" }}></Input> */}
        <Button
          className={checkInput ? null : "shake"}
          variant="contained"
          color={checkInput ? "primary" : "secondary"}
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
