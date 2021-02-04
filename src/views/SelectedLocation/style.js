import styled from 'styled-components';
import { Tab, Menu } from 'semantic-ui-react';

export const CustomLocationContainer = styled.section `
  width: 100%;
  display: flex;
  flex-direction: column;

  .topNavBackBtn {
    color: #1B3C92;
    font-size: 12px;
    font-weight: 700;
  }

  .locationTopNav {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 2px 10px;

    .button {
      box-shadow: none !important;
      color: #1B3C92 !important;
      font-size: 12px !important;
      font-weight: 700 !important;
    }
  }

  .section {
    margin-bottom: 10px;
    border-radius: 4px;
    padding: 10px 25px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  .customDropdown {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .customDropdownAnnex {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .dropdownLabelAnnex {
    color: #1B3C92;
    font-size: 24px;
  }

  .dropdownLabel {
    color: #1B3C92;
    font-size: 24px;
  }

  .mainContentContainer {
    padding-bottom: 75px;
  }

  @media (min-width: 960px) {

    .locationTopNav {
      max-width: 1150px;
      margin: 0 auto;
      padding: 10px 0;
      width: 100%;
    }
    
    .mainContentContainer {
      display: flex;
      justify-content: space-between;
      max-width: 1150px;
      margin: 0 auto;
      width: 100%;
    }

    .mapContainer {
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      height: 225px;
      margin: 10px 0;
    }

    .customDropdown {
      font-size: 25px !important;
    }

    .dropdownLabel {
      font-size: 40px;
      line-height: 24px;
    }
  }
`;

export const NavigationTabs = styled(Tab)
`
  background: #fff;

  .item {
    color: #4A4A4A !important;
    font-size: 10px !important;
    font-weight: 700 !important;
  }

  .active {
    border-bottom-color: #1B3C92 !important;
    color: #1B3C92 !important;
  }

  @media (min-width: 960px) {

    .menu {
      display: flex;
      justify-content: center;
    }
    
    .item {
      font-size: 12px !important;
    }
  }
`;

export const FilterMenu = styled(Menu)
`
  margin-bottom: 0 !important;

  .item {
    background: #E4E8F1 !important;
    color: #4A4A4A !important;
    font-size: 10px !important;
    font-weight: 700 !important;
    height: 30px;
    padding: 0 20px !important;
  }

  .active {
    background: #1B3C92 !important;
    color: #fff !important;
  }
`;

export const LocationDetailsCard = styled.section `
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  display: flex;
  flex-direction: column;
  position: relative;

  .locationDetailsDropdown {
    align-items: center;
    color: #1B3C92 !important;
    display: flex;
    font-size: 10px !important;
    font-weight: 700;
    justify-content: center;
  }

  .property_details {
    display: flex;
    padding: 10px 10px 0 10px;

    .icon {
      height: 13px;
      left: -2px;
      position: relative;
      top: 2px;
      width: 13px;
    }
  }

  .details_container {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }

  img {
    border-radius: 4px;
    height: 86px;
    object-fit: cover;
    width: 115px;
  }

  .name {
    color: #4a4a4a;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
  }

  .location {
    display: flex;
    font-size: 10px;
    line-height: 15px;
  }

  .phone {
    display: flex;
    font-size: 10px;
    line-height: 15px;
  }

  .content {
    padding: 15px !important;
  }

  .infoHeader {
    font-size: 10px;
    font-weight: 700;
    padding: 20px 0 10px 0;
  }

  .hours {
    font-size: 10px;

    p {
      display: flex;
      width: 100%;
    }

    span {
      width: 120px;
    }
  }

  .officeLocationContainer {
    background: #E8EBF4;
    display: flex;
    height: 44px;
    margin-top: 5px;
    width: 100%;
  }

  .officeIcon {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 50px;

    .icon {
      align-items: center;
      color: #1B3C92;
      display: flex;
      font-size: 16px;
      height: 100%;
      justify-content: center;
    }
  }

  .officeDetails {
    display: flex;
    flex-direction: column;
    font-size: 11px;
    justify-content: center;

    strong {
      color: #1B3C92;
    }
  }

  @media (min-width: 960px) {
    max-width: 275px;

    img {
      border-radius: 0;
      height: 125px;
      object-fit: cover;
      width: 100%;
    }

    .content {
      padding: 0 !important;
    }

    .property_details {
      flex-direction: column;
      padding: 0;
      width: 275px;
    }

    .details_container {
      padding-top: 10px;
    }
  }
`;

export const LocationContent = styled.section `
  padding: 10px;

  .filterRow {
    align-items: center;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    margin-top: 10px;
    position: relative;
  }

  .filterRow .accordion {
    font-size: 12px;
    margin: 0 !important;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
  }

  .filterBtn {
    border-radius: 4px;
    border: 1px solid #DBDBDB;
    height: 30px;
    width: 52px;
  }

  .filterIconBtn {
    border: 1px solid #e0e1e2;
    border-radius: 4px;
    height: 30px;
    width: 52px;
  }

  .filterBtnRow {
    align-items: center;
    display: flex;
    height: 60px;
    justify-content: space-between;

    .secondary {
      overflow-x: scroll;
      -ms-overflow-style: none;  /* Internet Explorer 10+ */
      scrollbar-width: none;  /* Firefox */

      &::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
      }
    }
  }

  .cityContent {
    color: #4A4A4A;

    h3 {
      color: #4A4A4A;
      font-size: 15px;
      font-weight: 700;
    }

    p {
      font-size: 12px;
      line-height: 19px;
    }
  }

  .faqContent {

    .anticon {
      color: #1B3C92;
      font-size: 28px;
      padding-right: 14px;
    }

    .title {
      align-items: center;
      color: #1B3C92;
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
  }

  .aboutSection {
    line-height: 50px;
    margin-bottom: 10px;
    border-radius: 4px;
    padding: 10px 0;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  .aboutCustomDropdown {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 25px !important;

    .anticon {
      color: #CE3138;
    }
  }

  .aboutCustomDropdownSub {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 25px !important;

    .anticon {
      color: #CE3138;
    }
  }

  .aboutPadding {
    padding: 0 25px;
  }

  .aboutSubDropdown {
    align-items: center;
    display: flex;

    .icon {
      color: #1B3C92;
      font-size: 17px;
      height: 100%;
    }

    div {
      color: #4A4A4A;
      font-size: 14px;
      font-weight: 700;
    }
  }

  .aboutSubContent {

    ul {
      background: #1B3C92;
      color: #fff;
      list-style: none;
      padding: 10px 25px 25px 25px;
      text-align: center;

      li {
        align-items: center;
        display: flex;
        border-bottom: 1px solid #2F519D;
        font-size: 12px;
        height: 50px;
        justify-content: center;
      }
    }

    h3 {
      display: none;
    }
  }

  .closeCustomDropdown {
    display: none;
  }

  .contentContainer {
    border-bottom: 1px solid #E8E8E8;
  }

  @media (min-width: 960px) {
    max-width: 850px;
    padding-top: 0;

    .filterRow {
      font-size: 25px;
    }

    .filterBtn {
      width: 140px;

      span {
        font-size: 12px;
        font-weight: 700;
        padding-left: 10px;
      }
    }

    .aboutSection {
      padding-bottom: 0 !important;
    }

    .aboutListContainer {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding-top: 50px;

      .contentContainer {
        border: 1px solid #E8E8E8;
        height: 215px;
        width: 33.33%;
      }
    }

    .contentContainer .accordion {
      height: 100%;
      margin: 0;
      position: relative;
    }

    .aboutSubDropdown {
      display: flex;
      flex-direction: column;

      .icon {
        height: 25px;
      }
    }

    .aboutCustomDropdown {
      align-items: center;
      display: flex;
      font-size: 25px !important;
      height: 100%;
    }

    .aboutCustomDropdownSub {
      align-items: center;
      display: flex;
      flex-direction: column;
      font-size: 25px !important;
      height: 100%;
      justify-content: center;
    }

    .closeCustomDropdown {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 0;
      width: 100%;
      color: white;

      .button {
        background: transparent !important;

        .anticon {
          color: #fff;
        }
      }
    }

    .aboutSubContent {
      position: absolute;
      width: 100%;
      top: 0;
      margin: 0;
      padding: 0 !important;
      height: 100%;

      ul {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
      }

      li {
        font-size: 8px !important;
        height: 25px !important;
      }
    }
  }
`;

export const PromoItem = styled.section `  
  background: #e0e1e2;
  border-radius: 4px;
  boxShadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  height: 104px;
  margin-bottom: 10px;
  width: 100%;
`;

export const ListOfUnits = styled.section `
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  font-family: Montserrat !important;
  margin-bottom: 10px;
  padding-bottom: 10px;
  padding: 10px;

  .unitListContainer {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
  }

  .unitItemContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
  }

  .itemContainerTop {
    display: flex;
    justify-content: space-between;
  }

  .unitDescription {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .unitRow {
    display: flex;
    flex-direction: column;
  }

  .unitColumn {
    display: flex;
    flex-direction: column;
  }

  .unitSize {
    color: #4A4A4A;
    font-size: 18px;
    font-weight: 800;
  }

  .sizeWord {
    font-weight: 400;
  }

  .unitTag {
    display: flex;
  }

  .unitTag div {
    display: flex;
    font-size: 11px;
    padding-top: 5px;
  }

  .unitTag div span {
    margin: 0 8px 0 3px;
  }

  .unitTag img {
    height: 14px;
    object-fit: contain;
    width: 14px;
  }

  .unitPrice {
    color: #3CA51B;
    font-size: 18px;
    font-weight: 800;
  }

  .unitPrice span {
    color: #4A4A4A;
    font-size: 14px;
    font-weight: 500;
  }

  .unitPriceStore {
    color: #4A4A4A;
    font-size: 11px;
    font-weight: 500;
  }

  .selectLocationBtn {
    background: #1B3C92;
    box-shadow: none;
    font-size: 10px;
    font-weight: 700;
    height: 36px;
    width: 147px;
  }

  .hurryText {
    color: #CE3138;
    font-size: 10px;
    font-style: italic;
    font-weight: 700;
    text-align: center;
  }

  .availableText {
    color: #1B3C92;
    font-size: 10px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
  }

  .viewMatching {
    color: #1B3C92;
    font-weight: 700;
    height: 40px;
    text-align: center;
    width: 100%;
  }

  .sizeImg {
    height: 54px;
    width: 75px;
    cursor: pointer;
  }

  .sizeImg img {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }

  .priceColumn {
    padding-right: 30px;
    text-align: right;
  }

  .selectLocationBtn {
    background: #1B3C92 !important;
    color: #fff;
    font-family: 'Montserrat';
    font-size: 10px !important;
    font-weight: bold;
    height: 36px;
    letter-spacing: 0;
    line-height: 11px;
    margin-top: 25px;
    text-align: center;
    text-transform: capitalize;
    width: fill-available;
  }

  .ant-list-pagination {
    display: flex;
    justify-content: center;
    margin: 0 0 20px 0;
  }

  .ant-pagination-item-active {
    border-radius: 50%;
  }

  .ant-pagination {
    align-items: center;
    display: flex;

    .ant-pagination-item-active a {
      color: #4A4A4A !important;
    }

    .ant-pagination-item {
      align-items: center;
      background: #E8EBF4;
      border: 0;
      color: #4A4A4A !important;
      display: flex;
      height: 44px !important;
      justify-content: center;
      width: 44px !important;
    }
  }

  @media (min-width: 960px) {

    .unitItemContainer {
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      height: 110px;
    }

    .itemContainerTop {
      flex-grow: 1;
    }

    .unitRow {
      justify-content: center;
    }

    .selectLocationBtn {
      width: 150px;
    }
  }
`;

export const CustomReviewBox = styled.section `

  .reviewTop {
    display: flex;
    flex-direction: column;
  }

  .reviewOverview {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 14px 0;

    section {
      align-items: center;
      display: flex;
    }
  }

  .reviewTotalScore {
    color: #4A4A4A;
    font-size: 27px;
    font-weight: 700;
  }

  .reviewRating {
    padding: 0 10px;
  }

  .reviewTotalCount {
    color: #4A4A4A;
    font-size: 12;
    font-weight: 400;
  }

  .reviewWriteBtn {
    background: transparent;
    border: 1px solid #1B3C92 !important;
    color: #1B3C92 !important;
    font-size: 10px;
    font-weight: 700 !important;
    height: 39px;
  }

  .reviewList {
    display: flex;
    flex-direction: column;
  }

  .reviewItem {
    display: flex;
    flex-direction: column;
  }

  .reviewName {
    color: #4A4A4A;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
  }

  .reviewDetails {
    display: flex;
    flex-direction: column;
  }

  .detailsTop {
    display: flex;
    margin: 2px 0 10px 0;
  }

  .reviewDate {
    color: #4A4A4A;
    font-size: 10px;
    font-style: italic;
    font-weight: 400;
    margin-left: 10px;
  }

  .reviewDescription {
    color: #4A4A4A;
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
  }

  .reviewViewMoreBtn {
    background: transparent !important;
    color: #1B3C92 !important;
    font-size: 10px;
    font-weight: 700 !important;
  }

  .ant-list-pagination {
    display: flex;
    justify-content: center;
    margin: 0 0 20px 0;
  }

  .ant-pagination-item-active {
    border-radius: 50%;
  }

  .ant-pagination {
    align-items: center;
    display: flex;

    .ant-pagination-item-active a {
      color: #4A4A4A !important;
    }

    .ant-pagination-item {
      align-items: center;
      background: #E8EBF4;
      border: 0;
      color: #4A4A4A !important;
      display: flex;
      height: 44px !important;
      justify-content: center;
      width: 44px !important;
    }
  }

  @media (min-width: 960px) {

    .reviewItem {
      flex-direction: row;
    }

    .reviewReviewer {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 75px;
      max-width: 120px;
      width: 100%;
    }

    .reviewDetails {
      padding: 0 20px;
    }

    .reviewWriteBtn {
      width: 150px;
    }
  }
`;