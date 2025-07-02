import { gql } from "@apollo/client";

export const SIGN_IN_ADMIN = gql`
  mutation AdminRequest($email: String) {
    adminRequest(email: $email) {
      code
    }
  }
`;
