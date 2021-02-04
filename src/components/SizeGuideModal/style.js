import styled from 'styled-components';
import { Grid, Modal, Container } from 'semantic-ui-react';
import { CloseOutlined } from '@ant-design/icons';

export const DotContainer = styled(Container)
` {
    background: none !important;
    text-align: center;
    
    .ui.buttons .button {
      background: none;
    }
}
`;

export const CloseIcon = styled(CloseOutlined)
` {
    cursor: pointer;
    position: absolute;
    top: calc(18px - (100vh - 796px) / 2);
    right: calc(18px + (100% - ${props => props.swidth}px) / 2);
    color: white;
    font-size: 40px;

    @media only screen and (max-width: 768px) { 
      top: 9px;
      right: 15px;
      color: #4A4A4A;
      font-size: 28px;
    }
}
`;
export const CustomModal = styled(Modal)
`
    width: 100% !important;
    max-width: 1070px;
    height: 796px;


  .rightContainer {
    padding-left: 0 !important;
  }
  .modalWrap {
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
    padding: 38px 56px 0 56px !important;
  }

  .modalDescription {
    display: flex !important;
    justify-content: center;
    max-height: 200px;
  }

  .modalHeader { 
    padding: 0 !important;
    border-bottom: solid 1px #DBDBDB;
  }

  .mobileHeaderButtons {
    display: flex;
    flex-direction: row;
    margin:auto;
    padding: 0 50px 0 20px;
    height: 47px;
    align-items: center;
    justify-content: center;
    max-width: 575px;
    text-align: center;
  }

  .activeButton {
    background: #fff !important;
    border: none;
    color: #004C9C !important;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 18px;
    text-align: center;
    height: 45px; 
    border-bottom: solid 4px;
    border-radius: 0px;
    padding-left: 4px;
    padding-right: 4px;
    margin: auto;
    width: auto !important;
  }
  
  .normalButton {
    background: #fff !important;
    border: none;
    color: #545454;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 18px;
    text-align: center;
    height: 45px;
    border-radius: 0px;
    padding-left: 4px !important;
    padding-right: 4px !important;
    padding-top: 8px;
    margin: auto;
    width: auto !important;
  }

  .unitImage {
    width: 100%;
  }

  .unitLabel {
    color:#545454; 
    font-size: 20px;
    letter-spacing:0; 
  }

  .unitItemContainer {
    border-radius#545454;4px;#545454;:4px; 
    background-color:#FFFFFF; 
    box-shadow: 0 0 4px 0 rgba(191,191,191,0.5);
  }

  .unitItemName {
    color#545454;4px;#545454;4px;:#545454; 
    font-size: 18px;
    letter-spacing:0; 
  }

  .unitItemNote {
    color#545454;4px;#545454;4px;:#545454; 
    font-size: 14px;
    letter-spacing:0; 
  }

  .unitItemImageContainer {
    margin: auto!important;
  }

  .unitItemLabelContainer {
    margin: auto!important;
    padding: 27px 0!important;
  }

  .storageUnitName {
    color: #4A4A4A;
    font-size:24px; 
    letter-spacing:0; 
  }

  .storageUnitNote {
    color: #4A4A4A;
    font-size:18px; 
    letter-spacing:0; 
    margin-bottom: 24px;
    margin-top: 6px;
  }

  .m-0 {
    margin: 0 !important;
  }

  .faqContent {

    .customDropdown {
      display: flex;
      padding: 11px 0 !important;
    }

    .anticon {
      color: #1B3C92;
      font-size: 28px;
      padding-right: 14px;
    }

    .faqTitle {
      align-items: center;
      color: ##545454;
      display: flex;
      font-size: 15px;
      line-height: 19px;
    }

    .faq-question {
      font-size: 15px;
      font-weight: 700;
    }

    .faq-answer {
      font-size: 12px;
      line-height: 19px;
    }

    .faqDescription {
      margin: 0 0 16px 42px;
      font-size: 12px;
      color: #6A6A6A;
    } 

  }

  .mobileHeaderTitle {
    display: none !important;
  }

  .leftContainer {
    width: 43% !important;
  }

  .rightContainer {
    padding-left: 1rem !important;
    width: 57% !important;
  } 

  .showInMobile {
    display: none !important
  }

  @media only screen and (max-width: 378px) { 
    height: 100vh;
    margin: 0 !important;
    border-radius: 0 !important;
    margin-top: -14px !important;

    
    .showInMobile {
      display: block !important
    }
    
    .leftContainer {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }

    .rightContainer {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    
    .modalHeader { 
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }

    .modalWrap {
      padding: 8px !important;
    }

    .storageUnitName { 
      font-size: 18px;  
    }

    .storageUnitNote { 
      font-size:16px;  
    }

    .ui.modal>.header {
      padding: 0 !important;
    }

    .ui.modal>.content {
      padding: 0 !important;
    }

    .mobileHeaderTitle {
      display: block !important; 
      font-size: 19px !important;
      letter-spacing: 0 !important;
      height: 44px !important;
      text-align: left !important; 
      padding: 12px 16px !important; 
      // box-shadow: 0 3px 3px 0 rgba(0,0,0,.1);
    }

    .mobileHeaderButtons { 
      padding: 0 20px !important;
      height: 37px !important; 
    }

    .activeButton { 
      font-size: 10px; 
      height: 36px; 
      border-bottom: solid 2px; 
      padding-left: 0px !important;
      padding-right: 0px !important;
      background: transparent !important;
    }
    
    .normalButton { 
      font-size: 10px; 
      height: 36px; 
      padding-left: 0px !important;
      padding-right: 0px !important;
      background: transparent !important;
    }

    .unitLabel {
      display: none !important;
    }

    .ui.modal .scrolling.content {
      max-height: calc(100vh - 82px); 
    }
      
    .storageUnitNote { 
      margin-bottom: 16px;
    }
  }

  @media only screen and (max-width: 768px) { 
    height: 100vh;
    margin: 0 !important;
    border-radius: 0 !important;
    margin-top: -14px !important;

    .modalContentGridContainer {
      margin: 0 !important;
    }
    .leftContainer {
      width: 100% !important;
    }

    .rightContainer {
      width: 100% !important;
    }

    .header {
      padding; 0 !important;
    }

    .modalHeader { 
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }

    .modalWrap {
      padding: 8px !important;
      max-height: calc(100vh - 104px) !important;
    }

    .storageUnitName { 
      font-size: 18px;  
    }

    .storageUnitNote { 
      font-size:16px;  
    }

    .ui.modal>.header {
      padding: 0 !important;
    }

    .ui.modal>.content {
      padding: 0 !important;
    }

    .mobileHeaderTitle {
      display: block !important; 
      font-size: 19px !important;
      letter-spacing: 0 !important;
      height: 44px !important;
      text-align: left !important; 
      padding: 12px 16px !important; 
      box-shadow: 0 3px 3px 0 rgba(0,0,0,.1);
    }

    .mobileHeaderButtons { 
      padding: 0 20px !important;
      height: 37px !important; 
    }

    .activeButton { 
      font-size: 10px; 
      height: 36px; 
      border-bottom: solid 2px; 
      padding-left: 0px !important;
      padding-right: 0px !important;
      background: transparent !important;
    }
    
    .normalButton { 
      font-size: 10px; 
      height: 36px; 
      padding-left: 0px !important;
      padding-right: 0px !important;
      background: transparent !important;
    }

    .unitLabel {
      display: none !important;
    }

    .ui.modal .scrolling.content {
      max-height: calc(100vh - 82px); 
    }
      
    .storageUnitNote { 
      margin-bottom: 16px;
      margin-top: 0px;
    }
  }


`;

export const UnitItemGrid = styled(Grid)
`
  margin: 0 !important;
  border-radius#545454;4px;#545454;4px;:#545454; 4px;
  background-color: #FFFFFF;
  box-shadow: 0 0 4px 0 rgba(191,191,191,0.5);  
  max-width: 386px;
  margin-bottom: 16px !important; 
  
  @media only screen and (max-width: 378px) { 
    display: none !important;
  }

  @media only screen and (max-width: 768px) { 
    display: none !important;
  }
`;

export const SGCarouselDiv = styled.div `
  margin-bottom:24px;
`;

export const SGContactDiv = styled.div `
  max-width: 555px;
  background-color: #E8EBF4;
  padding: 19px 33px 16px 23px;
  margin-top: 24px;
  
  .contactTitle {
    font-size: 16px;
    color: #004C9C;
    text-align: left;
  }

  .contactNote {
    font-size: 12px;
    color: #545454;
    text-align: left;
  }

  .contactButton {
    margin-top: 16px;
    height: 43px;
    max-width: 206px;
    border-radius: 4px;
    background-color: #1B3C92 !important;
  }

  @media only screen and (max-width: 378px) { 
    // padding: 18px 20px !important;
    margin: 24px 8px 0 8px !important;

    .contactButton {
      margin: auto;
      margin-top: 16px;
    }
  }

  @media only screen and (max-width: 768px) { 
    padding: 18px 18px 22px 20px !important;
    margin: auto;
    margin-top: 24px;
    margin-bottom: 40px !important;

    .contactButton {
      margin: auto;
      margin-top: 12px;
    }
  }

`;




export const NEXT = "NEXT";
export const PREV = "PREV";

export const Item = styled.div `
  text-align: center;
  padding: 100px;
  background-image: ${(props) => `url(${props.img})`};
  background-size: cover;
`;

export const CarouselContainer = styled.div`
  display: flex;
  transition: ${(props) => (props.sliding ? "none" : "transform 1s ease")};
  transform: ${(props) => {
    if (!props.sliding) return "translateX(calc(-80% - 20px))";
    if (props.dir === PREV) return "translateX(calc(2 * (-80% - 20px)))";
    return "translateX(0%)";
  }};
`;

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  // box-shadow: 5px 5px 20px 7px rgba(168, 168, 168, 1);
`;

export const CarouselSlot = styled.div`
  flex: 1 0 100%;
  flex-basis: 80%;
  margin-right: 20px;
  order: ${(props) => props.order};
`;

export const SlideButton = styled.button`
    color: #ffffff;
    font-family: Open Sans;
    font-size: 16px;
    font-weight: 100;
    padding: 10px;
    background-color: #f66f3e;
    border: 1px solid white;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    margin-top: 20px;
    text-decoration: none;
    float: ${(props) => props.float};

  &:active {
    position: relative;
    top: 1px;
  }
  &:focus {
    outline: 0;
  }
`;

export const AppContainer = styled.div`
  font-family: sans-serif;
  text-align: center;
  width: 75%;
  // height: 1000px;
`;

export const Code = styled.code`
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  margin: 0;
  padding: 0.2em 0.4em;
`;


export const MobileCarouselItem = styled.div`
  display: flex;
  justify-content: space-between;
  border: solid 1px #D6D6D6;
  margin: auto;
  margin-top: 12px;
  min-height: 60px;
  margin-right: 25px;
`;

export const MobileCarouselContainer = styled.div`

  padding-left: 10px;
  padding-top: 19px;
  // box-shadow: 5px 5px 20px 7px rgba(168, 168, 168, 1);
  rgba(0,0,0,0.25);

  display: none;

  
  .carouselImageContainer {
    width: 30%;
    margin: auto;
  }

  .carouselLabelContainer {
    width: 70%;
    margin: auto;
  }

  .carouselTitle {
    font-size: 16px;
  }

  .carouselNote {
    font-size: 10px;
  }

  .carouselImage {
    width: 100%;
  }

  .mobileCarouselTitle {
    color:#545454; 
    font-size: 16px;
    letter-spacing:0; 
  }

  @media only screen and (max-width: 378px) { 
    display: block;
  }

  @media only screen and (max-width: 768px) { 
    display: block;
  }

`;