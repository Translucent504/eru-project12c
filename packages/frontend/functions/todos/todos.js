const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    userTodos(id: String!): [Todo!]
  }
  type Todo {
    content: String!
    completed: Boolean!
  }

  type User {
    id: String!
    fullName: String!
    todos: [Todo!]
  }
`;

const users = [
  {
    id: "6f07ec10-2d52-44ae-a03d-10156d44c3f2",
    full_name: "Shayaan Farooqi",
    todos: [
      {
        content: "Todo task 1",
        completed: false,
      },
      {
        content: "Todo task 2",
        completed: false,
      },
    ],
  },
];

const resolvers = {
  Query: {
    userTodos: (_, args) => {
      console.log(args)
      return users[0].todos
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
