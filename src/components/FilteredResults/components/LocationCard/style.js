import styled from 'styled-components';

export const CustomLocationCard = styled.section `
  font-family: Montserrat !important;

  .root {
    box-shadow: 0 2px 4px 0 rgba(191, 191, 191, 0.5);
    display: flex;
    flex-grow: 1;
    height: 171px;
    margin: auto;
    margin-bottom: 1em;
    padding: 15px;
    width: 100%;
  }

  .name {
    color: #4a4a4a;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
  }

  .distance {
    font-size: 10px;
    font-weight: 700;
  }

  .location {
    font-size: 10px;
    line-height: 13px;
    padding-left: 13px;
  }

  .phone {
    font-size: 10px;
  }

  .icon {
    height: 13px;
    left: -2px;
    position: relative;
    top: 2px;
    width: 13px;
  }

  .button {
    color: #1B3C92;
    font-family: 'Montserrat';
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 11px;
    padding-bottom: 12px;
    padding-top: 12px;
    text-align: center;
    text-transform: capitalize;
    width: fill-available;
  }

  .buttonWrapper {
    justify-content: flex-end;
  }

  .browseUnitsButton {
    background: #CE3138;
    box-shadow: none;
    color: #FFF;
    height: 36px;
    font-family: 'Montserrat';
    font-size: 12px;
    font-weight: bold;
    text-decoration: none;
    text-transform: capitalize;
    width: fit-contents;
  }

  .link {
    text-decoration: none;
  }

  .divider {
    margin-left: -8px;
    margin-right: -8px;
  }

  .showMore {
    color: #1B3C92;
    font-size: 10px;
    font-weight: 700;
    padding-top: .8em;
    text-align: center;
  }

  .unit_wrapper {
    padding: 10px 0;
  }

  .unit_image {
    width: 45px;
  }

  .unit_img {
    margin: auto;
    display: block;
    max-height: 100%;
    max-width: 100%;
  }

  .unit_bodyWrapper {
    padding: 10px;
  }

  .unit_firstRow {
    font-size: 18px;
    width: fill-available;
  }

  .unit_price {
    float: right;
    font-weight: 800;

    &:after: {
      content: '/mo';
      font-weight: 300;
      font-size: .7em;
    }
  }

  .unit_storePrice {
    float: right;
    font-size: .7em;
    font-weight: 300,
    text-align: right;
    text-decoration: line-through;
    width: fill-available;

    &:after: {
      content: '/mo in store';
      font-size: .7em;
      font-weight: 300,
      text-decoration: line-through;
    }
  }

  .unit_dimensions {
    font-weight: 800;
    padding-right: .4em;
  }

  .unit_size {
    font-weight: 300;
    padding-left: .4em;
  }

  .unit_tagsWrapper {
    padding-top: 0;
  }

  .unit_tag {
    color: #4a4a4a;
    display: flex;
    font-size: 10px;
    font-weight: 300;
    height: 14px;
    margin-bottom: .3em;
    margin-right: .8em;

    & img: {
      margin: 0 .2em 0 0;
      width: 14px;
    },
  }

  .unit_tagName {
    color: #4a4a4a;
    font-size: 10px;
  }

  .unit_tagNamePromo {
    color: #377D21;
    font-size: 10px;
  }

  .unit_buttonWrapperSM {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    padding: 0;
  }

  .unit_hurryTextSM {
    color: #CE3138;
    font-size: 10px;
    font-style: italic;
    font-weight: 600;
    text-align: center;
  }

  .unit_button {
    background: #1B3C92;
    font-family: 'Montserrat';
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 11px;
    padding-bottom: 12px;
    padding-top: 12px;
    text-align: center;
    text-transform: capitalize;
    width: fill-available;
  }

  .bodyWrapper {
    color: #4a4a4a;
    font-size: 1em;
    margin-left: 100px;
    padding-left: 14px;
    padding-right: 24px;
  }

  .imageWrapper {
    height: 75px;
    position: absolute;
    top: 0;
    width: 100px;
  }

  .img {
    background-attachment: center;
    background-size: cover !important;
    border-radius: 4px;
    height: 75px;
    width: 100px;
  }

  .unitsFromWrapper {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: -15px;
    top: -6px;
  }

  .unitsFrom {
    background: #3CA51B;
    color: white;
    font-size: 8px;
    font-weight: bold;
    opacity: .9;
    padding: 2px 6px;
    text-transform: uppercase;
    width: fit-content;
  }

  .unitsFromPriceHolder {
    background: white;
    font-size: 14px;
    opacity: .9;
    padding: 3px 6px 2px;
  }

  .unitsFromPrice {
    color: #3CA51B;
    font-size: 14px;
    font-weight: 700;
  }

  .perMonth {
    font-size: 8px;
  }

  .xUnits {
    color: #1B3C92;
    font-size: 10px;
    font-weight: 500;
    position: relative;
  }

  @media (min-width: 960px) {
    padding-bottom: 10px;

    .root {
      flex-direction: column;
      height: 100%;
    }

    .name {
      font-size: 15px;
    }
    
    .location {
      font-size: 11px;
      line-height: 14px;
    }

    .phone {
      font-size: 11px;
      line-height: 14px;
    }

    .img {
      height: 79px;
      width: 110px;
    }

    .bodyWrapper {
      padding-left: 20px;
    }

    .unitListContainer {
      display: flex;
      flex-wrap: wrap;
      height: 100%;
    }

    .unitItemContainer {
      align-items: center;
      display: flex;
      justify-content: space-between;
      height: 70px;
      width: 100%;
    }

    .unitDescription {
      align-items: center;
      display: flex;
      justify-content: space-between;
      padding-right: 30px;
    }

    .unitRow {
      display: flex;
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
      line-height: 20px;
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
      align-items: center;
      color: #1B3C92;
      display: flex;
      font-weight: 700;
      height: 40px;
      justify-content: center;
      text-align: center;
      width: 100%;
    }

    .sizeImg {
      height: 54px;
      width: 96px;
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
  }
`;