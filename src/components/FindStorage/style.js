import styled from 'styled-components';

export const FindStorageContainer = styled.section`
  height: 500px;

  .root {
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${props => props.background});
    display: flex;
    font-family: Montserrat;
    height: 100%;
    justify-content: flex-start;
    padding-top: 40px;
    position: relative;

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

  .typoRow {
    color: #FFF;
    max-width: 1200px;
    text-align: center;
    position: relative;
    z-index: 2;
  }

  .typoRow .title {
    font-family: Montserrat;
    font-size: 80px;
    font-weight: 900;
    line-height: 80px;
    margin: 0 auto;
    max-width: 900px;
    text-transform: uppercase;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }

  .subtitle {
    font-family: Montserrat;
    font-size: 32px;
    font-weight: 400;
    line-height: 33px;
    margin: 8px 0;
    max-width: 1055px;
    padding: 0 2.1em;
    text-shadow: 0 1px 3px #000000;
  }

  .formRow {
    font-size: 1.3em;
    margin-top: 15px;
    max-width: 750px;
    position: relative;
    width: 100%;
    z-index: 2;
  }

  .formSubRow {
    padding: 6px;
    width: 100%;
  }

  .searchInput {
    color: #4A4A4A !important;
    width: 100% !important;
  }

  .searchInput .input {
    width: 100% !important;
  }

  .searchInput input {
    border-radius: 4px !important;
    font-family: 'Montserrat';
    font-size: 18px;
    height: 55px;
    width: 100% !important;
  }

  .ui[class*="left icon"].input>input {
    padding-left: 3.5em !important;
  }

  .searchInput input::placeholder {
    color: #4A4A4A;
    font-weight: 400;
  }

  .searchInput .icon {
    color: #4A4A4A !important;
    font-size: 26px !important;
    opacity: 1 !important;
  }

  .typeDropdown {
    position: absolute;
    width: 32% !important;
    z-index: 3;
  }

  .typeDropdown .field {
    margin: 0.8em 0 !important;
  }

  .typeDropdown .title {
    color: #4A4A4A !important;
    font-family: 'Montserrat' !important;
    font-size: 18px !important;
    font-weight: 400;
    height: 100%;
    line-height: 28px;
  }

  .typeDropdown .checkbox {
    color: #4A4A4A !important;
    font-size: 14px !important;
    font-weight: 400;
  }

  .typeDropdown label {
    font-size: 14px;
    padding-left: 25px !important;
  }

  .button {
    background: #CE3138;
    bottom: 0;
    box-shadow: none;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: bold;
    height: 55px;
    position: relative;
    text-transform: capitalize;
    width: 100%;
  }

  .button:hover {
    background: #CE3138;
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1) !important;
  }

  .promo {
    align-self: center;
    background-color: #CE3138;
    border-radius: 27px;
    bottom: -215px;
    box-shadow: 6px 5px 8px 0 rgba(0,0,0,0.25);
    display: flex;
    flex-direction: column;
    height: 158px;
    justify-content: center;
    padding: 1em;
    position: absolute;
    text-align: center;
    text-shadow: 0 4px 8px 0 rgba(0,0,0,0.25);
    width: 400px;
    z-index: 2;
  }

  .promoTitle {
    color: #FFF;
    font-size: 58px;
    font-weight: 900;
    font-weight: 900;
    line-height: 58px;
    text-shadow: 0px 4px 8px rgba(0,0,0,0.25);
  }

  .promoSubtitle {
    color: #FFF;
    font-size: 28px;
    text-shadow: 0px 4px 8px rgba(0,0,0,0.25);
  }

  @media (max-width: 960px) {
    height: 400px;

    .root {
      padding: 0;
    }

    .typoRow {
      max-width: 500px;
      padding: 35px 0 20px 0;
    }

    .formRow {
      padding: 0 25px;
      margin-top: 0;
      max-width: 335px;
    }

    .formSubRow {
      padding: 4px;
    }
  
    .searchInput input {
      font-size: 10px;
      height: 38px;
    }
  
    .searchInput .icon {
      font-size: 16px !important;
    }

    .searchInput .title {
      font-size: 12px !important;
    }

    .typeDropdown {
      position: absolute;
      width: 40% !important;
      z-index: 3;
    }

    .typeDropdown .item {
      padding: 10px !important;
    }
  
    .typeDropdown .title {
      font-size: 10px !important;
      line-height: 20px;
    }

    .typeDropdown label {
      font-size: 10px !important;
    }

    .button {
      font-size: 14px;
      margin-top: 47px;
      min-width: 180px;
      height: 44px;
    }

    .typoRow .title {
      font-size: 30px;
      line-height: 35px;
    }

    .subtitle {
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
      max-width: 320px;
      margin: 0 auto;
      padding: 0.5em;
    }

    .promo {
      bottom: -130px;
      height: 100px;
      width: 234px;
    }

    .promoTitle {
      font-size: 30px;
      line-height: 31px;
    }

    .promoSubtitle {
      font-size: 16px;
    }
  }
`;