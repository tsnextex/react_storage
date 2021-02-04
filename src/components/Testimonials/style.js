import styled from 'styled-components';
import { MobileStepper } from '@material-ui/core';
import Rating from "@material-ui/lab/Rating";

export const StyledTestimonialsContainer = styled.section`

  .root {
    background: #FFF;
    display: flex;
    padding: 3em;
    text-align: center;
  }

  .titleRow {
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
    padding-top: .2em;
  }

  .box {
    background-repeat: no-repeat;
    background-size: cover !important;
    color: white;
    display: flex;
    flex-direction: column;
    height: 300px;
    justify-content: center;
    margin-top: 1.2em;
    max-height: 259px;
    padding: 15% 14%;
  }

  .review {
    color: white;
    padding: 0.4em 1em;
    text-align: left;
  }

  .reviewTitle {
    color: #fff;
    font-weight: 400;
    font-size: 18px;
    padding-bottom: 1em;
  }

  .reviewContent {
    font-size: 11px;
    font-weight: bold;
  }

  .rating {
    font-size: 20px;
  }

  @media (max-width: 600px) {

    .root {
      padding: 1em 3em;
    }

    .box {
      padding: 1em;
    }

    .title {
      font-size: 10px;
    }

    .subtitle {
      font-size: 22px;
      max-width: 300px;
    }

    .reviewTitle {
      font-size: 13px;
      line-height: 21px;
      padding: 0.5em 1em 0.5em 2em;
    }

    .reviewContent {
      font-size: 12px;
    }

    .rating {
      font-size: 16px;
    }
  }
`;

export const CustomStepper = styled(MobileStepper)`
  align-items: center;
  background: #fff !important;
  display: flex;
  height: 45px;
  justify-content: center !important;
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

export const CustomRating = styled(Rating)`
  color: #F1D615 !important;
`;