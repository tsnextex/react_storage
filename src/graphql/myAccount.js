import gql from "graphql-tag";

export const ForgotPasswordQuery = username => gql`
{
  getResetAccountPasswordUrl(username: "${username}") {
    status
    message
    data
    error
  }
}
`;

export const MyAccountQuery = id => gql`
{ 
	getAccountUnits(profileId: ${id}) {
    name,
    phone,
    address,
    url,
    reservations {
      unit_size,
      unit_type,
      movein_scheduled,
      push_rate,
      reserved_until
    },
    rentals {
      unit_number,
      unit_size,
      unit_type,
      paid_thru,
      gate_code,
      payment_due_at
    }
  }
  
  getAccountDetails(profileId: ${id}) {
    customer_since,
    first_name,
    last_name,
    email,
    phone,
    active_military
  }

  getAccountMovedOutUnits(profileId: ${id}) {
    name
    unit_number
    unit_size
    unit_type
    movedin_at
    movedout_at
  }

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