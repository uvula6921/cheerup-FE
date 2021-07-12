import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { actionCreators as listActions } from "../redux/modules/articles";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { BorderBottom } from "@material-ui/icons";

const Detail = (props) => {
  const dispatch = useDispatch();
  const article_id = props.match.params.id;

  useEffect(() => {
    dispatch(listActions.loadArticleSV(article_id));
  }, []);

  const article_list = useSelector((state) => state.article.article_list);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          margin: "20px",
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
            }}
          >
            고민
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {article_list[0]?.content && article_list[0].content}
          </Typography>
          <Typography
            variant="subtitle1"
            component="h4"
            style={{
              fontWeight: "800",
            }}
          >
            phrase
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {article_list[0]?.saying && article_list[0].saying}
          </Typography>
        </CardContent>
      </Card>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ width: "100%", margin: "20px 0px 40px 0px " }}
      >
        <TextField
          id="standard-basic"
          label="comment"
          autoComplete="off"
          style={{ width: "60%" }}
        />
        <Button
          color="primary"
          variant="contained"
          style={{
            width: "30px",
            fontSize: "12px",
            padding: "5px",
            margin: "17px 0px 0px 20px",
          }}
        >
          작성하기
        </Button>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        style={{
          width: "80%",
          padding: "0px 0px 15px 0px",
          // borderBottom: "1px solid #61616148",
          height: "auto",
        }}
      >
        <Grid
          direction="column"
          justifyContent="center"
          style={{ height: "100%" }}
        >
          <AccountCircleIcon style={{ color: "#5d99c6", fontSize: "30px" }} />
        </Grid>
        <Grid
          direction="column"
          style={{
            color: "#616161",
            padding: "0px 0px 0px 10px",
            height: "auto",
            width: "85%",
          }}
        >
          <Typography
            variant="subtitle1"
            component="h4"
            style={{
              fontWeight: "800",
              padding: "0px",
              margin: "0px 0px 10px 0px",
              fontSize: "16px",
            }}
          >
            burger_isDelicious
          </Typography>
          <Typography
            variant="subtitle1"
            component="h5"
            style={{
              fontWeight: "400",
              fontSize: "14px",
            }}
          >
            정말 딱 들어맞는 조언이네요! 정말 딱 들어맞는 조언이네요! 정말 딱
            들어맞는 조언이네요! 정말 딱 들어맞는 조언이네요! 정말 딱 들어맞는
            조언이네요! 정말 딱 들어맞는 조언이네요! 정말 딱 들어맞는
            조언이네요! 정말 딱 들어맞는 조언이네요! 정말 딱 들어맞는
            조언이네요! 정말 딱 들어맞는 조언이네요! 정말 딱 들어맞는
            조언이네요!
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Detail;
