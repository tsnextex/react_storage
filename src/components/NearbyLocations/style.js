import styled from 'styled-components';
import { MobileStepper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

export const NearbyLocationsContainer = styled.section`

  .groot {
    background: #fff;
  }

  .root {
    display: flex;
    flex-grow: 1;
    font-family: Monserrat;
    max-width: 1100px;
    padding: 1.5em 0 2em 0;
    text-align: center;
  }

  .paper {
    height: 140px;
    width: 100px;
  }

  .titleRow {
    margin-top: 2em;
    text-align: center;
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

  .locationCardContainer {
    padding-bottom: 1.2em;
    position: relative;
    z-index: 2;
  }

  @media (max-width: 600px) {
    
    .groot {
      padding-bottom: 1em;
    }

    .titleRow {
      margin-top: 1.5em;
    }

    .locationCardContainer {
      padding: 1.2em;
    }

    .title {
      font-size: 10px;
    }

    .subtitle {
      font-size: 22px;
    }
  }
`;

export const CustomStepper = styled(MobileStepper)`
  background: #fff !important;
  padding: 0 !important; 
  justify-content: center;
  position: relative;
  z-index: 1;

  .MuiMobileStepper-dot {
    background: #D8D8D8;
    height: 10px;
    margin: 0 5px;
    width: 10px;
  }

  .MuiMobileStepper-dotActive {
    background: #676767;
  }
`;

export const LocationCardContainer = styled.section`
  height: 100%;
  width: 244px;

  .MuiGrid-item {
    height: inherit;
  }

  .locationRoot {
    box-shadow: 0 2px 20px 0 rgba(191,191,191,0.5);
    display: flex;
    flex-direction: column;
    height: inherit;
    justify-content: space-between;
    max-width: 345px;
  }

  .content {
    padding: 10px 20px;
    text-align: left;
  }

  .media {
    height: 130px;
  }

  .locationTitle {
    color: #4A4A4A;
    font-weight: 400;
    font-size: 20px;
  }

  .icon {
    font-size: 1.2em;
    margin-right: .2em;
    position: relative;
    top: 2px;
  }

  .actions {
    padding: 0 1em 1em 1em;
  }

  .button {
    background: #CE3138;
    box-shadow: none;
    font-size: 12px;
    font-weight: bold;
    height: 36px;
    text-transform: capitalize;
    width: 100%;
  }

  .unitsFromWrapper {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 1em;
    top: 70px;
  }

  .unitsFrom {
    background: #3CA51B;
    color: #fff;
    opacity: .95;
    padding: 2px 6px;
    text-transform: uppercase;
    width: fit-content;
  }

  .unitsFromText {
    color: #fff;
    font-size: 11px; 
    font-weight: 600;
  }

  .unitsFromPriceHolder {
    background: #fff;
    color: #4A4A4A;
    opacity: .95;
    padding: 3px 12px;
  }

  .unitsFromPrice {
    color: #3CA51B;
    font-size: 18px;
    font-weight: bold;
  }

  .perMonth {
    font-size: 12px;
    font-weight: light;
  }

  .rating {
    font-size: 18px;
  }

  .distance {
    color: #4A4A4A;
    font-size: 12px;
    font-weight: bold;
  }

  .location {
    font-size: 12px;
    margin-left: 1.5em;
  }

  .phone {
    font-size: 12px;
  }

  @media (max-width: 600px) {
    width: 260px;

    .locationTitle {
      font-size: 16px;
    }

    .distance {
      font-size: 10px;
    }

    .location {
      font-size: 9px;
    }

    .phone {
      font-size: 10px;
    }
  }
`;

export const CustomRating = styled(Rating)`
  color: #F1D615 !important;
`;