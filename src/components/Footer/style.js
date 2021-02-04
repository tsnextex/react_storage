import styled from 'styled-components';

export const FooterContainer = styled.section`
  background: #fff;
  flex-grow: 1;
  z-index: 4;

  .paper {
    text-align: center;
  }

  .footerList {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .footerList svg {
    font-size: 20px;
  }

  .locationsBox {
    background: #1B3C92;
    color: #fff;
    height: 70px;
    text-align: center;
  }

  .locationRow {
    align-items: center;
    color: #fff;
    display: flex;
    font-size: 16px;
  }

  .bold {
    font-weight: 600;
    margin-right: 10px;
  }

  .link {
    align-items: center;
    color: #fff;
    display: flex;
    height: 28px;
    justify-content: center;
    text-decoration: none;
    width: 20px;
  }

  .listHeader {
    color: #4A4A4A;
    padding: 1em 0; 
    width: 100%;
    font-size: 16px;
    font-weight: bold;
  }

  .listItem {
    color: #4A4A4A;
    font-size: 15px;
    line-height: 21px;
    margin-bottom: 0.4em;
    text-decoration: none;
  }

  .footerContainer {
    max-width: 1000px;
  }

  .footerItem {
    text-align: left;
  }

  .disclaimerContainer {
    padding-bottom: 40px !important;
  }

  .disclaimer {
    font-size: 11px;
    text-align: left;
    
    p {
      line-height: 21px;
      margin-bottom: 1em;
    }
  }

  .footerLink {
    color: #4A4A4A;
    float: right;
    padding-right: 1em;
    text-decoration: underline;
  }

  .socialIcon {
    height: 20px;
    padding-right: 1.6em;
  }

  .divider {
    width: 100%;
  }
`;

export const CustomSpan = styled.span`
  display: flex;
  flex-wrap: nowrap;
  padding: 0 0.6em 0 0;
  
  ${props => props.test > 0 &&
    `&:before {
      content: "|";
      font-size: 16px;
      padding: 0 0.6em 0 0;
    }`
  };

  a {
    color: #fff;
  }

  @media only screen and (max-width: 520px) {
    padding-right: .4em;
    font-size: 0.9em;

    &:before {
      padding: 0 0.4em 0 0;
    }
  }
`;