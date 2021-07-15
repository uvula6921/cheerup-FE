import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import { Link } from "react-router-dom";
import { Card, Typography, CardContent } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import Edit from "./Edit";
import { actionCreators as listActions } from "../redux/modules/articles";
import { actionCreators as modalActions } from "../redux/modules/updateModal";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { history } from "../redux/configureStore";
import { UserPermit, MyContentPermit } from "../shared/Permit";
import { Grid } from "../components/Styles";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/components/effect-fade/effect-fade.scss";
import SwiperCore, { Pagination, Scrollbar, EffectFade } from "swiper/core";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/components/effect-fade/effect-fade.scss";

SwiperCore.use([Pagination, Scrollbar, EffectFade]);

const selectStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const List = (props) => {
  const classes = selectStyles();
  const [sorting, setSorting] = React.useState("");
  const [article, setArticle] = React.useState({});

  const handleChange = (event) => {
    setSorting(event.target.value);
  };

  const scrollTarget = useRef();
  const dispatch = useDispatch();
  const _article_list = useSelector((state) => state.article.article_list);
  const user_name = useSelector((state) => state.user.user_name);
  let article_list = _article_list.slice(0, _article_list.length);
  if (sorting === "") {
    article_list.sort(function (a, b) {
      return b["id"] - a["id"];
    });
  }
  if (sorting === 10) {
    article_list.sort(function (a, b) {
      return b["likesCount"] - a["likesCount"];
    });
  }

  const openModal = (id, content) => {
    dispatch(modalActions.openModal(true));
    setArticle({ id: id, content: content });
  };

  useEffect(() => {
    dispatch(listActions.loadArticleSV(user_name));
  }, [user_name]);

  // swiper 초기화
  const [swiper, setSwiper] = useState(null);
  useEffect(() => {
    const swiperInstance = document.querySelector(".swiper-container").swiper;
    setSwiper(swiperInstance);
  }, []);

  return (
    <>
      <FormControl className={classes.formControl}>
        <Select
          value={sorting}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="" onClick={() => swiper.slideTo(0, 250, false)}>
            등록일 순
          </MenuItem>
          <MenuItem value={10} onClick={() => swiper.slideTo(0, 250, false)}>
            좋아요 순
          </MenuItem>
        </Select>
      </FormControl>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{
          dynamicBullets: true,
        }}
        style={{ width: "100%", padding: "30px 0px" }}
      >
        {article_list.map((l, idx) => {
          return (
            <SwiperSlide key={l.id}>
              <Card
                key={idx}
                id={l.id}
                style={{
                  width: "auto",
                  maxWidth: "360px",
                  margin: "20px",
                  border: "2px solid #888",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  position: "relative",
                }}
                onClick={() => {
                  history.push(`/detail/${l.id}`);
                }}
              >
                <UserPermit>
                  <IconButton
                    size="small"
                    aria-label="like"
                    style={{
                      backgroundColor: "#fff",
                      padding: "8px",
                      position: "absolute",
                      top: "3px",
                      right: "5px",
                      border: "1px solid #0B184E",
                    }}
                    onClick={(e) => {
                      dispatch(listActions.likeSV(user_name, l.id));
                      e.stopPropagation();
                    }}
                  >
                    {l?.likeItChecker ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M2 9h3v12H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1zm5.293-1.293l6.4-6.4a.5.5 0 0 1 .654-.047l.853.64a1.5 1.5 0 0 1 .553 1.57L14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H8a1 1 0 0 1-1-1V8.414a1 1 0 0 1 .293-.707z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h3.482a1 1 0 0 0 .817-.423L11.752.85a.5.5 0 0 1 .632-.159l1.814.907a2.5 2.5 0 0 1 1.305 2.853L14.6 8zM7 10.588V19h11.16L21 12.104V10h-6.4a2 2 0 0 1-1.938-2.493l.903-3.548a.5.5 0 0 0-.261-.571l-.661-.33-4.71 6.672c-.25.354-.57.644-.933.858zM5 11H3v8h2v-8z"
                          fill="#0B184E"
                        />
                      </svg>
                    )}
                  </IconButton>
                </UserPermit>
                <MyContentPermit user_name={l.username}>
                  <IconButton
                    size="small"
                    aria-label="delete"
                    style={{
                      backgroundColor: "#fff",
                      padding: "8px",
                      position: "absolute",
                      top: "3px",
                      right: "85px",
                      border: "1px solid #0B184E",
                    }}
                    onClick={(e) => {
                      dispatch(listActions.deleteArticleSV(l.id));
                      e.stopPropagation();
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
                  <IconButton
                    size="small"
                    aria-label="edit"
                    style={{
                      backgroundColor: "#fff",
                      padding: "8px",
                      position: "absolute",
                      top: "3px",
                      right: "45px",
                      border: "1px solid #0B184E",
                    }}
                    onClick={(e) => {
                      openModal(l.id, l.content);
                      e.stopPropagation();
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
                        d="M5 19h1.414l9.314-9.314-1.414-1.414L5 17.586V19zm16 2H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L9.243 19H21v2zM15.728 6.858l1.414 1.414 1.414-1.414-1.414-1.414-1.414 1.414z"
                        fill="#0B184E"
                      />
                    </svg>
                  </IconButton>
                </MyContentPermit>
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
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {l.content}
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
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {l.saying}
                  </Typography>
                  <Grid justify_contents="space-between">
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{
                        paddingTop: "15px",
                      }}
                    >
                      <b>생성일</b> : {l.createdAt}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{
                        paddingTop: "15px",
                      }}
                    >
                      <b>좋아요</b> : {l.likesCount}개
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </SwiperSlide>
          );
        })}
        <Edit article={article}></Edit>
      </Swiper>
    </>
  );
};

const ListWrap = styled.div`
  height: auto;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default withRouter(List);
