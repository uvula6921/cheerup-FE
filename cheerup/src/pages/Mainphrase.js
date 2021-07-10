import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Button, Input, Box } from "@material-ui/core";
import { Grid, Text } from "../components/Styles";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as ContentActions } from "../redux/modules/articles";

const Mainphrase = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const data_list = useSelector((state) => state.article.article_list);
  console.log(data_list);
  const inputText = localStorage.getItem("inputText");
  const addContent = (text) => {
    dispatch(ContentActions.addArticleSV(text));
  };

  return (
    <React.Fragment>
      <Grid padding="30px 0px 0px 0px " flex_direction="column">
        <Box component="h1" color="text.primary">
          여러분을 위한 조언
        </Box>
        <Box component="p" color="text.primary" style={{ margin: "40px 0px" }}>
          고민 : {inputText}
        </Box>

        <Grid width="50%" height="30%" bg="#b3b5f0" margin="30px 0px"></Grid>
        {/* {data_list.map((p, idx) => {
          return (
            <Box key={idx} component="p" color="text.primary">
              {p}
            </Box>
          );
        })} */}

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const addArticle = {
              content: `${inputText}`,
              createdAt: "",
              pharase: "",
              username: "",
            };
            addContent(addArticle);
            history.push("/list");
          }}
        >
          다른 사람과 공유하기
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Mainphrase;
