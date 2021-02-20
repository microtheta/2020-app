import { gql } from '@apollo/client'

export default gql`
  type Query {
    viewer: User
  }
`