import styled from 'styled-components';

export const CustomForgotPasswordContainer = styled.section`
  align-items: center;
  background: #F3F3F3;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  width: 100vw;

  .formContainer {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    height: auto;
    min-height: 275px;
    margin: 16px;
    max-width: 428px;
    padding: 25px;
  }

  .forgotPasswordHeader {
    color: #4A4A4A;
    font-size: 25px;
    font-weight: 400;
  }

  .forgotPasswordContent {
    font-size: 14px;
  }

  .forgotPasswordForm {
    margin: 10px 0;
  }

  .formBtnContainer {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  footer {
    align-items: center;
    background: #fff;
    bottom: 0;
    box-shadow: 0 -2px 4px 0 #DBDBDB;
    display: flex;
    height: 76px;
    justify-content: center;
    padding: 0 20px;
    position: absolute;
    width: 100%;
  }

  .cancelBtn {
    background: #fff;
    color: #1B3C92;
    font-size: 14px !important;
    height: 44px;
    margin-bottom: 10px;
    max-width: 178px;
  }

  .sendInstructionsBtn {
    background: #1B3C92;
    color: #fff;
    font-size: 14px !important;
    height: 44px;
    max-width: 178px;
  }

  .contactSection {
    color: #4A4A4A;
    font-size: 12px;
    text-align: center;

    a {
      color: #1B3C92;
      font-weight: 700;
    }
  }

  @media (min-width: 960px) {
    height: 100%;
    padding-bottom: 150px;

    .formContainer {
      min-height: 385px;
    }
  }
`;