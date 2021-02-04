import styled from 'styled-components';
import { Drawer } from '@material-ui/core';

export const NavbarContainer = styled.section`

  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .navigation {
    background-color: #ffffff;
    display: flex;
    height: 77px;
    justify-content: space-between;
    padding-left: 160px;
    top: 0;
    width: 100vw;
  }

  .logo {
    cursor: pointer;
    height: 100%;
    left: 20px;
    object-fit: contain;
    position: absolute;
    top: 0;
    width: 98px;
  }

  .leftSide {
    height: 77px;
    display: flex;
    align-items: center;
  }

  .rightSide {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    padding-right: 20px;
  }

  .iconTextLink {
    align-items: center;
    color: #333;
    display: flex;
    justify-content: flex-start;
    margin-right: 20px;
    position: relative;
  }

  .phoneIcon {
    display: flex;
    font-size: 19px;
  }

  .phoneText {
    color: #1B3C92 !important;
    font-size: 14px;
    font-weight: 700;
    margin-left: 7px;
  }

  .billBtn {
    background: #1B3C92;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    height: 47px;
    text-transform: capitalize;
    width: 147px;
  }

  .billBtn:hover {
    background: #1B3C92;
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1) !important;
  }

  .navigation a {
    text-decoration: none;
    color: inherit;
  }

  .navigation ul {
    font-size: 0;
    list-style-type: none;
    z-index: 3;
  }

  .navigation ul li {
    align-items: center;
    color: #333;
    display: flex;
    font-size: 14px;
    font-weight: bold;
    height: 100%;
    padding: 0 16px;
    position: relative;
  }

  .navigation ul li svg {
    font-size: 14px;
    margin-left: 3px;
  }

  .navigation ul li ul {
    display: none;
    z-index: 3;
  }

  .navigation ul li ul a,
  .navigation ul li ul a:hover {
    z-index: 3;
  }

  .navigation ul li:hover {
    cursor: pointer;
  }

  .navigation ul li:hover ul {
    display: block;
    top: 77px;
    border-top: 2px solid #1b3c92;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    width: 200px;
    left: 0;
    position: absolute;
    z-index: 3;
  }

  .navigation ul li:hover ul li {
    display: block;
    background-color: #fff;
    padding: 12px;
    z-index: 3;
  }

  .navigation ul li:hover ul li:first-child {
    padding-top: 16px;
  }

  .navigation ul li:hover ul li:last-child {
    padding-bottom: 16px;
  }

  .navigation ul li:hover ul li span {
    float: right;
    color: #f9f9f9;
    background-color: #f1f1f1;
    padding: 2px 5px;
    text-align: center;
    font-size: 0.8rem;
    border-radius: 3px;
  }

  .navigation ul li:hover ul li:hover {
    background-color: #dce4fb;
    z-index: 2;
  }

  @media only screen and (max-width: 950px) {

    .navigation {
      height: 50px;
    }

    .navigation .logo {
      left: 15px;
      width: 66px;
    }

    .rightSide {
      display: flex;
      justify-content: space-between !important;
    }

    .rightSide .phoneNumber {
      padding: 12px;
    }

    .rightSideIcon {
      font-size: 16px;
      width: 35px;
    }

    .rightSideMenuIcon {
      font-size: 24px;
    }
  }
`;

export const CustomDrawer = styled(Drawer)`
  
  .root {
    display: flex;
  }

  .title {
    flex-grow: 1;
  }

  .hide {
    display: none;
  }

  .drawer {
    flex-shrink: 0;
    width: 100vw;

    .paper {
      padding-bottom: 30px;
      width: 100vw;
    }
  }

  .drawerPaper {
    padding-bottom: 30px;
    width: 100vw;
  }

  .close {
    box-shadow: 0 2px 4px 0 #DBDBDB;
  }

  .foot {
    background: #fff;
    bottom: 0;
    box-shadow: 0 -2px 4px 0 #DBDBDB;
    position: fixed;
    z-index: 3;
  }

  .listItemLink {
    text-decoration: none;
  }

  .listItem {
    border-bottom: 1px solid #DBDBDB;
  }

  .listItemText {
    color: #4A4A4A;
    font-family: Montserrat;
  }

  .listItemTextPrimary {
    color: #4A4A4A;
    font-family: Montserrat;
    font-size: 1.4em;
  }

  .subList {
    background: #F8F8FF; 
    font-size: .9em; 
  }

  .chip {
    margin: 8px 4px;
  }

  .disclaimer {
    padding: 5px;
    font-size: .8em;
    text-align: left;
    line-height: 1.8px;

    p {
      margin-bottom: 1em;
    }
  }

  .footerLink {
    float: right;
    padding-right: 1em;
    text-decoration: underline;
  }

  .listHeader {
    font-weight: 700;
    color: #4A4A4A;
    font-family: Montserrat;
  }

  .socialIcon {
    margin: 12px 8px;
    width: 20px;
    height: 20px;
  }

  .acctBtn {
    text-transform: capitalize;
    color: ;#1B3C92;
  }

  .payBtn {
    text-transform: capitalize;
    background-color: #1B3C92;
    color: white;
  }
`;