import styled from 'styled-components';

export const ThreeStepsContainer = styled.section`
  align-self: center;
  background: #F3F3F3;
  display: flex;
  flex-direction: column;
  font-family: Montserrat;
  justify-content: center;
  max-width: 1000px;
  padding-bottom: 2em;
  text-align: center;

  .button {
    background: #CE3138;
    font-size: 14px;
    font-weight: bold;
    height: 45px;
    margin-top: 2em;
    text-transform: capitalize;
    width: 180px;
  }

  .button:hover {
    background: #CE3138;
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
  }

  .titleRow {
    padding-top: 2em;
    width: 100%;
  }

  .title {
    color: #1B3C92;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .subtitle {
    color: #4A4A4A;
    font-size: 35px;
    font-weight: 400;
    padding-top: 3px;
  }

  .stepsRow {
    padding-top: 1.2em;
  }

  .step {
    padding: 1em;
  }

  .icon {
    color: #0D1D48;
    margin-bottom: 5px;
    width: 42px;
  }

  .stepTitle {
    color: #0D1D48;
    font-size: 20px;
    font-weight: 400;
    text-transform: capitalize;
  }

  .stepContent {
    color: #4A4A4A;
    font-size: 13px;
    font-weight: 300;
    margin: 0.5em 0;
  }

  .dividerHolder {
    align-self: center;
    width: 100%;
  }

  @media (max-width: 1052px) {
    min-height: 475px !important;
  }

  @media (max-width: 600px) {

    .title {
      font-size: 10px;
    }

    .subtitle {
      font-size: 22px;
    }

    .stepsRow {
      padding-top: 0;
    }

    .icon {
      width: 25px;
      margin-bottom: 0;
    }

    .stepTitle {
      font-size: 16px;
    }

    .stepContent {
      font-size: 10px;
      line-height: 17px;
    }

    .button {
      margin-top: 0.5em;
    }
  }
`;

export const DesktopDivider = styled.section`
  height: 100%;
  transform: rotate(90deg) translateY(-1em);
  width: fit-content;

  .step-one {
    border-bottom: 16px solid #BABABA;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    position: relative;
    width: 0;
  }

  .step-two {
    border-bottom: 16px solid #F4F5F8;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    left: -40px;
    position: absolute;
    top: 1px;
    width: 0;
  }
`;

export const MobileDivider = styled.section`
  border-bottom: 1px solid #B2B2B4;
  opacity: 0.26;
  width: inherit;
`;