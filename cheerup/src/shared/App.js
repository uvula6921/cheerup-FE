import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import Main from "../pages/Main";
import styled from "styled-components";
import Mainphrase from "../pages/Mainphrase";

function App() {
  const dispatch = useDispatch();

  return (
    <Container>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/phrase" exact component={Mainphrase} />
      </ConnectedRouter>
    </Container>
  );
}

const Container = styled.div`
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export default App;
