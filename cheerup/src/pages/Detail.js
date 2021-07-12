import React, { useEffect } from "react";
import styled from "styled-components";
import { Card, Typography, CardContent } from "@material-ui/core";
import { actionCreators as listActions } from "../redux/modules/articles";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

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
    </div>
  );
};

export default Detail;
