import { gql } from '@apollo/client'

export default gql`
  type Address {
    location: String!
    city: String!
  }
`