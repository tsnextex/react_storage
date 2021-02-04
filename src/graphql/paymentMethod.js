import gql from "graphql-tag";

export const GetAllPaymentMethods = id => gql`
  {
    getAccountPaymentMethods(profileId: ${id}) {
      id,
      profile_id,
      primary,
      billing_address_1,
      billing_address_2,
      billing_city,
      billing_state,
      billing_zipcode,
      cc_holder_name,
      cc_last,
      cc_expires,
      cc_type,
      location {
        id,
        reference_id,
        code,
        name,
        active,
        sandbox
      },
      created_at,
      updated_at
    }
  }
`;

export const DeletePaymentMethod = (locationId, paymentMethodId) => gql`
  mutation {
    deleteAccountCreditCard(
      locationId: ${locationId},
      paymentMethodId: ${paymentMethodId}
    ) {
      status,
      message,
      data,
      redirect,
      action,
      error
    }
  }
`;

export const AddInitialPaymentMethod = () => gql`
  mutation {
    postAccountProfile(
      locationId: Int,
      profileId: Int,
      info: {
        merchant_customer_id: String,
        description: String, // blank
        email: String,
        first_name: String, 
        last_name: String,
        address: String,
        city: String,
        state: String,
        zipcode: String,
        phone: String,
        cc_number: String,
        cc_expires: String,
        cc_cvv: String,
        primary: Boolean // false
      }
    ) {
      status,
      message,
      data,
      redirect,
      action,
      error
    }
  }
`;

export const AddNewPaymentMethod = (
    locationId,
    profileId,
    customerProfileId,
    first,
    last,
    address,
    city,
    state,
    zipcode,
    phone,
    ccNum,
    ccExp,
    ccCvc
  ) => gql`
  mutation {
    postAccountCreditCard(
      locationId: ${locationId},
      profileId: ${profileId},
      customerProfileId: "${customerProfileId}",
      info: {
        first_name: "${first}",
        last_name: "${last}",
        address: "${address}",
        city: "${city}",
        state: "${state}",
        zipcode: "${zipcode}",
        phone: "${phone}",
        cc_number: "${ccNum}",
        cc_expires: "${ccExp}",
        cc_cvv: "${ccCvc}"
      }
    ) {
      status,
      message,
      data,
      redirect,
      action,
      error
    }
  }
`;

export const AddNewPaymentMethodSiteLink = (
    locationCode,
    paymentMethodId,
    profileId,
    ccType,
    ccNum,
    ccExp,
    ccHolder,
    ccStreet,
    ccZip,
    autoBillType,
    achAcc,
    achRouting,
    achSavings,
    autoBillPastDue
  ) => gql`
  mutation {
    postAccountCreditCardSiteLink(
      locationCode: ,
      paymentMethodId: ,
      profileId: ,
      info: {
        ledger_id: ,
        cc_type_id: , 
        cc_number: ,
        cc_expires: ,
        cc_holder_name: ,
        cc_holder_street: ,
        cc_holder_zip: ,
        auto_bill_type: , // 0 if add card 1 if enroll in autopay
      }
    ) {
      status,
      message,
      data,
      redirect,
      action,
      error
    }
  }
`;

