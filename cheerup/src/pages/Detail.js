import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@material-ui/core";
import { actionCreators as listActions } from "../redux/modules/articles";
import { actionCreators as commentActions } from "../redux/modules/comments";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { UserPermit, MyContentPermit } from "../shared/Permit";

const Detail = (props) => {
  const comment_input = React.useRef();
  const dispatch = useDispatch();
  const article_id = props.match.params.id;
  const user_name = useSelector((state) => state.user.user_name);

  useEffect(() => {
    dispatch(listActions.loadArticleSV(user_name, article_id));
    dispatch(commentActions.loadCommentSV(article_id));
  }, []);

  const article_list = useSelector((state) => state.article.article_list);
  const comment_list = useSelector((state) => state.comment.comment_list);

  return (
    <ListWrap>
      <Card
        style={{
          margin: "20px",
          border: "2px solid #888",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          position: "relative",
          overflow: "visible",
          maxWidth: "360px",
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
      <UserPermit>
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
            inputRef={comment_input}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                dispatch(
                  commentActions.createCommentSV({
                    comment: comment_input.current.value,
                    username: user_name,
                    articleId: article_id,
                  })
                );
                comment_input.current.value = "";
              }
            }}
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
            onClick={() => {
              dispatch(
                commentActions.createCommentSV({
                  comment: comment_input.current.value,
                  username: user_name,
                  articleId: article_id,
                })
              );
              comment_input.current.value = "";
            }}
          >
            작성하기
          </Button>
        </Grid>
      </UserPermit>

      {comment_list.map((l, idx) => {
        return (
          <Grid
            key={idx}
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            style={{
              width: "80%",
              padding: "0px 0px 15px 0px",
              borderBottom: "1px solid #61616148",
              height: "auto",
              position: "relative",
            }}
          >
            <MyContentPermit user_name={l.user_name}>
              <IconButton
                size="small"
                aria-label="delete"
                style={{
                  backgroundColor: "#fff",
                  padding: "8px",
                  position: "absolute",
                  top: "3px",
                  right: "5px",
                }}
                onClick={(e) => {
                  console.log(l.id);
                  dispatch(commentActions.deleteCommentSV(l.id));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z"
                    fill="#0B184E"
                  />
                </svg>
              </IconButton>
            </MyContentPermit>
            <Grid style={{ height: "100%" }}>
              <AccountCircleIcon
                style={{ color: "#5d99c6", fontSize: "30px" }}
              />
            </Grid>
            <Grid
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
                {l?.username ? l.username : "username_placeholder"}
              </Typography>
              <Typography
                variant="subtitle1"
                component="h5"
                style={{
                  fontWeight: "400",
                  fontSize: "14px",
                }}
              >
                {l?.comment ? l.comment : "comment_placeholder"}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </ListWrap>
  );
};

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: auto;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Detail;
