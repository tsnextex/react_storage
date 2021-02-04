import React, { useEffect, useState } from 'react';
import { CustomTable, CustomModal } from './style';
import { Button, Message, Header, Icon, Radio } from 'semantic-ui-react';
import moment from 'moment';

export const UnitsTable = props => {

  const {
    accountUnits,
    setAutopaySelected
  } = props;

  const [myUnits, setMyUnits] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {

    if (accountUnits?.length > 0) {

      // add data needed for table
      let myUnits = [];   
      accountUnits.map(unit => {

        unit.rentals.map((rental, i) => {

          myUnits = [
            ...myUnits,
            {
              key: i,
              name: unit.name,
              unit: rental.unit_number,
              nextPayment: rental.payment_due_at,
              fullAccount: unit,
              fullRental: rental
            }
          ];
        });
      });

      setMyUnits(myUnits);
    }
  }, [accountUnits]);

  // Table Columns
  const columns = [
    {
      title: 'Unit Number',
      dataIndex: 'unit',
      key: 'unit',
      render: unit => `#${unit}`
    },
    {
      title: 'Location',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Next Withdrawal',
      dataIndex: 'nextPayment',
      key: 'nextPayment',
      render: nextPayment => moment(nextPayment).format('MM/DD/YYY')
    },
    {
      title: 'Enable Auto-Pay',
      dataIndex: 'unit',
      key: 'unit',
      render: () => <Radio onChange={(e, data) => setOpen(data.checked)} toggle />
    },
  ];

  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={myUnits}
        size="middle"
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: false,
          hideOnSinglePage: true
        }}
      />

      <CustomModal
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <CustomModal.Content className="modalWrap">
          <CustomModal.Description className="modalDescription">
            <Header as='h2' className="modalHeader">
              <div>
                <Icon name='sync' />
                <Header.Content>Auto-Pay Subscription</Header.Content>
              </div>
              <Header.Subheader>
                Enable auto-pay and don’t risk missing a payment and getting a late fee. Auto-Play will take effect the following pay-period and you may require to pay any balance due
              </Header.Subheader>
            </Header>
          </CustomModal.Description>

          <Message>
            By enabling Auto-Pay you will be agreeing with the <span>Terms & Conditions</span>
          </Message>
        </CustomModal.Content>
        <CustomModal.Actions>
          <Button
            className="cancelBtn"
            content="Cancel"
            onClick={() => {

              // close modal and uncheck toggle
              setOpen(false);
            }}
          />
          <Button
            className="confirmBtn"
            content='Enable Auto-Pay'
            onClick={() => {

              // close modal and transition to details page
              setOpen(false);
              setAutopaySelected(true);
            }}
          />
        </CustomModal.Actions>
      </CustomModal>
    </>
  );
}