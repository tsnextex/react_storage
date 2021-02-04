import React from 'react';
import { CustomTable } from './style';
import moment from 'moment';

export const BillingHistory = props => {

  const { accountPaymentHistory } = props;

  const columns = [
    {
      title: 'Date',
      dataIndex: 'payment_date',
      key: 'payment_date',
      render: paymentDate => moment(paymentDate).format('MM/DD/YYYY'),
      sorter: (a, b) => moment(a.payment_date).valueOf() - moment(b.payment_date).valueOf(),
      sortDirections: ['descend', 'ascend'],
      filterMultiple: false,
    },
    {
      title: 'Location',
      dataIndex: 'location_name',
      key: 'location_name',
      filters: [
        ...new Map(accountPaymentHistory?.map(item => [item['location_name'], item])).values()
      ].map(location => { return { text: location.location_name, value: location.location_name }}),
      onFilter: (value, record) => record.location_name.indexOf(value) === 0,
    },
    {
      title: 'Unit Number',
      dataIndex: 'unit_number',
      key: 'unit_number',
      filters: [
        ...new Map(accountPaymentHistory?.map(item => [item['unit_number'], item])).values()
      ].map(unit => { return { text: unit.unit_number, value: unit.unit_number }}),
      onFilter: (value, record) => record.unit_number.indexOf(value) === 0,
    },
    {
      title: 'Amount',
      dataIndex: 'payment_amount',
      key: 'payment_amount',
      render: paymentAmount => <strong>${paymentAmount}</strong>,
      sorter: (a, b) => a.payment_amount - b.payment_amount,
      sortDirections: ['descend', 'ascend'],
      filterMultiple: false,
    },
    {
      title: 'Payment Type',
      dataIndex: 'payment_type',
      key: 'payment_type',
      sorter: (a, b) => a.payment_type.length - b.payment_type.length,
      sortDirections: ['descend', 'ascend'],
      filterMultiple: false,
    },
  ];

  return (
    <CustomTable
      columns={columns}
      dataSource={accountPaymentHistory}
      size="middle"
      pagination={{
        position: ['bottomCenter'],
        showSizeChanger: false
      }}
    />
  );
}