import React from "react";
import styled from "@emotion/styled";
import { Button } from "@material-ui/core";
import Router from "next/router";

const Home: React.FC = () => {
  const handleSignUpButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    Router.push("/sign-up");
  };
  const handleSignInButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    Router.push("/sign-in");
  };
  return (
    <WrapperDiv>
      <TitleH1>Enter!!</TitleH1>
      <ButtonDiv>
        <StyledButton
          variant="outlined"
          type="button"
          onClick={handleSignUpButtonClick}
        >
          Sign Up
        </StyledButton>
        <StyledButton
          variant="outlined"
          type="button"
          onClick={handleSignInButtonClick}
        >
          Sign In
        </StyledButton>
      </ButtonDiv>
    </WrapperDiv>
  );
};

const WrapperDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleH1 = styled.h1``;

const ButtonDiv = styled.div`
  width: 240px;
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 96px;
  height: auto;
`;

export default Home;
