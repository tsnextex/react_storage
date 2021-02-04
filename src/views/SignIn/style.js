import styled from 'styled-components';

export const CustomContainer = styled.section `
  background: #fff;
  width: 100%;
  
  .coverContainer {
    background: #F3F3F3;
    height: 230px;
    padding: 30px;
  }

  .title {
    color: #4A4A4A;
    font-size: 14px !important;
    font-weight: 700;
    letter-spacing: 1.27px;
  }

  .subTitle {
    color: #4A4A4A;
    font-size: 16px !important;
    font-weight: 400;
    line-height: 24px;
  }

  .content {
    color: #4A4A4A;
    font-size: 12px !important;
    font-weight: 400;
    line-height: 18px;
  }

  .lookupBtn {
    background: #CE3138;
    color: #fff;
    font-size: 14px !important;
    height: 44px;
    margin-top: 10px;
  }

  .formContainer {
    padding: 30px;
  }

  .formHeader {
    font-size: 24px !important;
    font-weight: 400;
  }

  footer {
    align-items: center;
    bottom: 0;
    box-shadow: 0 -2px 4px 0 #DBDBDB;
    display: flex;
    height: 76px;
    justify-content: center;
    padding: 0 20px;
    position: absolute;
    width: 100%;
  }

  .forgotBtn {
    background: #fff;
    color: #1B3C92;
    font-size: 14px !important;
    height: 44px;
  }

  .signInBtn {
    background: #1B3C92;
    color: #fff;
    font-size: 14px !important;
    height: 44px;
  }

  .btnContainerLarge {
    align-items: center;
    display: flex;
    height: 100px;
    justify-content: center;
  }

  @media (min-width: 960px) {
    display: flex;
    flex-direction: column;

    .headerBannerImg {
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url(${props => props.bannerImg});
      background-position: 50% 18%;
      height: 250px;
      position: relative;
      width: 100%;

      &:before {
        background-color: rgba(25, 25, 25, 0.4);
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }

    .headerBannerTxt {
      align-items: center;
      bottom: 0;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      left: 0;
      position: absolute;
      right: 0;
      text-align: center;
      top: 0;
      z-index: 2;
    }

    .bannerTitle {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-shadow: 1px 1px #000;
    }

    .bannerHeader {
      font-size: 50px;
      text-shadow: 1px 1px #000;
    }

    .bannerBody {
      font-size: 18px;
      text-shadow: 1px 1px #000;
    }

    .lowerContentContainer {
      display: flex;
      height: 450px;
    }

    .subTitle {
      font-size: 32px !important;
      line-height: 34px;
      margin-bottom: 10px;
    }

    .content {
      font-size: 18px !important;
      line-height: 25px;
    }

    .lookupBtn {
      margin-top: 20px;
      max-width: 172px;
      width: 100%;
    }

    .coverContainer {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      width: 50%;

      article {
        max-width: 375px;
        width: 100%;
      }
    }

    .formContainer {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      width: 50%;

      article {
        max-width: 375px;
        width: 100%;
      }
    }
  }
`;