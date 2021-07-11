import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Button, Input, Box, Card, Typography, CardContent } from "@material-ui/core";
import { Grid, Text } from "../components/Styles";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as ContentActions } from "../redux/modules/articles";
import axios from "axios";

const Mainphrase = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const data_list = useSelector((state) => state.article.article_list);
  const inputText = localStorage.getItem("inputText");

  const [wholePhrase, SetWholePhrase] = React.useState("");
  const [phrase, Setphrase] = React.useState("");
  const [writer, SetWriter] = React.useState("");

  React.useEffect(() => {
    axios({
      method: "get",
      url: "http://52.78.217.45/saying",
      responseType: "stream",
    }).then(function (response) {
      let phrases = response.data.saying.split("-");
      SetWholePhrase(response.data.saying);
      Setphrase(phrases[0]);
      SetWriter(phrases[1]);
      console.log(phrases);
    });
  }, []);

  const addContent = (article_list) => {
    dispatch(ContentActions.createArticleSV(article_list));
  };

  return (
    <React.Fragment>
      <Grid padding="30px 0px 0px 0px " flex_direction="column">
        <Box component="h2" color="text.primary">
          여러분을 위한 조언
        </Box>
        <Box
          component="p"
          color="text.primary"
          style={{ margin: "20px 0px 30px 0px" }}
        >
          고민 : {inputText}
        </Box>

        <Card
              style={{
                margin: "10px 30px 60px 30px",
                border: "2px solid #888",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                position: "relative",
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle1"
                  component="h4"
                  style={{
                    fontWeight: "800",
                    textAlign:"center",
                    color:"#4252af"
                  }}
                >
                  ADVICE
                  
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="h4"
                  style={{
                    fontWeight: "500",
                  }}
                >
                  {phrase}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="h4"
                  style={{
                    fontWeight: "7s00",
                    textAlign:"center"
                  }}
                >
          {writer}
                </Typography>
              </CardContent>
            </Card>

        {/* <Grid
          width="60%"
          color="#fafafa"
          height="35%"
          bg="#b3b5f0"
          padding="20px"
          margin="30px 0px 80px 0px"
          justify_contents="center"
          textAlign
        >
         
        </Grid> */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const addArticle = {
              content: `${inputText}`,
              createdAt: "",
              pharase: `${wholePhrase}`,
              username: "",
            };
            addContent(addArticle);
          }}
        >
          다른 사람과 공유하기
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Mainphrase;
