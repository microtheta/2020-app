import { gql } from '@apollo/client'

export default gql`
  type User {
    id: ID!
    name: String!
    status: String!
    address: Address
  }
`