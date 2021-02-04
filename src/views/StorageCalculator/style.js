import styled from 'styled-components';
import { Container } from "semantic-ui-react";

export const StyledContainer = styled(Container)
`
  margin: 20px 15px;
  flex-grow: 1;
`;

export const NoteBoard = styled.section `
  width: 100%;
  text-align:center;
  font-weight: 400;
  margin-top: 23px;
  margin-bottom: 38px;


  .title {
    color: #4A4A4A;
    font-size: 35px;
    letter-spacing: 0;
    line-height: 43px;
    margin: 6px;
  }

  .description {
    color: #4A4A4A;
    font-size: 15px;
    letter-spacing: 0;
    line-height: 26px;
    text-align: center;
    max-width: 701px;
    margin:auto;
  }

  .calctitle {
    color: #1B3C92;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1.27px;
    line-height: 18px;
    text-transform: uppercase;
  }

  
  @media (max-width: 750px) { 

    margin-bottom: 23px;

    .title {
      font-size: 20px;
    }
  
    .description {
      font-size: 12px;
    }
  
    .calctitle {
      font-size: 12px;
    }
  }
 
`;

export const SideBoard = styled.section `
  width: 100%;
  text-align:center;
  font-weight: 400;
  margin: auto;
  max-width: 361px;
  border-radius: 4px;
  background-color: #F4F5F8;
  padding-bottom: 6px;

  .sidecontainer {
    padding: 26px 45px 22px 45px;
  }

  .title {
    color: #545454;
    font-size: 20px;
    letter-spacing: 0;
    text-align: center;
    padding: 5px 0;
  }

  .description {
    color: #545454;
    font-size: 12px;
    letter-spacing: 0;
    text-align: center;
  }

  .storage-features {
    color: #1B3C92;
    font-size: 9px;
    font-weight: bold;
    letter-spacing: 0.82px;
    text-align: center;
    text-transform: uppercase;
  }

  .itemContainer {
    display: flex;
    margin-left: 45px;
    margin-bottom: 16px;
  }

  .feature-img img {
    width: 32px;
    height: 32px;
    margin-top: auto;
  }
  
  .feature-title {
    color: #1B3C92;
    font-family: Montserrat;
    font-size: 12px;
    letter-spacing: 0;
    margin: 6px 16px;
  }

  
  @media (max-width: 750px) { 
    display:none;
  }
 
`;


export const BottomImageBoard = styled.section `
  width: 100%;
  max-height: 109px;
  max-width: 365px;
  margin: auto;
  margin-top: 23px;

  .imageContainer { 
    // background: url("/img/features/bg.png");
    // background-size: cover;
    // width: 364px;
    // height: 108px;
  }

  .imageContainer img { 
    width: 100%;
    height: auto;
  }
  
  .image-title {
    color: #1B3C92;
    font-size: 14px;
    font-weight: 900;
    letter-spacing: 0;
    margin-left: 16px;
   }

   .image-motto {
    color: #000000;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0;
    width: 166px;
    margin-left: 16px;
   }

   
  @media (max-width: 750px) { 
    // max-width: 100%;
    margin-top: 0;
  }

`;