import styled from 'styled-components';
import { Grid, SvgIcon } from "@material-ui/core";

export const HalfRowSectionsContainer = styled.section`

  .root {
    background: #F4F5F8;
    display: flex;
    text-align: center;
  }
`;

export const CustomGrid = styled(Grid)`
  align-items: flex-start;
  background: ${props => props.gradient}, url(${props => props.bgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  height: 450px;
  justify-content: flex-end;
  letter-spacing: 0;
  padding: 4em;
  text-align: left;

  .sectionTitle {
    color: #fff;
    font-size: 34px;
    font-weight: 500;
    padding: 0.4em 0.4em 0.4em 0;
  }

  .sectionContent {
    color: #fff;
    font-size: 22px;
    font-weight: 400;
  }

  .buttonWrapper {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-top: 1em;
  }

  .button {
    background: #CE3138;
    bottom: 0,
    box-shadow: none;
    font-size: 15px;
    font-weight: bold;
    height: 45px;
    position: relative;
    text-transform: capitalize;
  }

  .button:hover {
    background: #CE3138;
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 750px) {
    align-items: center;
    height: 325px;
    justify-content: center;
    max-height: 269px;
    padding: 3em;
    text-align: center;

    .sectionTitle {
      font-size: 20px;
    }

    .sectionContent {
      font-size: 15px;
    }

    .buttonWrapper {
      align-items: center;
    }

    .button {
      height: 50px;
      min-width: 180px;
    }
  }
`;

export const CustomSvg = styled(SvgIcon)`

  ${props => props.size === 75 ? `
    font-size: 75px !important;
    position: relative;
    top: 15px
    ` :
    `
      font-size: 60px !important;
    `
  }
`;