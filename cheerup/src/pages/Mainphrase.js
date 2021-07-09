import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Button, Input } from "@material-ui/core";
import { Grid, Text } from "../components/Styles";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as ContentActions } from "../redux/modules/articles";

const Mainphrase = (props) => {
  const dispatch = useDispatch();
  const data_list = useSelector((state) => state.article.content);
  console.log(data_list);
  const inputText = localStorage.getItem("inputText");
  const addContent = (text) => {
    dispatch(ContentActions.createArticle(text));
  };

  return (
    <React.Fragment>
      <Grid justify_contents="center" flex_direction="column">
        <Text type="title">여러분을 위한 조언입니다</Text>
        <Text margin="40px 0px" type="contents">
          {inputText}
        </Text>
        <Grid width="50%" height="30%" bg="#b3b5f0" margin="30px 0px"></Grid>
        {data_list.map((p, idx) => {
          return (
            <Text margin="40px 0px" type="contents">
              {p}
            </Text>
          );
        })}

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addContent(inputText);
            console.log("함수가 실행되었습니다.");
          }}
        >
          다른 사람과 공유하기
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Mainphrase;
