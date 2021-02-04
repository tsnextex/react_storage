import React, { useState } from "react";
import { PaymentMethodContainer, EditBtn, CustomModal } from "./style";
import { List, Button, Message, Header, Icon } from 'semantic-ui-react';
import client from "../../apollo";
import { gqlMutate } from "../../utils";
import { DeletePaymentMethod } from '../../graphql/paymentMethod';

export const PaymentMethods = props => {

  const {
    accountPaymentMethods,
    removeDeletedPaymentMethod,
    setCardTableStatus,
    setSelectedPaymentMethod
  } = props;

  const [open, setOpen] = useState(false);
  const [cardToRemove, setCardToRemove] = useState(null);
  const [autoPayError, setAutoPayError] = useState(false);

  const determineCardType = type => {

    let card = 'credit card outline';
    card = type === 'Visa' ? 'cc visa' : card;
    card = type === 'MasterCard' ? 'cc mastercard' : card;
    card = type === 'American Express' ? 'cc amex' : card;
    card = type === 'Discover' ? 'cc discover' : card;
    card = type === 'JCB' ? 'cc jcb' : card;
    return card;
  }

  const confirmRemove = paymentMethod => {

    console.log('payment method to delete', paymentMethod);
    gqlMutate(client, DeletePaymentMethod(paymentMethod.location.id, paymentMethod.id))
      .then(res => {
        
        console.log('delete payment res', res);
        if (res.status === 'error') {
          
          // display error message
          return;

        } else {

          // fetch updated list
          removeDeletedPaymentMethod(paymentMethod.id);
        }
      });
  }

  const editPaymentMethod = paymentMethod => {

    // set data for edit payment method and navigate to page
    setSelectedPaymentMethod(paymentMethod);
    setCardTableStatus(2);
  }

  return (
    <List divided relaxed>
      { accountPaymentMethods.map(paymentMethod => (
        <List.Item>
          <List.Icon
            name={determineCardType(paymentMethod.cc_type)}
            size='big'
            verticalAlign='middle'
          />
          <List.Content>
            <PaymentMethodContainer>
              <section>
                <div>
                  {paymentMethod.cc_type} ending in {paymentMethod.cc_last}
                  <EditBtn
                    className="editBtn"
                    onClick={() => editPaymentMethod(paymentMethod)}
                    size='mini'
                  >
                    Edit
                  </EditBtn>
                </div>
                <div>
                  {paymentMethod.billing_address_1}, {paymentMethod.billing_city}, {paymentMethod.billing_state} {paymentMethod.billing_zipcode}
                </div>
                <strong>
                  {paymentMethod.location.name}
                </strong>
              </section>

              <section>              
                <CustomModal
                  size="small"
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  trigger={
                    <Button
                      onClick={() => setCardToRemove(paymentMethod)}
                      className="removeBtn"
                    >
                      Remove
                    </Button>
                  }
                >
                  <CustomModal.Content className="modalWrap">
                    <CustomModal.Description className="modalDescription">
                      <Header as='h2' className="modalHeader">
                        <div>
                          <Icon name={autoPayError ? 'sync' : 'info circle'} />
                          <Header.Content>{autoPayError ? 'Auto-Pay Subscription' : 'Linked Card'}</Header.Content>
                        </div>
                        <Header.Subheader>
                          {
                            autoPayError ?
                            <>
                              By clicking <span>Disable Auto-Pay</span> you will un-link <span>card Ending - {cardToRemove?.cc_last}</span> from <span>{paymentMethod?.location.name}</span> and you will no longer subcribed to Auto-Pay. 
                              Change will reflect on the following pay period.
                            </> :
                            <>
                              By clicking <span>Remove Card</span> you will un-link <span>card Ending - {cardToRemove?.cc_last}</span> from <span>{paymentMethod?.location.name}</span>
                              Change will reflect on the following pay period.
                            </>
                          }
                        </Header.Subheader>
                      </Header>
                    </CustomModal.Description>

                    <Message>
                      By { autoPayError ? 'disabling Auto-Pay' : 'un-linking card' } you will be agreeing with the <span>Terms & Conditions</span>
                    </Message>
                  </CustomModal.Content>
                  <CustomModal.Actions>
                    <Button
                      className="cancelBtn"
                      content="Cancel"
                      onClick={() => setOpen(false)}
                    />
                    <Button
                      className="confirmBtn"
                      content={ autoPayError ? 'Disable Auto-Pay' : 'Remove Card' }
                      onClick={() => setOpen(false)}
                    />
                  </CustomModal.Actions>
                </CustomModal>
              </section>
            </PaymentMethodContainer>
          </List.Content>
        </List.Item>
      ))
      }
    </List>
  );
}