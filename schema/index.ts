import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    image: String
    publishedAt: String
    author: User
  }

  type Category {
    id: ID!
    title: String!
    parent: Category
  }

  type Query {
    authorizeUser: User
    signOut: Boolean
    users: [User!]!
    user(id: ID!): User
    userByEmail(email: String!): User
    getOrCreateUser(data: GetOrCreateUserInput!): User
  }

  type Mutation {
    authenticateUser(code: String!): User
    createUser(data: UserCreateInput!): User!
  }

  input GetOrCreateUserInput {
    email: String!
    name: String
  }

  input UserCreateInput {
    email: String!
    name: String
  }

`;

export default typeDefs;
