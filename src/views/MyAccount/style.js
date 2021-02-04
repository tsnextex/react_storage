import styled from 'styled-components';
import { Button, Modal } from 'semantic-ui-react';

export const NoUnitsContainer = styled.section`
  align-items: center;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(191, 191, 191, 0.5);
  display: flex;
  flex-direction: column;
  height: 231px;
  justify-content: center;
  margin-bottom: 1em;
  text-align: center;

  .noUnitsTitle {
    color: #1B3C92;
    font-size: 14px;
    font-weight: 700;
  }

  .noUnitsBody {
    color: #4A4A4A;
    font-size: 25px;
    line-height: 30px;
    margin: 10px 0 25px 0;
    max-width: 500px;
  }

  .findStorageBtn {
    background: #CE3138 !important;
    color: #fff;
    font-size: 14px !important;
    height: 43px;
    width: 170px;
  }
`;

export const FormLabel = styled.p`
  color: #4A4A4A;
  display: flex;
  font-size: 10px;
  font-weight: 700;
  margin-bottom: 3px;
`;

export const NewCardContainer = styled.section`
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(191, 191, 191, 0.5);

  .footerCancelBtn {
    background: #fff;
    color: #1B3C92;
  }

  .footerSaveBtn {
    background: #1B3C92;
    color: #fff;
  }

  .footerBtn {
    height: 36px;
    width: 163px;
  }
`;

export const FooterBtnContainer = styled.section` 
  align-items: center;
  background: #fff;
  bottom: 0;
  box-shadow: 0 -2px 4px 0 #DBDBDB;
  display: flex;
  height: 68px;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  width: 100%;
`;

export const PaymentMethodContainer = styled.section`
  align-items: center;
  color: #4A4A4A;
  display: flex;
  font-size: 12px;
  justify-content: space-between;

  .removeBtn {
    background: #fff !important;
    border: none;
    color: #1B3C92 !important;
    font-dize: 12px;
    font-weight: 700;
  }
`;

export const CustomModal = styled(Modal)`

  .modalWrap {
    height: 400px;
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
  }

  .modalDescription {
    display: flex !important;
    justify-content: center;
    max-height: 200px;
  }

  .modalHeader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 330px;
    text-align: center;

    div .icon {
      color: #1B3C92;
    }

    .content {
      color: #4A4A4A;
      font-size: 25px !important;
      font-weight: 400 !important;
    }

    .sub {
      font-size: 14px !important;
      margin-top: 20px !important;

      span {
        color: #1B3C92;
        font-weight: 700;
      }
    }
  }

  .message {
    box-shadow: none;
    color: #4A4A4A;
    font-size: 14px;
    text-align: center;

    span {
      color: #1B3C92;
      font-weight: 700;
    }
  }

  .actions {
    display: flex;
    padding: 0 !important;

    button {
      border-radius: 0;
      font-size: 12px;
      height: 46px;
      margin: 0 !important;
      width: 50%;
    }

    .cancelBtn {
      color: #1B3C92;
    }

    .confirmBtn {
      background: #1B3C92;
      color: #fff;
    }
  }
`;

export const EditBtn = styled(Button)`
  background: #fff !important;
  border: none;
  color: #1B3C92 !important;
  font-weight: 700;
  height: 25px;
`;