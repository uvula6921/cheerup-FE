import React from "react";
import { useDispatch } from "react-redux";
import { Button, TextField, Box } from "@material-ui/core";
import { Grid } from "../components/Styles";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import instance from "../shared/Request";

const Login = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const [id, SetInput] = React.useState("");
  const [password, Setpassword] = React.useState("");

  const Login = (_id, pwd) => {
    // dispatch(userActions.loginSV(_id, pwd));
    dispatch(userActions.logIn({ user_name: id }));
    dispatch(userActions.checkFirstLogin());
    history.push("/phrase");
  };

  return (
    <React.Fragment>
      <Grid justify_contents="center" flex_direction="column">
        <Box component="h1" color="#616161">
          로그인
        </Box>
        <TextField
          autoComplete={"off"}
          id="standard-basic"
          label="ID"
          style={{ margin: "30px 0px" }}
          onChange={(e) => {
            SetInput(e.target.value);
          }}
        ></TextField>
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          onChange={(e) => {
            Setpassword(e.target.value);
          }}
          autoComplete="current-password"
          style={{ margin: "0px 0px 50px 0px" }}
        />
        {/* <Input inputRef={input} style={{ margin: "30px 0px" }}></Input> */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            Login(id, password);
          }}
        >
          Login
        </Button>
        <Box
          component="span"
          m={3}
          color="#bdbdbd"
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => {
            history.push("/signup");
          }}
        >
          회원가입
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
