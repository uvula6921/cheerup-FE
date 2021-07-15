import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Button, TextField, Box, Typography } from "@material-ui/core";
import { Grid } from "../components/Styles";
import DescModal from "../components/DescModal";
import { useSelector } from "react-redux";

const Main = (props) => {
  const { history } = props;
  const input = React.useRef(null);
  const [checkInput, SetCheckInput] = useState(true);
  const today = useSelector((state) => state.user.today);
  const total = useSelector((state) => state.user.total);
  console.log(today, total);

  const moveByEnter = (e) => {
    if (e.key === "Enter") {
      if (input.current.value == "") {
        SetCheckInput(false);
      } else {
        history.push("/phrase");
        localStorage.setItem("inputText", input.current.value);
      }
    }
  };

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
      <Grid
        padding="20px 0px 0px 0px"
        flex_direction="column"
        justify_contents="space-between"
      >
        <Grid flex_direction="column" height="auto">
          <Box component="h2" color="#616161">
            해결해드립니다
          </Box>
          <DescModal />
        </Grid>
        <Grid height="auto" flex_direction="column">
          {checkInput ? (
            <TextField
              inputRef={input}
              autoComplete={"off"}
              id="standard-basic"
              label="고민을 적어보세요"
              onKeyPress={moveByEnter}
              style={{ margin: "0px 0px 30px 0px" }}
            />
          ) : (
            <TextField
              error
              id="standard-error-helper-text"
              label="고민을 먼저 입력해주세요"
              // helperText="Write first"
              style={{ margin: "0px 0px 30px 0px" }}
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
        <Grid
          flex_direction="column"
          align="flex-start"
          height="auto"
          padding="0px 0px 15px 15px"
          margin="60px 0px 0px 0px"
        >
          <Typography style={{ fontSize: "13px" }}>today: {today}</Typography>
          <Typography style={{ fontSize: "13px" }}>total: {total}</Typography>
        </Grid>
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
