import React, { useState } from "react";
import styled from "@emotion/styled";
import { TextField, Button } from "@material-ui/core";
import { FontSize } from "./../constants/Font";
// import firebase from "./../lib/firebase";

const Home: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [nicknameValidationMessage, setNicknameValidationMessage] = useState(
    "このフィールドを入力してください。"
  );
  const [email, setEmail] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState(
    "このフィールドを入力してください。"
  );
  const [password, setPassword] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] = useState(
    "このフィールドを入力してください。"
  );

  const handleNicknameFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameValidationMessage(e.target.validationMessage);
  };
  const handleEmailFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailValidationMessage(e.target.validationMessage.slice(0, 22));
  };
  const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordValidationMessage(e.target.validationMessage);
  };
  const handleSubmitButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(nickname);
    console.log(email);
    console.log(password);
    console.log(
      "" === nicknameValidationMessage &&
        "" === emailValidationMessage &&
        "" === passwordValidationMessage
    );
  };

  return (
    <WrapperDiv>
      <TitleH1>Sign Up</TitleH1>
      <MainForm>
        <StyledTextField
          required
          label="Nickname"
          onChange={handleNicknameFormChange}
          helperText={nicknameValidationMessage}
        />
        <StyledTextField
          required
          label="Email"
          type="email"
          onChange={handleEmailFormChange}
          helperText={emailValidationMessage}
        />
        <StyledTextField
          required
          label="Password"
          type="password"
          onChange={handlePasswordFormChange}
          helperText={passwordValidationMessage}
        />
        <StyledButton
          variant="outlined"
          type="button"
          onClick={handleSubmitButtonClick}
          disabled={
            !(
              "" === nicknameValidationMessage &&
              "" === emailValidationMessage &&
              "" === passwordValidationMessage
            )
          }
        >
          Sign Up
        </StyledButton>
      </MainForm>
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

const MainForm = styled.form`
  width: 100%;
  height: 320px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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

const StyledButton = styled(Button)`
  width: 96px;
  height: auto;
`;

export default Home;
