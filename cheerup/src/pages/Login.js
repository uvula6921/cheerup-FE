import React from "react";
import { useDispatch } from "react-redux";
import { Button, TextField, Box, Typography } from "@material-ui/core";
import { Grid } from "../components/Styles";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import instance from "../shared/Request";

const Login = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const [user_name, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <React.Fragment>
      <Grid justify_contents="center" flex_direction="column">
        <Box component="h1" color="#616161">
          로그인
        </Box>

        <TextField
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          autoComplete={"off"}
          id="standard-basic"
          label="ID"
          style={{ margin: "30px 0px" }}
        ></TextField>
        <TextField
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          style={{ margin: "0px 0px 50px 0px" }}
        />

        <Button
          variant="contained"
          onClick={() => {
            dispatch(userActions.loginSV(user_name, password));
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
