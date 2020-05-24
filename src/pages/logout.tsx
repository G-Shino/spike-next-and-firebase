import React, { useState } from "react";
import Router from "next/router";
import firebase from "./../lib/firebase";
import { FontSize } from "./../constants/Font";
import styled from "@emotion/styled";
import { TextField, Button } from "@material-ui/core";

const Logout: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleLogoutButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log(e);
    try {
      firebase.auth().signOut();
      Router.push("/");
    } catch (error) {
      console.error("Logout: ERROR", error);
    }
  };

  const handleMessageTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  return (
    <WrapperDiv>
      <TitleH1>Send Your Message!!</TitleH1>
      <ButtonDiv>
        <StyledButton
          variant="outlined"
          type="button"
          onClick={handleLogoutButtonClick}
        >
          Logout
        </StyledButton>
      </ButtonDiv>
      <StyledMessageForm>
        <StyledTextField
          label="Message"
          variant="outlined"
          value={message}
          onChange={handleMessageTextChange}
        ></StyledTextField>
        <StyledSendButton variant="outlined">Send</StyledSendButton>
      </StyledMessageForm>
    </WrapperDiv>
  );
};

const WrapperDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const TitleH1 = styled.h1`
  margin-top: 16px;
`;

const StyledMessageForm = styled.form`
  margin: 16px 0;
`;

const StyledTextField = styled(TextField)`
  min-width: 480px;

  .MuiInputLabel-root {
    font-size: ${FontSize.BASE};
  }
  .MuiInputBase-input {
    font-size: ${FontSize.BASE};
  }
` as typeof TextField;

const StyledSendButton = styled(Button)`
  width: 24px;
  height: 56px;
`;
const ButtonDiv = styled.div`
  width: 240px;
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 96px;
  height: auto;
`;

export default Logout;
